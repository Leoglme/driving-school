import { defineStore } from 'pinia';
import type { User } from "@/types/user";
import { router } from "@/router";
import axios from "axios";

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
            axios.defaults.headers.common['Authorization'] = token;
            localStorage.setItem('token', JSON.stringify(token));
        },
        async logout() {
            this.user = null;
            await localStorage.removeItem('user');
            await localStorage.removeItem('token');
            delete axios.defaults.headers.common["Authorization"];
            await router.push('/login');
        }
    }
});
