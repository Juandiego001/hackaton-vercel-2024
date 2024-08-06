<template lang="pug">
v-card(dark color="primary" max-width="450px")
  v-card-title.justify-center Iniciar sesión
  v-card-text.px-7.pb-7
    v-form.white--text(ref="form" @submit.prevent="login")
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
          v-btn(color="secondary" type="submit") Iniciar sesión
          v-spacer
          v-btn(NuxtLink to="/signup" color="white" outlined) Registrarse
</template>

<script>
import { loginRoute } from '../mixins/routes.js'

export default {
  name: 'LoginPage',
  layout: 'auth',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  head () {
    return {
      title: 'Login'
    }
  },
  methods: {
    async login () {
      try {
        if (!this.$refs.form.validate()) { return }
        await this.$axios.$post(loginRoute, this.form)
        this.showSnackbar('Inicio de sesión exitoso')
        this.$refs.form.reset()
        this.$refs.form.resetValidation()
        this.$router.push('/')
      } catch (err) {
        this.showSnackbar(err)
      }
    }
  }
}
</script>
