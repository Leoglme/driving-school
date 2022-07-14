<template>
  <div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
    <div class="px-6">
      <div class="flex flex-wrap justify-center">
        <div class="w-full px-4 flex justify-center">
          <div class="relative">
            <img
                :alt="fullName"
                :src="user.avatar"
                class="bg-white shadow-md rounded-full h-auto align-middle border-none absolute -m-8 max-w-150-px"
            />
          </div>
        </div>
        <div class="w-full px-4 text-center mt-20">
          <div class="flex justify-center py-4 lg:pt-4 pt-8">
            <div class="mr-4 p-3 text-center">
              <span class="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                22
              </span>
              <span class="text-sm text-blueGray-400">Friends</span>
            </div>
            <div class="mr-4 p-3 text-center">
              <span
                  class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
              >
                10
              </span>
              <span class="text-sm text-blueGray-400">Photos</span>
            </div>
            <div class="lg:mr-4 p-3 text-center">
              <span
                  class="text-xl font-bold block uppercase tracking-wide text-blueGray-600"
              >
                89
              </span>
              <span class="text-sm text-blueGray-400">Comments</span>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center mt-4">
        <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
          {{ fullName }}
        </h3>

        <div class="flex items-center justify-center mb-2 mt-2">
          <a class="link" :href="`mailto:${ user.email}`">
            {{ user.email }}
          </a>
        </div>
        <div class="mb-2 text-blueGray-600 mt-2">
          {{ user.role }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { User } from "@/types/user";
import { computed } from "vue";

interface Props {
  user: User
}

const { user } = defineProps<Props>()
const fullName = computed(() => user.first_name + " " + user.last_name)
</script>
