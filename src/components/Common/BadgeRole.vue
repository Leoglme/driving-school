<template>
  <span :class="role.id !== undefined ? classes[role.id - 1] : 'bg-blue-100 text-blue-800'"
        class="text-sm font-medium mr-2 px-2.5 py-0.5 rounded">
    {{ role.name }}
  </span>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import type { Role } from "@/types/referenciel";

const { role } = defineProps({
  role: { type: Object as PropType<Role>, default: () => ({}) }
})

const classes = [
  'bg-yellow-100 text-yellow-800',
  'bg-green-100 text-green-800',
  'bg-pink-100 text-pink-800',
  'bg-red-100 text-red-800',
]
</script>
