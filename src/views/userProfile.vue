<template>
  <div class="flex flex-wrap" :class="{'justify-center': !authorize}" v-if="user">
    <div class="w-full xl:w-8/12 md:px-4" v-if="authorize">
      <UserForm @setRole="setRole" @refresh="refresh" :user="user"/>
    </div>
    <div class="w-full xl:w-4/12 md:px-4">
      <CardProfile :percentage="percentage" :user="user"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import UserForm from "@/components/Form/UserForm.vue"
import CardProfile from "@/components/Card/CardProfile.vue"
import { useRoute, useRouter } from "vue-router";
import { getUser } from "@/Api/users";
import { ref } from "vue";
import type { Ref } from "vue";
import type { User } from "@/types/user";
import type { Role } from "@/types/referenciel";
import { useAuthStore } from "@/stores/auth.store";

const { params } = useRoute()
const router = useRouter()

/*Store*/
const auth = useAuthStore()


/*Refs*/
const user: Ref<User | undefined> = ref()
const percentage = ref(0)
const id = params.userId
const currentUser = ref(auth.user || {})
const authorize = currentUser.value.role?.name === 'Secretary' || currentUser.value.role?.name === 'Admin' || currentUser.value.id?.toString() === id


const setRole = (role: Role) => {
  if (user.value) {
    user.value.role = role
  }
}

const refresh = () => {
  if (typeof id === 'string') {
    getUser(id).then(res => {
      percentage.value = res?.driving_time ? (((100 * res.driving_time.hours_done) / res.driving_time.hours_total) || 0) : 0
      user.value = res
    }).catch(() => {
      router.push('/not-found')
    })
  }
}

refresh()
</script>
