import { NavLink } from "react-router";
import { prettifyChannelMode } from "~/utils.ts";
import useData from "~/hooks/data";

export default function ChannelList() {
  const { getChannels, getProgram } = useData();
  return (
    <section>
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
    </section>
  );
}