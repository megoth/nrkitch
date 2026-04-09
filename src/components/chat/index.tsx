import ChatLog from "~/components/chat-log";
import ChatForm from "~/components/chat-form";
import ErrorMessage from "~/components/error-message";
import type { Channel } from "~/types.ts";
import { useMemo } from "react";
import useData from "~/hooks/data";
import styles from "./styles.module.css";

interface Props {
  channel: Channel;
}

export default function Chat({ channel }: Props) {
  const { getProgram } = useData();

  const program = useMemo(
    () => (channel?.programId ? getProgram(channel.programId) : null),
    [channel, getProgram],
  );

  if (!program) return <ErrorMessage>Fant ikke program</ErrorMessage>;

  return (
    <div className={styles.chatContainer}>
      <ChatLog channel={channel} className={styles.chatLog} />
      <ChatForm channel={channel} className={styles.chatForm} />
    </div>
  );
}
