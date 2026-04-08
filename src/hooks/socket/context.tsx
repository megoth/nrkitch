import { createContext } from "react";
import { Socket } from "socket.io-client";

export interface SocketModel {
  on: (eventName: string, listener: (socket: Socket) => void) => void;
  emit: (eventName: string) => void;
}

const SocketContext = createContext<SocketModel>({
  on: () => undefined,
  emit: () => undefined,
});

export default SocketContext;
