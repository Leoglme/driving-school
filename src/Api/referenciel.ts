import axios from "axios";
import { api_url } from "@/Api/index";


export const getRoles = async () => {
    const res = await axios.get(`${api_url}/roles`)
    return res.data;
}
