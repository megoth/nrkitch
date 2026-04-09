import { type FC, useCallback } from "react";
import { clsx } from "clsx";
import { prettifyChannelMode } from "~/utils.ts";
import type { Channel } from "~/types.ts";
import useSocket from "~/hooks/socket";

interface Props {
  channel: Channel;
}

const ModeToggler: FC<Props> = ({ channel }) => {
  const { emit } = useSocket();

  const changeMode = useCallback(
    (mode: string) => {
      emit("change-mode", {
        channelId: channel.id,
        mode,
      });
    },
    [channel, emit],
  );

  return (
    <div className="field has-addons">
      {["upcoming", "in-progress", "closed"].map((mode) => (
        <p className="control" key={mode}>
          <button
            className={clsx("button is-small", {
              "is-primary": mode === channel.mode,
            })}
            type="button"
            onClick={() => changeMode(mode)}
          >
            {prettifyChannelMode(mode)}
          </button>
        </p>
      ))}
    </div>
  );
};

export default ModeToggler;
