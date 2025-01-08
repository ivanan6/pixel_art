<template>
    
    <div class="container">
        <Header title="Let's create new pixel art"/>

        <div>
   <!-- Proverite da li se prikazuje -->
</div>
<div class="matrica" @mouseleave="resetCursorPosition">
  
  <div v-for="(col, colIndex) in grid[0]" :key="colIndex" class="red">
   
    <div
      v-for="(row, rowIndex) in grid"
      :key="rowIndex"  
      class="pixel"
      :style="{ backgroundColor: grid[rowIndex][colIndex], width: velicinaPixela, height: velicinaPixela }"
      
      @click="promeniBoju(rowIndex, colIndex)"
      @mousedown="pocetak"
      @mouseup="kraj"
      @mousemove="crtaj(rowIndex, colIndex)"
      
    ></div>
  </div>
  <div
    v-if="kursor.x >= 0 && kursor.y >= 0"
    class="cursor"
    :style="{ 
      width: velicinaPixela, 
      height: velicinaPixela, 
      transform: `translate(${kursor.x * parseInt(velicinaPixela)}px, ${kursor.y * parseInt(velicinaPixela)}px)` 
    }"
    
  ><div class="cursor-name">{{ userName }}</div></div>

  <div v-for="(cursor, index) in otherCursors" :key="index" class="cursor" 
  :style="{ 
    width: velicinaPixela, 
    height: velicinaPixela, 
    transform: `translate(${cursor.x * parseInt(velicinaPixela)}px, ${cursor.y * parseInt(velicinaPixela)}px)` 
  }">
  <div class="cursor-name">{{ cursor.userName }}</div>
</div>

  
</div>
        <!-- <div class="tool-panel">
      <button @click="selectTool('pencil')">🖉 Olovka</button>
      <div class="color-picker">
        <label for="color-picker">Izaberi boju:</label>
        <input type="color" id="color-picker" v-model="selectedColor" />
      </div>
    </div> -->
    <div class="right">
        

        <v-dialog v-model= "dialog" max-width="500">
           <template v-slot:activator="{ props: activatorProps }">
             <v-btn
               v-bind="activatorProps"
               icon="mdi-content-save"
             ></v-btn>
           </template>
         
           <template v-slot:default="{ isActive }">
            
             <v-card title="Enter name">
              <v-text-field v-model="nameOfPic" label="Your Input" outlined dense></v-text-field>
               <v-card-actions>
                 <v-spacer></v-spacer>
                 <v-btn text="Potvrdi" @click="submitForm"></v-btn>
                  <v-btn text="Close" @click="isActive.value = false"></v-btn>
                </v-card-actions>
              </v-card>
            </template>
            
        </v-dialog>
        <Information ref="information"/>
        <Alat @tool-selected="selectTool" @color-changed="changeColor" />
      
        <div class="size-controls">
          <v-btn icon="mdi-minus" size="small" @click="promeniVelicinu(-1)"></v-btn>
          <span :style="{ color: 'black' }">{{ gridSize }}</span>
          <v-btn icon="mdi-plus" size="small" @click="promeniVelicinu(1)"></v-btn>
          
        </div> 
      
    </div>
      
  </div>
  
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import { computed, onMounted, ref,watch } from 'vue'
import Alat from '@/components/Alat.vue';
import { useAutoStore } from '@/stores/AutoStore';
import Information from '@/components/Information.vue';
import { usePicureStore } from '@/stores/Picture';
import type { BasePictureDto, NewPictureReq, PictureDto } from '@/types/picture';
import { useRoute } from 'vue-router';
import { io } from 'socket.io-client';



const information = ref <InstanceType<typeof Information> | null>(null)
const autoStore = useAutoStore();
const gridSize = ref(10);
const maxSize = 16;
const minSize =1;
let socket =null;
const kursor = ref({ x: -1, y: -1 });
const userName = ref(); 
const otherCursors = ref<any[]>([]);
if(localStorage.getItem('autoToken')){
  socket = io('http://localhost:3000');
  userName.value = autoStore.user?.username || ''
}
const updateCursorPosition = (row: number, col: number) => {
  kursor.value = { x: col, y: row };
  if (socket) {
    socket.emit('cursor-move', { x: col, y: row, roomId: ide, userName: userName.value });
  }
};

const resetCursorPosition = () => {
  kursor.value = { x: -1, y: -1 }; 
};



//const grid = ref(Array.from({ length: gridSize }, () => Array(gridSize).fill('white')));
const grid = ref<string[][]>(
  Array.from({ length: gridSize.value }, () => Array(gridSize.value).fill('#FFFFFF'))
);
const isValidCell = (row: number, col: number): boolean => {
  return row >= 0 && row < gridSize.value && col >= 0 && col < gridSize.value;
};

const selectedColor = ref('#000000');
const selectedTool = ref('pencil');
let klik = false;

const promeniBoju = (row: number, col: number) => {
  
    if (selectedTool.value === 'pencil') {
    grid.value[row][col] = selectedColor.value;
  }
  else if (selectedTool.value ==='erase'){
    grid.value[row][col] = '#FFFFFF';
  }
};
const crtaj = (row: number, col: number) => {
  updateCursorPosition(col,row)
  if(klik===true){
    if (selectedTool.value === 'pencil') {
    grid.value[row][col] = selectedColor.value;
    }
    else if (selectedTool.value ==='erase'){
    grid.value[row][col] = '#FFFFFF';
    }
  }
  if(localStorage.getItem('autoToken'))
    socket?.emit('update-grid', { roomId: String(ide), grid: grid.value });
  
  
  
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

const promeniVelicinu = (change: number) => {
  const newSize = gridSize.value + change;

  if (newSize >= minSize && newSize <= maxSize) {
    const newGrid = Array.from({ length: newSize }, (_, row) =>
      Array.from({ length: newSize }, (_, col) => (grid.value[row]?.[col] || 'white'))
    );

    grid.value = newGrid; 
    gridSize.value = newSize;
    
  }
  if(localStorage.getItem('autoToken'))
    socket?.emit('update-grid', { roomId: String(ide), grid: grid.value });
  
};
const velicinaMatrice = 400;
const velicinaPixela = computed(() => `${velicinaMatrice/gridSize.value}px`)
const nameOfPic = ref('');
const dialog = ref(false); 

const pictureStore = usePicureStore();

const submitForm = async () =>{
  
 
    const pic: BasePictureDto = {
      name: nameOfPic.value,
      picture_data: grid.value
    }
    dialog.value = false;
    try {
      
      if(postojeca!==null){
        try {
            const rez1 = await pictureStore.updatePicture(String(ide), pic);
            if(information.value)
              information.value.prikaz('Picture updated successfully','success');
            return
        } catch (error) {
          if(error instanceof Error)
            information.value?.prikaz(error.message,"error");
        }

      }else{
        console.log(123)
      const rez = await pictureStore.dodajSliku({name:nameOfPic.value, picture_data:grid.value});
      if(information.value)
      information.value.prikaz('Picture added successfully','success');
      }

    } catch (error) {
      
      if(error instanceof Error)
        information.value?.prikaz(error.message,"error");
    }
    
  
  //dialog.value = ref(false);

 
}
  const route = useRoute();
  const ide = route.params.pictureId;
  let postojeca: PictureDto|null=null;
  onMounted(async() =>{
    
    //const ide = route.params.pictureId;

    if(ide){
      const id = String(route.params.pictureId);
    
      
      try {
        const resp = await pictureStore.getPicture(id);

        const data = resp;
        postojeca =resp;
        grid.value = data.picture_data;
        gridSize.value = data.picture_data.length
      } catch (error) {
        if(error instanceof Error){
          if(information.value)
      information.value.prikaz(error.message,"error");
      }
        }
      }
    
  
        
    
  })
  watch(
  () => route.params.pictureId,  
  () => {
    grid.value = Array.from({ length: gridSize.value }, () => Array(gridSize.value).fill('#FFFFFF'))
    ;  
    
  },
  { immediate: true }
);

onMounted(() => {
  if (ide) {
    if(localStorage.getItem('autoToken'))
      socket?.emit('join-room', String(ide)); 
  }
  if(localStorage.getItem('autoToken')){
      socket?.on('grid-updated', (updatedGrid) => {
      grid.value = updatedGrid;
      gridSize.value = grid.value.length;
    });

    socket?.on('cursor-update', (cursorData) => {
      
    
    const existingCursor = otherCursors.value.find(cursor => cursor.userName === cursorData.userName);
    if (existingCursor) {
      existingCursor.x = cursorData.x;
      existingCursor.y = cursorData.y;
    } else {
      otherCursors.value.push(cursorData);
    }
  });

  if (socket) {
    
    socket.on('user-disconnected', ({ userId }) => {
      console.log(`User disconnected: ${userId}`);
      otherCursors.value = otherCursors.value.filter(cursor => cursor.userId !== userId);
    });
  }

  
  socket?.on('disconnect', () => {
    otherCursors.value = otherCursors.value.filter(cursor => cursor.userId !== socket.id);
  });
  }
  
  
  
});






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
  /* display: flex; */
  flex-direction: column;
  display: flex;
  flex-direction: column;
  width: 400px; 
  height: 400px;
  margin: 0 auto; /* Centriranje panela */
  margin-bottom: 10px
}

.red {
  display: flex;
  /* margin : 0;  */
}

.pixel {
  width: 20px; 
  height: 20px; 
  cursor: pointer; 
  /* box-sizing: border-box;  */
  outline: 1px solid #d1c7c7; 
  /* background-color: white;  */
}

.size-controls {
  display: flex;
  align-items: center;
  justify-content: center;
}

.size-controls button {
  width: 30px;
  height: 30px;
  font-size: 18px;
  margin: 0 5px;
  cursor: pointer;
}

.size-controls span {
  font-size: 20px;
  font-weight: bold;
  min-width: 50px;
  text-align: center;
}

.cursor {
  position: absolute;
  pointer-events: none; /* Kursor ne blokira događaje */
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.4); /* Poluprovidna boja */
  border: 2px solid rgba(255, 255, 255, 0.7); /* Osvetljeni obod */
  z-index: 1000; /* Da bude iznad piksela */
  transform: translate(-50%, -50%); /* Centriranje kursora */
}

.cursor-name {
  position: absolute;
  top: -25px; /* Odnosno, iznad kursora */
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  color: white;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 2px 5px;
  border-radius: 5px;
  font-weight: bold;
  z-index: 999; /* Ispod kursora, ali iznad piksela */
}





</style>