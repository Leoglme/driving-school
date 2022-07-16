<template>
  <div class="flex flex-wrap" v-if="user">
    <div class="w-full xl:w-8/12 md:px-4">
      <UserForm @setRole="setRole" @refresh="refresh" :user="user"/>
    </div>
    <div class="w-full xl:w-4/12 md:px-4">
      <CardProfile :user="user"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import UserForm from "@/components/Form/UserForm.vue"
import CardProfile from "@/components/Card/CardProfile.vue"
import { getUser } from "@/Api/users";
import type { User } from "@/types/user";
import type { Role } from "@/types/referenciel";
import { useAuthStore } from "@/stores/auth.store";


/*Refs*/
const { user, setUser }: { user: User | undefined, setUser: (user: User) => void } = useAuthStore()


const setRole = (role: Role) => {
  if (user) {
    user.role = role
  }
}

const refresh = () => {
  if (user){
    getUser(user.id.toString()).then(res => {
      setUser(res)
    })
  }
}

refresh()
</script>
