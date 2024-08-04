<template lang="pug">
v-card(dark color="primary" max-width="550px")
  v-card-title.justify-center Registrarse
  v-card-text.px-7.pb-7
    v-form.white--text
      v-row
        v-col(cols="12")
          v-text-field(v-model="form.name" type="text"
          label="Ingresa tu nombre" hide-details="auto"
          background-color="secondary" filled)
        v-col(cols="12")
          v-text-field(v-model="form.email" type="email"
          label="Ingresa tu correo" hide-details="auto"
          background-color="secondary" filled)
        v-col(cols="12" md="6")
          v-text-field(v-model="form.pasword"
          label="Ingresa tu contraseña" type="password"
          background-color="secondary" hide-details="auto" filled)
        v-col(cols="12" md="6")
          v-text-field(v-model="form.confirmPasword"
          label="Confirma tu contraseña" type="password"
          background-color="secondary" hide-details="auto" filled)
        v-col.text-right(cols="12")
          NuxtLink.white--text.text-decoration-none(
          to="/reset-password") ¿Olvidaste tu contraseña?
        v-col.d-flex(cols="12")
          v-btn(NuxtLink to="/login" color="secondary") Regresar
          v-spacer
          v-btn(NuxtLink to="/signup" color="white" outlined) Registrarse
</template>

<script>
export default {
  name: 'SignUpPage',
  layout: 'auth',
  data () {
    return {
      form: {
        name: '',
        email: '',
        text: '',
        password: '',
        confirmPassword: ''
      }
    }
  },
  head () {
    return {
      title: 'Sign Up'
    }
  }
}
</script>
