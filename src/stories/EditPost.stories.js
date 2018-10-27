/* eslint-disable import/no-extraneous-dependencies */
import { storiesOf } from '@storybook/vue'
import StoryRouter from 'storybook-vue-router'
import EditPost from '@/pages/EditPost.vue'
import { createStubStore } from './stub-store'

const store = createStubStore()

storiesOf('EditPost', module)
  .addDecorator(StoryRouter())
  .add('更新', () => ({
    components: { EditPost },
    template: '<edit-post :id="1"/>',
    store
  }))
