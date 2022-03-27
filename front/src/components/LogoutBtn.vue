<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'


const router = useRouter()
const auth = useAuthStore()
const isVisible = ref(false)

const onLogout = e => {
  auth.logout()
    .then(res => {
      // redirect to login page
      router.push({
        name: 'login',
      })
    })
}

</script>

<template>
  <li v-if="auth.isAuth" @mouseenter="isVisible=true" @mouseleave="isVisible=false" class="nav-item dropdown">

    <a href="#" @click.prevent class="nav-link dropdown-toggle">
      {{auth.user?.name}}
    </a>

    <div :class="{ show: isVisible }" class="dropdown-menu dropdown-menu-end">
      <a href="#" @click.prevent="onLogout" class="dropdown-item">
        Logout
      </a>
    </div>

  </li>
</template>

<style lang="sass">
.logout-link
  position: relative
  .logout-btn
    position: absolute
    left: 12px
    top: 18px
</style>