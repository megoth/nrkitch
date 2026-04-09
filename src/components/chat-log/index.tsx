import { type HTMLAttributes, useEffect, useMemo } from "react";
import useData from "~/hooks/data";
import styles from "./styles.module.css";

interface Props extends HTMLAttributes<HTMLDivElement> {
  channelId: string;
}

export default function ChatLog({ channelId, ...props }: Props) {
  const { getMessages, getUser } = useData();
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
            <li key={message.id} id={message.id}>
              <span
                className={styles.chatUser}
                style={{ color: getUser(message.author)?.color || "red" }}
              >
                {message.author}
              </span>
              <span>{message.body}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
