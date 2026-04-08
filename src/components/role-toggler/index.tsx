import type { FC } from "react";
import useAccount, { prettifyRole } from "~/hooks/account";
import { clsx } from "clsx";

const RoleToggler: FC = () => {
  const { role: userRole, changeRole } = useAccount();

  return (
    <div className="field has-addons">
      {["moderator", "user"].map((role) => (
        <p className="control">
          <button
            className={clsx("button is-small", {
              "is-primary": role === userRole,
            })}
            type="button"
            onClick={() => changeRole(role)}
          >
            {prettifyRole(role)}
          </button>
        </p>
      ))}
    </div>
  );
};

export default RoleToggler;
