<script setup>
import { useAuthStore } from './stores/auth'

import Authenticated from './layouts/Authenticated.vue'
import Guest from './layouts/Guest.vue'


// init auth state on first loading
const authStore = useAuthStore()
authStore.init()

</script>

<template>

  <div v-if="authStore.isAuth === null">
    <h2>Loading...</h2>
  </div>
  <div v-else-if="authStore.isAuth === true">
    <Authenticated />
  </div>
  <div v-else>
    <Guest />
  </div>


</template>

<style lang="sass">
@import './assets/base.sass'
</style>
