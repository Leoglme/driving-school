<template>
  <form @submit.prevent="onSubmit"
        class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <h6 class="text-blueGray-700 text-xl font-bold">
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
        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Information utilisateur
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 md:px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="first_name">
                Prénom
              </label>
              <input
                  id="first_name"
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  v-model="user.first_name"
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 md:px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="last_name">
                Nom
              </label>
              <input
                  id="last_name"
                  type="text"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  v-model="user.last_name"
              />
            </div>
          </div>
        </div>

        <hr class="mt-6 border-b-1 border-blueGray-300"/>

        <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Information de compte
        </h6>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 md:px-4">
            <div class="relative w-full mb-3">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="email">
                Email
              </label>
              <input
                  id="email"
                  type="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  v-model="user.email"
              />
            </div>
          </div>
          <div class="w-full lg:w-6/12 md:px-4">
            <div class="relative w-full mb-3" v-if="action !== 'update'">
              <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="password">
                Mot de passe
              </label>
              <div class="relative w-full">
                <div class="absolute inset-y-0 right-0 flex items-center px-2">
                  <input v-model="togglePassword" class="hidden js-password-toggle" id="toggle" type="checkbox"/>
                  <label
                      class="select-none bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer"
                      for="toggle">Afficher</label>
                </div>
                <input
                    id="password"
                    :type="togglePassword ? 'text' : 'password'"
                    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    v-model="user.password"
                />
              </div>
            </div>
          </div>
          <div class="w-full lg:w-6/12 md:px-4">
            <div class="relative w-full mb-3">
              <RoleSelect v-model:selected="user.role"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import RoleSelect from "@/components/Input/RoleSelect.vue"
import type { CreateUserCommand, User, UserCommand } from "@/types/user";
import { updateUser, createUser } from "@/Api/users";
import type { Notyf } from "notyf";
import { computed, inject, ref } from "vue";
import type { PropType } from "vue";
import { useRouter } from "vue-router";

/*Refs*/
const togglePassword = ref(false)

/*Hooks*/
const notyf: Notyf | undefined = inject('notyf')
const emit = defineEmits(['refresh'])
const router = useRouter()

/*Props*/
const { action, user } = defineProps({
  action: { type: String, default: "update" },
  user: { type: Object as PropType<User & { password: string }>, default: () => ({}) }
});

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
const onSubmit = () => {
  const command: UserCommand = {
    role_id: user.role.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email
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
