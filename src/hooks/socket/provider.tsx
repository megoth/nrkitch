import { type ReactNode, useCallback } from "react";
import SocketContext from "./context";
import { io } from "socket.io-client";

interface Props {
  children: ReactNode;
}

export default function SocketProvider({ children }: Props) {
  const socket = io("http://localhost:3000");

  const on = useCallback(
    (eventName: string, listener: (data: unknown) => void) => {
      socket.on(eventName, listener);
    },
    [socket],
  );

  const emit = useCallback(
    (eventName: string, ...data: unknown[]) => {
      socket.emit(eventName, ...data);
    },
    [socket],
  );

  return (
    <SocketContext.Provider value={{ on, emit, socket }}>
      {children}
    </SocketContext.Provider>
  );
}
