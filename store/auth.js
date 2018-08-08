export const state = () => ({
  isAuth: false,
})

export const mutations = {
  isAuthUpdate(state, boolean) {
    state.isAuth = boolean
  },
}
