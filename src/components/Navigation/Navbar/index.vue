<template>
  <!-- Navbar -->
  <nav class="top-0 left-0 w-full z-10 bg-white hidden shadow-sm sticky md:flex items-center p-2">
    <div class="w-full mx-autp items-center flex justify-end md:flex-nowrap flex-wrap md:px-10 px-4">
      <!-- User -->
      <ul class="flex-col md:flex-row list-none items-center hidden md:flex">
        <user-dropdown />
      </ul>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
import UserDropdown from "@/components/Menu/UserDropdown/index.vue";

export default {
  components: {
    UserDropdown,
  },
};
</script>
