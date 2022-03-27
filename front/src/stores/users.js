import { defineStore } from 'pinia'

import { api } from '../api'


export const useUsersStore = defineStore({
  id: 'users',

  state: () => ({
    users: null,
    isLoading: false,
  }),

  actions: {

    getUsers() {
      this.isLoading = true
      return api.get('/api/admin/users')
        .then(res => { this.users = res.data.data })
        .finally(() => { this.isLoading = false })
    },

    getUser(id) {
      this.isLoading = true
      return api.get('/api/admin/users/' + id)
        // .then(res => res)
        .finally(() => { this.isLoading = false })
    },

    removeUser(id) {
      this.isLoading = true
      return api.delete('/api/admin/users/' + id)
        // .then(res => res)
        .finally(() => { this.isLoading = false })
    },

  },

})
