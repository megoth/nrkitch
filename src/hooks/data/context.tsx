import { createContext } from "react";
import type {
  Channel,
  channelMode,
  ChatMessage,
  Program,
  User,
} from "~/types.ts";

export interface DataModel {
  getChannels: (options?: { mode?: channelMode }) => Array<Channel>;
  getChannel: (id: string | undefined) => Channel | null;
  getMessages: (channelId: string) => Array<ChatMessage>;
  getPrograms: () => Array<Program>;
  getProgram: (programId: string) => Program | null;
  getUser: (username: string) => User | null;
}

const DataContext = createContext<DataModel>({
  getChannels: () => [],
  getChannel: () => null,
  getMessages: () => [],
  getProgram: () => null,
  getPrograms: () => [],
  getUser: () => null,
});

export default DataContext;
