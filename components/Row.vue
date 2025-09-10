<template>
  <div class="row-container" :style="{ height: height }">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Row component for horizontal layout
defineProps<{
  height?: string
}>()
</script>

<style scoped>
.row-container {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: flex-start;
  width: 100%;
  margin: 1rem 0;
  max-width: none;
}

.row-container img {
  max-height: 100%;
  max-width: 100%;
  object-fit: contain;
  flex-shrink: 0;
}

</style>
