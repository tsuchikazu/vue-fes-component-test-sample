<template>
  <div>
    <h1>一覧</h1>

    <p v-if="progress" class="progress">
      {{ message }}
    </p>
    <template v-else>
      <div v-if="posts.length === 0">
        まだ投稿はありません
      </div>
      <table v-else>
        <thead>
          <tr>
            <td>タイトル</td>
            <td>内容</td>
            <td>投稿日時</td>
            <td>更新日時</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in posts" :key="post.id">
            <td><router-link :to="{name: 'edit-post', params: {id: post.id}}">{{post.title}}</router-link></td>
            <td>{{post.body}}</td>
            <td>{{post.createdAt}}</td>
            <td>{{post.updatedAt}}</td>
          </tr>
        </tbody>
      </table>
    </template>
    <router-link :to="{name: 'new-post'}">新規作成</router-link>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  data () {
    return {
      progress: false,
      message: ''
    }
  },
  created () {
    this.loadPosts()
  },
  computed: {
    ...mapState(['posts'])
  },
  methods: {
    ...mapActions(['fetchPosts']),
    async loadPosts () {
      this.setProgress('読み込み中...')
      try {
        await this.fetchPosts()
      } finally {
        this.hideProgress()
      }
    },
    setProgress (message) {
      this.progress = true
      this.message = message
    },
    hideProgress () {
      this.progress = false
      this.message = ''
    }
  }
}
</script>

<style>
</style>
