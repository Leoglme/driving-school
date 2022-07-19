<template>
  <div v-if="show"
       class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
    <div class="relative p-4 w-full max-w-2xl h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
            {{ content.title }}
          </h3>
          <button @click="setShow(false)" type="button"
                  class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg
              text-sm p-2 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-toggle="authentication-modal">
            <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                 xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
        <!-- Modal body -->
        <div class="p-6 space-y-6">
          <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {{ content.text }}
          </p>
        </div>
        <!-- Modal footer -->
        <div
            class="flex items-center justify-end p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
          <button @click="onCancel" data-modal-toggle="defaultModal" type="button"
                  class="text-gray-500 bg-white hover:bg-gray-100 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
            Annuler
          </button>
          <button @click="onOK" data-modal-toggle="defaultModal" type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Confirmer
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="show" class="opacity-25 fixed inset-0 z-40 bg-black"></div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { defineEmits } from 'vue'

const content = ref({
  title: null,
  text: null
})

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'ok'): void
}>()

const show = ref(false)
const setShow = ((value: boolean) => show.value = value)

const onCancel = () => {
  setShow(false)
  emit('cancel')
}
const onOK = () => {
  setShow(false)
  emit('ok')
}

defineExpose({ setShow, content });
</script>

