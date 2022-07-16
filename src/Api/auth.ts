import axios from "axios";
import { api_url } from "@/Api/index";
import type { LoginCommand } from "@/types/auth";

export const login = async (command: LoginCommand) => {
    return await axios.post(`${api_url}/login`, command);
}
