import { type FC, useCallback } from "react";
import styles from "./styles.module.css";
import useAccount from "~/hooks/account";
import RoleToggler from "~/components/role-toggler";

const Account: FC = () => {
  const { username, changeName } = useAccount();

  const onChangeName = useCallback(() => {
    const newUsername = prompt("Brukernavn", username);
    if (!newUsername) return;
    changeName(newUsername);
  }, [username, changeName]);

  return (
    <div>
      <dl className={styles.accountList}>
        <dt>Brukernavn</dt>
        <dd>
          <span>{username}</span>
          <button
            className="button is-small"
            type="button"
            onClick={onChangeName}
          >
            Endre
          </button>
        </dd>
        <dt>Rolle</dt>
        <dd>
          <RoleToggler />
        </dd>
      </dl>
    </div>
  );
};

export default Account;
