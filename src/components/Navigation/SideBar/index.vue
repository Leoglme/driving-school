<template>
  <nav class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap
  md:overflow-hidden shadow-md bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-2 px-4">
    <div
        class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
      <!-- Toggler -->
      <button
          class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
          type="button"
          v-on:click="toggleCollapseShow('bg-white py-3 px-6')"
      >
        <i class="fas fa-bars"></i>
      </button>
      <!-- Brand -->
      <router-link
          class="flex text-center
          items-center md:pb-2 text-blueGray-600 mr-0 whitespace-nowrap text-sm uppercase font-bold p-4 px-0"
          to="/">
        <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 280.000000 280.000000" preserveAspectRatio="xMidYMid meet">

          <g class="fill-indigo-600" transform="translate(0.000000,280.000000) scale(0.100000,-0.100000)" stroke="none">
            <path d="M1055 2369 c-303 -32 -622 -199 -826 -432 -99 -113 -203 -260 -192 -271 4 -3 50 -6 104 -6 l97 0 65 83 c179 229 421 381 687 431 119 23 323 21 454 -4 243 -47 493 -161 701 -318 131 -99 132 -100 115 -106 -8 -3 -34 -12 -58 -20 -96 -34 -173 -107 -232 -223 l-35 -68 -389 -3 c-274 -1 -393 1 -402 9 -7 6 -25 36 -39 67 -51 110 -138 189 -254 227 -40 13 -75 16 -145 13 -115 -5 -186 -37 -267 -117 -201 -202 -147 -532 109 -658 73 -37 80 -38 181 -38 99 0 111 2 174 32 90 43 164 119 203 207 19 44 36 68 49 72 11 2 191 3 400 2 l380 -3 35 -68 c19 -38 50 -86 68 -108 114 -134 321 -178 485 -102 124 58 208 172 238 320 11 55 11 69 -10 145 -29 110 -67 171 -184 293 -188 198 -386 344 -628 464 -307 152 -593 211 -884 180z m-203 -835 c23 -16 56 -49 73 -73 27 -39 30 -50 30 -121 0 -71 -3 -82 -30 -121 -86 -122 -243 -145 -347 -51 -99 89 -106 235 -15 331 50 53 101 72 179 69 55 -3 75 -9 110 -34z m1594 17 c51 -23 111 -93 125 -145 60 -221 -205 -390 -373 -238 -159 143 -61 402 152 402 32 0 72 -8 96 -19z"/>
            <path d="M1193 692 c-92 -73 -92 -79 -6 -146 184 -145 417 -164 612 -49 59 35 131 101 131 122 0 9 -19 32 -42 51 -84 69 -76 66 -106 38 -143 -133 -342 -139 -490 -15 -24 21 -45 37 -47 37 -2 0 -25 -17 -52 -38z"/>
          </g>
        </svg>
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
          class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:shadow-none
          shadow absolute top-0 left-0 right-0 z-40 m-0
          overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded"
          :class="collapseShow">
        <!-- Collapse header -->
        <div
            class="md:min-w-full md:hidden block pb-4 mb-4"
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
                    ? 'text-indigo-600 hover:text-indigo-400'
                    : 'text-blueGray-700 hover:text-blueGray-400',
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
