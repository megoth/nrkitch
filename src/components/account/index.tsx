import { type FC } from "react";
import styles from "./styles.module.css";
import useAccount from "~/hooks/account";
import RoleToggler from "~/components/role-toggler";
import ColorSelect from "~/components/color-select";
import NameSelect from "~/components/name-select";

const Account: FC = () => {
  const { color, username } = useAccount();

  return (
    <div>
      <dl className={styles.accountList}>
        <dt>Brukernavn</dt>
        <dd>
          <span>{username}</span>
          <NameSelect />
        </dd>
        <dt>Farge</dt>
        <dd>
          <span style={{ color }}>{color}</span>
          <ColorSelect />
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
