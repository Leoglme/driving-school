<template>
  <section id="login">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
        <svg class="mr-2" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 280.000000 280.000000"
             preserveAspectRatio="xMidYMid meet">

          <g class="fill-indigo-600" transform="translate(0.000000,280.000000) scale(0.100000,-0.100000)" stroke="none">
            <path
                d="M1055 2369 c-303 -32 -622 -199 -826 -432 -99 -113 -203 -260 -192 -271 4 -3 50 -6 104 -6 l97 0 65 83 c179 229 421 381 687 431 119 23 323 21 454 -4 243 -47 493 -161 701 -318 131 -99 132 -100 115 -106 -8 -3 -34 -12 -58 -20 -96 -34 -173 -107 -232 -223 l-35 -68 -389 -3 c-274 -1 -393 1 -402 9 -7 6 -25 36 -39 67 -51 110 -138 189 -254 227 -40 13 -75 16 -145 13 -115 -5 -186 -37 -267 -117 -201 -202 -147 -532 109 -658 73 -37 80 -38 181 -38 99 0 111 2 174 32 90 43 164 119 203 207 19 44 36 68 49 72 11 2 191 3 400 2 l380 -3 35 -68 c19 -38 50 -86 68 -108 114 -134 321 -178 485 -102 124 58 208 172 238 320 11 55 11 69 -10 145 -29 110 -67 171 -184 293 -188 198 -386 344 -628 464 -307 152 -593 211 -884 180z m-203 -835 c23 -16 56 -49 73 -73 27 -39 30 -50 30 -121 0 -71 -3 -82 -30 -121 -86 -122 -243 -145 -347 -51 -99 89 -106 235 -15 331 50 53 101 72 179 69 55 -3 75 -9 110 -34z m1594 17 c51 -23 111 -93 125 -145 60 -221 -205 -390 -373 -238 -159 143 -61 402 152 402 32 0 72 -8 96 -19z"/>
            <path
                d="M1193 692 c-92 -73 -92 -79 -6 -146 184 -145 417 -164 612 -49 59 35 131 101 131 122 0 9 -19 32 -42 51 -84 69 -76 66 -106 38 -143 -133 -342 -139 -490 -15 -24 21 -45 37 -47 37 -2 0 -25 -17 -52 -38z"/>
          </g>
        </svg>
        Driving school
      </div>
      <div
          class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Mot de passe oublié ?
          </h1>
          <p class="leading-6 leading-tight tracking-tight text-gray-900 dark:text-white">
            Entrez l'adresse e-mail que vous avez utilisée lors de votre inscription et nous vous enverrons des
            instructions pour réinitialiser votre mot de passe.
          </p>
          <Form @submit="onSubmit" :validation-schema="schema" v-slot="{ errors, meta }" class="space-y-4 md:space-y-6">
            <div class="relative w-full mb-3">
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="email">
                Email
              </label>
              <Field
                  name="email"
                  id="email"
                  type="email"
                  placeholder="name@driving-school.fr"
                  :class="errors.email ? 'border border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600'"
                  class="border p-2.5 text-gray-900 sm:text-sm bg-gray-50
                  rounded focus:border-blue-600 focus:outline-none w-full ease-linear
                  transition-all duration-150 focus:ring-0 dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
              <svg v-if="errors.email" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                   class="absolute text-red-600 fill-current" style="top: 38px; right: 12px;">
                <path
                    d="M11.953,2C6.465,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.493,2,11.953,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"></path>
              </svg>
              <span class="text-red-600">{{ errors.email }}</span>
            </div>
            <div class="flex items-center justify-between">
              <router-link to="/login" class="link text-sm font-medium text-indigo-600 dark:text-indigo-500">
                Se connecter
              </router-link>
            </div>
            <button :disabled="!meta.valid" type="submit"
                    class="w-full text-white bg-indigo-600 active:bg-indigo-500 hover:bg-indigo-700 focus:outline-none focus:ring-indigo-300
                    font-medium rounded text-sm px-5 py-2.5 ease-linear transition-all duration-150
                    text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
              Envoyer la demande
            </button>
          </Form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Form, Field } from 'vee-validate';
import type { FormActions } from 'vee-validate';
import { inject } from "vue";
import type { ForgotPasswordCommand } from "@/types/auth";
import { forgotPassword } from "@/Api/auth";
import type { Notyf } from "notyf";
import { useRouter } from "vue-router";


/*Computed*/
const schema = {
  email: 'required|email'
};

/*Hooks*/
const notyf: Notyf | undefined = inject('notyf')
const router = useRouter()

/* Appel Api*/
const onSubmit = (values: ForgotPasswordCommand, actions: FormActions<ForgotPasswordCommand>) => {
  forgotPassword(values).then((response) => {
    console.log(response.data)
    notyf?.success(response.data)
    actions.resetForm()
  }).catch((err) => {
    console.log(err)
    const message = err.response?.data || 'Une erreur s\'est produite lors de l\'envoie du mail.'
    notyf?.error(message)
  })
}

</script>
