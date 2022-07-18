<template>
  <div class="month-calendar">
    <div class="flex items-center">
      <h2 class="flex-auto font-semibold text-gray-900">
        {{ format(firstDayCurrentMonth, 'MMMM yyyy', {locale: fr}) }}
      </h2>
      <button
          title="Mois précédent"
          type="button"
          @click="previousMonth"
          class="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
      >
        <ChevronLeftIcon class="w-5 h-5" aria-hidden="true"/>
      </button>
      <button
          title="Mois suivant"
          @click="nextMonth"
          type="button"
          class="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
      >
        <ChevronRightIcon class="w-5 h-5" aria-hidden="true"/>
      </button>
    </div>
    <div class="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
      <div>D</div>
      <div>L</div>
      <div>M</div>
      <div>Me</div>
      <div>J</div>
      <div>v</div>
      <div>S</div>
    </div>
    <div class="grid grid-cols-7 mt-2 text-sm">
      <div v-for="(day, dayIdx) in days" class="py-1.5"
           :key=day.toString()
           :class="dayIdx === 0 ? colStartClasses[getDay(day)]: null">
        <button
            type="button"
            @click="setSelectedDay(day)"
            class="mx-auto flex h-8 w-8 items-center justify-center rounded-full"
            :class="buttonClasses(day)"
        >
          <time :dateTime="format(day, 'yyyy-MM-dd')">
            {{ format(day, 'd') }}
          </time>
        </button>

                  <div class="w-1 h-1 mx-auto mt-1">
                      <div v-if="hasAction(day)" class="w-1 h-1 rounded-full bg-sky-500"></div>
                  </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {fr} from "date-fns/locale";
import type { PropType } from "vue";
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/solid'
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
} from 'date-fns'
import { ref } from 'vue'



/*Props*/
const props = defineProps({
  actionDates: {type: Array as PropType<string[]>, default: () => ([])},
  selectedDay: {type: Date, default: startOfToday()}
})

/*Emits*/
const emit = defineEmits(['update:selectedDay'])

/*Refs*/
const currentDay = ref(props.selectedDay)
const setSelectedDay = (day: Date) => {
  currentDay.value = day
  emit('update:selectedDay', day)
}
const currentMonth = ref(format(currentDay.value, 'MMM-yyyy'))
const setCurrentMonth = (month: string) => currentMonth.value = month
const firstDayCurrentMonth = ref(parse(currentMonth.value, 'MMM-yyyy', new Date()))
const days = ref(eachDayOfInterval({
  start: firstDayCurrentMonth.value,
  end: endOfMonth(firstDayCurrentMonth.value),
}))
const colStartClasses = ref([
  '',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
])





/*Methods*/
const hasAction = (day: Date) => props.actionDates.some(date => isSameDay(parseISO(date), day))

const buttonClasses = (day: Date) => {
  let classes = ''

  if (isEqual(day, currentDay.value)) {
    classes += "text-white "
  }
  if (!isEqual(day, currentDay.value) && isToday(day)) {
    classes += "text-red-500 "
  }
  if (!isEqual(day, currentDay.value) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth.value)) {
    classes += "text-gray-900 "
  }
  if (!isEqual(day, currentDay.value) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth.value)) {
    classes += "text-gray-400 "
  }
  if (isEqual(day, currentDay.value) && isToday(day)) {
    classes += "bg-red-500 "
  }
  if (isEqual(day, currentDay.value) && !isToday(day)) {
    classes += "bg-gray-900 "
  }
  if (!isEqual(day, currentDay.value)) {
    classes += "hover:bg-gray-200 "
  }
  if (isEqual(day, currentDay.value) || isToday(day)) {
    classes += "hover:bg-gray-200 "
  }

  return classes
}

const refreshCalendar = (month: Date) => {
  firstDayCurrentMonth.value = month

  setSelectedDay(month)

  days.value = eachDayOfInterval({
    start: firstDayCurrentMonth.value,
    end: endOfMonth(firstDayCurrentMonth.value),
  })
}

const previousMonth = () => {
  let firstDayPrevMonth = add(firstDayCurrentMonth.value, { months: -1 })
  refreshCalendar(firstDayPrevMonth)
  setCurrentMonth(format(firstDayPrevMonth, 'MMM-yyyy'))
}

const nextMonth = () => {
  let firstDayNextMonth = add(firstDayCurrentMonth.value, { months: 1 })
  refreshCalendar(firstDayNextMonth)
  setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
}
</script>
