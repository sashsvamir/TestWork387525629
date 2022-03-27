import axios from 'axios'


const schema = import.meta.env.API_SCHEMA || 'http'
const host = import.meta.env.VITE_API_HOST || 'localhost'
const port = import.meta.env.API_PORT || '8000'

// setup new axios instance
const api = axios.create({
  baseURL: `${schema}://${host}:${port}`,
  withCredentials: true,
})

// add nprogress on axios requests
import { addProgressAxiosRequests } from '../utils/progress'
addProgressAxiosRequests(axios)





/**
 * Handler of xhr axios requests error.
 * @param err {Object}
 * @returns {Promise<never>}
 */
const apiErrorHandler = err => {

  const res = err.response
  let message

  // if response error
  if (res) {
    // if validation error
    if (res.status === 422) {
      message = res.data.message
      // if response error
    } else {
      message = res.data?.message || res.statusText
    }
    // if no response
  } else {
    message = err.message
  }

  // show message
  window.notify({ type: 'danger', message })

  // pass error to next catch()
  return Promise.reject(err)
}

api.interceptors.response.use(res => res, err => apiErrorHandler(err))







export { api }
