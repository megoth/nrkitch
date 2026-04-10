import { type FC, useCallback } from "react";
import useAccount from "~/hooks/account";

const NameSelect: FC = () => {
  const { username, changeName } = useAccount();

  const onChangeName = useCallback(() => {
    const newUsername = prompt("Brukernavn", username);
    if (!newUsername) return;
    changeName(newUsername);
  }, [username, changeName]);

  return (
    <button className="button is-small" type="button" onClick={onChangeName}>
      Endre navn
    </button>
  );
};

export default NameSelect;
