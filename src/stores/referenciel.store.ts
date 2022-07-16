import { defineStore } from 'pinia'
import type { Role } from "@/types/referenciel";

export const useReferencielStore = defineStore('referenciel', {
    state: () => {
        return {
            roles: [] as Role[]
        }
    },
    actions: {
        setRoles(roles: Role[]) {
            this.roles = roles;
        },
    },
})
