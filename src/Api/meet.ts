import axios from "axios";
import { api_url } from "@/Api/index";
import type { CreateMeetCommand } from "@/types/meet";

/*CREATE*/
export const createMeet = async (command: CreateMeetCommand) => {
    return await axios.post(`${api_url}/meet`, command);
}

/*GET*/
export const getMeetByUserId = async (userId: number) => {
    const res = await axios.get(`${api_url}/meet/${userId}`)
    return res.data;
}

export const getMeets = async (user_id: number | undefined) => {
    const options = {
        params: {
            user_id
        }
    }
    const res = await axios.get(`${api_url}/meets`, options)
    return res.data;
}

/*UPDATE*/
export const updateMeet = async (meetId: number, command: CreateMeetCommand) => {
    return await axios.put(`${api_url}/meet/${meetId}`, command);
}

/*DELETE*/
export const deleteMeet = async (meetId: number) => {
    return await axios.delete(`${api_url}/meet/${meetId}`);
}
