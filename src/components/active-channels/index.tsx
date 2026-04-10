import styles from "./styles.module.css";
import ChatMedia from "~/components/chat-media";
import Chat from "~/components/chat";
import useData from "~/hooks/data";

export default function ActiveChannels() {
  const { getChannels, getProgram } = useData();
  const activeChannels = getChannels({ mode: "in-progress" });
  return (
    <section className={styles.activeChats}>
      {activeChannels.map((channel) => {
        const program = getProgram(channel.programId);
        if (!program) return null;
        return (
          <article key={channel.id} className={styles.activeChat}>
            <ChatMedia channel={channel} program={program} />
            <h2 className="subtitle">
              Direkte nå: {getProgram(channel.programId)?.name}
            </h2>
            <Chat channel={channel} />
          </article>
        );
      }) || <p>Det er ingen aktive kanaler</p>}
    </section>
  );
}
