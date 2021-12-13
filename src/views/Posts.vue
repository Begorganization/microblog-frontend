<template>
  <div class="container">
    <hr class="hr is-invisible">
    <div class="box" style="background-color: #22243c;">
      <div class="columns">
        <div class="column is-three-quarters">
          <h1 class="title" style="color: white;"><span v-if="show_title"> Hello DevOps World | </span> Share Your Thoughts! v1.0.2 </h1>
        </div>
        <div class="column">
          <img src="../assets/DW_wordmark.png"/>
        </div>
      </div>
      <hr class="hr">
      <div class="columns" v-if="show_sidebar">
        <div class="box column is-three-quarters">
          <div class="box">
            <b-field label="What's going on today?"
                     class="is-marginless"
            >
              <b-input v-model="message" maxlength="140" type="textarea"/>
            </b-field>
            <b-button type="is-dark" @click="addPost">Submit</b-button>
          </div>
          <hr class="hr">
          <ul>
            <li><span style="font-weight: bold; color: green;">Elena Benoit 9:37 am:</span> Really enjoying today's keynote!</li>
            <li><span style="font-weight: bold; color: green;">Brian Dawson 9:37 am:</span> First demo was awesome, looking forward to more product integrations.</li>
            <li><span style="font-weight: bold; color: green;">Kathy Lam 9:39 am:</span> Feature flags are the most underrated technology in software development today. Fight me on this.</li>
          </ul>
          <!-- Post v-for="post in posts" :key="post.id" :post="post"/ -->
        </div>
        <div class="box column">
          <h3 class="is-size-4 has-text-weight-bold">Users list</h3>
          <ul>
            <!-- li v-for="user in users" :key="user.url">
              <a :href="user.url">{{user.username}}</a>
            </li -->
            <li>Shawn Ahmed</li>
            <li style="font-weight: bold; color: green;">Emmanuel Bamishaye</li>
            <li style="font-weight: bold; color: green;">Elena Benoit</li>
            <li>April Mace</li>
            <li style="font-weight: bold; color: green;">Brian Dawson</li>
            <li>Logan Donley</li>
            <li style="font-weight: bold; color: green;">Kathy Lam</li>
            <li>Anand Chauhan</li>
          </ul>
        </div>
      </div>

      <div class="box" v-else>
        <div class="box">
          <b-field label="What's going on today?"
                   class="is-marginless"
          >
            <b-input v-model="message" maxlength="140" type="textarea"/>
          </b-field>
          <b-button type="is-dark" @click="addPost">Submit</b-button>
        </div>
        <hr class="hr">
        <ul>
          <li><span style="font-weight: bold; color: green;">Elena Benoit 9:37 am:</span> Really enjoying today's keynote!</li>
          <li><span style="font-weight: bold; color: green;">Brian Dawson 9:37 am:</span> First demo was awesome, looking forward to more product integrations.</li>
          <li><span style="font-weight: bold; color: green;">Kathy Lam 9:39 am:</span> Feature flags are the most underrated technology in software development today. Fight me on this.</li>
        </ul>
        <!-- Post v-for="post in posts" :key="post.id" :post="post"/-->
      </div>
    </div>
  </div>
</template>

<script>
import Post from '@/components/Post.vue'
import axios from 'axios'
import { mapGetters, mapState } from 'vuex'
import { Flags } from '../utils/flags'

export default {
  name: 'posts',
  components: {
    Post
  },
  data: function () {
    return {
      message: '',
      posts: [],
      users: [],
      errors: [],
      show_sidebar: Flags.sidebar.isEnabled(),
      show_title: Flags.title.isEnabled()
    }
  },
  created () {
    this.getPosts()
    this.getUsers()
  },
  computed: {
    ...mapGetters([
      'isLoggedIn'
    ]),
    ...mapState([
      'user'
    ])
  },
  methods: {
    getPosts: function () {
      axios.get(`${process.env.VUE_APP_BASE_API_URL}/posts/`)
        .then(response => {
          this.posts = response.data
        })
        .catch(error => {
          this.errors.push(error)
        })
    },
    getUsers: function () {
      axios.get(`${process.env.VUE_APP_BASE_API_URL}/users/`)
        .then(response => {
          this.users = response.data
        })
        .catch(error => {
          this.errors.push(error)
        })
    },
    addPost: function () {
      if (this.message.length > 1 && this.message.length <= 140) {
        axios.post(`${process.env.VUE_APP_BASE_API_URL}/posts/`, {
          user: this.user.url,
          message: this.message
        }, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        })
          .then(() => {
            this.getPosts()
            this.message = ''
          })
          .catch(e => {
            this.errors.push(e)
          })
      }
    }
  }
}
</script>
