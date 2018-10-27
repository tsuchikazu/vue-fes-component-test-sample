import Vue from 'vue'
import Router from 'vue-router'
import Posts from './pages/Posts.vue'
import NewPost from './pages/NewPost.vue'
import EditPost from './pages/EditPost.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    { path: '/', name: 'posts', component: Posts },
    { path: '/new', name: 'new-post', component: NewPost },
    { path: '/:id', name: 'edit-post', component: EditPost, props: (route) => ({id: Number(route.params.id)}) }
  ]
})
