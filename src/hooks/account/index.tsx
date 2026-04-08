import { useContext } from "react";
import AccountContext from "./context";

export function prettifyRole(role: string): string {
  switch (role) {
    case "moderator":
      return "Moderator";
    case "user":
      return "Bruker";
    default:
      throw new Error("Invalid role");
  }
}

export default function useAccount() {
  return useContext(AccountContext);
}
