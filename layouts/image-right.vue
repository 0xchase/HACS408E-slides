<template>
  <div class="slidev-layout image-right">
    <!-- Global Progress Indicator -->
    <GlobalProgress />
    
    <!-- Main slide content with image-right layout -->
    <div class="slide-content">
      <div class="content-left">
        <slot />
      </div>
      
      <div class="content-right" v-if="$frontmatter.image">
        <img 
          :src="$frontmatter.image" 
          :alt="$frontmatter.imageAlt || 'Slide image'"
          class="slide-image"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlobalProgress from '../components/GlobalProgress.vue'
</script>

<style scoped>
.image-right {
  width: 100%;
  height: 100%;
}

.slide-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  align-items: start;
  height: 100%;
  padding: 1rem;
  overflow: hidden;
  position: relative;
}

.content-left {
  overflow-y: auto;
  max-height: 100%;
}

.content-right {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  max-height: 100%;
  overflow: hidden;
  position: relative;
}

.slide-image {
  max-width: 100%;
  max-height: 60vh; /* Conservative height limit */
  width: auto;
  height: auto;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  object-fit: contain;
  object-position: top center;
  display: block;
  margin: 0;
  padding: 0;
}

/* Additional overflow protection */
.image-right {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}

/* Ensure the layout container doesn't exceed slide bounds */
.slidev-layout.image-right {
  overflow: hidden;
  max-height: 100vh;
}

/* Responsive design */
@media (max-width: 768px) {
  .slide-content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .content-right {
    order: -1; /* Image appears above text on small screens */
  }
}
</style>
