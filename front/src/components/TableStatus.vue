<script setup>
import { computed } from 'vue'

const props = defineProps({
  status: Boolean,
})

const statusClass = computed(() => {
  return props.status ? 'text-primary' : ''
})

const statusStyle = computed(() => {
  return props.status ? '' : 'opacity:.1'
})

</script>

<template>
  <span :class="statusClass" :style="statusStyle">
    <i class="fas fa-check"></i>
  </span>
</template>