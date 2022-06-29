<template>
  <nav class="TOTO md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap
  md:overflow-hidden shadow-md bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-2 px-4">
    <div
        class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
      <!-- Toggler -->
      <button
          class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
          type="button"
          v-on:click="toggleCollapseShow('bg-white m-2 py-3 px-6')"
      >
        <i class="fas fa-bars"></i>
      </button>
      <!-- Brand -->
      <router-link
          class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
          to="/"
      >
        Driving school
      </router-link>
      <!-- User -->
      <ul class="md:hidden items-center flex flex-wrap list-none">
        <li class="inline-block relative">
          <user-dropdown/>
        </li>
      </ul>
      <!-- Collapse -->
      <div
          class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
          v-bind:class="collapseShow">
        <!-- Collapse header -->
        <div
            class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200"
        >
          <div class="flex flex-wrap">
            <div class="w-6/12">
              <router-link
                  class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
                  to="/">
                Driving school
              </router-link>
            </div>
            <div class="w-6/12 flex justify-end">
              <button
                  type="button"
                  class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                  v-on:click="toggleCollapseShow('hidden')">
                <i class="fas fa-times"/>
              </button>
            </div>
          </div>
        </div>

        <!-- Divider -->
        <hr class="my-4 md:min-w-full"/>
        <!-- Navigation -->

        <ul class="md:flex-col md:min-w-full flex flex-col list-none">
          <li class="items-center" v-for="link in links" :key="link.text">
            <router-link :to="link.to" v-slot="{ href, navigate, isExactActive }">
              <a :href="href"
                  @click="navigate"
                  class="text-xs uppercase py-3 font-bold block"
                  :class="[
                  isExactActive
                    ? 'text-emerald-500 hover:text-emerald-600'
                    : 'text-blueGray-700 hover:text-blueGray-500',
                ]">
                <i class="mr-2 text-sm"
                   :class="[isExactActive ? 'opacity-75' : 'text-blueGray-300', link.icon]"
                ></i>
                {{ link.text }}
              </a>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
); }

<script lang="ts" setup>
import UserDropdown from "@/components/Menu/UserDropdown/index.vue";
import { ref } from "vue";

const links = [
  {
    'text': 'Planning',
    'icon': 'fa-regular fa-calendar',
    'to': '/'
  },
  {
    'text': 'Étudiants',
    'icon': 'fa-solid fa-user-graduate',
    'to': '/students'
  },
  {
    'text': 'Employés',
    'icon': 'fa-solid fa-user-tie',
    'to': '/employees'
  },
  {
    'text': 'Profile',
    'icon': 'fas fa-user',
    'to': '/profile'
  }
]

const collapseShow = ref('hidden')
const toggleCollapseShow = ((classes: string) => collapseShow.value = classes)
</script>
