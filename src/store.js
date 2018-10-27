import Vue from 'vue'
import Vuex from 'vuex'
import client from './api-client'
import moment from 'moment'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    posts: []
  },
  getters: {
    postById: state => id => {
      return Object.assign({}, state.posts.find(post => post.id === id))
    }
  },
  mutations: {
    addPost (state, { post }) {
      state.posts.push(post)
    },
    updatePost (state, { post }) {
      state.posts = state.posts.map(p => (p.id === post.id ? post : p))
    },
    clearPosts (state) {
      state.posts = []
    }
  },
  actions: {
    async fetchPost ({ commit }, { id }) {
      const response = await client.get(`/posts/${id}`)
      commit('addPost', { post: response.data })
    },
    async fetchPosts ({ commit }) {
      const response = await client.get(`/posts`)
      commit('clearPosts')
      response.data.forEach(post => {
        commit('addPost', { post })
      })
    },
    async createPost ({ commit }, { post }) {
      const createdAt = moment().format()
      const updatedAt = moment().format()
      const response = await client.post(`/posts`, { ...post, createdAt, updatedAt })
      commit('addPost', { post: response.data })
    },
    async updatePost ({ commit }, { post }) {
      const updatedAt = moment().format()
      const response = await client.put(`/posts/${post.id}`, { ...post, updatedAt })
      commit('updatePost', { post: response.data })
    }
  }
})
