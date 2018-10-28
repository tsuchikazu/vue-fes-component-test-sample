import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { expect } from 'chai'
import sinon from 'sinon'
import flushPromises from 'flush-promises'
import Posts from '@/pages/Posts.vue'
import { Factory } from 'rosie'
import { screenshot } from 'karma-nightmare'

// ローカルなVueコンストラクタを作成
const localVue = createLocalVue()

// ローカルなVueコンストラクタにVuex/VueRouterをインストール
localVue.use(Vuex)

describe('Posts.vue', () => {
  let wrapper
  let actions
  let $router
  let store

  beforeEach(() => {
    // Vue Routerのモック設定
    $router = {
      push: sinon.spy()
    }

    // fetchPostsアクションの動作確認のためのVuex周りの設定
    actions = {
      fetchPosts: sinon.stub() // fetchPostsアクションのモック
    }
    store = new Vuex.Store({
      state: { posts: [] },
      actions
    })
  })

  describe('created', () => {
    beforeEach(() => {
      wrapper = mount(Posts, { stubs: ['router-link'], mocks: { $router }, store, localVue, attachToDocument: true })
    })

    it('loading表示されること', async () => {
      expect(wrapper.text()).to.contain('読み込み中...')
      await screenshot('./screenshots/Posts/created/loading.png')
    })

    it('fetchPostsがdispatchされること', () => {
      sinon.assert.calledOnce(actions.fetchPosts)
    })

    it('dispatchに成功した場合、loading表示が消えること', async () => {
      actions.fetchPosts.resolves()
      await flushPromises()
      expect(wrapper.text()).not.to.contain('読み込み中...')
    })
  })

  describe('表示', () => {
    beforeEach(async () => {
      wrapper = mount(Posts, { stubs: ['router-link'], mocks: { $router }, store, localVue })
      actions.fetchPosts.resolves()
      await flushPromises()
    })

    describe('投稿が0件の場合', () => {
      beforeEach(() => {
        store.state.posts = []
      })
      it('0件の表示がされていること', () => {
        expect(wrapper.text()).to.contain('まだ投稿はありません')
      })
    })

    describe('投稿が1件以上の場合', () => {
      const post = Factory.build('post')

      beforeEach(() => {
        store.state.posts = [post]
      })
      it('投稿の内容が表示されていること', () => {
        expect(wrapper.text()).to.contain(post.title)
      })
    })
  })
})
