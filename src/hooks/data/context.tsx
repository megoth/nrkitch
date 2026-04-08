import { createContext } from "react";
import type { Channel, Message } from "~/types.ts";

export interface DataModel {
  getChannels: () => Array<Channel>;
  getChannel: (id: string | undefined) => Channel | null;
  getMessages: (channelId: string) => Array<Message>;
}

const DataContext = createContext<DataModel>({
  getChannels: () => [],
  getChannel: () => null,
  getMessages: () => [],
});

export default DataContext;
