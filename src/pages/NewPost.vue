<template>
  <div>
    <h1>新規作成</h1>
    <form class="form" novalidate >
      <div class="form-item">
        <label for="title">タイトル</label>
        <input id="title" v-model="post.title" type="text" >
      </div>
      <div class="form-item">
        <label for="body">内容</label>
        <input id="body" v-model="post.body" type="text" >
      </div>
      <button type="button" @click="save">保存</button>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    ...mapActions(['createPost']),
    async save () {
      await this.createPost({ post: this.post })
      this.$router.push({ path: '/' })
    }
  }
}
</script>
