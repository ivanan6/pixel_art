<template>
    <div class="header">
      <h1>{{ title }}</h1>
    </div>
  </template>
  
  <script setup lang="ts">
    defineProps<{title: String}>()
  </script>
  
  <style scoped>
    
    .header {
    font-size: 1rem;
    margin-bottom: 1rem;
    color: #995b48;
    }
  
  </style>