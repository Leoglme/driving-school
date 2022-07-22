import type { Role } from "@/types/referenciel";
import type { DrivingTime } from "@/types/driving-time";

export type User = {
    id: number,
    role: Role,
    driving_time: DrivingTime
    first_name: string,
    last_name: string,
    created_at: string,
    email: string,
    avatar: string
}
export type UserCommand = {
    role_id: number,
    first_name: string,
    hours_remaining: number,
    last_name: string,
    email: string
}

export type CreateUserCommand = UserCommand & {
    password: string,
}
