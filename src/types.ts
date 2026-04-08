export interface Series {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  channelId: string;
  author: string;
  body: string;
  timestamp: string;
}

export interface Channel {
  id: string;
  seriesId: Series["id"];
  name: string;
  messages?: Array<Message>;
}

export interface Data {
  channels: Array<Channel>;
  series: Array<Series>;
}
export type SocketMessage = Pick<Message, "channelId" | "author" | "body">;