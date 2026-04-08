import type {FC} from "react";
import styles from "./styles.module.css";
import useAccount from "~/hooks/account";

const Account: FC = () => {
    const {username, role} = useAccount();
    return (
        <div>
            <dl className={styles.accountList}>
                <dt>Brukernavn</dt>
                <dd>{username}</dd>
                <dt>Rolle</dt>
                <dd>{role}</dd>
            </dl>
        </div>
    )
}

export default Account;