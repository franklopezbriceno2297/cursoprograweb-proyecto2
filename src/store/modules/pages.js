// Local Imports
import pageList from '@/data/pages'

const pages = {
  namespaced: true,
  state: () => ({
    pages: pageList
  }),
  mutations: {
    createPage (state, payload) {
      state.pages.push(payload)
    },
    editPage (state, payload) {
      state.pages.forEach(page => {
        if (page.id === payload.id) {
          page.title = payload.title
          page.body = payload.body
          page.categoryPath = payload.categoryPath
        }
      })
    },
    deletePage (state, payload) {
      state.pages = state.pages.filter(page => (page.id !== payload))
    }
  },
  actions: {
  },
  getters: {
    getPageByID: (state, getters) => ({ id }) => (state.pages.find(page => (page.id === id))),
    getPagesByCategory: (state, getters) => ({ categoryPath }) => (categoryPath ? state.pages.filter(page => (page.categoryPath === categoryPath)) : [])
  }
}

export default pages
