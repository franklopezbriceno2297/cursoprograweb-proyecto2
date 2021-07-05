// Local Imports
import { categories as categoryList } from '@/data/categories.json'

const categories = {
  namespaced: true,
  state: () => ({
    categories: categoryList
  }),
  mutations: {
    addCategory (state, payload) {
      state.categories.push(payload)
    },
    deleteCategory (state, path) {
      state.categories = state.categories.filter(category => (category.path !== path))
    }
  },
  actions: {
  },
  getters: {
    getCategories: (state, getters) => state.categories,
    getCategoryByPath: (state) => ({ path }) => (state.categories.find(category => (category.path === path)))
  }
}

export default categories
