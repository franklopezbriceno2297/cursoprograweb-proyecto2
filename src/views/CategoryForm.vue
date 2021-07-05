<template>
  <main class="container mt-4">
    <div class="d-flex justify-content-between mb-4">
      <h2 class="mb-0">{{title}}</h2>
      <div class="d-flex align-items-center">
        <router-link class="btn btn-secondary" to="/categorias">Volver a Categorias</router-link>
      </div>
    </div>
    <form class="row g-3">
      <div class="col-md-6 mt-4">
        <label for="inputLabelCategory" class="form-label">Nombre</label>
        <input v-model="label" required type="text" class="form-control" id="inputLabelCategory" placeholder="Nombre de la categoría" />
      </div>
      <div class="col-md-6 mt-4">
        <label for="inputPathCategory" class="form-label">Ruta</label>
        <input v-model="path" required type="text" class="form-control" id="inputPathCategory" placeholder="Ruta de la categoría" />
      </div>
      <div class="col-12 mt-4">
        <button type="button" :disabled="(missingInputs || editModeWithBadParams)" @click="addCategory" class="btn btn-primary">{{buttonTitle}}</button>
        <button type="button" :disabled="emptyInputs" @click="clearForm" class="btn btn-dark mx-2">Limpiar</button>
      </div>
      <div class="col-4">
        <div v-if="(errorMessage !== '')" class="alert alert-danger mb-0 p-2" role="alert">{{errorMessage}}</div>
        <div v-if="(successMessage !== '')" class="alert alert-success mb-0 p-2" role="alert">{{successMessage}}</div>
      </div>
    </form>
  </main>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'

// Store
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'CategoryForm',
  data: () => ({
    errorMessage: '',
    successMessage: '',
    label: '',
    path: '',
    currentPath: null
  }),
  mounted () {
    if (!this.creationMode) {
      const currentCategory = this.getCategory({ path: this.$route.params.path })
      if (currentCategory) {
        this.path = currentCategory.path
        this.currentPath = currentCategory.path
        this.label = currentCategory.label
      }
    }
  },
  computed: {
    ...mapGetters(
      'categories',
      { getCategory: 'getCategoryByPath' }
    ),
    emptyInputs () {
      return (this.label.trim() === '' && this.path.trim() === '')
    },
    missingInputs () {
      return (this.label.trim() === '' || this.path.trim() === '')
    },
    buttonTitle () {
      return (this.creationMode ? 'Guardar' : 'Guardar Edición')
    },
    title () {
      return (this.creationMode ? 'Agregar nueva categoría' : 'Editar Categoría')
    },
    creationMode () {
      return (this.$route.params.windowMode === 'nueva')
    },
    editModeWithBadParams () {
      const newCategory = this.getCategory({ path: this.path.trim() })
      return (!this.creationMode && ((this.currentPath === null) || !!newCategory))
    }
  },
  methods: {
    ...mapMutations(
      'categories',
      ['createCategory', 'deleteCategory']
    ),
    clearForm () {
      this.label = ''
      this.path = ''
      this.errorMessage = ''
    },
    addCategory () {
      if (!this.getCategory({ path: this.path.trim() })) {
        const newCategory = {
          id: uuidv4(),
          path: this.path.trim(),
          label: this.label.trim()
        }

        if (!this.creationMode) {
          this.deleteCategory(this.currentPath)
        }
        this.createCategory(newCategory)

        if (this.creationMode) {
          this.clearForm()
          this.successMessage = '¡Categoría Agregada!'
          setTimeout(() => {
            this.successMessage = ''
          }, 6000)
        } else {
          this.$router.push({ path: '/categorias' })
        }
      } else {
        this.successMessage = ''
        this.errorMessage = '¡Esta ruta ya existe!'
      }
    }
  }
}
</script>

<style>
</style>
