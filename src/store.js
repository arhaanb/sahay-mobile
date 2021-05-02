// import Vuex from 'vuex'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// export default new Vuex.Store({
export default createStore({
	plugins: [createPersistedState()],

	state: {
		user: {
			loggedIn: false,
			data: null
		}
	},

	getters: {
		user(state) {
			return state.user
		}
	},

	mutations: {
		SET_LOGGED_IN(state, value) {
			state.user.loggedIn = value
		},
		SET_USER(state, data) {
			state.user.data = data
		}
	},

	actions: {
		fetchUser({ commit }, user) {
			commit('SET_LOGGED_IN', user !== null)
			if (user) {
				commit('SET_USER', {
					email: user.email
				})
			} else {
				commit('SET_USER', null)
			}
		}
	}
})
