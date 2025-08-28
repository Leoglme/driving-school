<template>
  <label class="block uppercase text-slate-600 text-xs font-bold mb-2" for="role_id">
    Rôle
  </label>

  <select id="role_id"
          :disabled="props.disabled"
          name="selectedRole"
          v-model="selectedRole"
          class="border-0 px-3 py-3 placeholder-slate-300 text-slate-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150">
    <option :value="role"
            v-for="role in roles"
            :key="role.id">{{ role.name }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import { useReferencielStore } from "@/stores/referenciel.store";
import { ref, toRefs, watch } from "vue";
import type { PropType } from "vue";
import type { Role } from "@/types/referenciel";


const referenciel = useReferencielStore()
const { roles } = toRefs(referenciel.$state);

const props = defineProps({
  selected: { type: Object as PropType<Role | undefined>, default: undefined },
  disabled: { type: Boolean, default: false }
})
const emit = defineEmits(['update:selected'])

const selectedRole = ref(props.selected || roles.value[0])

watch(() => roles.value, (val) => {
  if (!selectedRole.value) {
    selectedRole.value = val[0]
  }
}, { deep: true })

watch(selectedRole, (currentState) => {
  emit('update:selected', currentState)
}, { deep: true })

</script>
