<template>
  <Form @submit="onSubmit" v-slot="{ errors }"
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-slate-100 border-0">
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex flex-col sm:flex-row gap-6 justify-between">
        <h6 class="text-slate-700 text-xl font-bold">
          {{ action === "update" ? `Profile de ${fullName}` : 'Nouvel utilisateur' }}</h6>
        <button :disabled="disabled()"
                class="bg-indigo-600 text-white active:bg-indigo-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="submit">
          {{ action === "update" ? 'Sauvegarder' : 'Créer utilisateur' }}
        </button>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
      <div>
        <h6 class="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
          Information utilisateur
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 md:px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-slate-600 text-xs font-bold mb-2" for="first_name">
                Prénom
              </label>
              <Field
                  name="first_name"
                  id="first_name"
                  type="text"
                  :class="errors.first_name ? 'border-red-500 focus:border-red-500': 'border-slate-200'"
                  rules="required"
                  class="border-2 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white
                  rounded-md text-sm focus:border-blue-600 focus:outline-none w-full ease-linear
                  transition-all duration-150 focus:ring-0"
                  v-model="user.first_name"
              />
              <svg v-if="errors.first_name" xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                   viewBox="0 0 24 24"
                   class="absolute text-red-600 fill-current" style="top: 36px; right: 12px;">
                <path
                    d="M11.953,2C6.465,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.493,2,11.953,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"></path>
              </svg>
              <span class="text-red-600">{{ errors.first_name }}</span>
            </div>
          </div>
          <div class="w-full lg:w-6/12 md:px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-slate-600 text-xs font-bold mb-2" for="last_name">
                Nom
              </label>
              <Field
                  name="last_name"
                  id="last_name"
                  type="text"
                  :class="errors.last_name ? 'border-red-500 focus:border-red-500': 'border-slate-200'"
                  rules="required"
                  class="border-2 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white
                  rounded-md text-sm focus:border-blue-600 focus:outline-none w-full ease-linear
                  transition-all duration-150 focus:ring-0"
                  v-model="user.last_name"
              />
              <svg v-if="errors.last_name" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                   class="absolute text-red-600 fill-current" style="top: 36px; right: 12px;">
                <path
                    d="M11.953,2C6.465,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.493,2,11.953,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"></path>
              </svg>
              <span class="text-red-600">{{ errors.last_name }}</span>
            </div>
          </div>
        </div>

        <hr class="mt-6 border-b-1 border-slate-300"/>

        <h6 class="text-slate-400 text-sm mt-3 mb-6 font-bold uppercase">
          Information de compte
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 md:px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-slate-600 text-xs font-bold mb-2" for="email">
                Email
              </label>
              <Field
                  name="email"
                  id="email"
                  type="email"
                  :class="errors.email ? 'border-red-500 focus:border-red-500': 'border-slate-200'"
                  rules="required|email"
                  class="border-2 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white
                  rounded-md text-sm focus:border-blue-600 focus:outline-none w-full ease-linear
                  transition-all duration-150 focus:ring-0"
                  v-model="user.email"
              />
              <svg v-if="errors.email" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                   class="absolute text-red-600 fill-current" style="top: 36px; right: 12px;">
                <path
                    d="M11.953,2C6.465,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.493,2,11.953,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"></path>
              </svg>
              <span class="text-red-600">{{ errors.email }}</span>
            </div>
          </div>
          <div class="w-full lg:w-6/12 md:px-4" v-if="action !== 'update'">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-slate-600 text-xs font-bold mb-2" for="password">
                Mot de passe
              </label>
              <div class="relative w-full">
                <div style="height: 48px;" class="absolute inset-y-0 right-0 flex items-center px-2">
                  <input v-model="togglePassword" class="hidden js-password-toggle" id="toggle" type="checkbox"/>
                  <label
                      class="select-none bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer"
                      for="toggle">Afficher</label>
                </div>
                <Field
                    id="password"
                    name="password"
                    :type="togglePassword ? 'text' : 'password'"
                    :class="errors.password ? 'border-red-500 focus:border-red-500': 'border-slate-200'"
                    :rules="action !== 'update' ? 'required' : ''"
                    class="border-2 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white
                  rounded-md text-sm focus:border-blue-600 focus:outline-none w-full ease-linear
                  transition-all duration-150 focus:ring-0"
                    v-model="user.password"
                />

                <span class="text-red-600">{{ errors.password }}</span>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-6/12 md:px-4">
            <div class="relative w-full mb-3">
              <RoleSelect
                  :disabled="!authorize"
                  :selected="role"
                  @update:selected="role = $event"
              />
            </div>
          </div>

          <div class="w-full lg:w-6/12 md:px-4" v-if="role && role.name === 'Student' && user.driving_time">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-slate-600 text-xs font-bold mb-2" for="hours_remaining">
                Heures de conduite disponible
              </label>
              <Field
                  :disabled="!authorize"
                  name="hours_remaining"
                  id="hours_remaining"
                  type="number"
                  v-model="user.driving_time.hours_remaining"
                  :rules="role && role.name === 'Student' && user.driving_time ? 'required' : ''"
                  :class="errors.hours_remaining ? 'border-red-500 focus:border-red-500': 'border-slate-200'"
                  class="border-2 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white
                  rounded-md text-sm focus:border-blue-600 focus:outline-none w-full ease-linear
                  transition-all duration-150 focus:ring-0"
              />
              <span class="text-red-600">{{ errors.hours_remaining }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>

<script lang="ts" setup>
import RoleSelect from "@/components/Input/RoleSelect.vue"
import type { CreateUserCommand, User, UserCommand } from "@/types/user";
import { updateUser, createUser } from "@/Api/users";
import type { Notyf } from "notyf";
import { computed, inject, ref, watch } from "vue";
import type { PropType } from "vue";
import { useRouter } from "vue-router";
import { Form, Field } from 'vee-validate';
import type { Role } from "@/types/referenciel";
import { useAuthStore } from "@/stores/auth.store";

/*Props*/
const { action, user } = defineProps({
  action: { type: String, default: "update" },
  user: { type: Object as PropType<User & { password: string, hours_remaining: number }>, default: () => ({}) }
});

/*Store*/
const auth = useAuthStore()

/*Refs*/
const togglePassword = ref(false)
const role = ref(user.role)
const currentUser = ref(auth.user || {})
const authorize = currentUser.value.role?.name === 'Secretary' || currentUser.value.role?.name === 'Admin'

/*Hooks*/
const notyf: Notyf | undefined = inject('notyf')
const emit = defineEmits(['refresh', 'setRole'])
const router = useRouter()

/*Watch*/
watch(() => role.value, (val: Role) => {
  emit('setRole', val)
}, { deep: true })

/*Methods*/
const disabled = (): boolean => {
  let state = false;
  Object.keys(user as { [index: string]: any }).map(key => {
        if (!state) {
          //@ts-ignore
          state = user[key] === undefined || user[key] === "";
        }
      }
  )
  return state
}

const refresh = () => {
  emit('refresh')
}


/*Computed*/
const fullName = computed(() => user.first_name + " " + user.last_name)


/* Appel Api*/
const onSubmit = (values: Record<string, any>) => {
  console.log("submit", values)
  const command: UserCommand = {
    role_id: role.value.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
    hours_remaining: values.hours_remaining
  }

  if (action === 'update') {
    updateUser(user.id, command).then(() => {
      notyf?.success('Utilisateur modifié avec succès.')
      refresh()
    }).catch(() => {
      notyf?.error('Une erreur s\'est produite lors de la modification')
    })
  } else {
    const createCommand: CreateUserCommand = { ...command, password: user.password }
    createUser(createCommand).then(() => {
      notyf?.success('Utilisateur créer avec succès.')
      router.push('/students')
    }).catch(() => {
      notyf?.error('Une erreur s\'est produite lors de la création')
    })
  }

}
</script>
