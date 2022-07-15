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
import { useRoute } from "vue-router";
import { getUser } from "@/Api/users";
import { ref } from "vue";
import type { Ref } from "vue";
import type { User } from "@/types/user";
import type { Role } from "@/types/referenciel";

const { params } = useRoute()

/*Refs*/
const user: Ref<User | undefined> = ref()
const id = params.userId



const setRole = (role: Role) => {
  if(user.value) {
    user.value.role = role
  }
}

const refresh = () => {
  if (typeof id === 'string') {
    getUser(id).then(res => {
      user.value = res
    })
  }
}

refresh()
</script>
