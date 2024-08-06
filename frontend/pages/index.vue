<template lang="pug">
v-row.secondary.mx-0.my-0
  v-col(align-self="start" cols="12")
    v-row.pt-5.justify-center
      v-sheet.py-4.px-5.rounded-pill(color="primary" dark elevation=20)
        .text-h5 ISuggestU
  v-col(cols="12")
    v-row.justify-center
      //- Card con los resultados
      v-col(v-if="result" cols="12")
        v-card.rounded-xl.primary.mx-auto(dark max-width="800px" elevation=20)
          v-card-title.justify-center Resultados de análisis
          v-card-text
            v-form.text-center
              v-textarea(v-model="result"
              label="Aquí aparecerán tus resultados del análisis" readonly
              rows="14")
              v-btn.primary(@click="result=''") Finalizar

      //- Card to add images
      v-col(v-if="!result" cols="12" md="6")
        v-card.rounded-xl.primary.mx-auto(dark max-width="500px" elevation=20)
          v-card-title.justify-center Agregar imágenes
          v-card-text
            v-form.text-center
              v-file-input(v-model="image" label="Agregar imágenes" filled
              prepend-icon="" small-chips append-icon="mdi-upload" clearable
              single)
              v-btn.primary(@click="sendImages") Iniciar

      //- Card to add links
      v-col(v-if="!result" cols="12" md="6")
        v-card.rounded-xl.primary.mx-auto(dark max-width="500px" elevation=20)
          v-card-title.justify-center Agregar enlace
          v-card-text
            v-form.text-center
              v-text-field(v-model="link" label="Agregar enlace" type="text"
              append-icon="mdi-link" filled)
              v-btn.primary(@click="sendLink") Iniciar
  v-col.pb-5.white--text(align-self="end" cols="12")
    p.mb-0.text-caption.text-center
      | Proyecto originalmente desarrollado para la hackaton de Vercel
      | 2024. Para más información hacer click{{' '}}
      a.text-decoration-none.white--text(href="http://google.com") aquí.
    p.mb-0.text-caption.text-center isuggestu.ai | Voxel SAS © 2024
</template>

<script>
import { imagesRoute, linkRoute } from '../mixins/routes'

export default {
  name: 'IndexPage',
  layout: 'empty',
  data () {
    return {
      image: null,
      link: '',
      result: ''
    }
  },
  head () {
    return {
      title: 'Home'
    }
  },
  methods: {
    async sendImages () {
      try {
        console.log(this.image)
        if (!this.image) {
          this.showSnackbar({ response: { data: { message: 'Por favor agregar imágenes' }, status: 500 } })
          return
        }

        const formData = new FormData()
        formData.append('image', this.image)

        const { message, iaResponse } = await this.$axios.$post(imagesRoute, formData)
        this.result = iaResponse
        this.showSnackbar(message)
        this.image = null
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        // this.showSnackbar(err)
      }
    },
    async sendLink () {
      try {
        if (!this.link) {
          this.showSnackbar({ response: { data: { message: 'Por favor agregar un enlace' }, status: 500 } })
          return
        }
        const { message, iaResponse } = await this.$axios.$post(linkRoute, { link: this.link })
        this.result = iaResponse
        this.showSnackbar(message)
        this.link = ''
      } catch (err) {
        // eslint-disable-next-line no-console
        console.log(err)
        // this.showSnackbar(err)
      }
    }
  }
}
</script>
