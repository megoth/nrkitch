import useSocket from "~/hooks/socket";
import {useEffect} from "react";
import useAccount from "~/hooks/account";

export default function App() {
    const {emit} = useSocket();
    const {username} = useAccount();

    useEffect(() => {
        emit("event");
    }, [emit]);

    return (
        <>
            <h1>Hei {username}!</h1>
        </>
    )
}

