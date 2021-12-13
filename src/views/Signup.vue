<template>
  <div class="container">
    <br>
    <div class="box">
      <h2 class="is-size-4 has-text-centered">Register</h2>
      <hr class="hr">
      <form @submit.prevent="register({ username, email, password})" class="form">
        <div class="field">
          <label class="label">Username</label>
          <div class="control">
            <input v-model="username" class="input" type="text" placeholder="homerjsimpson">
          </div>
        </div>
        <div class="field">
          <label class="label">Email</label>
          <div class="control">
            <input v-model="email" class="input" type="email" placeholder="homer@example.com">
          </div>
        </div>
        <div class="field">
          <label class="label">Password</label>
          <div class="control">
            <input v-model="password" class="input" type="password" placeholder="super secure password">
          </div>
        </div>
        <div class="field is-grouped">
          <div class="control">
            <button class="button is-link" type="submit">Submit</button>
          </div>
          <div class="control">
            <a class="button is-text" href="/login">Already have an account?</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  data () {
    return {
      username: '',
      email: '',
      password: ''
    }
  },
  methods: {
    register () {
      this.$store.dispatch('register', {
        username: this.username,
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push('/login')
      })
    }
  }
}
</script>
