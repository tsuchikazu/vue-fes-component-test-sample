import Vuex from 'vuex'
import {
  state,
  getters,
  mutations,
  actions,
} from '@/store'
import sinon from 'sinon'
import { Factory } from 'rosie'

export function createStubStore () {
  const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
  })
  sinon.stub(store, 'dispatch').resolves()

  store.state.posts = [Factory.build('post')]
  return store
}
