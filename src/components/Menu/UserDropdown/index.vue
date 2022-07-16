<template>
  <div>
    <a class="text-blueGray-500 block"
       ref="btnDropdownRef"
       @click="toggleDropdown">
      <div class="items-center flex">
        <img v-if="user"
            :src="user.avatar"
            class="h-10 w-10 bg-blueGray-200 rounded-full cursor-pointer"
            :alt="user.first_name + ' ' + user.last_name"
        />
        <span v-else
            class="cursor-pointer text-indigo-600 hover:text-indigo-500 w-10 h-10 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
          <i class="fa-regular fa-user"/>
        </span>
      </div>
    </a>
    <div ref="popoverDropdownRef"
         class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
         v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow,
      }">
      <a href="/account"
         class="hover:text-indigo-600 text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
        Mon profile
      </a>
      <div class="h-0 my-2 border border-solid border-blueGray-100"/>
      <button @click="logout"
         class="hover:text-indigo-600 text-left text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
        Déconnexion
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createPopper } from "@popperjs/core";
import { useAuthStore } from "@/stores/auth.store";
import type { User } from "@/types/user";
import { ref } from "vue";

/*Refs*/
const dropdownPopoverShow = ref(false)
const btnDropdownRef = ref()
const popoverDropdownRef = ref()

/*Hooks*/
const { user, logout }: { user: User | undefined, logout: () => void } = useAuthStore()


/*Methods*/
const toggleDropdown = (event: { preventDefault: () => void; }) => {
  event.preventDefault();
  if (dropdownPopoverShow.value) {
    dropdownPopoverShow.value = false;
  } else {
    dropdownPopoverShow.value = true;
    createPopper(btnDropdownRef.value, popoverDropdownRef.value, {
      placement: "bottom-start",
    });
  }
}
</script>
