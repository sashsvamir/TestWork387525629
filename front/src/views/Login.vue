<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import FormInput from '../components/FormInput.vue'


const auth = useAuthStore()
const router = useRouter()

const state = reactive({
  email: '',
  password: '',
  isLoading: false,
  errors: null,
})
const setErrors = data => { state.errors = data }

const submit = e => {
  state.isLoading = true
  auth.login(state)
      .then(res => {
        setErrors(null)
        // redirect to home
        router.push({
          name: 'home',
        })
      })
      .catch(err => {
        // if validation error
        if (err.response?.status === 422) {
          setErrors(err.response.data.errors)
        }
        return Promise.reject(err)
      })
      .finally(() => {
        state.isLoading = false
      })

}
</script>

<template>
  <div class="container-xl">
    <div class="row" style="min-height:90vh">
      <div class="col-md-6 col-lg-4 mx-auto my-auto">

        <div class="card">
          <div class="card-body p-4">

            <h1>Login</h1>

            <form @submit.prevent=submit>
              <FormInput type="email" label="Login" attr="email" v-model="state.email" placeholder="E-mail" :errors="state.errors" />
              <FormInput type="password" label="Password" attr="password" v-model="state.password" placeholder="Password" :errors="state.errors" />
              <button class="btn btn-primary">
                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" v-if="state.isLoading"/>
                Login
              </button>
            </form>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped lang="sass">

</style>
