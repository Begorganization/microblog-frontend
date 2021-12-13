<template>
  <b-navbar>
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ path: '/' }">
        <span class="subtitle">microblog</span>
      </b-navbar-item>
    </template>
    <template slot="start">
      <b-navbar-item href="/">
        Home
      </b-navbar-item>
      <b-navbar-item href="/about">
        About
      </b-navbar-item>
      <b-navbar-item v-if="isDev">
        <span @click="rolloutOverride">DEV</span>
      </b-navbar-item>
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div class="buttons" v-if="isLoggedIn">
          <a class="button is-primary" @click="logout">
            <strong>Logout</strong>
          </a>
          <a class="button is-text" v-if="user">
            <strong>{{user.username}}</strong>
          </a>
        </div>
        <div class="buttons" v-else>
          <a class="button is-primary" href="/signup">
            <strong>Sign up</strong>
          </a>
          <a class="button is-light" href="/login">
            Log in
          </a>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import Rox from 'rox-browser'

export default {
  methods: {
    logout () {
      this.$store.dispatch('logout')
    },
    rolloutOverride: () => {
      Rox.showOverrides()
    }
  },
  data () {
    return {
      isDev: process.env.NODE_ENV === 'development'
    }
  },
  created () {
    if (this.$store.state.isLoggedIn) {
      this.$store.dispatch('grabUser')
    }
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ]),
    ...mapState([
      'user'
    ])
  }
}
</script>
