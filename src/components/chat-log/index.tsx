import  { type HTMLAttributes, useMemo } from "react";
import useData from "~/hooks/data";

interface Props extends HTMLAttributes<HTMLDivElement> {
  channelId: string;
}

export default function ChatLog({ channelId, ...props }: Props) {
  const { getMessages } = useData();
  const messages = useMemo(() => getMessages(channelId), [channelId, getMessages]);
  return <div {...props}>
    {!messages && <p>Ingen meldinger</p>}
    {messages && (
      <ul>
        {messages.map((message) => (
          <li key={message.id}>
            <strong>{message.author}:&nbsp;</strong>
            <span>{message.message}</span>
          </li>
        ))}
      </ul>
    )}
  </div>;
}
