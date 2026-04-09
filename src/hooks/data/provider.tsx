import { type ReactNode, useCallback, useEffect, useState } from "react";
import DataContext from "./context";
import startData from "~/data.json";
import useSocket from "~/hooks/socket";
import type { Channel, Data, User } from "~/types.ts";

interface Props {
  children: ReactNode;
}

export default function DataProvider({ children }: Props) {
  const [data, setData] = useState<Data>(startData);
  const { socket, on } = useSocket();

  useEffect(() => {
    on("data", (data) => {
      console.log("DATA UPDATED", data);
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

  const getProgram = useCallback(
    (programId: string) => {
      return data.programs.find((program) => program.id === programId) || null;
    },
    [data],
  );

  const getUser = useCallback(
    (userId: string) => {
      return (data.users?.[userId] as User) || null;
    },
    [data],
  );

  return (
    <DataContext.Provider
      value={{ getChannels, getChannel, getMessages, getProgram, getUser }}
    >
      {children}
    </DataContext.Provider>
  );
}
