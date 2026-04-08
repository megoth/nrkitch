import { type ReactNode, useCallback, useEffect } from "react";
import DataContext from "./context";
import startData from "~/data.json";
import { useLocalStorage } from "@uidotdev/usehooks";
import useSocket from "~/hooks/socket";
import type { Channel, Data } from "~/types.ts";

interface Props {
  children: ReactNode;
}

export default function DataProvider({ children }: Props) {
  const [data, setData] = useLocalStorage("data", startData);
  const { socket, on } = useSocket();

  useEffect(() => {
    on("data", (data) => {
      console.log("DATA UPDATE", socket.id, data);
      setData(data as Data);
    });
  }, [socket, on, setData]);

  const getChannels = useCallback(() => data.channels, [data]);

  const getChannel = useCallback(
    (id: string | undefined): Channel | null =>
      data.channels.find((channel) => channel.id === id) || null,
    [data],
  );

  const getMessages = useCallback(
    (channelId: string) => {
      return getChannel(channelId)?.messages || [];
    },
    [getChannel],
  );

  return (
    <DataContext.Provider value={{ getChannels, getChannel, getMessages }}>
      {children}
    </DataContext.Provider>
  );
}
