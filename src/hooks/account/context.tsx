import { createContext } from "react";

export type ROLE_MODERATOR = "moderator";
export type ROLE_USER = "user";
export type Role = ROLE_MODERATOR | ROLE_USER;

export interface AccountModel {
  username: string;
  role: Role;
  color: string;
  changeName: (name: string) => void;
  changeRole: (role: string) => void;
  subscribe: (channelId: string) => void;
  unsubscribe: (channelId: string) => void;
  hasSubscription: (channelId: string) => boolean;
}

const AccountContext = createContext<AccountModel>({
  username: "USERNAME",
  role: "user",
  color: "red",
  changeName: () => undefined,
  changeRole: () => undefined,
  subscribe: () => undefined,
  unsubscribe: () => undefined,
  hasSubscription: () => false,
});

export default AccountContext;
