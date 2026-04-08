import {useContext} from "react";
import AccountContext from "./context";

export default function useAccount() {
    return useContext(AccountContext);
}