<template lang="pug">
v-card(dark color="primary" max-width="450px")
  v-card-title.justify-center Iniciar sesión
  v-card-text.px-7.pb-7
    v-form.white--text
      v-row
        v-col(cols="12")
          v-text-field(v-model="form.username" type="email"
          label="Ingresa tu correo" hide-details="auto"
          background-color="secondary" filled)
        v-col(cols="12")
          v-text-field(v-model="form.password"
          label="Ingresa tu contraseña" type="password"
          background-color="secondary" hide-details="auto" filled)
        v-col.text-right(cols="12")
          NuxtLink.white--text.text-decoration-none(
          to="/reset-password") ¿Olvidaste tu contraseña?
        v-col.d-flex(cols="12")
          v-btn(color="secondary" ) Iniciar sesión
          v-spacer
          v-btn(NuxtLink to="/signup" color="white" outlined) Registrarse
</template>

<script>
export default {
  name: 'LoginPage',
  layout: 'auth',
  data () {
    return {
      form: {
        email: '',
        text: ''
      }
    }
  },
  head () {
    return {
      title: 'Login'
    }
  }
}
</script>
