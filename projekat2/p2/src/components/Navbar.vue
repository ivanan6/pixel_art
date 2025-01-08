<template>
  <nav>
    <img src=@\assets\img\logo.webp alt="Logo" class="logo">
    <RouterLink :to = "{name: 'home'}">Home</RouterLink>
    <RouterLink :to = "{name: 'gallery'}">Gallery</RouterLink>
    <RouterLink :to = "{name: 'crtanje'}">New</RouterLink>
    <RouterLink :to = "{name: 'login'}">Login</RouterLink>
    <RouterLink :to = "{name: 'register'}">Register</RouterLink>


  </nav>


</template>

<script setup lang="ts">
    import { RouterLink } from 'vue-router'
</script>

<style scoped>
    
nav {
  background-color: rgb(53, 53, 65);
  color: #684338;
  padding: 1rem;
  text-align: center;
  width: 100% !important;
  display: flex;
  justify-content: left;
  border-bottom: solid 3px #c075dd;  
  /* z-index: 1000; */
  width: 100%;
  
  top: 0;
  left: 0;
}

a {
  color: rgb(220, 226, 240);
  text-decoration: none;
  margin-right: 2rem;
}

a:hover {
  background-color: #46607e;
}
.logo {
  width: 40px; 
  margin-right: 1rem; 
}

</style>