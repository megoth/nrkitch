import { useEffect, useState } from "react";
import type { Channel, ChatSocketMessage } from "~/types.ts";
import useSocket from "~/hooks/socket";

interface Props {
  channel: Channel;
}

const FAKE_NAMES = [
  "Arne",
  "Ole",
  "Mark",
  "Bjarne",
  "Ryan",
  "Ali",
  "Hilde",
  "Jan",
  "Kristin",
  "Line",
];

const FAKE_MESSAGES = [
  "SKRIV 1 HVIS DERE LIKER PIZZA!!!🍕🍕🍕",
  "Kan jeg bli mod?? pleeeeease i 😀",
  "hei😀",
  "hallo",
  "halla",
  "Lul han døde!!!!😏",
  "HEI PØLSESPILLEREN KAN DU SI NAVNET MITT??????",
  "111111111",
  "1 PEDER_GAMING HVORFOR SPISER DU IKKE MER😌",
  "Sies mye rart her",
  "Lol😂",
  "ROFL😂",
  "ROFLMAO😆",
];

function fakeIt(list: string[]): string {
  return list[Math.floor(Math.random() * list.length)];
}

function fakeMessage(channel: Channel): ChatSocketMessage {
  return {
    channelId: channel.id,
    author: fakeIt(FAKE_NAMES),
    body: fakeIt(FAKE_MESSAGES),
  };
}

export default function ChatFaker({ channel }: Props) {
  const [isOn, setIsOn] = useState(false);
  const { emit } = useSocket();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isOn) return;
      emit("message", fakeMessage(channel));
    }, 1500);
    return () => clearInterval(intervalId);
  }, [channel, emit, isOn]);

  return channel.mode === "in-progress" && (
    <div className="field has-addons">
      <p className="control">
        <button
          className="button is-small"
          type="button"
          onClick={() => setIsOn((prev) => !prev)}
        >
          {isOn ? "Skru av fake chat" : "Skru på fake chat"}
        </button>
      </p>
    </div>
  );
}
