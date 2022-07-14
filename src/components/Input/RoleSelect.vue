<template>
  <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="role_id">
    Rôle
  </label>
  <select id="role_id"
          name="selectedRole"
          v-model="selectedRole"
          class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
    <option :value="role"
            v-for="role in roles"
            :key="role.id">{{ role.name }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { useReferencielStore } from "@/stores/referenciel";
import { ref, watch } from "vue";
import type { Role } from "@/types/referenciel";

interface Props {
  selected: Role | undefined
}

const { roles } = useReferencielStore()


const { selected } = defineProps<Props>()
const emit = defineEmits(['update:selected'])

const selectedRole = ref(selected || roles[0])

watch(selectedRole, (currentState) => {
  emit('update:selected', currentState)
}, { deep: true })

</script>
