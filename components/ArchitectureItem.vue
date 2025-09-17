<template>
  <div class="item" :style="{ backgroundColor: color, width: width }">
    {{ text }}
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string
  color: string
  width?: string
}>()
</script>

<style scoped>
.item {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  text-align: center;
  font-size: 0.75rem;
  font-weight: 500;
  color: white;
  white-space: nowrap;
}
</style>
