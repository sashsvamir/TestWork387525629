<script setup>
import {useAuthStore} from '../stores/auth'


const auth = useAuthStore()
</script>

<template>

  <h1>Welcome</h1>

  <h2 v-if="auth.user">
    {{ auth.user.name }}!
  </h2>

</template>

<style scoped>

</style>
