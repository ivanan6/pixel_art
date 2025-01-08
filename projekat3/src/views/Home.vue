<template>
    
      <div>
        <Header title="Create Together, One Pixel at a Time!"/>
         
        <p>
          Welcome to Pixel Canvas – the ultimate collaborative pixel art experience! Here, artists and creators from all over the world come together to create vibrant, intricate pixel art, one pixel at a time. Whether you’re a seasoned artist or just discovering the magic of pixel art, Pixel Canvas provides a space for creativity, teamwork, and fun.
        </p>
        <img src="@/assets/img/pozadina.webp" alt="">
      </div>
       
        
      
    
  </template>
  
  <script setup lang="ts">
  import Header from '@/components/Header.vue';
  
  </script>
  
  <style scoped>


  p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    color: #5c2d2d;

  }
  
 
  div {
  margin: 0 auto;
  max-width: 800px;
  padding: 1rem;
  width: 100%;
  text-align: center; 
}
img {
  max-width: 100%; 
  height: auto; 
  margin: 1rem auto; 
  border-radius: 8px; 
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
  </style>
  