// Local Imports
import pageList from '@/data/pages'

const pages = {
  namespaced: true,
  state: () => ({
    pages: pageList
  }),
  mutations: {
  },
  actions: {
  },
  getters: {
    getPagesByCategory: (state, getters) => ({ categoryPath }) => (categoryPath ? state.pages.filter(page => (page.categoryPath === categoryPath)) : [])
  }
}

export default pages
