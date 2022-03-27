<script setup>
import LogoutBtn from './LogoutBtn.vue'
</script>

<template>

  <nav class="navbar navbar-expand-md navbar-light bg-white shadow-sm">
    <div class="container-xl">

      <a class="navbar-brand" href="#">
        <img src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg" alt="" width="30" height="24" class="d-inline-block align-text-top">
        Welcome
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link :to="{name: 'home'}" active-class="active" class="nav-link">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'users'}" active-class="active" class="nav-link">Users (CRUD)</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'items'}" active-class="active" class="nav-link">Items (CRUD)</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'about'}" active-class="active" class="nav-link">About</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'store'}" active-class="active" class="nav-link">Store</router-link>
          </li>
          <LogoutBtn />
        </ul>
      </div>

    </div>
  </nav>

</template>

<style lang="sass">

</style>
