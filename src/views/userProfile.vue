<template>
  <div class="flex flex-wrap" v-if="user">
    <div class="w-full lg:w-8/12 md:px-4">
      <UserForm @refresh="refresh" :user="user"/>
    </div>
    <div class="w-full lg:w-4/12 md:px-4">
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

const { params } = useRoute()

/*Refs*/
const user: Ref<User | undefined> = ref()
const id = params.userId

const refresh = () => {
  if (typeof id === 'string') {
    getUser(id).then(res => {
      user.value = res
    })
  }
}

refresh()
</script>
