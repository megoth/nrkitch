import useData from "~/hooks/data";
import { NavLink } from "react-router";
import ChatMedia from "~/components/chat-media";
import styles from "./styles.module.css";

export function UpcomingChannels() {
  const { getChannels, getProgram } = useData();
  return (
    <section>
      <h2 className="subtitle">Kommende chats</h2>
      <ul className={styles.list}>
        {getChannels({ mode: "upcoming" }).map((channel) => {
          const program = getProgram(channel.programId)!;
          return (
            <li key={channel.id}>
              <NavLink to={`/${channel.id}`}>
                <ChatMedia channel={channel} program={program}>
                  <span className="tag is-success">Snart i gang!</span>
                </ChatMedia>
                <h3 className="subtitle">Chat snart i gang: {program?.name || "Fant ikke navn..."}</h3>
              </NavLink>{" "}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
