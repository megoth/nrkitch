import useSocket from "./hooks/socket";
import {useEffect} from "react";

export default function App() {
    const {emit} = useSocket();

    useEffect(() => {
        emit("event");
    }, [emit]);

    return (
        <>
            <h1>Hei Verden!</h1>
        </>
    )
}

