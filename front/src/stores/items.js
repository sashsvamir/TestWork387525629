import { defineStore } from 'pinia'

import { api } from '../api'


export const useItemsStore = defineStore({
  id: 'items',

  state: () => ({
    items: null,
    isLoading: false,
  }),

  actions: {

    getItems() {
      this.isLoading = true
      return api.get('/api/admin/items')
        .then(res => { this.items = res.data.data })
        .finally(() => { this.isLoading = false })
    },

    getItem(id) {
      this.isLoading = true
      return api.get('/api/admin/items/' + id)
        // .then(res => res)
        .finally(() => { this.isLoading = false })
    },

    removeItem(id) {
      this.isLoading = true
      return api.delete('/api/admin/items/' + id)
        // .then(res => res)
        .finally(() => { this.isLoading = false })
    },

  },

})
