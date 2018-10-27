import Vue from 'vue'
import Vuex from 'vuex'
import client from './api-client'
import moment from 'moment'

Vue.use(Vuex)

export const state = () => ({
  posts: []
})

export const getters = {
  postById: state => id => {
    return Object.assign({}, state.posts.find(post => post.id === id))
  }
}

export const mutations = {
  addPost (state, { post }) {
    state.posts.push(post)
  },
  updatePost (state, { post }) {
    state.posts = state.posts.map(p => (p.id === post.id ? post : p))
  },
  clearPosts (state) {
    state.posts = []
  }
}

export const actions = {
  async fetchPost ({ commit }, { id }) {
    const response = await client.get(`/posts/${id}`)
    commit('addPost', { post: response.data })
  },
  async fetchPosts ({ commit }) {
    function wait (sec) {
      return new Promise(resolve => setTimeout(resolve, sec * 1000))
    }
    await wait(3)
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

export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
})
