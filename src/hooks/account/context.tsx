import { createContext } from "react";

export type ROLE_MODERATOR = "moderator";
export type ROLE_USER = "user";
export type Role = ROLE_MODERATOR | ROLE_USER;

export interface AccountModel {
  username: string;
  role: Role;
  changeName: (name: string) => void;
  changeRole: (role: string) => void;
}

const AccountContext = createContext<AccountModel>({
  username: "USERNAME",
  role: "user",
  changeName: () => undefined,
  changeRole: () => undefined,
});

export default AccountContext;
