<template>
  <div ref="dropdownContainer" class="relative inline-block">
    <a class="text-slate-500 block"
       ref="btnDropdownRef"
       @click="toggleDropdown">
      <div class="items-center flex">
        <img v-if="user"
             :src="user.avatar"
             class="h-10 w-10 bg-slate-200 rounded-full cursor-pointer"
             :alt="user.first_name + ' ' + user.last_name"
        />
        <span v-else
              class="cursor-pointer text-indigo-600 hover:text-indigo-500 w-10 h-10 text-sm bg-slate-200 inline-flex items-center justify-center rounded-full">
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
      <router-link to="/account"
                   @click="closeDropdown"
                   class="hover:text-indigo-600 text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700">
        Mon profil
      </router-link>
      <div class="h-0 my-2 border border-solid border-slate-100"/>
      <button @click="() => { logout(); closeDropdown(); }"
              class="hover:text-indigo-600 text-left text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700">
        Déconnexion
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { createPopper } from "@popperjs/core";
import { useAuthStore } from "@/stores/auth.store";
import type { User } from "@/types/user";
import { ref, onMounted, onUnmounted } from "vue";

/* Refs */
const dropdownPopoverShow = ref(false)
const btnDropdownRef = ref()
const popoverDropdownRef = ref()
const dropdownContainer = ref<HTMLElement | null>(null)

/* Hooks */
const { user, logout }: { user: User | undefined, logout: () => void } = useAuthStore()

/* Methods */
const toggleDropdown = (event: Event) => {
  event.preventDefault();
  dropdownPopoverShow.value = !dropdownPopoverShow.value;
  if (dropdownPopoverShow.value) {
    createPopper(btnDropdownRef.value, popoverDropdownRef.value, {
      placement: "bottom-start",
    });
  }
}

const closeDropdown = () => {
  dropdownPopoverShow.value = false;
}

const handleClickOutside = (event: MouseEvent) => {
  if (
      dropdownContainer.value &&
      !dropdownContainer.value.contains(event.target as Node)
  ) {
    closeDropdown();
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
})

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
})
</script>
