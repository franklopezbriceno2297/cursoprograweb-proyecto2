<template>
  <main class="container mt-4">
    <div class="d-flex justify-content-between mb-3">
      <h2 class="mb-0">{{title}}</h2>
      <div class="d-flex align-items-center">
        <router-link class="btn btn-success" to="/categoria/nueva/0">Agregar</router-link>
      </div>
    </div>
    <div class="row">
      <template v-for="category in categories" :key="category.id">
        <div class="col-12 col-sm-6 col-md-4 col-xl-3 mt-3">
          <div class="card text-dark bg-light">
            <div class="card-body">
              <h5 class="card-title mb-3">{{category.label}}</h5>
              <p class="card-text small mb-2">Ruta: {{category.path}}</p>
              <div class="d-flex justify-content-end">
                <router-link :to="`/categorias/${category.path}`" class="btn btn-secondary btn-sm">Mostrar</router-link>
                <router-link :to="`/categoria/editar/${category.path}`" class="btn btn-warning btn-sm mx-2">Editar</router-link>
                <button @click="deleteCategory(category.path)" class="btn btn-danger btn-sm">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="row mt-2">
      <div class="col-6">
        <div v-if="(errorMessage !== '')" class="alert alert-danger mb-0 p-2" role="alert">{{errorMessage}}</div>
        <div v-if="(successMessage !== '')" class="alert alert-success mb-0 p-2" role="alert">{{successMessage}}</div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Categories',
  data: () => ({
    title: 'Categorias',
    errorMessage: '',
    successMessage: ''
  }),
  computed: {
    ...mapGetters(
      'categories',
      { categories: 'getCategories' }
    ),
    ...mapGetters(
      'pages',
      { pagesByCategory: 'getPagesByCategory' }
    )
  },
  methods: {
    ...mapMutations(
      'categories',
      { removeCategory: 'deleteCategory' }
    ),
    deleteCategory (path) {
      const relatedPages = this.pagesByCategory({ categoryPath: path }).length

      if (relatedPages === 0) {
        this.errorMessage = ''
        this.removeCategory(path)

        this.successMessage = '¡Categoría Eliminada!'
        setTimeout(() => {
          this.successMessage = ''
        }, 6000)
      } else {
        this.successMessage = ''
        this.errorMessage = '¡No se puede eliminar, hay wikis ligadas a esta categoría!'
        setTimeout(() => {
          this.errorMessage = ''
        }, 6000)
      }
    }
  }
}
</script>

<style>
</style>
