<template>
  <Navbar/>
  
   

  <div class="content">
    <RouterView />
  </div> 
  
  

  
</template>


<script setup lang="ts">
import {RouterView } from 'vue-router'
import Navbar from '@/components/Navbar.vue';

</script>

<style >
body {
    background: rgb(255, 253, 253);
    color: #FBE9E7;
  }

  #app {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .content {
    padding: 1rem;
  }

</style>
