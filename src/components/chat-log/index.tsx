import { type HTMLAttributes, useEffect, useMemo } from "react";
import useData from "~/hooks/data";
import styles from "./styles.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  channelId: string;
}

export default function ChatLog({ channelId, ...props }: Props) {
  const { getMessages } = useData();
  const messages = useMemo(
    () => getMessages(channelId),
    [channelId, getMessages],
  );

  useEffect(() => {
    document
      .getElementById(messages?.[messages.length - 1]?.id || "")
      ?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div {...props}>
      {(!messages || messages.length === 0) && <p>Ingen meldinger (enda...)</p>}
      {messages && (
        <ul className={styles.chatLog}>
          {messages.map((message) => (
            <li key={message.id} id={message.id} className="message is-small">
              <div className="message-header">{message.author}</div>
              <div className="message-body">{message.body}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
