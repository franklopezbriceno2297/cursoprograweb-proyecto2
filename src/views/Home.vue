<template>
  <div class="container mt-5">
   <h2 class="text-center">¡Bievenido a la wiki usando Vue.js!</h2>
   <div class="d-flex justify-content-center mt-5">
     <div>
       <router-link class="btn btn-success" to="/categorias">Ver Categorías</router-link>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>
