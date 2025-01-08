<template>
    
    <div class="container">
        <Header title="Let's create new pixel art"/>

       
        <div class="matrica">
          <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="red">
            <div
              v-for="(col, colIndex) in row"
              :key="colIndex"
              class="pixel"
              :style="{ backgroundColor: col }"
              @click="promeniBoju(rowIndex, colIndex)"
              @mousedown="pocetak"
              @mouseup="kraj"
              @mousemove="crtaj(rowIndex,colIndex)"
            ></div>
          </div>
        </div> 
        <!-- <div class="tool-panel">
      <button @click="selectTool('pencil')">🖉 Olovka</button>
      <div class="color-picker">
        <label for="color-picker">Izaberi boju:</label>
        <input type="color" id="color-picker" v-model="selectedColor" />
      </div>
    </div> -->
    <Alat @tool-selected="selectTool" @color-changed="changeColor" />
          
    </div>
  
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import { ref } from 'vue'
import Alat from '@/components/Alat.vue';
const gridSize = 40;


const grid = ref(Array.from({ length: gridSize }, () => Array(gridSize).fill('white')));


const selectedColor = ref('black');
const selectedTool = ref('pencil');
let klik = false;

const promeniBoju = (row: number, col: number) => {
    if (selectedTool.value === 'pencil') {
    grid.value[row][col] = selectedColor.value;
  }
  else if (selectedTool.value ==='erase'){
    grid.value[row][col] = 'white';
  }
};
const crtaj = (row: number, col: number) => {
  if(klik===true){
    if (selectedTool.value === 'pencil') {
    grid.value[row][col] = selectedColor.value;
    }
    else if (selectedTool.value ==='erase'){
    grid.value[row][col] = 'white';
    }
  }
  
};
const selectTool = (tool: string) => {
  selectedTool.value = tool; 
};
const changeColor = (color: string) => {
  selectedColor.value = color; 
};
const pocetak = () =>{
  klik = true
}
const kraj = () =>{
  klik = false
}


</script>

<style scoped>
  .container {
  margin: 0 auto;
  max-width: 800px;
  padding: 1rem;
  width: 100%;
  text-align: center; 
}


.matrica{
  display: flex;
  flex-direction: column;
}

.red {
  display: flex;
  margin : 0; 
}

.pixel {
  width: 15px; 
  height: 15px; 
  cursor: pointer; 
  box-sizing: border-box; 
  outline: 1px solid #d1c7c7; 
  /* background-color: white;  */
}
.color-picker {
  margin-top: 10px;
}
.tool-panel button:hover {
  background-color: #e0e0e0; 
  
}
.tool-panel {
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  gap: 10px; 
  color: black
}
.tool-panel button {
  padding: 10px 15px; 
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f0f0f0;
}

</style>