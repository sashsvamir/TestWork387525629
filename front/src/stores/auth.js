import { defineStore } from 'pinia'

import { api } from '../api'



export const useAuthStore = defineStore({
  id: 'auth',

  state: () => ({
    isAuth: null,
    user: null,
  }),

  actions: {

    getUser() {

      // get csrf
      return api.get('/sanctum/csrf-cookie')
        .then(res => {
          return Promise.resolve(

            // get user
            api.get('/api/user')
              .then(({ data }) => {
                this.user = data
              })

          )
        })
    },

    init() {
      // get csrf
      return api.get('/sanctum/csrf-cookie')
        .then(res => {
          return Promise.resolve(

            // get user
            api.get('/api/user')
              .then(res => {
                this.isAuth = true
                this.getUser()
              })
              .catch(err => {
                this.isAuth = false
              })

          )
        })
    },

    login(credentials) {

      // get csrf
      return api.get('/sanctum/csrf-cookie')
        .then(res => {
          return Promise.resolve(

            // try to login
            api.post('/api/login', credentials)
              .then(res => {
                this.isAuth = true
                this.getUser() // fetch user object
                // todo: redirect to authenticated page
                return Promise.resolve(res)
              })
              .catch(err => {
                // todo: show validation errors
                return Promise.reject(err)
              })
          )
        })

    },

    logout() {

      // get csrf
      return api.get('/sanctum/csrf-cookie')
        .finally(() => {
          this.isAuth = false
          this.user = null
        })
        .then(res => {
          return Promise.resolve(

            // try to logout
            api.post('/api/logout')

          )
        })
    },

  },

})
