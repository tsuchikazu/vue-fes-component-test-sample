<template>
  <div>
    <h1>一覧</h1>
    <table>
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
    <router-link :to="{name: 'new-post'}">新規作成</router-link>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  created () {
    this.fetchPosts()
  },
  computed: {
    ...mapState(['posts'])
  },
  methods: {
    ...mapActions(['fetchPosts'])
  }
}
</script>

<style>
</style>
