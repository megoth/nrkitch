import { type ReactNode } from "react";
import AccountContext, { type Role } from "./context";
import { useLocalStorage } from "@uidotdev/usehooks";

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

export default function AccountProvider({ children }: Props) {
  const [username, setUsername] = useLocalStorage("username", randomName);
  const [role, setRole] = useLocalStorage("role", "user");

  return (
    <AccountContext.Provider
      value={{
        username,
        role: role as Role,
        changeName: setUsername,
        changeRole: setRole,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
}
