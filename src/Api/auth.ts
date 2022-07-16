import axios from "axios";
import { api_url } from "@/Api/index";
import type { ForgotPasswordCommand, LoginCommand, ResetPasswordCommand } from "@/types/auth";

export const login = async (command: LoginCommand) => {
    return await axios.post(`${api_url}/login`, command);
}
export const forgotPassword = async (command: ForgotPasswordCommand) => {
    return await axios.post(`${api_url}/forgot-password`, command);
}
export const resetPassword = async (token: string, command: ResetPasswordCommand) => {
    return await axios.post(`${api_url}/reset-password/${token}`, command);
}
