<template>
  <header class="relative flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none"
          style="z-index: 9">
    <h1 class="text-lg font-semibold text-gray-900">
      <time>{{ title }}</time>
    </h1>
    <div class="flex items-center">
      <div class="flex items-center rounded-md shadow-sm md:items-stretch">
        <button @click="onPrev" title="Précédent" type="button"
                class="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50">
          <span class="sr-only">Précédent</span>
          <ChevronLeftIcon class="h-5 w-5" aria-hidden="true"/>
        </button>
        <button @click="onToday" title="Aujourd'hui" type="button" class="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm
        font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative lg:block">
          Aujourd'hui
        </button>
        <span class="relative -mx-px h-5 w-px bg-gray-300 md:hidden"/>
        <button @click="onNext" title="Suivant" type="button"
                class="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50">
          <span class="sr-only">Suivant</span>
          <ChevronRightIcon class="h-5 w-5" aria-hidden="true"/>
        </button>
      </div>
      <div class="hidden md:ml-4 lg:flex md:items-center">
        <Menu as="div" class="relative">
          <MenuButton type="button"
                      class="flex items-center rounded-md border border-gray-300 bg-white py-2 pl-3 pr-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50">
            {{ initialViewText }}
            <ChevronDownIcon class="ml-2 h-5 w-5 text-gray-400" aria-hidden="true"/>
          </MenuButton>
          <transition enter-active-class="transition ease-out duration-100"
                      enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                      leave-active-class="transition ease-in duration-75"
                      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
            <MenuItems
                class="focus:outline-none absolute right-0 mt-3 w-36 origin-top-right overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div class="py-1">
                <MenuItem v-slot="{ active }">
                  <button class="w-full text-left" @click="onChangeView('timeGridDay')"
                          :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                    Jour
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button @click="onChangeView('timeGridWeek')" class="w-full text-left"
                          :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                    Semaine
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button @click="onChangeView('dayGridMonth')" class="w-full text-left"
                          :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                    Mois
                  </button>
                </MenuItem>
                <MenuItem v-slot="{ active }">
                  <button @click="onChangeView('listWeek')" class="w-full text-left"
                          :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                    Liste
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
        <div class="ml-6 h-6 w-px bg-gray-300" v-if="authorize"/>
        <button v-if="authorize" @click="addEvent" type="button" class="bg-indigo-600 text-white active:bg-indigo-500 font-bold uppercase text-xs px-6 py-3 rounded shadow
      hover:shadow-md outline-none focus:outline-none ml-auto ease-linear transition-all duration-150">
          Ajouter un rendez-vous
        </button>
      </div>
      <Menu as="div" class="relative ml-6 lg:hidden">
        <MenuButton title="Ouvrir menu"
                    class="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
          <DotsHorizontalIcon class="h-5 w-5" aria-hidden="true"/>
        </MenuButton>

        <transition enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
          <MenuItems
              class="focus:outline-none absolute right-0 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <button v-if="authorize" @click="addEvent" class="w-full text-left"
                        :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                  Ajouter un rendez-vous
                </button>
              </MenuItem>
            </div>
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <button @click="onToday" class="w-full text-left"
                        :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                  Aujourd'hui
                </button>
              </MenuItem>
            </div>
            <div class="py-1">
              <MenuItem v-slot="{ active }">
                <button @click="onChangeView('timeGridDay')" class="w-full text-left"
                        :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                  Jour
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button @click="onChangeView('timeGridWeek')" class="w-full text-left"
                        :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                  Semaine
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button @click="onChangeView('dayGridMonth')" class="w-full text-left"
                        :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">
                  Mois
                </button>
              </MenuItem>
              <MenuItem v-slot="{ active }">
                <button @click="onChangeView('listWeek')" class="w-full text-left"
                        :class="`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block px-4 py-2 text-sm`">
                  Liste
                </button>
              </MenuItem>
            </div>
          </MenuItems>
        </transition>
      </Menu>
    </div>

  </header>
  <FullCalendar
      v-if="showFullCalendar"
      ref="fullCalendar"
      :class="{'disabled': !authorize}"
      :options="options">
    <template v-slot:eventContent='arg'>
      <div class="fc-event-main-frame">
        <div class="fc-event-time">{{ arg.timeText }}</div>
        <div class="fc-event-title-container">
          <div class="fc-event-title fc-sticky">
            {{ arg.event.title }}
            <div v-if="currentViewType !== 'dayGridMonth' && currentViewType !== 'timeGridWeek'">
              <h2 class="font-semibold text-gray-900">
                {{ arg.event.extendedProps?.chefName || '' }} - {{ arg.event.extendedProps?.userName || '' }}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </template>
  </FullCalendar>
</template>

<script lang="ts" setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon, DotsHorizontalIcon } from '@heroicons/vue/solid'

import { onMounted, reactive, ref, watch, computed, nextTick } from "vue";
import type { Ref } from "vue";

import '@fullcalendar/core/vdom' // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import interactionPlugin from '@fullcalendar/interaction'
import { addDays, startOfToday, differenceInMinutes } from "date-fns";
import { useUsersStore } from "@/stores/users.store";
import type { User } from "@/types/user";

/*Data*/
const viewsTitle = [
  { key: "timeGridDay", value: "Jour" },
  { key: "timeGridWeek", value: "Semaine" },
  { key: "dayGridMonth", value: "Mois" },
  { key: "listWeek", value: "Liste" },
]
const initialView = 'dayGridMonth'
const timeZone = ref(Intl.DateTimeFormat().resolvedOptions().timeZone)

/*Props*/
const props = defineProps({
  events: { type: Array, default: () => ([]) },
  authorize: { type: Boolean, default: false },
  selectedDay: { type: Date, default: startOfToday() }
})

/*Emits*/
const emit = defineEmits(['addEvent', 'onSelect', 'eventDrop', 'eventClick'])
const addEvent = () => emit('addEvent')
const onSelect = (arg: any) => emit('onSelect', arg)
const eventDrop = (arg: any) => emit('eventDrop', arg)
const eventClick = (arg: any) => emit('eventClick', arg)

function onDatesSet(dateInfo: { start: Date; end: Date }) {
  viewRange.value = { start: dateInfo.start, end: dateInfo.end }
  
  const calendarApi = fullCalendar.value?.getApi()
  if (calendarApi) {
    title.value = calendarApi.currentData?.viewTitle || title.value
    currentViewType.value = calendarApi.view.type
  }
}

/*Hooks*/
const options = reactive({
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
  initialView,
  locale: 'fr',
  timeZone,
  editable: props.authorize,
  select: onSelect,
  eventClick: eventClick,
  eventDrop: eventDrop,
  selectable: props.authorize,
  headerToolbar: false as false,
  datesSet: onDatesSet,
  
  events: (fetchInfo: any, successCallback: (events: any[]) => void) => {
    const all = props.events
    
    if (!all || !all.length) {
      successCallback([])
      return
    }

    const start = fetchInfo.start.getTime()
    const end = fetchInfo.end.getTime()

    const filtered = all.filter((e: any) => {
      const es = e.start instanceof Date ? e.start.getTime() : new Date(e.start).getTime()
      const ee = e.end instanceof Date ? e.end.getTime() : new Date(e.end).getTime()
      return ee > start && es < end
    })

    successCallback(filtered.map((e: any) => ({ ...e })))
  }
})

/*Refs*/
const fullCalendar = ref()
const showFullCalendar = ref(false)
const viewRange = ref<{ start: Date; end: Date } | null>(null)
const initialViewText = ref(viewsTitle.find(e => e.key === initialView)?.value)
const currentViewType = ref(initialView)

/*Methods*/
const currentView = () => {
  const calendarApi = fullCalendar.value?.getApi()
  if (calendarApi) {
    return calendarApi.view.type
  }
  return initialView
}


const getTitle = () => {
  const calendarApi = fullCalendar.value?.getApi()
  if (calendarApi) {
    return calendarApi.currentData?.viewTitle
  }
}

const onPrev = () => {
  const calendarApi = fullCalendar.value?.getApi()
  if (calendarApi) {
    calendarApi.prev()
    title.value = getTitle()
  }
}

const onToday = () => {
  const calendarApi = fullCalendar.value?.getApi()
  if (calendarApi) {
    calendarApi.today()
    title.value = getTitle()
  }
}

const onChangeView = async (view: string) => {
  const calendarApi = fullCalendar.value?.getApi()

  if (calendarApi && view) {
    initialViewText.value = viewsTitle.find(e => e.key === view)?.value
    calendarApi.changeView(view, calendarApi.currentData.currentDate)
    title.value = getTitle()
  }
}

const usersStore = useUsersStore()

const onNext = () => {
  const calendarApi = fullCalendar.value?.getApi()
  if (calendarApi) {
    calendarApi.next()
    title.value = getTitle()
  }
}

const title = ref(getTitle())

const setDate = (date: Date = props.selectedDay) => {
  const calendarApi = fullCalendar.value?.getApi()
  if (calendarApi) {
    calendarApi.gotoDate(addDays(date, 1))
    title.value = getTitle()
  }
}

watch(() => props.selectedDay, () => {
  setDate()
}, { deep: true })

/*Lifecycle*/
onMounted(() => {
  usersStore.fetchUsers()
  title.value = getTitle()
  
  setTimeout(() => {
    showFullCalendar.value = true
  }, 100)
})
</script>
