import useAccount from "~/hooks/account";
import { prettifyRole } from "~/utils.ts";
import ActiveChannels from "~/components/active-channels";
import ChannelList from "~/components/channel-list";
import { UpcomingChannels } from "~/components/upcoming-channels";
import styles from "./styles.module.css";
import { clsx } from "clsx";
import ProgramList from "~/components/program-list";

export default function Frontpage() {
  const { role, username } = useAccount();
  return (
    <div className={styles.sections}>
      <h1 className={clsx("title", styles.mainTitle)}>
        Hei {username}, du er {prettifyRole(role)}
      </h1>
      <ActiveChannels />
      <UpcomingChannels />
      <ChannelList />
      <ProgramList />
    </div>
  );
}
