<template>
  <div class="box">
    <div class="media">
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{post.user.username}}</strong> <small> {{ new Date(post.timestamp).toLocaleString("en-US")}}</small>
            <br>
            {{post.message}}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    post: Object
  }
}
</script>
