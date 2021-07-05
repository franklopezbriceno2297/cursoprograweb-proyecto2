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
      <template v-if="pageExist">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-4">
            <li class="breadcrumb-item">
              <router-link to="/">Wiki</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/categorias">Categorias</router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">{{mainTitle}}</li>
          </ol>
        </nav>
        <form class="row g-4">
          <div class="col-sm-4">
            <label for="inputTitle" class="form-label h5 mb-3">Título</label>
            <input v-model="title" required type="text" class="form-control" id="inputTitle" />
          </div>
          <div class="col-sm-5"></div>
          <div class="col-sm-3">
            <label for="inputCategory" class="form-label h5 mb-3">Categoría</label>
            <select v-model="category" required id="inputCategory" class="form-select form-select-sm" aria-label="category select">
              <option v-if="(category === '')" disabled value="">Seleccione una Categoría</option>
              <option v-for="option in categories" :value="option.path" :key="option.id">{{ option.label }}</option>
            </select>
          </div>
          <div class="col-sm-12">
            <label for="inputBody" class="form-label h5 mb-3">Contenido</label>
            <textarea v-model="body" required class="form-control" id="inputBody" rows="15"></textarea>
          </div>
          <div class="col-sm-3">
            <button @click="wikiClickAction" :disabled="missingInputs" type="button" class="btn btn-primary">{{buttonTitle}}</button>
            <button @click="clearForm" :disabled="emptyInputs" type="button" class="btn btn-dark mx-2">Limpiar</button>
          </div>
          <div v-if="(successMessage !== '')" class="col-sm-3">
            <div class="alert alert-success mb-0 p-2" role="alert">{{successMessage}}</div>
          </div>
        </form>
      </template>
      <div v-else class="row">
        <div class="col-4">
          <div class="alert alert-danger mb-0 p-2" role="alert">¡Error, esta página no existe!</div>
        </div>
      </div>
    </template>
  </main>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

// Store
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'PageForm',
  data: () => ({
    successMessage: '',
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
    } else {
      this.pageExist = true
    }
  },
  computed: {
    ...mapGetters(
      'pages',
      ['getPageByID', 'getPagesByCategory']
    ),
    ...mapGetters(
      'categories',
      { categories: 'getCategories' }
    ),
    emptyInputs () {
      return (this.category.trim() === '' && this.title.trim() === '' && this.body.trim() === '')
    },
    missingInputs () {
      return (this.category.trim() === '' || this.title.trim() === '')
    },
    buttonTitle () {
      return (this.creationMode ? 'Guardar Wiki' : 'Guardar Edición')
    },
    mainTitle () {
      return (this.creationMode ? 'Crear Wiki' : `Editar Wiki - ${this.title}`)
    },
    creationMode () {
      return (this.$route.params.windowMode === 'crear')
    },
    displayMode () {
      return (this.$route.params.windowMode === 'mostrar')
    }
  },
  methods: {
    ...mapMutations(
      'pages',
      ['createPage', 'editPage']
    ),
    clearForm () {
      this.title = ''
      this.category = ''
      this.body = ''
    },
    wikiClickAction () {
      if (this.creationMode) {
        const newWiki = {
          id: uuidv4(),
          title: this.title,
          body: this.body,
          categoryPath: this.category
        }

        this.createPage(newWiki)
        this.clearForm()
        this.successMessage = '¡Wiki Agregada!'
        setTimeout(() => {
          this.successMessage = ''
        }, 5000)
      } else {
        const wiki = {
          id: this.id,
          title: this.title,
          body: this.body,
          categoryPath: this.category
        }
        this.editPage(wiki)
        this.$router.push({ path: `/wiki/mostrar/${this.id}` })
      }
    }
  }
}
</script>

<style>
</style>
