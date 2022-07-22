<template>
  <div class="relative w-full">
    <div class="overflow-hidden h-2 text-xs flex rounded" :style="{backgroundColor: state()['color-100']}">
      <div :style="[{backgroundColor: state()['color-500']}, {width: `${percentage}%`}]"
           class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center"></div>
    </div>
  </div>
</template>


<script lang="ts" setup>
/*Props*/
const props = defineProps({
  percentage: { type: Number, default: 0 }
})

/*Data*/
const statesColor = [
  { percentage: 75, 'color-100': '#fecaca', 'color-500': '#ef4444' },
  { percentage: 40, 'color-100': '#fed7aa', 'color-500': '#f97316' },
  { percentage: 0, 'color-100': '#bbf7d0', 'color-500': '#22c55e' }
]

/*Computed*/
const state = () => statesColor.find(c => c.percentage <= props.percentage)

</script>
