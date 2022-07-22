<template>
  <section id="planning" class="flex flex-wrap">
    <div class="w-full xl:w-9/12 md:px-4">
      <Calendar v-model:selectedDay="selectedDay"
                @eventClick="openEventDetailsModal"
                :events="meets"
                @eventDrop="eventDrop"
                @addEvent="openEventModal"
                @onSelect="onSelect"/>
    </div>
    <div class="w-full xl:w-3/12 md:px-4 pt-16">
      <MonthCalendar v-model:selectedDay="selectedDay" :actionDates="actionDates"/>
    </div>
  </section>

  <AddMeetModal
      @updateRange="updateRange"
      @refresh="refresh"
      :start="start"
      :end="end"
      ref="eventModal"
  />
  <MeetModal
      @refresh="refresh"
      :event="currentEvent"
      @onDelete="closeEventDetailsModal"
      ref="eventDetailsModal"/>
  <ConfirmModal @cancel="cancelDelete" @ok="okDelete" ref="deleteMeetModal"/>
</template>

<script lang="ts" setup>
import Calendar from "@/components/Calendar/index.vue"
import MonthCalendar from "@/components/Calendar/MonthCalendar.vue"
import AddMeetModal from "@/components/Modal/AddMeetModal.vue"
import ConfirmModal from "@/components/Modal/ConfirmModal.vue"
import MeetModal from "@/components/Modal/MeetModal.vue"
import { inject, ref } from "vue";
import { format, startOfToday, subHours } from "date-fns";
import type { Ref } from "vue";
import type { Meet } from "@/types/meet";
import { deleteMeet, getMeets, updateMeet } from "@/Api/meet";
import type { EventDef, EventDropArg, EventInput } from "@fullcalendar/common";
import type { Notyf } from "notyf";

/*Refs*/
const meets: Ref<Meet[]> = ref([])
const currentEvent: Ref<EventDef | { title?: string, extendedProps?: Record<string, any> }> = ref({})
const selectedDay = ref(startOfToday())
const today = new Date().toString()
const start = ref(today)
const end = ref(today)

const actionDates = ref([] as string[])
const eventModal = ref()
const deleteMeetModal = ref()
const eventDetailsModal = ref()

/*Sets*/
const setActionDates = () => actionDates.value = meets.value.map((el) => {
  return new Date(el.start).toISOString();
})

/*Api methods*/
const refresh = () => {
  getMeets().then(r => {
    r.map((e: Meet & { eventId: number }) => {
      e.eventId = e.id
      e.start = new Date(e.start)
      e.end = new Date(e.end)
    })
    meets.value = r
    setActionDates()
  })
}
refresh()

/*Hooks*/
const notyf: Notyf | undefined = inject('notyf')

/*Methods*/
const cancelDelete = () => {
  currentEvent.value = {}
}

const okDelete = () => {
  const meetId = currentEvent.value.extendedProps?.eventId
  if (meetId) {
    deleteMeet(meetId).then(r => {
      notyf?.success('Le rendez-vous à été supprimé.')
      refresh()
    }).catch((err) => {
      console.log(err)
      notyf?.error('Une erreur s\'est produite lors de la suppression')
    })
  }
}

const openEventModal = () => {
  eventModal.value.setShow(true)
}
const openEventDetailsModal = (arg: EventInput) => {
  currentEvent.value = arg.event
  eventDetailsModal.value.setShow(true)
}
const closeEventDetailsModal = () => {
  eventDetailsModal.value.setShow(false)
  deleteMeetModal.value.content.title = "Confirmation de suppression"
  deleteMeetModal.value.content.text = `Voulez-vous vraiment supprimer le rendez-vous ${currentEvent.value.title} ?`
  deleteMeetModal.value.setShow(true)
}

const eventDrop = (arg: EventDropArg) => {
  const isoFormat = 'yyyy-MM-dd hh:mm:ss'
  const meetId = arg.event.id

  if (meetId) {

    const start = new Date(arg.event.start || new Date())
    const end = new Date(arg.event.end || start)
    const command = {
      title: arg.event.title,
      start: format(start.setHours(start.getHours() - 2), isoFormat),
      end: format(end.setHours(end.getHours() - 2), isoFormat),
      allDay: arg.event.allDay,
      chef: arg.event.extendedProps?.chef?.id,
      user: arg.event.extendedProps?.user?.id,
    }

    updateMeet(parseInt(meetId), command).then(r => {
      refresh()
      setActionDates()
    }).catch(err => {
      console.log(err)
      const message = err.response?.data || 'Une erreur s\'est produite lors de la modification.'
      notyf?.error(message)
    })
  }
}

const updateRange = (range: { start: string, end: string }) => {
  start.value = range.start
  end.value = range.end
}

const dateToUtcISo = (dateStr: string, dateOffset?: number) => {
  /*To utc*/
  const d = new Date(new Date(dateStr).getTime() - (new Date(dateStr).getTimezoneOffset() * 60000))
  if (dateOffset) {
    /*Remove days*/
    return new Date(new Date(d).getTime() - dateOffset).toISOString().toString()
  }
  return new Date(new Date(d)).toISOString().toString()
}

const onSelect = (arg: EventInput) => {
  /*Remove 1 day at end because fullcalendar adding 1 day of range*/
  const dateOffset = (24 * 60 * 60 * 1000);

  start.value = dateToUtcISo(arg.startStr)
  end.value = dateToUtcISo(arg.startStr)
  end.value = dateToUtcISo(arg.endStr, dateOffset)
  openEventModal()
}
</script>
