import { NavLink, useParams } from "react-router";
import useData from "~/hooks/data";
import { useMemo } from "react";
import ErrorMessage from "~/components/error-message";
import ChatLog from "~/components/chat-log";
import ChatForm from "~/components/chat-form";
import styles from "./styles.module.css";
import RoleRestricted from "~/components/role-restricted";
import useSocket from "~/hooks/socket";

export default function Channel() {
  const params = useParams();
  const { getChannel, getProgram } = useData();
  const { emit } = useSocket();

  const channel = useMemo(
    () => getChannel(params.channelId),
    [params.channelId, getChannel],
  );

  const program = useMemo(
    () => (channel?.programId ? getProgram(channel.programId) : null),
    [channel, getProgram],
  );

  const onReset = () => {
    emit("reset", { channelId: channel?.id });
  };

  if (!channel) return <ErrorMessage>Fant ikke kanal</ErrorMessage>;
  if (!program) return <ErrorMessage>Fant ikke program</ErrorMessage>;

  return (
    <div className={styles.channelContainer}>
      <nav>
        <NavLink to="/">Tilbake til forsiden</NavLink>
      </nav>

      <div className={styles.channelLayout}>
        <header>
          <img src={program.imgUrl} alt={`Skjermbilde for ${program.name}`} />
          <div className={styles.headerInner}>
            <h1 className="title">{program.name}</h1>
          </div>
        </header>
        <div className={styles.chatContainer}>
          <ChatLog channelId={channel.id} className={styles.chatLog} />
          <ChatForm channelId={channel.id} className={styles.chatForm} />
        </div>
      </div>
      <RoleRestricted roles={["moderator"]}>
        <button className="button is-danger" onClick={onReset}>
          Reset chat
        </button>
      </RoleRestricted>
    </div>
  );
}
