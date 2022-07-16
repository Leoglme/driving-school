import { defineStore } from 'pinia';
import type { User } from "@/types/user";
import { router } from "@/router";

const userInLocalStorage = localStorage.getItem('user')

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: userInLocalStorage ? JSON.parse(userInLocalStorage) : undefined as (User | undefined),
        token: undefined as (string | undefined)
    }),
    actions: {
        setUser(user: User) {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        setToken(token: string) {
            this.token = token;
        },
        async logout() {
            this.user = null;
            localStorage.removeItem('user');
            await router.push('/login');
        }
    }
});
