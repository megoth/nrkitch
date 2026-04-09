import { createServer } from "node:http";
import { Server } from "socket.io";
import data from "./data.json";
import type {
  Channel,
  Data,
  ChatSocketMessage,
  UserSocketMessage,
} from "~/types.ts";
import type { Socket } from "socket.io-client";

const server = createServer();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const channels = data.channels.reduce<Record<string, Channel>>(
  (memo, channel) => {
    memo[channel.id] = channel;
    return memo;
  },
  {},
);

const updateChatLog = (data: ChatSocketMessage) => {
  // console.log("UPDATE CHAT LOG", JSON.stringify(data, null, 2));
  const channel = channels[data.channelId];
  const messages = channel.messages || [];
  channels[data.channelId] = {
    ...channel,
    messages: [
      ...messages,
      {
        ...data,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      },
    ],
  };
  // console.log(`CHAT LOG UPDATED, NEW MESSAGE COUNT ${messages.length + 1}`);
};

const packageData = (): Data => ({
  programs: data.programs,
  channels: Object.values(channels),
  users: data.users,
});

const sockets: Record<string, Socket> = {};

const update = (socket: Socket) => {
  console.log(`SENDING DATA UPDATE TO ${socket.id}`);
  return socket.emit("data", packageData());
};

const updateAll = () => {
  console.log("SENDING DATA UPDATE TO ALL");
  for (const client of Object.values(sockets)) {
    update(client);
  }
};

io.on("connection", (client) => {
  sockets[client.id] = client as unknown as Socket;
  console.log("CONNECTION");

  update(client as unknown as Socket);

  client.on("change-mode", (data: { channelId: string; mode: string }) => {
    channels[data.channelId].mode = data.mode as Channel["mode"];
    updateAll();
  })

  client.on("message", (data: ChatSocketMessage) => {
    updateChatLog(data);
    updateAll();
  });

  client.on("reset", (data: { channelId: string }) => {
    console.log("RESET", data);
    channels[data.channelId].messages = [];
    updateAll();
  });

  client.on("user-settings", (message: UserSocketMessage) => {
    console.log("UPDATE USER SETTINGS", message);
    (data as Data).users[message.username] = message;
    updateAll();
  });

  client.on("disconnect", () => {
    delete sockets[client.id];
    console.log("DISCONNECT");
  });
});

server.listen(3000);
console.log("Server started: http://localhost:3000");
