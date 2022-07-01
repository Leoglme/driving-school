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
  <UserTable @delete="openModal" :users="users"/>
  <Pagination/>

  <ConfirmModal @ok="onDeleteUser" ref="deleteStudentModal"/>
</template>

<script lang="ts" setup>
import type { User } from "@/types/user";
import UserTable from "@/components/Table/UserTable.vue"
import SearchBar from "@/components/Input/SearchBar.vue"
import Pagination from "@/components/Navigation/Pagination.vue"
import ConfirmModal from "@/components/Modal/ConfirmModal.vue"
import { deleteUsers, getUsers } from "@/Api/users";
import type { Notyf } from 'notyf';
import { inject, ref } from "vue";


const notyf: Notyf | undefined = inject('notyf')
const users = ref([])
const deleteStudentModal = ref()
const currentUserId = ref()

const openModal = (user: User) => {
  currentUserId.value = user.id
  deleteStudentModal.value.content.title = "Confirmation de suppression"
  deleteStudentModal.value.content.text = `Voulez-vous vraiment supprimer l'étudiant ${user.first_name} ${user.last_name} ?`
  deleteStudentModal.value.setShow(true)
}

const refresh = () => {
  getUsers().then(r => users.value = r)
}

const onDeleteUser = () => {
  const userId = currentUserId.value;
  deleteUsers(userId).then(() => {
    notyf?.success('success delete')
    refresh()
  })
}

refresh()

</script>
