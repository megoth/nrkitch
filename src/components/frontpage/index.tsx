import useAccount from "~/hooks/account";
import { NavLink } from "react-router";
import useData from "~/hooks/data";
import { prettifyChannelMode, prettifyRole } from "~/utils.ts";
import Chat from "~/components/chat";
import styles from "./styles.module.css";

export default function Frontpage() {
  const { role, username } = useAccount();
  const { getChannels, getProgram } = useData();
  const activeChannels = getChannels({ mode: "in-progress" });
  return (
    <>
      <h1 className="title">
        Hei {username}, du er {prettifyRole(role)}
      </h1>
      {activeChannels.map((channel) => {
        const program = getProgram(channel.programId);
        if (!program) return null;
        return (
          <article key={channel.id} className={styles.activeChat}>
            <img src={program.imgUrl} alt={`Skjermbilde for ${program.name}`} />
            <h2 className="subtitle">
              Direkte nå: {getProgram(channel.programId)?.name}
            </h2>
            <Chat channel={channel} />
          </article>
        );
      }) || <p>Du har ingen kanaler</p>}
      <h2 className="subtitle">Kanaler</h2>
      <ul className="list">
        {getChannels().map((channel) => {
          const program = getProgram(channel.programId);
          return (
            <li key={channel.id}>
              <NavLink to={`/${channel.id}`}>
                {program?.name || "Fant ikke navn..."}
              </NavLink>{" "}
              - <span>{prettifyChannelMode(channel.mode)}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
}
