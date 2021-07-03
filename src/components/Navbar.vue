<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Wiki</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">Categorias</a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <template v-for="category in categories" :key="category.id">
                <li>
                  <router-link class="dropdown-item" :to="`/categorias/${category.path}`">{{category.label}}</router-link>
                </li>
              </template>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <router-link class="dropdown-item" to="/categorias">Mostrar Todas</router-link>
              </li>
            </ul>
          </li>
        </ul>
        <div class="d-flex">
          <a class="btn btn-sm" href="/logout" login >Cerrar Sesión</a>
          <a class="btn btn-sm" href="/login" login >Iniciar Sesión</a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(
      'categories',
      {
        categories: 'getCategories'
      }
    )
  }
}
</script>

<style scoped lang="scss">
</style>
