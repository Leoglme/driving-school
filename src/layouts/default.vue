<template>
  <Sidebar/>
  <div class="relative md:ml-64 bg-blueGray-100 min-h-screen">
    <Navbar/>
    <main class="p-4">
      <router-view v-if="!pending"/>
      <Spinner v-else/>
    </main>
  </div>
</template>


<script setup lang="ts">
import Sidebar from "@/components/Navigation/SideBar/index.vue"
import Spinner from "@/components/Common/Spinner.vue"
import Navbar from "@/components/Navigation/Navbar/index.vue"
import { useProgress } from "@marcoschulte/vue3-progress";
import { getRoles } from "@/Api/referenciel";
import { toRefs } from "vue";
import type { ProgressFinisher } from '@marcoschulte/vue3-progress';
import axios from "axios";
import { useAppStore } from "@/stores/app";
import { useReferencielStore } from "@/stores/referenciel";

const app = useAppStore()
const { setRoles} = useReferencielStore()

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


/*Appel api*/
getRoles().then(res => {
  setRoles(res)
})
</script>
