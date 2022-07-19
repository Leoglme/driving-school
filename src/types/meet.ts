import type { User } from "@/types/user";

export type CreateMeetCommand = {
    title: string,
    chef: number,
    user: number,
    start: string,
    end: string,
    allDay: boolean
}

export type Meet = {
    id: number,
    title: string,
    chef: User,
    user: User,
    start: Date,
    end: Date,
    allDay: boolean
}
