import { type ReactNode, useCallback, useEffect } from "react";
import AccountContext, { type Role } from "./context";
import { useLocalStorage } from "@uidotdev/usehooks";
import useSocket from "~/hooks/socket";
import type { ChannelModeSocketMessage, UserSocketMessage } from "~/types.ts";
import useData from "~/hooks/data";

interface Props {
  children: ReactNode;
}

const randomNames = [
  "Liam",
  "Noah",
  "Oliver",
  "James",
  "Elijah",
  "William",
  "Henry",
  "Lucas",
  "Benjamin",
  "Theodore",
  "Mateo",
  "Levi",
  "Sebastian",
  "Daniel",
  "Jack",
  "Wyatt",
  "Alexander",
  "Owen",
  "Asher",
  "Samuel",
  "Ethan",
  "Leo",
  "Jackson",
  "Mason",
  "Ezra",
  "John",
  "Hudson",
  "Luca",
  "Aiden",
  "Maverick",
  "Josiah",
  "Christopher",
  "Gabriel",
  "Julian",
  "Isaac",
  "Anthony",
  "Grayson",
  "Lincoln",
  "Santiago",
  "Waylon",
  "Olivia",
  "Emma",
  "Charlotte",
  "Amelia",
  "Sophia",
  "Mia",
  "Isabella",
  "Ava",
  "Evelyn",
  "Luna",
  "Harper",
  "Sofia",
  "Scarlett",
  "Eleanor",
  "Hazel",
  "Maya",
  "Lily",
  "Aurora",
  "Penelope",
  "Elena",
  "Aria",
  "Ellie",
  "Mila",
  "Aspen",
  "Nora",
  "Layla",
  "Elizabeth",
  "Avery",
  "Abigail",
  "Ella",
  "Iris",
  "Grace",
  "Chloe",
  "Willow",
  "Ivy",
  "Madison",
  "Eliana",
  "Violet",
  "Alice",
  "Emilia",
  "Arlo",
  "Brooks",
  "Caleb",
  "Declan",
  "Enzo",
  "Finn",
  "Gael",
  "Hugo",
  "Ivan",
  "Jude",
  "Kai",
  "Leon",
  "Miles",
  "Nico",
  "Otto",
  "Paker",
  "Quinn",
  "Roman",
  "Silas",
  "Zion",
];

const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];

const randomColors = ["red", "blue", "green", "yellow", "purple", "orange"];

const randomColor =
  randomColors[Math.floor(Math.random() * randomColors.length)];

export default function AccountProvider({ children }: Props) {
  const [username, setUsername] = useLocalStorage("username", randomName);
  const [role, setRole] = useLocalStorage("role", "user");
  const [color] = useLocalStorage("color", randomColor);
  const [subs, setSubs] = useLocalStorage<string[]>("subscriptions", []);
  const { emit, on } = useSocket();
  const { getChannel, getProgram } = useData();

  useEffect(() => {
    emit("user-settings", { username, color } satisfies UserSocketMessage);
  }, [emit, username, color]);

  useEffect(() => {
    if (subs.length === 0) return;

    on("changed-mode", (data) => {
      const { channelId, mode } = data as ChannelModeSocketMessage;
      if (mode === "in-progress" && subs.includes(channelId)) {
        console.log("Sending notification");
        const notification = new Notification("Chat er i gang", {
          body: `Chat har startet for ${getProgram(getChannel(channelId)!.programId)!.name}`,
        });

        notification.onclick = () => {
          window.focus();
          notification.close();
        };
      }
    });
  }, [getChannel, getProgram, on, subs]);

  const subscribe = useCallback(
    (channelId: string) => {
      if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
      } else if (Notification.permission === "granted") {
        setSubs((prev) => [...prev, channelId]);
      } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(() =>
          setSubs((prev) => [...prev, channelId]),
        );
      } else {
        setSubs((prev) => [...prev, channelId]);
      }
    },
    [setSubs],
  );

  const hasSubscription = useCallback(
    (channelId: string) => subs.includes(channelId),
    [subs],
  );

  const unsubscribe = useCallback(
    (channelId: string) =>
      setSubs((prev) => prev.filter((id) => id !== channelId)),
    [setSubs],
  );

  return (
    <AccountContext.Provider
      value={{
        username,
        role: role as Role,
        color,
        changeName: setUsername,
        changeRole: setRole,
        subscribe,
        unsubscribe,
        hasSubscription,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
