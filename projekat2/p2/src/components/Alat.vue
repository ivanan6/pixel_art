<template>
    <div class="tool-panel">
        <button @click="selectTool('pencil')">🖉 Olovka</button>
        <button @click="selectTool('erase')"> erase</button>
        <div class="color-picker">
            <label for="color-picker">Izaberi boju:</label>
            <input type="color" id="color-picker" v-model="selectedColor" @input="emitColorChange"/>
        </div>
    </div>
  
  
</template>

<script setup lang="ts">
import { ref,defineEmits } from 'vue'


const emit = defineEmits(['tool-selected', 'color-changed']);
const selectedColor = ref('black');


const selectTool = (tool: string) => {
  emit('tool-selected', tool);
};
const emitColorChange = () => {
  emit('color-changed', selectedColor.value);
};

</script>

<style scoped>
.color-picker {
  margin-top: 10px;
}
.tool-panel button:hover {
  background-color: #e0e0e0; 
  
}
.tool-panel {
  margin-top: 10px;
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