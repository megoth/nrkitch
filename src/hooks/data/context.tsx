import { createContext } from "react";
import type { Channel, ChatMessage, Program, User } from "~/types.ts";

export interface DataModel {
  getChannels: () => Array<Channel>;
  getChannel: (id: string | undefined) => Channel | null;
  getMessages: (channelId: string) => Array<ChatMessage>;
  getProgram: (programId: string) => Program | null;
  getUser: (username: string) => User | null;
}

const DataContext = createContext<DataModel>({
  getChannels: () => [],
  getChannel: () => null,
  getMessages: () => [],
  getProgram: () => null,
  getUser: () => null,
});

export default DataContext;
