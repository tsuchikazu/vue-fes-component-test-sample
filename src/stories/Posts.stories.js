/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import StoryRouter from 'storybook-vue-router'
import Posts from '@/pages/Posts.vue'
import { createStubStore } from './stub-store'

const emptyPostsStore = createStubStore()
emptyPostsStore.state.posts = []
const store = createStubStore()

storiesOf('Posts', module)
  .addDecorator(StoryRouter())
  .add('空のとき', () => ({
    components: { Posts },
    template: '<posts/>',
    store: emptyPostsStore,
  }))
  .add('投稿があるとき', () => ({
    components: { Posts },
    template: '<posts/>',
    store
  }))
