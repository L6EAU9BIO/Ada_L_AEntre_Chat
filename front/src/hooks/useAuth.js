import { useContext } from "react";
import { AuthContext } from "../state/AuthContext.js";


export function useAuth() {
    return useContext(AuthContext)
}