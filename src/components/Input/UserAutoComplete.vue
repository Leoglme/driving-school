<template>
  <div class="w-full relative">
    <div class="mt-1 relative border border-gray-300 overflow-hidden rounded-md shadow-sm">
      <input
          type="text"
          id="user-auto-complete"
          v-model="search"
          class="w-full px-3 py-3"
          autocomplete="off"
          placeholder="John Doe"
      />
    </div>
    <div v-show="data.length"
         class="absolute w-full z-50 bg-white border border-gray-300 mt-1 max-height-48 overflow-hidden overflow-y-scroll rounded-md shadow-md">
      <ul class="py-1">
        <li v-if="value"
            v-for="(value, index) in data"
            :key="index"
            @click="setInput(value.clients_name)"
            class="px-3 py-2 cursor-pointer hover:bg-gray-200">
          {{ value.clients_name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

/*Refs*/
const search = ref('')
const users = ref([
  { id: 1, clients_name: "Jane Doe" },
  { id: 2, clients_name: "John Doe" },
  { id: 3, clients_name: "Hello World" },
])

/*Methods*/
const setInput = (value: any) => {
  search.value = value
}

watch(() => search.value, (val) => {
  if (!val){
    users.value = []
  }
})


</script>
