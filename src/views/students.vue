<template>
  <div class="flex justify-center items-center my-4">
    <SearchBar v-model:search="search" class="ml-auto" style="max-width: 600px"/>
    <router-link to="/students/add" role="button"
        class="bg-indigo-600 text-white active:bg-indigo-500 font-bold uppercase text-xs px-6 py-3 rounded shadow
      hover:shadow-md outline-none focus:outline-none ml-auto ease-linear transition-all duration-150">
      <i class="fas fa-plus mr-1"></i> Ajouter un étudiant
    </router-link>
  </div>
  <UserTable @delete="openModal" :users="students" v-if="!pending"/>
  <Pagination/>

  <ConfirmModal @ok="onDeleteStudent" ref="deleteStudentModal"/>
</template>

<script lang="ts" setup>
import type { User } from "@/types/user";
import UserTable from "@/components/Table/UserTable.vue"
import SearchBar from "@/components/Input/SearchBar.vue"
import Pagination from "@/components/Navigation/Pagination.vue"
import ConfirmModal from "@/components/Modal/ConfirmModal.vue"
import { deleteUsers, getStudents } from "@/Api/users";
import type { Notyf } from 'notyf';
import { inject, ref, watch } from "vue";

/*Hooks*/
const notyf: Notyf | undefined = inject('notyf')
/*Store*/

/*Refs*/
const students = ref([])
const deleteStudentModal = ref()
const currentStudentId = ref()
const pending = ref(true)
const search = ref('')

/*Watch*/
watch(() => search.value, () => {
  refresh()
})

/*Methods*/
const openModal = (student: User) => {
  currentStudentId.value = student.id
  deleteStudentModal.value.content.title = "Confirmation de suppression"
  deleteStudentModal.value.content.text = `Voulez-vous vraiment supprimer l'étudiant ${student.first_name} ${student.last_name} ?`
  deleteStudentModal.value.setShow(true)
}

const refresh = async () => {
  await getStudents(search.value).then(r => students.value = r)
  pending.value = false;
}

const onDeleteStudent = () => {
  const studentId = currentStudentId.value;
  deleteUsers(studentId).then(() => {
    notyf?.success('L\'étudiant à été supprimé.')
    refresh()
  }).catch(() => {
    notyf?.error('Une erreur s\'est produite lors de la suppression')
  })
}

refresh()

</script>
