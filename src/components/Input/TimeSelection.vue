<template>
  <v-date-picker v-model="range" mode="dateTime" is24hr is-range>
    <template v-slot="{ inputValue, inputEvents }">
      <div class="flex justify-center items-center">
        <Field
            :id="idStart"
            :name="idStart"
            v-model="inputValue.start"
            v-on="inputEvents.start"
            :class="errors.start ? 'border-red-500 focus:border-red-500': 'border-slate-200'"
            class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white
                  rounded-md text-sm focus:border-blue-600 focus:outline-none w-full ease-linear
                  transition-all duration-150 border-2 focus:ring-0"
        />
        <svg
            class="w-4 h-4 mx-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
          <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
        <Field
            :id="idEnd"
            :name="idEnd"
            v-model="inputValue.end"
            v-on="inputEvents.end"
            :class="errors.end ? 'border-red-500 focus:border-red-500': 'border-slate-200'"
            class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white
                  rounded-md text-sm focus:border-blue-600 focus:outline-none w-full ease-linear
                  transition-all duration-150 border-2 focus:ring-0"
        />
      </div>
      <span class="flex items-center justify-between gap-x-8">
          <span class="text-red-600 w-full text-left">{{ errors.start }}</span>
          <span class="text-red-600 w-full text-left">{{ errors.end }}</span>
      </span>
    </template>
  </v-date-picker>
</template>

<script lang="ts" setup>
import { Field } from 'vee-validate';
import { defineEmits, ref, watch } from "vue";

/*Props*/
const props = defineProps({
  errors: { type: Object, default: () => ({}) },
  start: { type: String, default: new Date().toISOString() },
  end: { type: String, default: new Date().toISOString() },
  idStart: { type: String, default: null },
  idEnd: { type: String, default: null }
})

/*Refs*/
const range = ref({
  start: props.start,
  end: props.end || props.start
})

/*Emit*/
const emit = defineEmits(['updateRange'])

watch(() => range.value, (val) => {
  const r = {
    start: new Date(val.start).toISOString().toString(),
    end: new Date(val.end).toISOString().toString()
  }
  emit('updateRange', r)
}, {deep: true})
</script>
