import type { ReactNode } from "react";
import useAccount from "~/hooks/account";

interface Props {
  children: ReactNode;
  roles: string[];
}

export default function RoleRestricted({ children, roles }: Props) {
  const { role } = useAccount();
  if (!roles.includes(role)) return null;
  return children;
}
