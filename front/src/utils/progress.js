
/**
 * Add NProgress library to indicate xhr loading progress.
 * Code below leads to auto showing the indicator (top blue line) of xhr axios requests.
 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


const addProgressAxiosRequests = axios => {

  const onRequestFunc = conf => {
    NProgress.start()
    return conf
  }
  const onResponseFunc = res => {
    NProgress.done(true)
    return res
  }
  const onErrorFunc = err => {
    NProgress.done()
    return Promise.reject(err)
  }
  const onProgressFunc = e => {
    const percentage = (Math.floor(e.loaded * 1.0) / e.total) * 0.9
    NProgress.set(percentage)
  }

  // on axios request/response and download/upload progress:
  axios.interceptors.request.use(onRequestFunc, onErrorFunc)
  axios.interceptors.response.use(onResponseFunc, onErrorFunc)
  axios.defaults.onDownloadProgress = onProgressFunc
  axios.defaults.onUploadProgress = onProgressFunc

}

export { addProgressAxiosRequests }
