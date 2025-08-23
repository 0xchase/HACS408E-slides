<template>
  <div class="slidev-layout slide-with-progress">
    <!-- Slide Progress Indicator -->
    <div class="slide-progress">
      <div class="progress-content">
        <div 
          v-for="(slide, index) in slideList" 
          :key="index"
          class="slide-item"
          :class="{ 'current': index === currentIndex }"
        >
          {{ slide.title }}
        </div>
      </div>
    </div>
    
    <!-- Main slide content -->
    <div class="slide-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const currentIndex = ref(0)
const slideList = ref([
  { title: 'Title' },
  { title: 'Review' },
  { title: 'Overview' },
  { title: 'Topics' },
  { title: 'File ID' },
  { title: 'File Extract' },
  { title: 'Labs' },
  { title: 'Summary' }
])

// Try to detect current slide from various sources
const detectCurrentSlide = () => {
  // Look for h1 elements to determine slide type
  const h1 = document.querySelector('h1')
  if (h1 && h1.textContent) {
    const title = h1.textContent.trim()
    
    // More specific matching logic
    if (title.toLowerCase().includes('review')) {
      currentIndex.value = 1
    } else if (title.toLowerCase().includes('overview')) {
      currentIndex.value = 2
    } else if (title.toLowerCase().includes('topic')) {
      currentIndex.value = 3
    } else if (title.toLowerCase().includes('file') && title.toLowerCase().includes('id')) {
      currentIndex.value = 4
    } else if (title.toLowerCase().includes('file') && title.toLowerCase().includes('extract')) {
      currentIndex.value = 5
    } else if (title.toLowerCase().includes('lab')) {
      currentIndex.value = 6
    } else if (title.toLowerCase().includes('end') || title.toLowerCase().includes('summary')) {
      currentIndex.value = 7
    } else {
      currentIndex.value = 0 // Default to title slide
    }
  }
}

onMounted(() => {
  detectCurrentSlide()
  
  // Watch for DOM changes to update current slide
  const observer = new MutationObserver(() => {
    detectCurrentSlide()
  })
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })
})
</script>

<style scoped>
.slide-with-progress {
  width: 100%;
  height: 100%;
  position: relative;
}

.slide-progress {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 20px;
  background: linear-gradient(90deg, rgba(30, 30, 30, 0.95) 0%, rgba(30, 30, 30, 0.9) 100%);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(75, 85, 99, 0.3);
  z-index: 200;
  pointer-events: none;
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.progress-content {
  font-family: 'Monaco', 'Menlo', 'Consolas', monospace;
  font-size: 10px;
  line-height: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  overflow: hidden;
}

.slide-item {
  color: #6b7280;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;
  padding: 2px 6px;
  border-radius: 3px;
}

.slide-item.current {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
  font-weight: 500;
}

.slide-item:not(.current):hover {
  color: #9ca3af;
}

.slide-content {
  width: 100%;
  height: calc(100% - 25px);
  margin-top: 25px;
  padding: 0;
}
</style>
