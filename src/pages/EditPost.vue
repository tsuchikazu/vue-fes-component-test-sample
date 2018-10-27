<template>
  <div>
    <h1>編集</h1>
    <form class="form" novalidate >
      <div class="form-item">
        <label for="title">タイトル</label>
        <input id="title" v-model="post.title" type="text" >
      </div>
      <div class="form-item">
        <label for="body">内容</label>
        <input id="body" v-model="post.body" type="text" >
      </div>
      <button type="button" @click="update">保存</button>
    </form>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import isEmpty from 'lodash/isEmpty'

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  created () {
    if (isEmpty(this.post)) {
      this.fetchPost({ id: this.id })
    }
  },
  computed: {
    ...mapGetters(['postById']),
    post () {
      return this.postById(this.id)
    }
  },
  methods: {
    ...mapActions(['fetchPost', 'updatePost']),
    async update () {
      await this.updatePost({post: this.post})
      this.$router.push({ path: '/' })
    }
  }
}
</script>
