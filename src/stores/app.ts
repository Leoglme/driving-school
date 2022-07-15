import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
    state: () => {
        return {
            pending: false
        }
    },
    actions: {
        setPending(val: boolean) {
            this.pending = val;
        },
    },
})
