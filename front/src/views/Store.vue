<script setup>
import { ref } from 'vue'
import { useCounterStore } from '../stores/counter'


const counter = useCounterStore()

const replaceVal = ref(354)

const replaceCounter = e => {
  counter.$patch({ counter: replaceVal.value })
}

</script>

<template>

  <h1>Store</h1>

  <div class="text-center">
    <div class="mb-3">
      <span class="counter">{{ counter.counter }}</span>
    </div>
    <div class="mb-3">
      <button @click="counter.decrement()" class="btn btn-warning me-2">– Decrement</button>
      <button @click="counter.increment()" class="btn btn-warning">+ Increment</button>
    </div>
    <div class="mt-4 mb-3">
      <input class="form-control mb-2 mx-auto" type="number" style="max-width: 100px" v-model="replaceVal" required>
      <button @click="replaceCounter" class="btn btn-primary">replace</button>
    </div>
  </div>

</template>

<style scoped lang="sass">
.counter
  font-size: 2.5rem
</style>
