import axios from "axios";
import { api_url } from "@/Api/index";
import type { UserCommand } from "@/types/user";


export const getUser = async (id: string) => {
    const res = await axios.get(`${api_url}/user/${id}`)
    return res.data;
}

export const getUsers = async () => {
    const res = await axios.get(`${api_url}/users`)
    return res.data;
}

export const deleteUsers = async (userId: number) => {
    return await axios.delete(`${api_url}/user/${userId}`);
}

export const updateUsers = async (userId: number, command: UserCommand) => {
    return await axios.put(`${api_url}/user/${userId}`, command);
}
