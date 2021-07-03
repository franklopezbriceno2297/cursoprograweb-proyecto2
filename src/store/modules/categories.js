// Local Imports
import categoryList from '@/data/categories'

const categories = {
  namespaced: true,
  state: () => ({
    categories: categoryList
  }),
  mutations: {
  },
  actions: {
  },
  getters: {
    getCategories: (state, getters) => state.categories
  }
}

export default categories
