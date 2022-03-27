<script setup>
import { useUsersStore } from '../stores/users'
import TableStatus from '../components/TableStatus.vue'

const usersStore = useUsersStore()

// fetch users
usersStore.getUsers()

const onClickDelete = id => {
  if (confirm('Are you sure to delete item?')) {
    usersStore.removeUser(id) // delete user
      .then(res => {
        usersStore.getUsers() // fetch users
      })
  }
}

</script>

<template>
  
  <h3>
    Users
    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" v-if="usersStore.isLoading"/>
  </h3>

  <router-link :to="{ name: 'users-create' }" class="btn btn-primary btn-sm mt-3 mb-3">
    <i class="fas fa-plus"></i> Add
  </router-link>

  <table class="table">
    <thead>
      <tr>
        <td>id</td>
        <th>Name</th>
        <th>E-mail</th>
        <th>notify</th>
        <th>notify spam</th>
        <th>roles</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="usersStore.users" v-for="user in usersStore.users">
        <td>{{ user.id }}</td>
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>
          <TableStatus :status="user.notify" />
        </td>
        <td>
          <TableStatus :status="user.notify_spam" />
        </td>
        <td>
          {{ user.roles.join(', ') }}
        </td>
        <td class="text-end">

          <router-link :to="{name: 'users-edit', params: {id: user.id}}" class="ms-2">
            <i class="far fa-edit"></i>
          </router-link>

          <a href="#" @click.prevent="onClickDelete(user.id)" class="ms-2 text-danger">
            <i class="far fa-trash-alt"></i>
          </a>

        </td>
      </tr>
    </tbody>
  </table>

  <!-- todo: implement pagination -->
  
</template>

<style scoped lang="sass">

</style>
