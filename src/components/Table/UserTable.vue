<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-sm rounded bg-white">
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg text-blueGray-700">
            Étudiants
          </h3>
        </div>
      </div>
    </div>
    <div class="block w-full overflow-x-auto">
      <!-- Projects table -->
      <table class="items-center w-full bg-transparent border-collapse">
        <thead>
        <tr>
          <th v-for="field in fields" :key="field"
              class="bg-blueGray-50 text-blueGray-500 border-blueGray-100 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0
          border-r-0 whitespace-nowrap font-semibold text-left">
            {{ field }}
          </th>
          <th class="bg-blueGray-50 text-blueGray-500 border-blueGray-100 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
          />
        </tr>
        </thead>
        <tbody>

        <tr v-for="user in users" :id="user.id" v-if="users.length">
          <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2 text-left flex items-center">
            <img
                :src="user.avatar"
                class="h-10 w-10 bg-white rounded-full border"
                :alt="user.first_name + ' ' + user.last_name"
            />
            <span class="text-blueGray-600 ml-3 font-bold">
              <router-link class="link" :to="{ name: 'user-profile', params: { userId: user.id }}">
                {{ user.first_name }} {{ user.last_name }}
              </router-link>
              </span>
          </th>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2">
            {{ user.email }}
          </td>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2">
            {{ user.role }}
          </td>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2">
            {{ user.created_at }}
          </td>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2">
            <div class="flex items-center">
              <span class="mr-2">60%</span>
              <div class="relative w-full">
                <div class="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                  <div style="width: 60%;"
                       class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                  />
                </div>
              </div>
            </div>
          </td>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2 text-right">
            <button @click="onDelete(user)"
                    class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button">
              <i class="fa-regular fa-trash-can text-sm"></i>
            </button>
          </td>
        </tr>
        <tr v-else>
          <td class="p-4" colspan="100%">
            <NoResult class="ml-auto mr-auto"/>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts" setup>
import type { User } from "@/types/user";
import NoResult from "@/components/State/NoResult.vue"

interface Props {
  users: User[]
}

import { defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'delete', user: User): void
}>()

const onDelete = (user: User) => emit('delete', user)



const fields = ['Nom', 'email', 'role', 'Date création', 'Heures']
const { users } = defineProps<Props>()

</script>
