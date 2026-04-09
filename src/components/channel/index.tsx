import { NavLink, useParams } from "react-router";
import useData from "~/hooks/data";
import { useMemo } from "react";
import ErrorMessage from "~/components/error-message";
import styles from "./styles.module.css";
import RoleRestricted from "~/components/role-restricted";
import Chat from "~/components/chat";
import ModeToggler from "~/components/mode-toggler";
import ClearLogButton from "~/components/clear-log-button";
import SubscribeButton from "~/components/subscribe-button";

export default function Channel() {
  const params = useParams();
  const { getChannel, getProgram } = useData();

  const channel = useMemo(
    () => getChannel(params.channelId),
    [params.channelId, getChannel],
  );

  const program = useMemo(
    () => (channel?.programId ? getProgram(channel.programId) : null),
    [channel, getProgram],
  );

  if (!channel) return <ErrorMessage>Fant ikke kanal</ErrorMessage>;
  if (!program) return <ErrorMessage>Fant ikke program</ErrorMessage>;

  return (
    <div className={styles.channelContainer}>
      <nav>
        <NavLink to="/">Tilbake til forsiden</NavLink>
      </nav>
      <div className={styles.chatContainer}>
        <header>
          <img src={program.imgUrl} alt={`Skjermbilde for ${program.name}`} />
          <div className={styles.headerInner}>
            <h1 className="title">{program.name}</h1>
          </div>
        </header>
        <div className={styles.content}>
          {channel.mode === "upcoming" && <SubscribeButton channelId={channel.id}>Gi meg beskjed når chatten starter</SubscribeButton>}
          {channel.mode === "in-progress" && <Chat channel={channel} />}
          {channel.mode === "closed" && <div>Avsluttet</div>}
        </div>
      </div>
      <RoleRestricted roles={["moderator"]}>
        <div className={styles.moderatorButtons}>
          <ModeToggler channel={channel} />
          <ClearLogButton channel={channel} />
        </div>
      </RoleRestricted>
    </div>
  );
}
