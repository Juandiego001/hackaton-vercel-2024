export const state = () => ({
  username: '',
  name: '',
  epoch: 0
})

export const mutations = {
  updateSession (state, { username, name, epoch }) {
    state.username = username
    state.name = name
    state.epoch = epoch
  }
}
