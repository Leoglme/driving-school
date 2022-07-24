<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-sm rounded bg-white">
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-lg text-blueGray-700">
            {{ title }}
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
          <th class="bg-blueGray-50 text-blueGray-500 border-blueGray-100 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0
          border-r-0 whitespace-nowrap font-semibold text-left" v-if="!hideHour">
            Heures
          </th>
          <th v-if="authorize" class="bg-blueGray-50 text-blueGray-500 border-blueGray-100 px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
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
            <BadgeRole :role="user.role"/>
          </td>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2">
            {{ format(new Date(user.created_at), 'dd/MM/yyyy - HH:mm') }}
          </td>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2"
              v-if="!hideHour && user.driving_time">
            <div class="flex items-center">
              <span class="mr-2">{{ user.driving_time.hours_done }} / {{ user.driving_time.hours_total }}</span>
              <ProgressBar :percentage="drivingTimePercentage(user.driving_time)"/>
            </div>

          </td>
          <td v-if="user.id !== currentUser.id && authorize" class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap py-2 text-right">
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
import { format } from 'date-fns'
import type { User } from "@/types/user";
import NoResult from "@/components/State/NoResult.vue"
import BadgeRole from "@/components/Common/BadgeRole.vue"
import ProgressBar from "@/components/Feedback/ProgressBar.vue"
import { defineEmits, ref } from 'vue'
import type { DrivingTime } from "@/types/driving-time";
import { useAuthStore } from "@/stores/auth.store";

/*Types*/
interface Props {
  users: User[]
  hideHour: boolean
  title: string
}

/*Store*/
const auth = useAuthStore()

/*Refs*/
const currentUser = ref(auth.user || {})
const authorize = currentUser.value.role?.name === 'Secretary' || currentUser.value.role?.name === 'Admin'
/*Emits*/
const emit = defineEmits<{
  (e: 'delete', user: User): void
}>()

/*Api methods*/
const onDelete = (user: User) => emit('delete', user)


/*Data*/
const fields = ['Nom', 'email', 'role', 'Date création']

/*Props*/
const { users, hideHour, title } = defineProps<Props>()

/*Methods*/
const percentage = (partialValue: number, totalValue: number): number => {
  return ((100 * partialValue) / totalValue) || 0;
}

const drivingTimePercentage = (driving_time: DrivingTime): number => {
  const hours_done = driving_time.hours_done;
  const hours_total = driving_time.hours_total;

  return percentage(hours_done, hours_total)
}
</script>
