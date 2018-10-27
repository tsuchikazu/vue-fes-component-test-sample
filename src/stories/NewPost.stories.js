/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import StoryRouter from 'storybook-vue-router'
import NewPost from '@/pages/NewPost.vue'
import { createStubStore } from './stub-store'

const store = createStubStore()

storiesOf('NewPost', module)
  .addDecorator(StoryRouter())
  .add('新規作成', () => ({
    components: { NewPost },
    template: '<new-post/>',
    store
  }))
