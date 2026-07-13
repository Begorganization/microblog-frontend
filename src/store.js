import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { userList } from './utils/users'
import posthog from 'posthog-js'

const LOGIN = 'LOGIN'
const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
const LOGOUT = 'LOGOUT'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),
    user: null
  },
  mutations: {
    [LOGIN] (state) {
      state.pending = true
    },
    [LOGIN_SUCCESS] (state) {
      state.isLoggedIn = true
      state.pending = false
    },
    [LOGOUT] (state) {
      state.isLoggedIn = false
    }
  },
  actions: {
    login ({ commit, dispatch }, creds) {
      commit(LOGIN)
      let matchedUser = null
      userList.map((user) => {
        if (user.username === creds.username && user.password === creds.password) {
          matchedUser = user
        }
      })
      if (matchedUser !== null) {
        localStorage.setItem('user', matchedUser.username)
        localStorage.setItem('token', 'true')
        commit(LOGIN_SUCCESS)
        posthog.identify(matchedUser.username, { company: matchedUser.company })
        posthog.capture('user_logged_in', { login_method: 'local' })
      } else {
        axios.post(`${process.env.VUE_APP_BASE_API_URL}/api/token/`, creds,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            localStorage.setItem('token', response.data.access)
            dispatch('grabUser')
            commit(LOGIN_SUCCESS)
            posthog.identify(creds.username)
            posthog.capture('user_logged_in', { login_method: 'api' })
          })
          .catch(err => {
            console.log('error:', err)
            commit(LOGOUT)
            posthog.capture('login_failed', { login_method: 'api' })
          })
      }
    },
    register ({ commit, dispatch }, creds) {
      axios.post(`${process.env.VUE_APP_BASE_API_URL}/users/register/`, creds,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          console.log('User created!!!')
          posthog.identify(creds.username)
          posthog.capture('user_signed_up')
        })
        .catch(err => {
          console.log('error:', err)
        })
    },
    logout ({ commit }) {
      localStorage.removeItem('token')
      commit(LOGOUT)
      posthog.capture('user_logged_out')
      posthog.reset()
    },
    grabUser ({ commit }) {
      axios.get(`${process.env.VUE_APP_BASE_API_URL}/users/me/`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(resp => {
          this.state.user = { ...resp.data[0] }
        })
        .catch(e => {
          this.state.user = {
            username: localStorage.getItem('user')
          }
          console.log(`error: ${e}`)
        })
    }
  },

  getters: {
    isLoggedIn: state => {
      return state.isLoggedIn
    },
    getUser: state => {
      return state.user
    }
  }
})
