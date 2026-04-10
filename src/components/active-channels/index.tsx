import styles from "./styles.module.css";
import ChatMedia from "~/components/chat-media";
import Chat from "~/components/chat";
import useData from "~/hooks/data";
import { NavLink } from "react-router";

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
            <header className={styles.header}>
              <ChatMedia channel={channel} program={program} />
              <h2 className="subtitle">
                <NavLink to={`/${channel.id}`}>
                  Direkte nå: {getProgram(channel.programId)?.name}
                </NavLink>
              </h2>
              <nav>
                <NavLink to={`/${channel.id}`}>Gå til chat</NavLink>
              </nav>
            </header>
            <Chat channel={channel} className={styles.content} />
          </article>
        );
      }) || <p>Det er ingen aktive kanaler</p>}
    </section>
  );
}
