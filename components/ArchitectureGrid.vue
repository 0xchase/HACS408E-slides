<template>
  <div class="grid" :style="{ gridTemplateColumns: `repeat(${columns || 1}, 1fr)` }">
    <slot />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  columns?: number
}>()
</script>

<style scoped>
.grid {
  display: grid;
  gap: 0.25rem;
  width: 100%;
}

.grid > * {
  width: 100%;
}
</style>
