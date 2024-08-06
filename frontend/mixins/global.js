import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      showSnackbar: 'snackbar/show'
    })
  }
}
