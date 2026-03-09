<template>
  <div class="calendar-skeleton">
    <!-- Header -->
    <header class="relative flex items-center justify-between border-b border-gray-200 py-4 px-6 lg:flex-none animate-pulse">
      <div class="h-7 w-32 bg-gray-200 rounded"></div>
      <div class="flex items-center gap-4">
        <div class="flex items-center rounded-md shadow-sm">
          <div class="h-10 w-10 bg-gray-200 rounded-l-md"></div>
          <div class="hidden lg:block h-10 w-24 bg-gray-200"></div>
          <div class="h-10 w-10 bg-gray-200 rounded-r-md"></div>
        </div>
        <div class="hidden lg:flex items-center gap-4">
          <div class="h-10 w-32 bg-gray-200 rounded-md"></div>
          <div class="h-10 w-48 bg-indigo-200 rounded shadow"></div>
        </div>
      </div>
    </header>

    <!-- Calendar Grid -->
    <div class="p-6">
      <!-- Days of week header -->
      <div class="grid grid-cols-7 gap-px bg-gray-200 border border-gray-200 rounded-t-lg overflow-hidden">
        <div v-for="day in ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim']" 
             :key="day"
             class="bg-gray-50 py-2 text-center text-xs font-semibold text-gray-700">
          {{ day }}
        </div>
      </div>

      <!-- Calendar cells -->
      <div class="grid grid-cols-7 gap-px bg-gray-200 border-x border-b border-gray-200 rounded-b-lg overflow-hidden">
        <div v-for="i in 35" 
             :key="i"
             class="bg-white min-h-[120px] p-2 relative">
          <!-- Day number skeleton -->
          <div class="absolute top-2 right-2">
            <div class="h-6 w-6 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
          
          <!-- Event skeletons (random pattern for realism) -->
          <div class="mt-8 space-y-1">
            <div v-if="shouldShowEvent(i, 0)" 
                 class="h-5 bg-gradient-to-r from-pink-100 to-pink-200 rounded animate-pulse"
                 :style="{ width: randomWidth(i, 0) }"></div>
            <div v-if="shouldShowEvent(i, 1)" 
                 class="h-5 bg-gradient-to-r from-pink-100 to-pink-200 rounded animate-pulse"
                 :style="{ width: randomWidth(i, 1) }"></div>
            <div v-if="shouldShowEvent(i, 2)" 
                 class="h-5 bg-gradient-to-r from-pink-100 to-pink-200 rounded animate-pulse"
                 :style="{ width: randomWidth(i, 2) }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading indicator -->
    <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div class="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-lg shadow-lg border border-gray-200">
        <div class="flex items-center gap-3">
          <svg class="animate-spin h-5 w-5 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span class="text-sm font-medium text-gray-700">Chargement du planning...</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Pattern pseudo-aléatoire pour les events du skeleton (déterministe pour éviter les flickers)
const shouldShowEvent = (cellIndex: number, eventIndex: number): boolean => {
  const seed = cellIndex * 7 + eventIndex
  // Environ 30% des cellules ont des events
  return (seed * 17 + 13) % 10 < 3
}

const randomWidth = (cellIndex: number, eventIndex: number): string => {
  const seed = cellIndex * 7 + eventIndex
  const widths = ['60%', '70%', '80%', '90%']
  return widths[(seed * 23) % widths.length]
}
</script>

<style scoped>
.calendar-skeleton {
  position: relative;
  background: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
