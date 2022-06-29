<template>
  <div>
    <a class="text-blueGray-500 block"
       ref="btnDropdownRef"
       @click="toggleDropdown">
      <div class="items-center flex">
        <span
            class="cursor-pointer text-emerald-500 hover:text-emerald-600 w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
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
      <a href="/profile"
         class="hover:text-emerald-600 text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
        Mon profile
      </a>
      <div class="h-0 my-2 border border-solid border-blueGray-100"/>
      <a href="/logout"
         class="hover:text-emerald-600 text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700">
        Déconnexion
      </a>
    </div>
  </div>
</template>

<script>
import {createPopper} from "@popperjs/core";

export default {
  data() {
    return {
      dropdownPopoverShow: false
    };
  },
  methods: {
    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-start",
        });
      }
    },
  },
};
</script>
