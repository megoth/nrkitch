import type { Channel } from "~/types.ts";
import { useCallback } from "react";
import useSocket from "~/hooks/socket";

interface Props {
  channel: Channel;
}

export default function ClearLogButton({ channel }: Props) {
  const { emit } = useSocket();

  const onReset = useCallback(() => {
    emit("reset", { channelId: channel?.id });
  }, [emit, channel]);

  return (
    <div className="field has-addons">
      <div className="control">
        <button
          className="button is-danger is-small"
          onClick={onReset}
          type="button"
        >
          Reset chat
        </button>
      </div>
    </div>
  );
}
