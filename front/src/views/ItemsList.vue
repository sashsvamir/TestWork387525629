<script setup>
import { useItemsStore } from '../stores/items'

const itemsStore = useItemsStore()

// fetch items
itemsStore.getItems()

const onClickDelete = id => {
  if (confirm('Are you sure to delete item?')) {
    itemsStore.removeItem(id) // delete item
      .then(res => {
        itemsStore.getItems() // fetch items
      })
  }
}

</script>

<template>
  
  <h3>
    Items
    <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" v-if="itemsStore.isLoading"/>
  </h3>

  <router-link :to="{ name: 'items-create' }" class="btn btn-primary btn-sm mt-3 mb-3">
    <i class="fas fa-plus"></i> Add
  </router-link>

  <table class="table">
    <thead>
      <tr>
        <td>id</td>
        <th>Name</th>
        <th>meta-title</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="itemsStore.items" v-for="item in itemsStore.items">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.meta_title }}</td>
        <td class="text-end">

          <router-link :to="{name: 'items-edit', params: {id: item.id}}" class="ms-2">
            <i class="far fa-edit"></i>
          </router-link>

          <a href="#" @click.prevent="onClickDelete(item.id)" class="ms-2 text-danger">
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
