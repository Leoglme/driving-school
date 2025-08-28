<template>
  <div class="relative flex w-full flex-wrap items-stretch">
    <input v-model="search" type="search" placeholder="Rechercher..."
           class="px-3 py-3 placeholder-slate-300 text-slate-600 relative bg-white bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:shadow-outline w-full pr-10"/>
    <span
        class="z-10 h-full leading-snug font-normal absolute text-center text-slate-300 absolute bg-transparent rounded text-base items-center justify-center w-8 right-0 pr-3 py-3">
    <i class="fas fa-search"></i>
  </span>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

const search = ref('')
const emit = defineEmits(['update:search'])
/*Watch*/
watch(() => search.value, (currentValue) => {
  emit('update:search', currentValue)
})
</script>
