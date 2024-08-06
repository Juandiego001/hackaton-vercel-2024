export default function ({ $axios, app }) {
  $axios.onRequest((config) => {
    const csrf = app.$cookies.get('csrf_access_token')
    if (['post', 'patch', 'put', 'delete'].includes(config.method) &&
      !process.server && csrf) {
      config.headers.common['X-CSRF-TOKEN'] = csrf
    }
  })
}
