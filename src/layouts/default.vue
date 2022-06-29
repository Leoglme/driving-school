

<script setup lang="ts">
import Sidebar from "@/components/Navigation/SideBar/index.vue"


</script>

<template>
  <Sidebar/>
  <div class="relative md:ml-64 bg-blueGray-100">
    <div class="px-4 md:px-10 mx-auto w-full -m-24">
      <router-view/>
    </div>
  </div>
</template>
