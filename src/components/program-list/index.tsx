import useData from "~/hooks/data";
import ProgramMedia from "~/components/program-media";
import styles from "./styles.module.css";
import { NavLink } from "react-router";

export default function ProgramList() {
  const { getChannel, getPrograms } = useData();
  const program = getPrograms();
  return (
    <section>
      <h2 className="subtitle">Programmer</h2>
      <ul className={styles.list}>
        {program.map((program) => {
          const channel = getChannel(program.channelId);
          return (
            <li key={program.id}>
              <ProgramMedia program={program}>
                {channel?.mode === "upcoming" && (
                  <NavLink to={`/${channel?.id}`} className="tag is-primary">
                    Snart i gang!
                  </NavLink>
                )}
                {channel?.mode === "in-progress" && (
                  <NavLink to={`/${channel.id}`} className="tag is-success">
                    Join chatten nå!
                  </NavLink>
                )}
              </ProgramMedia>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
