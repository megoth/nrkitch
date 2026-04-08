import useAccount, { prettifyRole } from "~/hooks/account";
import { NavLink } from "react-router";
import useData from "~/hooks/data";

export default function Frontpage() {
  const { role, username } = useAccount();
  const { getChannels } = useData();
  return (
    <>
      <h1>
        Hei {username}, du er {prettifyRole(role)} ^_^
      </h1>
      <ul className="list">
        {getChannels().map((channel) => (
          <li key={channel.id}>
            <NavLink to={`/${channel.id}`}>{channel.name}</NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}
