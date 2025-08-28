<template>
  <div class="w-full relative">
    <div class="mt-1 relative overflow-hidden rounded-md">
      <Field
          type="text"
          :id="id"
          :name="id"
          v-model="search"
          :class="errors ? 'border-red-500 focus:border-red-500': 'border-slate-200'"
          class="px-3 py-3 placeholder-slate-300 text-slate-600 bg-white
                  rounded-md text-sm focus:border-blue-600 focus:outline-none w-full ease-linear
                  transition-all duration-150 border-2 focus:ring-0"
          autocomplete="off"
          placeholder="John Doe"
      />
      <span v-if="search" @click="clear" title="Effacer la recherche" class="cursor-pointer z-10 h-full leading-snug font-normal absolute
      text-center hover:text-slate-500 active:text-slate-500 text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
    <i class="fas fa-times"></i>
  </span>
      <span v-if="icon && !search"
            class="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
    <i class="fas fa-search"></i>
  </span>
      <span class="text-red-600">{{ errors }}</span>
    </div>
    <div v-show="users.length"
         class="absolute w-full z-50 bg-white border border-gray-300 mt-1 max-height-48 overflow-hidden overflow-y-scroll rounded-md shadow-md">
      <ul class="py-1">
        <li v-for="(user, index) in users"
            :key="index"
            @click="setInput(user)"
            class="px-3 py-2 cursor-pointer hover:bg-gray-200">
          <div class="items-center flex">
            <img v-if="user.avatar" :src="user.avatar" class="mr-2 h-7 w-7 bg-slate-200 rounded-full cursor-pointer"
                 :alt="user.first_name + ' ' + user.last_name">
            {{ user.first_name + ' ' + user.last_name }}
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script lang="ts" setup>
import { ref, watch, computed } from "vue";
import type { Ref, ComputedRef, PropType } from "vue";
import type { User } from "@/types/user";
import { getUsers } from "@/Api/users";
import { Field } from "vee-validate"

const limitResult = 6

/*Props*/
const props = defineProps({
  errors: { type: String, default: null },
  userId: { type: Object as PropType<number>, default: 0 },
  icon: { type: Boolean, default: false },
  id: { type: String, default: 'user-auto-complete' }
})

/*Refs*/
const users: Ref<User[]> = ref([])
const allUsers: Ref<User[]> = ref([])
const user: ComputedRef<User | undefined> = computed(() => {
  return allUsers.value.find(u => u.id === props.userId)
})
const defaultSearch: Ref<string> = computed(() => {
  const _user: User | undefined = user.value
  if(!_user) {
    return ''
  }

  return _user.first_name && _user.last_name ? _user.first_name + ' ' + _user.last_name : ''
})
const search = ref(defaultSearch.value)


/*Emits*/
const emit = defineEmits(['setUser'])

const clear = () => {
  search.value = defaultSearch.value
  emit('setUser', undefined)
}

/*Methods*/
const setInput = (user: User) => {
  search.value = user.first_name + ' ' + user.last_name
  emit('setUser', user.id)
}

getUsers().then(r => allUsers.value = r)

watch(() => search.value, (val) => {
  if (!val) {
    return users.value = []
  }
  getUsers(val, limitResult).then(r => users.value = r)
})

watch(() => defaultSearch.value, (val) => {
  search.value = val
})


</script>
