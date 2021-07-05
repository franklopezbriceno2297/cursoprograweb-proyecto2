<template>
  <main class="container my-4">
    <div class="d-flex justify-content-between mb-4">
      <div class="d-flex align-items-center">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0">
            <li class="breadcrumb-item">
              <router-link to="/">Wiki</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/categorias">Categorias</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{$route.params.categoryPath}}</li>
          </ol>
        </nav>
      </div>
      <router-link class="btn btn-success" to="/wiki/nueva/0">Agregar Página</router-link>
    </div>
    <table class="table table-striped mb-4">
      <thead>
        <tr>
          <th scope="col">Paginas</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="page in pages({ categoryPath: $route.params.categoryPath })" :key="page.id">
          <th>{{page.title}}</th>
          <th>
            <div class="d-flex justify-content-end">
              <router-link :to="`/wiki/mostrar/${page.id}`" class="btn btn-secondary btn-sm">Mostrar</router-link>
              <!-- <a href="/paginas/{{id}}/edit" class="btn btn-warning btn-sm mx-2">Editar</a>
              <a href="/paginas/{{id}}/delete" class="btn btn-danger btn-sm">Eliminar</a> -->
            </div>
          </th>
        </tr>
        <tr v-if="(pages({ categoryPath: $route.params.categoryPath }).length === 0)">
          <th>Vacío</th>
          <th></th>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Pages',
  data: () => ({
    // categoryPath: $route.params.categoryPath
  }),
  computed: {
    ...mapGetters(
      'pages',
      { pages: 'getPagesByCategory' }
    )
  }
}
</script>

<style>
</style>
