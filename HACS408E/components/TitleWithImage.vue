<template>
  <div class="w-full h-full relative">
    <!-- Left side text content -->
    <div class="absolute left-16 top-1/2 transform -translate-y-1/2 z-10">
      <h1 class="text-6xl font-bold text-gray-100 mb-4">{{ title }}</h1>
      <h2 class="text-3xl text-gray-300 mb-6">{{ subtitle }}</h2>
      <div class="text-lg text-gray-400 mb-8 max-w-md">
        {{ description }}
      </div>
      <div 
        @click="$slidev.nav.next" 
        class="py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg inline-block cursor-pointer transition-colors text-white font-semibold"
      >
        {{ buttonText }} <carbon:arrow-right class="inline ml-2" />
      </div>
    </div>

    <!-- Right side framed image -->
    <div class="absolute right-16 top-1/2 transform -translate-y-1/2">
      <div class="relative">
        <div 
          class="absolute inset-0 rounded-lg transform rotate-3"
          :class="frameGradient"
        ></div>
        <div class="relative bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-600">
          <div 
            class="w-64 h-48 rounded-lg flex items-center justify-center"
            :class="imageGradient"
          >
            <div class="text-white text-6xl font-bold">
              {{ imageText }}
            </div>
          </div>
          <div class="mt-4 text-center text-gray-300 text-sm">
            {{ imageCaption }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
  description: string
  buttonText: string
  imageText: string
  imageCaption: string
  frameGradient: string
  imageGradient: string
}>()
</script>
