<template>
  <div class="column-container">
    <slot />
  </div>
</template>

<script setup lang="ts">
// Column component for vertical layout
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
</style>
