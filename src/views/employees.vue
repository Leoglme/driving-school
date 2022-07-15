<template>
  <div class="flex wrap flex-wrap gap-4 justify-center items-center mb-4">
    <SearchBar v-model:search="search" class="ml-auto" style="max-width: 600px"/>
    <router-link to="/employee/add" role="button"
                 class="bg-indigo-600 text-white active:bg-indigo-500 font-bold uppercase text-xs px-6 py-3 rounded shadow
      hover:shadow-md outline-none focus:outline-none ml-auto ease-linear transition-all duration-150">
      <i class="fas fa-plus mr-1"></i> Ajouter un employé
    </router-link>
  </div>
  <UserTable title="Employés" hideHour @delete="openModal" :users="employees" v-if="!pending"/>

  <Pagination v-model:currentPage="currentPage" :total="employeesCount" :total-pages="totalPages"/>

  <ConfirmModal @ok="onDeleteEmployee" ref="deleteEmployeeModal"/>
</template>

<script lang="ts" setup>
import type { User } from "@/types/user";
import UserTable from "@/components/Table/UserTable.vue"
import SearchBar from "@/components/Input/SearchBar.vue"
import Pagination from "@/components/Navigation/Pagination.vue"
import ConfirmModal from "@/components/Modal/ConfirmModal.vue"
import { deleteUsers, getEmployees } from "@/Api/users";
import type { Notyf } from 'notyf';
import { inject, ref, watch } from "vue";

/*Hooks*/
const notyf: Notyf | undefined = inject('notyf')
/*Store*/

/*Refs*/
const employees = ref([])
const employeesCount = ref(0)
const currentPage = ref(1)
const deleteEmployeeModal = ref()
const currentEmployeeId = ref()
const pending = ref(true)
const search = ref('')
const totalPages = ref(0)

/*Watch*/
watch(() => search.value, () => {
  refresh()
})
watch(() => currentPage.value, () => {
  refresh()
})

/*Methods*/

const openModal = (employee: User) => {
  currentEmployeeId.value = employee.id
  deleteEmployeeModal.value.content.title = "Confirmation de suppression"
  deleteEmployeeModal.value.content.text = `Voulez-vous vraiment supprimer l'étudiant ${employee.first_name} ${employee.last_name} ?`
  deleteEmployeeModal.value.setShow(true)
}

const refresh = async () => {
  await getEmployees(search.value, currentPage.value).then(r => {
    employees.value = r.employees
    employeesCount.value = r.count
    totalPages.value = Math.ceil(r.count / 10)
  })
  pending.value = false;
}

const onDeleteEmployee = () => {
  const employeeId = currentEmployeeId.value;
  deleteUsers(employeeId).then(() => {
    notyf?.success('L\'employé à été supprimé.')
    refresh()
  }).catch(() => {
    notyf?.error('Une erreur s\'est produite lors de la suppression')
  })
}

refresh()

</script>
