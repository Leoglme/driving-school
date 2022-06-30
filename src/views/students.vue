<template>
  <div class="flex justify-center items-center my-4">
    <SearchBar class="ml-auto" style="max-width: 600px"/>
    <button
        class="bg-amber-400 text-white active:bg-amber-300 font-bold uppercase text-xs px-6 py-3 rounded shadow
      hover:shadow-md outline-none focus:outline-none ml-auto ease-linear transition-all duration-150"
        type="button">
      <i class="fas fa-plus mr-1"></i> Ajouter un étudiant
    </button>
  </div>
  <UserTable :users="users"/>
  <Pagination/>
</template>

<script setup>
import UserTable from "@/components/Table/UserTable.vue"
import SearchBar from "@/components/Input/SearchBar.vue"
import Pagination from "@/components/Navigation/Pagination.vue"
import {getUsers} from "@/Api/users";
import {ref} from "vue";
const users = ref([])

getUsers().then(r => users.value = r)
</script>
