import { type ReactNode, useCallback } from "react";
import SocketContext from "./context";
import { io, type Socket } from "socket.io-client";

interface Props {
  children: ReactNode;
}

export default function SocketProvider({ children }: Props) {
  const socket = io("http://localhost:3000");

  const on = useCallback(
    (eventName: string, listener: (socket: Socket) => void) => {
      socket.on(eventName, listener);
    },
    [socket],
  );

  const emit = useCallback(
    (eventName: string) => {
      socket.emit(eventName);
    },
    [socket],
  );

  return (
    <SocketContext.Provider value={{ on, emit }}>
      {children}
    </SocketContext.Provider>
  );
}
