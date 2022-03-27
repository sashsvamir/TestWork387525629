<script setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../api'
import FormInput from '../components/FormInput.vue'
import FormTextarea from '../components/FormTextarea.vue'

const router = useRouter()
const route = useRoute()

/**
 * @type {Object}
 */
const initialAttrs = {
  name: '',
  body: '',
  meta_description: '',
  meta_title: '',
}


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
    ? api.patch('/api/admin/items/' + id.value, state.model) // if model exists
    : api.post('/api/admin/items', state.model) // if new model

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
        router.push({ name: 'items-edit', params: { id: id.value } })
      })
  }
}



// init model
if (id.value) {
  isLoading.value = true
  api.get('/api/admin/items/' + id.value)
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

    <router-link :to="{name: 'items'}" class="mb-4 d-inline-block">← back</router-link>

    <h3>
      Item {{ id ?? 'new' }}
    </h3>

    <!--{{state}}-->

    <form @submit.prevent="onSubmit">

      <FormInput type="text" label="Name" attr="name" v-model="state.model.name" help="required field" :errors="state.errors" />
      <FormTextarea label="Body" attr="body" v-model="state.model.body" rows="5" :errors="state.errors" />
      <FormInput type="text" label="Meta title" attr="meta_title" v-model="state.model.meta_title" :errors="state.errors" />
      <FormTextarea label="Meta description" attr="meta_description" v-model="state.model.meta_description" rows="2" :errors="state.errors" />

      <button class="btn btn-primary">
        Update
        <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" v-if="isLoading" />
      </button>

    </form>

  </template>
</template>

<style scoped lang="sass">

</style>
