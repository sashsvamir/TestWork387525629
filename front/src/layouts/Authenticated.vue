<script setup>
import Navbar from '@/components/Navbar.vue'
</script>

<template>

  <Navbar />

  <!-- todo: implement breadcrumbs -->

  <main class="py-4">
    <div class="container-xl">

      <div class="container-xl">
        <div class="card">
          <div class="card-body p-4">
            <router-view />
          </div>
        </div>
      </div>

    </div>
  </main>

</template>

<style lang="sass">

</style>
