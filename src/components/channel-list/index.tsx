import { NavLink } from "react-router";
import { prettifyChannelMode } from "~/utils.ts";
import useData from "~/hooks/data";
import ProgramMedia from "~/components/program-media";
import styles from "./styles.module.css";

export default function ChannelList() {
  const { getChannels, getProgram } = useData();
  return (
    <section>
      <h2 className="subtitle">Kanaler</h2>
      <ul className={styles.list}>
        {getChannels().map((channel) => {
          const program = getProgram(channel.programId)!;
          return (
            <li key={channel.id}>
              <NavLink to={`/${channel.id}`}>
                <h3>{program?.name || "Fant ikke navn..."}</h3>
                <ProgramMedia program={program}>
                  {channel.mode === "upcoming" && (
                    <span className="tag is-primary">Snart i gang!</span>
                  )}
                  {channel.mode === "in-progress" && (
                    <span className="tag is-success">Join chatten nå!</span>
                  )}
                  {channel.mode === "closed" && (
                    <span className="tag">Chatten er ferdig...</span>
                  )}
                </ProgramMedia>
              </NavLink>{" "}
              <h4>{prettifyChannelMode(channel.mode)}</h4>
            </li>
          );
        })}
      </ul>
    </section>
  );
}