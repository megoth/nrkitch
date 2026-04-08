import {useContext} from "react";
import SocketContext from "./context";

export default function useSocket() {
    return useContext(SocketContext);
}