<template>
  <div v-if="show"
       class="overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex">
    <div class="relative w-auto my-6 mx-auto max-w-3xl">
      <!--content-->
      <div class="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
        <!--header-->
        <div class="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
          <h3 class="text-xl font-semibold">
            {{ content.title }}
          </h3>
          <button
              class="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
              @click="setShow(false)">
              <span class="bg-transparent text-black h-6 w-6 text-2xl block outline-none focus:outline-none">
                ×
              </span>
          </button>
        </div>
        <!--body-->
        <div class="relative p-6 flex-auto">
          <p class="my-4 text-blueGray-500 text-lg leading-relaxed">
            {{ content.text }}
          </p>
        </div>
        <!--footer-->
        <div class="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
          <button
              class="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
              type="button"
              @click="onCancel">
            Annuler
          </button>
          <button class="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg
            outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button"
                  @click="onOK">
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

