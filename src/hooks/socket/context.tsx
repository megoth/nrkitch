import { createContext } from "react";
import { Socket } from "socket.io-client";
import { fromPartial } from "@total-typescript/shoehorn";

export interface SocketModel {
  socket: Socket;
  on: (eventName: string, listener: (data: unknown) => void) => void;
  emit: (eventName: string, ...data: unknown[]) => void;
}

const SocketContext = createContext<SocketModel>({
  socket: fromPartial({}),
  on: () => undefined,
  emit: () => undefined,
});

export default SocketContext;
