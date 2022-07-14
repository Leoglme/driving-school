import type { Role } from "@/types/referenciel";

export type User = {
    id: number,
    role: Role,
    first_name: string,
    last_name: string,
    created_at: string,
    email: string,
    avatar: string
}
export type UserCommand = {
    role_id: number,
    first_name: string,
    last_name: string,
    email: string
}

export type CreateUserCommand = UserCommand & {
    password: string,
}
