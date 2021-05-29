import { logOut } from '~/endpoints/auth'

export const state = () => ({
  firstLogin: false,
  user: null,
  matchToBet: {},
})

export const mutations = {
  mutation: (state, { key, value }) => {
    if (state.hasOwnProperty(key)) {
      state[key] = value
    }
  },
  setMatchToBet(state, payload) {
    state.matchToBet = payload
  }
}

export const actions = {
  onAuthStateChangedAction({ state, commit }, { authUser }) {
    if (!authUser) {
      commit('mutation', { key: 'user', value: null })
      if (state.firstLogin) logOut() 
      
      return
    }
    
    const { uid, email, displayName, photoURL } = authUser
    const value = { uid, email, displayName, photoURL }
    commit('mutation', { key: 'user', value })
    
    if (!state.firstLogin) {
      commit('mutation', { key: 'firstLogin', value: true })
    }
  },
}

export const getters = {
  user: ({ user }) => user,
  matchToBet: ({ matchToBet }) => matchToBet,
}