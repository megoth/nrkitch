import type { Channel, Program } from "~/types.ts";
import ProgramMedia from "~/components/program-media";
import type { ReactNode } from "react";

interface Props {
  channel: Channel;
  program: Program;
  children?: ReactNode;
}

export default function ChatMedia({ children, channel, program }: Props) {
  return (
    <>
      {channel.mode === "in-progress" && (
        <video controls width="100%" autoPlay loop>
          <source src="/Flippklipp.mp4" type="video/mp4" />
        </video>
      )}
      {channel.mode !== "in-progress" && (
        <ProgramMedia program={program}>{children}</ProgramMedia>
      )}
    </>
  );
}
