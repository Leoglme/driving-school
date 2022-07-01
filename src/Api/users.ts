import axios from "axios";
import { api_url } from "@/Api/index";

const getUsers = async () => {
    const res = await axios.get(`${api_url}/users`)
    return res.data;
}

const deleteUsers = async (userId: number) => {
    return await axios.delete(`${api_url}/user/${userId}`);
}

export { getUsers, deleteUsers }
