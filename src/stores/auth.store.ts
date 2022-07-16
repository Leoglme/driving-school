import { defineStore } from 'pinia';
import type { User } from "@/types/user";
import { router } from "@/router";

const userInLocalStorage = localStorage.getItem('user')
const tokenInLocalStorage = localStorage.getItem('token')

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        user: userInLocalStorage ? JSON.parse(userInLocalStorage) : undefined as (User | undefined),
        token: tokenInLocalStorage ? JSON.parse(tokenInLocalStorage) : undefined as (string | undefined)
    }),
    actions: {
        setUser(user: User) {
            this.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },
        setToken(token: string) {
            this.token = token;
            localStorage.setItem('token', JSON.stringify(token));
        },
        async logout() {
            this.user = null;
            localStorage.removeItem('user');
            await router.push('/login');
        }
    }
});
