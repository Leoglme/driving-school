import axios from "axios";
import { api_url } from "@/Api/index";
import type { CreateUserCommand, UserCommand } from "@/types/user";


export const getUser = async (id: string) => {
    const res = await axios.get(`${api_url}/user/${id}`)
    return res.data;
}

export const getUsers = async (search: string | undefined, limit: number | undefined) => {
    if (search){
        search = search.trim()
    }
    const options = {
        params: { search, limit }
    }
    const res = await axios.get(`${api_url}/users`, options)
    return res.data;
}
export const getStudents = async (search: string | undefined, page: number | undefined) => {
    if (search){
        search = search.trim()
    }
    const options = {
        params: {
            search, page
        }
    }
    const res = await axios.get(`${api_url}/students`, options)
    return res.data;
}
export const getEmployees = async (search: string | undefined, page: number | undefined) => {
    if (search){
        search = search.trim()
    }
    const options = {
        params: {
            search, page
        }
    }
    const res = await axios.get(`${api_url}/employees`, options)
    return res.data;
}

export const deleteUsers = async (userId: number) => {
    return await axios.delete(`${api_url}/user/${userId}`);
}

export const updateUser = async (userId: number, command: UserCommand) => {
    return await axios.put(`${api_url}/user/${userId}`, command);
}
export const createUser = async (command: CreateUserCommand) => {
    return await axios.post(`${api_url}/user`, command);
}
