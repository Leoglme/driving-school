<template>
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
    <div class="px-6">
      <div class="flex flex-wrap justify-center mb-20">
        <div class="w-full px-4 flex justify-center">
          <div class="relative">
            <img
                :alt="fullName"
                :src="user.avatar"
                class="bg-white shadow-md rounded-full h-auto align-middle border-none absolute -m-8 max-w-150-px"
            />
          </div>
        </div>
      </div>



      <div class="px-4 flex flex-col items-center" v-if="showProgress">
        <span class="mb-2">Heures de conduite</span>
        <div class="flex items-center w-full">
          <span class="mr-2 text-sm">{{ user.driving_time.hours_done }} / {{ user.driving_time.hours_total }}</span>
          <ProgressBar class="flex-1" :percentage="percentage"/>
        </div>

      </div>

      <div class="text-center mt-4">
        <h3 class="text-xl font-semibold leading-normal mb-2 text-slate-700">
          {{ fullName }}
        </h3>

        <div class="flex items-center justify-center mb-2 mt-2">
          <a class="link" :href="`mailto:${ user.email}`">
            {{ user.email }}
          </a>
        </div>
        <div class="mb-4 text-slate-600 mt-4">
          <BadgeRole :role="user.role"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User } from "@/types/user";
import { computed } from "vue";
import ProgressBar from "@/components/Feedback/ProgressBar.vue"
import BadgeRole from "@/components/Common/BadgeRole.vue"

interface Props {
  user: User,
  percentage: number
}

const { user, percentage } = defineProps<Props>()
const showProgress = user.role && user.role.name === "Student"
const fullName = computed(() => user.first_name + " " + user.last_name)


</script>
