<template>
  <section id="planning" class="flex flex-wrap">
    <div class="w-full xl:w-9/12 md:px-4">
      <Calendar v-model:selectedDay="selectedDay"
                :events="meets"
                @eventDrop="eventDrop"
                @addEvent="openEventModal"
                @onSelect="onSelect"/>
    </div>
    <div class="w-full xl:w-3/12 md:px-4 pt-16">
      <MonthCalendar v-model:selectedDay="selectedDay" :actionDates="actionDates"/>
    </div>
  </section>
  <AddMeetModal ref="eventModal"/>
</template>

<script setup>
import Calendar from "@/components/Calendar/index.vue"
import MonthCalendar from "@/components/Calendar/MonthCalendar.vue"
import AddMeetModal from "@/components/Modal/AddMeetModal.vue"
import {ref} from "vue";
import {startOfToday} from "date-fns";


/*Refs*/
const meets = ref([
  {
    id: 5,
    title: 'Event Now',
    start: new Date(),
    allDay: true,
  },
])
const selectedDay = ref(startOfToday())

const actionDates = ref([])
const setActionDates = () => actionDates.value = meets.value.map((el) => {
  return el.start.toISOString();
})
const eventModal = ref()


/*Methods*/
const openEventModal = () => {
  eventModal.value.setShow(true)
}


setActionDates()

const eventDrop = (arg) => {
  const meet = meets.value.find(e => e.id === parseInt(arg.event.id))
  if (meet) {
    meet.start = arg.event.start
  }
  //PUT

  setActionDates()
}

const onSelect = (arg) => {
  const title = prompt(`Would you like to add an event to ${arg.startStr} - ${arg.endStr} ?`);

  if (title) {
    meets.value.push({
      title,
      start: arg.start,
      end: arg.end,
      allDay: arg.allDay,
    });
    //create
    const obj = {
      title,
      chef: '',
      user: '',
      start: arg.start,
      end: arg.start,
      allDay: arg.allDay,
    }
    setActionDates()
  }
}
</script>
