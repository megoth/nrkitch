import useAccount, { prettifyRole } from "~/hooks/account";
import { NavLink } from "react-router";
import useData from "~/hooks/data";

export default function Frontpage() {
  const { role, username } = useAccount();
  const { getChannels, getProgram } = useData();
  return (
    <>
      <h1>
        Hei {username}, du er {prettifyRole(role)} ^_^
      </h1>
      <ul className="list">
        {getChannels().map((channel) => {
          const program = getProgram(channel.programId);
          return (
            <li key={channel.id}>
              <NavLink to={`/${channel.id}`}>{program?.name || "Fant ikke navn..."}</NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
}
