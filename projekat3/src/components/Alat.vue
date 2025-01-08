<template>
    <!-- <div class="tool-panel">
        <v-btn @click="selectTool('pencil')">🖉 Olovka</v-btn>
        <v-btn @click="selectTool('erase')"> erase</v-btn>
        <div class="color-picker">
            <label for="color-picker">Izaberi boju:</label>
            <input type="color" id="color-picker" v-model="selectedColor" @input="emitColorChange"/>
        </div>
    </div> -->



<v-container>
    <v-btn @click="selectTool('pencil')">
      <v-icon>mdi-pencil</v-icon>
    </v-btn>

    <v-btn @click="selectTool('erase')">
      <v-icon>mdi-eraser</v-icon>
    </v-btn>

    <<div class="color-picker">
            <label for="color-picker"></label>
            <input type="color" id="color-picker" v-model="selectedColor" @input="emitColorChange"/>
        </div>
</v-container>


  
  
</template>

<script setup lang="ts">
import { ref,defineEmits } from 'vue'


const emit = defineEmits(['tool-selected', 'color-changed']);
const selectedColor = ref('#000000');


const selectTool = (tool: string) => {
  emit('tool-selected', tool);
};
const emitColorChange = () => {
  emit('color-changed', selectedColor.value);
};

</script>

<style scoped>
.color-picker {
  margin-top: 5px;
}
/* .tool-panel button:hover {
  background-color: #e0e0e0; 
  
}
.tool-panel {
  margin-top: 20px;
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
} */
</style>