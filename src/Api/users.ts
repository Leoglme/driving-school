import axios from "axios";
import { api_url } from "@/Api/index";

const getUsers = async () => {
    const res = await axios.get(`${api_url}/users`)
    return res.data;
}

export { getUsers }
