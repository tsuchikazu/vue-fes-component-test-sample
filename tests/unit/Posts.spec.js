import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import { expect } from 'chai'
import sinon from 'sinon'
import flushPromises from 'flush-promises'
import VueRouter from 'vue-router'
import Posts from '@/pages/Posts.vue'

// ローカルなVueコンストラクタを作成
const localVue = createLocalVue()

// ローカルなVueコンストラクタにVuex/VueRouterをインストール
localVue.use(Vuex)
localVue.use(VueRouter)

describe('Posts.vue', () => {
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
    let wrapper

    beforeEach(() => {
      wrapper = mount(Posts, { stubs: ['router-link'], mocks: { $router }, store, localVue })
    })

    it('loading表示されること', () => {
      expect(wrapper.text()).to.contain('読み込み中...')
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
})
