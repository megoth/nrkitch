import useSocket from "~/hooks/socket";
import { useEffect } from "react";
import useAccount, { prettifyRole } from "~/hooks/account";

export default function App() {
  const { emit } = useSocket();
  const { role, username } = useAccount();

  useEffect(() => {
    emit("event");
  }, [emit]);

  return (
    <>
      <h1>
        Hei {username}, du er {prettifyRole(role)} ^_^
      </h1>
    </>
  );
}
