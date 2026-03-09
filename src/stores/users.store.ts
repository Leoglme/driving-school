import { defineStore } from 'pinia'
import type { User } from '@/types/user'
import { getUsers } from '@/Api/users'

export const useUsersStore = defineStore('users', {
  state: () => ({
    list: [] as User[],
    loaded: false,
  }),
  actions: {
    async fetchUsers(): Promise<User[]> {
      if (this.loaded) return this.list
      const users = await getUsers()
      this.list = users
      this.loaded = true
      return users
    },
  },
  getters: {
    users: (state) => state.list,
  },
})
