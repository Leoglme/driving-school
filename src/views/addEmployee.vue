<template>
  <div class="flex flex-wrap">
    <div class="w-full md:px-4">
      <UserForm action="create" :user="user"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import UserForm from "@/components/Form/UserForm.vue"
import { ref } from "vue";
import type { Ref } from "vue";
import type { CreateUserCommand } from "@/types/user";
import { useReferencielStore } from "@/stores/referenciel.store";

/*Store*/
const { roles } = useReferencielStore()

const role = ref(roles[0])

/*Refs*/
const user: Ref<CreateUserCommand | {}> = ref({
  role,
  first_name: '',
  last_name: '',
  password: '',
  email: '',
  hours_remaining: 0
})

</script>
