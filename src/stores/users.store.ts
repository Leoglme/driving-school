import { defineStore } from 'pinia'
import type { User } from '@/types/user'
import { getUsers } from '@/Api/users'

export const useUsersStore = defineStore('users', {
  state: () => ({
    list: [] as User[],
    loaded: false,
    /** Shared promise while a fetch is in flight to avoid duplicate GET /users */
    _fetchPromise: null as Promise<User[]> | null,
  }),
  actions: {
    async fetchUsers(): Promise<User[]> {
      if (this.loaded) {
        return this.list
      }
      if (this._fetchPromise) {
        return this._fetchPromise
      }
      this._fetchPromise = getUsers()
      try {
        const users = await this._fetchPromise
        this.list = users
        this.loaded = true
        return users
      } finally {
        this._fetchPromise = null
      }
    },
  },
  getters: {
    users: (state) => state.list,
  },
})
