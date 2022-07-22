<template>
  <div v-if="show"
       class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
    <div
        class="screen-modal w-full min-h-screen md:w-auto md:min-h-0 relative bg-white rounded-lg shadow dark:bg-gray-700">
      <button @click="setShow(false)" type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg
              text-sm p-2 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
              data-modal-toggle="authentication-modal">
        <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
             xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
        </svg>
      </button>
      <div class="py-6 px-6 lg:px-8">
        <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Détails du rendez-vous</h3>
        <Form @submit="onSubmit" class="space-y-6" :validation-schema="schema" v-slot="{ errors, meta }">
          <div class="relative w-full mb-3">
            <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Titre
            </label>
            <Field
                :value="event.title"
                name="title"
                id="title"
                type="text"
                placeholder="Mon évènement"
                :class="errors.title ? 'border-red-500 focus:border-red-500': 'border-slate-200'"
                class="border-2 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white
                  rounded-md text-sm focus:border-blue-600 focus:outline-none w-full ease-linear
                  transition-all duration-150 focus:ring-0"
            />
            <span class="text-red-600">{{ errors.title }}</span>
          </div>
          <div>
            <label for="chef" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Chef (instructeur ou secrétaire)
            </label>
            <UserAutoComplete v-if="event.extendedProps" :user="event.extendedProps.chef" @setUser="setChef" id="chef"
                              :errors="errors.chef"/>
          </div>

          <div>
            <label for="user" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Utilisateur invité
            </label>
            <UserAutoComplete v-if="event.extendedProps" :user="event.extendedProps.user" @setUser="setUser" id="user"
                              :errors="errors.user"/>
          </div>
          <div>
            <label for="time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Time
            </label>
            <TimeSelection
                @updateRange="updateRange"
                :start="start"
                :end="end"
                :errors="errors"
                id-start="start"
                id-end="end"
            />
          </div>
          <SwitchGroup as="div" class="flex items-center justify-between">
    <span class="flex-grow flex flex-col">
      <SwitchLabel as="span" class="text-sm font-medium text-gray-900" passive>Toute la journée</SwitchLabel>
      <SwitchDescription as="span"
                         class="text-sm text-gray-500">Si votre rendez-vous n'a pas d'heure précise</SwitchDescription>
    </span>
            <Switch v-model="allDay"
                    :class="[allDay ? 'bg-indigo-600' : 'bg-gray-200', 'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-0']">
              <span aria-hidden="true"
                    :class="[allDay ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200']"/>
            </Switch>
          </SwitchGroup>
          <div class="flex items-center justify-between gap-2">
            <button @click="onDelete" class="w-full text-white bg-red-700 hover:bg-red-800 focus:outline-none font-medium rounded-lg
                  text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700">
              Supprimer
            </button>
            <button :disabled="!meta.valid" type="submit"
                    class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium
                  rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700">
              Sauvegarder
            </button>
          </div>

        </Form>
      </div>
    </div>
  </div>
  <div v-if="show" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
</template>

<script lang="ts" setup>
import { defineEmits, inject, ref, watch } from "vue";
import UserAutoComplete from "@/components/Input/UserAutoComplete.vue"
import TimeSelection from "@/components/Input/TimeSelection.vue"
import { Form, Field } from 'vee-validate';
import { Switch, SwitchDescription, SwitchGroup, SwitchLabel } from '@headlessui/vue'
import type { CreateMeetCommand } from "@/types/meet";
import type { Notyf } from "notyf";
import type { PropType } from "vue";
import type { EventApi } from "@fullcalendar/common";
import { format, subHours } from "date-fns";
import { updateMeet } from "@/Api/meet";

/*Computed*/
const schema = {
  title: 'required',
  chef: 'required',
  user: 'required',
  start: 'required',
  end: 'required'
};

/*Hooks*/
const notyf: Notyf | undefined = inject('notyf')

/*Props*/
const props = defineProps({
  event: {
    type: Object as PropType<EventApi | { allDay: boolean, start?: Date, end?: Date, extendedProps: Record<string, string> }>,
    default: ({}) => {
    }
  }
})

/*Refs*/
const date_start = props.event?.start || new Date()
const date_end = props.event?.start || new Date()

const start = ref(new Date(date_start.getTime() - (date_start.getTimezoneOffset() * 60000)).toISOString().toString())
const end = ref(new Date(date_end.getTime() - (date_end.getTimezoneOffset() * 60000)).toISOString().toString())
const show = ref(false)
const setShow = ((value: boolean) => show.value = value)
const allDay = ref(props.event.allDay || false)
const chef = ref(props.event.extendedProps?.chef?.id || 0)
const user = ref(props.event.extendedProps?.user?.id || 0)


watch(() => props.event, (val) => {
  start.value = subHours(val?.start || new Date(), 2).toString()
  if (val?.end) {
    end.value = subHours(val?.end, 2).toString()
  } else {
    end.value = start.value
  }

})
watch(() => props.event.extendedProps, (val) => {
  const chefId = val?.chef?.id
  const userId = val?.user?.id
  if (chefId) {
    chef.value = chefId
  }
  if (userId) {
    user.value = userId
  }
})


/*Sets*/
const setChef = (id: number) => chef.value = id
const setUser = (id: number) => user.value = id

/*Emits*/
const emit = defineEmits(['onDelete', 'refresh'])

/*Methods*/
const updateRange = (range: { start: string, end: string }) => {
  start.value = range.start
  end.value = range.end
}
const onDelete = () => emit('onDelete')
const onSubmit = (values: CreateMeetCommand) => {

  const isoFormat = 'yyyy-MM-dd hh:mm:ss'
  const meetId = props.event.extendedProps?.eventId

  if (meetId) {
    const command = {
      ...values,
      start: format(new Date(start.value), isoFormat),
      end: format(new Date(end.value), isoFormat),
      chef: chef.value,
      user: user.value,
      allDay: allDay.value
    }

    updateMeet(meetId, command).then(r => {
      notyf?.success(`Le rendez-vous ${command.title} à été modifié.`)
      setShow(false)
      emit('refresh')
    }).catch(err => {
      console.log(err)
      const message = err.response?.data || 'Une erreur s\'est produite lors de la modification.'
      notyf?.error(message)
    })
  }
}


defineExpose({ setShow });
</script>

