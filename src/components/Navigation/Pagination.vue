<template>
  <div class="flex justify-end">
    <ul class="pagination bg-white p-2 shadow-sm rounded select-none">
      <li class="inline-block">
        <button
            :disabled="isInFirstPage"
            :class="{'cursor-not-allowed': isInFirstPage}"
            class="rounded-l rounded-sm border border-gray-100 px-3 py-2 cursor-not-allowed no-underline text-gray-600 h-10"
            v-if="isInFirstPage"
        >&laquo;
        </button>
        <button
            v-else
            :disabled="isInFirstPage"
            :class="{'cursor-not-allowed': isInFirstPage}"
            @click.prevent="onClickFirstPage"
            class="rounded-l rounded-sm border-t border-b border-l border-gray-100 px-3 py-2 text-gray-600 hover:bg-gray-100 no-underline"
            rel="prev"
        >
          &laquo;
        </button>
      </li>

      <li class="inline-block">
        <button
            type="button"
            @click="onClickPreviousPage"
            :disabled="isInFirstPage"
            aria-label="Go to previous page"
            class="rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2 text-sm"
            :class="{'cursor-not-allowed': isInFirstPage}"
        >Précédent
        </button>
      </li>

      <li
          v-for="page in pages"
          class="inline-block"
          :key="page.name"
      >
				<span
            class="rounded-sm border border-indigo-100 px-3 py-2 bg-indigo-100 no-underline text-indigo-500 cursor-not-allowed mx-2"
            v-if="isPageActive(page.name)"
        >{{ page.name }}</span>
        <a
            class="rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2"
            href="#"
            v-else
            @click.prevent="onClickPage(page.name)"
            role="button"
        >{{ page.name }}</a>
      </li>

      <li class="inline-block">
        <button
            @click="onClickNextPage"
            :disabled="isInLastPage"
            aria-label="Go to next page"
            class="rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline mx-2 text-sm"
            :class="{'cursor-not-allowed': isInLastPage}"
        >Suivant
        </button>
      </li>

      <li class="inline-block">
        <button
            :disabled="isInLastPage"
            class="rounded-r rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline"
            @click.prevent="onClickLastPage"
            rel="next"
            :class="{'cursor-not-allowed': isInLastPage}"
            v-if="hasMorePages"
        >&raquo;
        </button>
        <span
            class="rounded-r rounded-sm border border-gray-100 px-3 py-2 hover:bg-gray-100 text-gray-600 no-underline cursor-not-allowed"
            v-else
        >&raquo;</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>

/*Props*/
import { computed, ref, watch } from "vue";

const props = defineProps({
  maxVisibleButtons: { type: Number, default: 3 },
  totalPages: { type: Number, required: true },
  currentPage: { type: Number, default: 1 },
  hasMorePages: { type: Boolean, default: true },
  perPage: { type: Number, default: 10 },
  total: { type: Number, required: true }
});

const { maxVisibleButtons, currentPage } = props
const page = ref(currentPage)
/*Computed*/
const startPage = computed(() => {
  if (page.value === 1) {
    return 1;
  } else if (page.value === props.totalPages) {
    return props.totalPages - maxVisibleButtons + 1;
  }

  return page.value - 1;
})

const endPage = computed(() => Math.min(startPage.value + maxVisibleButtons - 1, props.totalPages))
const pages = computed(() => {
  const range = [];

  for (let i = startPage.value; i <= endPage.value; i += 1) {
    range.push({
      name: i,
      isDisabled: i === page.value
    });
  }
  return range;
})
const isInFirstPage = computed(() => page.value === 1)
const isInLastPage = computed(() => page.value === props.totalPages)

/*Emits*/
const emit = defineEmits(['update:currentPage'])

/*Methods*/
const onClickFirstPage = () => emit("update:currentPage", 1)
const onClickPreviousPage = () => emit("update:currentPage", page.value - 1)
const onClickNextPage = () => emit("update:currentPage", page.value + 1)
const onClickPage = (pageNum: number) => emit("update:currentPage", pageNum)
const onClickLastPage = () => emit("update:currentPage", props.totalPages)
const isPageActive = (pageNum: number) => page.value === pageNum


watch(() => props.currentPage, (val: number) => {
  page.value = val
});
</script>
