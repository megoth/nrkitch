export interface Program {
  id: string;
  name: string;
  imgUrl: string;
}

export interface ChatMessage {
  id: string;
  channelId: string;
  author: string;
  body: string;
  timestamp: string;
}
export type ChatSocketMessage = Pick<
  ChatMessage,
  "channelId" | "author" | "body"
>;

export type channelMode = "upcoming" | "in-progress" | "closed";

export interface ChannelModeSocketMessage {
  channelId: string;
  mode: channelMode;
}

export interface Channel {
  id: string;
  programId: Program["id"];
  mode: channelMode;
  messages?: Array<ChatMessage>;
}

export interface User {
  color: string;
  username: string;
}

export type UserSocketMessage = Pick<User, "color" | "username">;

export interface Data {
  channels: Array<Channel>;
  programs: Array<Program>;
  users: Record<string, User>;
}
