<template lang="pug">
v-app
  v-row.secondary.mx-0.my-0
    v-col(align-self="center" cols="12")
      v-row.justify-center
        v-sheet.py-4.px-5.rounded-pill(color="primary" dark elevation=20)
          .text-h5 ISuggestU
    v-col(cols="12")
      v-row.justify-center
        Nuxt
    v-col.py-0.white--text(align-self="center" cols="12")
      p.mb-0.text-caption.text-center
        | Proyecto originalmente desarrollado para la hackaton de Vercel
        | 2024. Para más información hacer click{{' '}}
        a.text-decoration-none.white--text(href="http://google.com") aquí.
      p.mb-0.text-caption.text-center isuggestu.ai | Voxel SAS © 2024
</template>

<script>
export default {
  name: 'AuthLayout',
  data () {
    return {

    }
  }
}
</script>
