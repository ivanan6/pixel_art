<template>
  <nav>
    <img src=@\assets\img\logo.webp alt="Logo" class="logo">
    <RouterLink :to = "{name: 'home'}">Home</RouterLink>
    <RouterLink :to = "{name: 'gallery', params:{page:1}}" @click="setPageToFirst">Gallery</RouterLink>
    <RouterLink :to = "{name: 'crtanje'}">New</RouterLink>
    <template v-if = "!autoStore.isLogg">
      <RouterLink :to = "{name: 'login'}">Login</RouterLink>
      <RouterLink :to = "{name: 'register'}">Register</RouterLink>
    </template>
    <template v-else>
     <a  @click="handleLogout">Logout</a> 
 
      <div class="navbar-right">
        
        <div class="user-badge">
          <span class="circle">{{ userInitial }}</span>
        </div>
      </div>
      
    </template>


  </nav>


</template>

<script setup lang="ts">
    import { RouterLink } from 'vue-router'
    import { useAutoStore } from '@/stores/AutoStore';
    import { usePicureStore } from '@/stores/Picture';
import { computed } from 'vue';
    const pictureStore = usePicureStore();
    const autoStore = useAutoStore();
    const isLogg = computed(() => autoStore.isLogg);
    const userInitial = computed(() => autoStore.user?.username?.[0]?.toUpperCase() || '');
    const handleLogout = () => {
    autoStore.logout();
};
const setPageToFirst = () => {
  pictureStore.setPage(1);
};
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
  cursor: pointer;
}
.logo {
  width: 40px; 
  margin-right: 1rem; 
}
.circle {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #aa8262;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  margin-right: 5px;
}


.navbar-right {
  margin-left: auto
}



</style>