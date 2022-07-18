<template>
  <section id="planning" class="flex flex-wrap">
    <div class="w-full xl:w-9/12 md:px-4">
      <Calendar v-model:selectedDay="selectedDay" :events="meets" @addEvent="onSelect" @onSelect="onSelect"/>
    </div>
    <div class="w-full xl:w-3/12 md:px-4 pt-16">
      <MonthCalendar v-model:selectedDay="selectedDay" :actionDates="actionDates"/>
    </div>
  </section>
</template>

<script setup>
import Calendar from "@/components/Calendar/index.vue"
import MonthCalendar from "@/components/Calendar/MonthCalendar.vue"
import {ref} from "vue";
import {startOfToday} from "date-fns";

const meets = ref([
  {
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

setActionDates()

const onSelect = (arg) => {
  const title = prompt(`Would you like to add an event to ${arg.startStr} - ${arg.endStr} ?`);

  if (title) {
    meets.value.push({ // add new event data
      title,
      start: arg.start,
      end: arg.end,
      allDay: arg.allDay,
    });
    setActionDates()
  }
}
</script>
