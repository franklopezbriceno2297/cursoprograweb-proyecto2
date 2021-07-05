<template>
    <main class="container my-4">
      <template v-if="displayMode">
        <template v-if="pageExist">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-4">
              <li class="breadcrumb-item">
                <router-link to="/">Wiki</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/categorias">Categorias</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link :to="`/categorias/${category}`">{{category}}</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">{{title}}</li>
            </ol>
          </nav>
          <form class="row g-4">
            <div class="col-sm-4">
              <label for="inputTitle" class="form-label h5 mb-3">Título</label>
              <input v-model="title" readonly type="text" class="form-control" id="inputTitle" />
            </div>
            <div class="col-sm-4">
              <label for="inputCategory" class="form-label h5 mb-3">Categoria</label>
              <input v-model="category" readonly type="text" class="form-control" id="inputCategory" />
            </div>
            <div class="col-sm-4">
              <label for="inputID" class="form-label h5 mb-3">Identificador</label>
              <input v-model="id" readonly type="text" class="form-control" id="inputID" />
            </div>
            <div class="col-sm-12">
              <label for="inputBody" class="form-label h5 mb-3">Contenido</label>
              <textarea v-model="body" readonly class="form-control" id="inputBody" rows="15"></textarea>
            </div>
          </form>
        </template>
        <div v-else class="row">
          <div class="col-4">
            <div class="alert alert-danger mb-0 p-2" role="alert">¡Error, esta página no existe!</div>
          </div>
        </div>
      </template>
      <template v-else>
      </template>

      <!-- {{#enableforms}}
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item">
              <a href="/">Wiki</a>
            </li>
            <li class="breadcrumb-item">
              <a href="/categorias">Categorias</a>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{mainTitle}}</li>
          </ol>
        </nav>
        <form class="row g-4">
          <div class="col-sm-4">
            <label for="inputTitle" class="form-label h5 mb-3">Título</label>
            <input required type="text" class="form-control" value="{{title}}" id="inputTitle" name="inputTitle" />
          </div>
          <div class="col-sm-5"></div>
          <div class="col-sm-3">
            <label class="form-label h5 mb-3">Categoría</label>
            <select required id="inputCategory" name="inputCategory" class="form-select form-select-sm" aria-label=".form-select-lg">
              {{^selectedCategoryFlag}}
                {{#cats}}
                  <option value="{{id}}">{{label}}</option>
                {{/cats}}
              {{~selectedCategoryFlag}}
              {{#selectedCategoryFlag}}
                {{#selectedCategory}}
                  <option selected value="{{catID}}">{{catLabel}}</option>
                {{/selectedCategory}}
                {{#cats}}
                  <option value="{{id}}">{{label}}</option>
                {{/cats}}
              {{/selectedCategoryFlag}}
            </select>
          </div>
          <div class="col-sm-12">
            <label for="inputBody" class="form-label h5 mb-3">Contenido</label>
            <textarea required name="inputBody" class="form-control" id="inputBody" rows="15">{{body}}</textarea>
          </div>
          <div class="col-12">
            <button type="submit" class="btn btn-primary">Guardar</button>
          </div>
        </form>
      {{/enableforms}} -->
  </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageForm',
  data: () => ({
    pageExist: false,
    id: '',
    title: '',
    body: '',
    category: ''
  }),
  mounted () {
    if (!this.creationMode) {
      const currentPage = this.getPageByID({ id: this.$route.params.pageId })
      if (currentPage) {
        this.id = currentPage.id
        this.title = currentPage.title
        this.body = currentPage.body
        this.category = currentPage.categoryPath
        this.pageExist = true
      }
    }
  },
  computed: {
    ...mapGetters(
      'pages',
      ['getPageByID', 'getPagesByCategory']
    ),
    creationMode () {
      return (this.$route.params.windowMode === 'nueva')
    },
    displayMode () {
      return (this.$route.params.windowMode === 'mostrar')
    }
  }
}
</script>

<style>
</style>
