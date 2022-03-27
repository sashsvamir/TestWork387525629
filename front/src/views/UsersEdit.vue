<script setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../api'
import FormInput from '../components/FormInput.vue'
import FormCheckbox from '../components/FormCheckbox.vue'

const router = useRouter()
const route = useRoute()

/**
 * @type {Object}
 */
const initialAttrs = {
  email: '',
  name: '',
  notify: false,
  notify_spam: false,
  roles: [],
  password: '',
}
/**
 * @type {string[]}
 */
const allowedRoles = ['admin', 'moderator']


// get model id from query
const id = ref(route.params.id || null)

const isLoading = ref(false)

const state = reactive({
  model: null,
  errors: null,
})
const setErrors = data => { state.errors = data }
const setModel = data => {
  // filter only allowed attributes
  const allowedAttrs = Object.keys(initialAttrs)
  const filteredData = Object.fromEntries(allowedAttrs.map(k => [k, data[k]]))
  state.model = filteredData
}


const onSubmit = e => {
  isLoading.value = true

  // determine create or update model
  const request = id.value
    ? api.patch('/api/admin/users/' + id.value, state.model) // if model exists
    : api.post('/api/admin/users', state.model) // if new model

  request
    .then(res => {
      setModel(res.data.data)
      setErrors(null)
      return res
    })
    .catch(err => {
      // if validation error
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors)
      }
      return Promise.reject(err)
    })
    .finally(() => { isLoading.value = false })

  // if new model created, update id and push router to "edit/:id"
  if (!id.value) {
    request
      .then(res => {
        id.value = res.data.data.id
        router.push({ name: 'users-edit', params: { id: id.value } })
      })
  }
}



// init model
if (id.value) {
  isLoading.value = true
  api.get('/api/admin/users/' + id.value)
      .then(res => {
        setModel(res.data.data)
        return Promise.resolve(res)
      })
      .finally(() => { isLoading.value = false })
} else {
  setModel(initialAttrs)
}

</script>

<template>
  <template v-if="state.model">

    <router-link :to="{name: 'users'}" class="mb-4 d-inline-block">← back</router-link>

    <h3>
      User {{ id ?? 'new' }}
    </h3>

    <!--{{state}}-->

    <form @submit.prevent="onSubmit">

      <FormInput type="text" label="E-mail" attr="email" v-model="state.model.email" help="required field" :errors="state.errors" />
      <FormInput type="text" label="Name" attr="name" v-model="state.model.name" help="required field" :errors="state.errors" />
      <FormInput type="password" label="Password" attr="password" v-model="state.model.password" help="required field, at least 4 characters" :errors="state.errors" />
      <FormCheckbox label="Notify" attr="notify" v-model="state.model.notify" :errors="state.errors" />
      <FormCheckbox label="Notify on spam" attr="notify_spam" v-model="state.model.notify_spam" :errors="state.errors" />

      <button class="btn btn-primary">
        Update
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" v-if="isLoading" />
      </button>

    </form>

  </template>
</template>

<style scoped lang="sass">

</style>
