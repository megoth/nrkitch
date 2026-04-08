import { createServer } from "node:http";
import { Server } from "socket.io";
import data from "./data.json";
import type { Channel, Data, SocketMessage } from "~/types.ts";
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

const updateChatLog = (data: SocketMessage) => {
  console.log("UPDATE CHAT LOG", JSON.stringify(data, null, 2));
  const channel = channels[data.channelId];
  if (!channel) {
    console.error(`Channel not found: ${data.channelId}`);
    return;
  }
  const messages = channel.messages || [];
  channels[data.channelId] = {
    ...channel,
    messages: [
      ...messages,
      {
        id: crypto.randomUUID(),
        channelId: data.channelId,
        author: data.author,
        message: data.message,
        timestamp: new Date().toISOString(),
      },
    ],
  };
  console.log(`CHAT LOG UPDATED, NEW MESSAGE COUNT ${messages.length + 1}`);
};

const packageData = (): Data => ({
  series: data.series,
  channels: Object.values(channels),
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

  client.on("message", (data) => {
    updateChatLog(data);
    updateAll();
  });

  client.on("disconnect", () => {
    delete sockets[client.id];
    console.log("DISCONNECT");
  });
});

server.listen(3000);
console.log("Server started: http://localhost:3000");
