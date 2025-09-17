<template>
  <div class="column-container" :style="width ? `width: ${width}` : ''">
    <slot />
  </div>
</template>

<script setup lang="ts">
interface Props {
  width?: string
}

defineProps<Props>()
</script>

<style scoped>
.column-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  width: 100%;
  margin: 0.5rem 0;
}

/* Allow columns to grow and shrink within rows */
.row-container > .column-container {
  flex: 1 1 0; /* grow, shrink, basis */
  min-width: 0; /* Allow shrinking below content size */
  width: auto; /* Override width to let flex handle sizing */
}

/* When width is explicitly set, override flex behavior */
.row-container > .column-container[style*="width"] {
  flex: none;
}
</style>
