<script setup lang="ts">
import Sidebar from "@/components/Navigation/SideBar/index.vue"
import Navbar from "@/components/Navigation/Navbar/index.vue"

</script>
<template>
  <Sidebar/>
  <div class="relative md:ml-64 bg-blueGray-100 min-h-screen">
    <Navbar/>
    <main class="p-4">
      <router-view/>
    </main>
  </div>
</template>
