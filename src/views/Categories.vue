<template>
  <main class="container mt-4">
    <div class="d-flex justify-content-between mb-3">
      <h2 class="mb-0">{{title}}</h2>
      <div class="d-flex align-items-center">
        <router-link class="btn btn-success" to="/categorias/create">Agregar</router-link>
      </div>
    </div>
    <div class="row">
      <template v-for="category in categories" :key="category.id">
        <div class="col-12 col-sm-6 col-md-4 col-xl-3 mt-3">
          <div class="card text-dark bg-light">
            <div class="card-body">
              <h5 class="card-title mb-3">{{category.label}}</h5>
              <p class="card-text small mb-2">Ruta: {{category.path}}</p>
              <!-- <p class="card-text small">Fecha de Creación: {{created}}</p> -->
              <div class="d-flex justify-content-end">
                <router-link :to="`/categorias/${category.path}`" class="btn btn-secondary btn-sm">Mostrar</router-link>
                <!-- <router-link to="/categorias/{{id}}/edit" class="btn btn-warning btn-sm mx-2">Editar</router-link>
                <router-link to="/categorias/{{id}}/delete" class="btn btn-danger btn-sm">Eliminar</router-link> -->
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Categories',
  data: () => ({
    title: 'Categorias'
  }),
  computed: {
    ...mapGetters(
      'categories',
      { categories: 'getCategories' }
    )
  }
}
</script>

<style>
</style>
