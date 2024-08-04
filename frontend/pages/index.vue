<template lang="pug">
v-row.secondary.mx-0.my-0
  v-col(align-self="start" cols="12")
    v-row.pt-5.justify-center
      v-sheet.py-4.px-5.rounded-pill(color="primary" dark elevation=20)
        .text-h5 ISuggestU
  v-col(cols="12")
    v-row.justify-center
      v-col(cols="12" md="6")
        v-card.rounded-xl.primary.mx-auto(dark max-width="500px" elevation=20)
          v-card-title.justify-center Agregar imágenes
          v-card-text
            v-form.text-center
              v-file-input(label="Agregar imágenes" multiple
              filled prepend-icon="" small-chips
              append-icon="mdi-upload" clearable)
              v-btn.primary Iniciar
      v-col(cols="12" md="6")
        v-card.rounded-xl.primary.mx-auto(dark max-width="500px" elevation=20)
          v-card-title.justify-center Agregar enlace
          v-card-text
            v-form.text-center
              v-text-field(label="Agregar enlace" type="text"
              append-icon="mdi-link" filled)
              v-btn.primary Iniciar
  v-col.pb-5.white--text(align-self="end" cols="12")
    p.mb-0.text-caption.text-center
      | Proyecto originalmente desarrollado para la hackaton de Vercel
      | 2024. Para más información hacer click{{' '}}
      a.text-decoration-none.white--text(href="http://google.com") aquí.
    p.mb-0.text-caption.text-center isuggestu.ai | Voxel SAS © 2024
</template>

<script>
export default {
  name: 'IndexPage',
  layout: 'empty',
  head () {
    return {
      title: 'Home'
    }
  }
}
</script>
