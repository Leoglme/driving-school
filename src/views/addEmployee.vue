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
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "vue-router";

/*Hooks*/
const router = useRouter()

/*Store*/
const { roles } = useReferencielStore()
const auth = useAuthStore()


/*Refs*/
const currentUser = ref(auth.user || {})
const role = ref(roles[1])
const authorize = currentUser.value.role?.name === 'Secretary' || currentUser.value.role?.name === 'Admin'
const user: Ref<CreateUserCommand | {}> = ref({
  role,
  first_name: '',
  last_name: '',
  password: '',
  email: ''
})


if (!authorize) {
  router.push('/employees')
}

</script>
