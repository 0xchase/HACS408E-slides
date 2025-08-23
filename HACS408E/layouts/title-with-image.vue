<template>
  <div class="slidev-layout title-with-image w-full h-full relative !text-left" style="background: #1e1e1e;">
    <!-- Left side text content -->
    <div class="absolute left-16 top-1/2 transform -translate-y-1/2 z-10">
      <h1 class="text-6xl font-bold text-gray-100 mb-4">
        {{ $frontmatter.title || 'Title' }}
      </h1>
      <h2 class="text-3xl text-gray-300 mb-6">
        {{ $frontmatter.subtitle || 'Subtitle' }}
      </h2>
      <div class="text-lg text-gray-400 mb-8 max-w-md">
        {{ $frontmatter.description || 'Description' }}
      </div>
      <div 
        @click="$slidev.nav.next" 
        class="py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg inline-block cursor-pointer transition-colors text-white font-semibold"
      >
        {{ $frontmatter.buttonText || 'Get Started' }} 
        <carbon:arrow-right class="inline ml-2" />
      </div>
    </div>

    <!-- Right side framed image -->
    <div class="absolute right-16 top-1/2 transform -translate-y-1/2">
      <div class="relative">
        <div 
          class="absolute inset-0 rounded-lg transform rotate-3"
          :class="$frontmatter.frameGradient || 'bg-gradient-to-r from-blue-500 to-purple-600'"
        ></div>
        <div class="relative bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-600">
          <div 
            class="w-64 h-48 rounded-lg flex items-center justify-center"
            :class="$frontmatter.imageGradient || 'bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500'"
          >
            <div class="text-white text-6xl font-bold">
              {{ $frontmatter.imageText || 'HCI' }}
            </div>
          </div>
          <div class="mt-4 text-center text-gray-300 text-sm">
            {{ $frontmatter.imageCaption || 'Caption' }}
          </div>
        </div>
      </div>
    </div>

    <!-- Slot for additional content if needed -->
    <slot />
  </div>
</template>

<style scoped>
.title-with-image {
  background: #1e1e1e;
}
</style>
