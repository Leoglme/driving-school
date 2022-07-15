<template>
    <main class="p-4 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <router-view v-if="!pending"/>
      <Spinner v-else/>
    </main>
</template>

<script setup lang="ts">
import Spinner from "@/components/Common/Spinner.vue"
import { useProgress } from "@marcoschulte/vue3-progress";
import { toRefs } from "vue";
import type { ProgressFinisher } from '@marcoschulte/vue3-progress';
import axios from "axios";
import { useAppStore } from "@/stores/app";

const app = useAppStore()

const { pending } = toRefs(app.$state);
const { setPending } = app;


/*Axios scope response and request
* global loading and progress bar
* */
const progresses = [] as ProgressFinisher[];

axios.interceptors.request.use(config => {
  progresses.push(useProgress().start());
  return config;
});

axios.interceptors.response.use(resp => {
  progresses.pop()?.finish();
  setPending(false)
  return resp;
}, (error) => {
  progresses.pop()?.finish();
  setPending(false)
  return Promise.reject(error);
});

</script>
