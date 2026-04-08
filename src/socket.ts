import {createServer} from 'node:http';
import {Server} from 'socket.io';

const server = createServer();
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

io.on('connection', client => {
    console.log("CONNECTION");

    client.on('event', (data) => {
        console.log("EVENT", JSON.stringify(data, null, 2));
    });
    client.on('disconnect', () => {
        console.log("DISCONNECT");
    });
});

server.listen(3000);
console.log("Server started: http://localhost:3000");