import type { Channel, Program } from "~/types.ts";

interface Props {
  channel: Channel;
  program: Program;
}

export default function ChatMedia({ channel, program }: Props) {
  return (
    <>
      {channel.mode === "in-progress" && (
        <video controls width="100%" autoPlay loop>
          <source src="/Flippklipp.mp4" type="video/mp4" />
        </video>
      )}
      {channel.mode !== "in-progress" && (
        <img src={program.imgUrl} alt={`Skjermbilde for ${program.name}`} />
      )}
    </>
  );
}
