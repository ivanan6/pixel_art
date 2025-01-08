<template >
    <v-row>
        <v-col v-for = "(picture,index) in pictures" :key = "picture.picture_id" cols = "4">
            <v-card class="matrix-card" style="background-color:rgb(228, 226, 228); ">
                <div class="matrica"  @click="onCardClick(picture)">
                    <div v-for="(y) in picture.picture_data[0].length" :key="y" class="red">
                      <div
                        v-for="(x) in picture.picture_data.length"
                        :key="x"
                        class="pixel"
                        :style="{ backgroundColor: picture.picture_data[x - 1][y - 1],
                                  width: `${300/picture.picture_data[0].length}px`,
                                  height:`${300/picture.picture_data[0].length}px`
                         }"
                      ></div>
                    </div>
                </div> 

                 <v-card-title>
                    <v-row>
                      <v-col>
                        <div v-if="!isEditing[index]" @dblclick="editText(index,picture)">
                          <span>{{ picture.name }}</span>
                        </div>
                    
                        <!-- Ako je u režimu uređivanja, prikazujemo v-text-field -->
                        <v-text-field
                          v-else
                          v-model="text"
                          label="Edit text"
                          @blur="stopEditing(index,picture)"
                          @keyup.enter="stopEditing(index,picture)"
                          @keydown.enter="stopEditing(index,picture)"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                </v-card-title>

                
                <v-row style="width: 100%;">
                    <v-icon></v-icon>
                    <v-col >
                        <v-btn variant="plain" @click ="prikaziSlike(picture)">
                            {{ picture.author.username }}
                        </v-btn>
                    </v-col>
                    <v-col cols = "6" class="desno" >
                        <span style="margin-right: 15px;">
                            {{new Date(picture.created_at).toLocaleDateString('sr-RS')}}
                        </span>
                        <v-btn density="compact" icon="mdi-delete"style="margin-bottom: 3px;" @click="onDelClick(picture)"></v-btn>
                    </v-col> 
                </v-row>

                


            </v-card>
            
        </v-col>
    </v-row>


    <div class="text-center">

    <v-pagination
    
      v-model="page"
      :length="totalPages"
      @input="updatePage"
      
    ></v-pagination>
    <Information ref="information"/>
  </div>
  
</template>

<script setup lang="ts">

import { ref,computed, onMounted,watch } from 'vue';
import { usePicureStore } from '@/stores/Picture';
import { useRoute, useRouter,onBeforeRouteUpdate } from 'vue-router';
import type { BasePictureDto,PictureDto } from '@/types/picture';
import Information from '@/components/Information.vue';
const information = ref <InstanceType<typeof Information> | null>(null)
//const page = ref(1);
const show = ref(false);
const pictureStore = usePicureStore();
const text = ref("");
const isEditing = ref<boolean[]>(new Array(pictureStore.pictures.length).fill(false));
const stopEditing = async (index:number,picture:PictureDto)=>{
    isEditing.value[index] = false;
    try {
            picture.name = text.value;
            
            const pic: BasePictureDto = {
                name: text.value,
                picture_data: picture.picture_data
            }
            const rez1 = await pictureStore.updatePicture(picture.picture_id, pic);
            if(information.value)
              information.value.prikaz('Picture updated successfully','success');
            return
            
        } catch (error) {
          if(error instanceof Error)
            information.value?.prikaz(error.message,"error");
        }
}
const editText = (index:number,picture:PictureDto)=>{
    text.value = picture.name
    isEditing.value[index] = true;
}


//pictureStore.loadPictures();
//let pictures = computed (()=> pictureStore.pictures);

let pictures = computed(() => {
  // const authorId = route.query.author;
  // if (authorId) {
  //   return pictureStore.filtriraneSlike
  // }else
    return pictureStore.pictures;
});


const total = computed(() => pictureStore.total);
const page = computed({
  get: () => pictureStore.page,
  
  //set: (value) => pictureStore.setPage(value),
  set:(newPage) => {
    //console.log(newPage)
    const currentQuery = { ...router.currentRoute.value.query };

    
    if (currentQuery.author) {
      pictureStore.setPageA(newPage, String(currentQuery.author));
    } else {
      pictureStore.setPage(newPage);
    }
  }
});

const totalPages = computed(() => Math.ceil(total.value / pictureStore.limit));


const updatePage = (newPage: number) => {
  
  console.log(123)
  const authorId = String(route.query.author)
  if(authorId){
    pictureStore.setPageA(newPage,authorId);
  } else pictureStore.setPage(newPage);
};
const route = useRoute();
const router = useRouter();
onMounted(() => {
  const pageFromUrl = Number(route.params.page);
  const author = route.query.author ? route.query.author : "";
  if(author===""){
     
    pictureStore.setPage(pageFromUrl); 
  }else{
    
    pictureStore.setPageA(pageFromUrl,String(author)); 
  }
 
});

watch(
  () => pictureStore.page,
  (newPage) => { 
    const currentQuery = { ...router.currentRoute.value.query };
    const author = route.query.author ? route.query.author : "";
    if (currentQuery.author) {

      router.push({
        name: 'gallery',
        params: {page:newPage},
        query: {
          ...currentQuery, 
          
        },
      }).catch(() => {});
    }else{

      router.push({ name: 'gallery', params: { page: newPage } }).catch(() => {});
    }

  }
);
// watch(
//   () => router.currentRoute.value,
//   (to, from) => {
//     // Učitaj galeriju za novu stranicu
//     const newPage = to.params.page || 1;
//     const newPage1 = from.params.page || 1;

//     console.log(newPage)
//     console.log(newPage1)
//   }
// );


// watch(
//   () => route.params.page,
//   (newPage) => { 
//     const currentQuery = { ...router.currentRoute.value.query };
//     if (currentQuery.author) {
//       pictureStore.setPageA(Number(newPage),String(currentQuery.author));
//     }else{
//       pictureStore.setPage(Number(newPage));
//     }
    
//   }
// );




// window.onpopstate = () => {
//   const pageFromUrl = new URLSearchParams(window.location.search).get('page');
//   if (pageFromUrl) {
//     pictureStore.setPage(parseInt(pageFromUrl, 10));
//   }
// };

const onCardClick = (slika: PictureDto) =>{
    router.push({ name: 'draw', params: { pictureId: slika.picture_id } });
}

const onDelClick = async (slika:PictureDto) =>{
    try {
        const resp =await pictureStore.deletePicture(slika.picture_id);
    } catch (error) {
        if(error instanceof Error)
            information.value?.prikaz(error.message,'error');
    }
    
}
const prikaziSlike =  async (picture:PictureDto)=>{
  console.log(picture)
  
    await router.push({ name: 'gallery',params:{page:1}, query: { author: picture.author.user_id} });
    pictureStore.setPageA(1,picture.author.user_id);
    
}


watch(
      () => route.fullPath,  
      (newPath) => {
        const query = route.query;
        const page = route.params.page || 1; 
        const author = query.author || null; 

        const currentQuery = { ...router.currentRoute.value.query };
    if (author) {
      
        pictureStore.setPageA(Number(page),String(currentQuery.author));
    }else{
      pictureStore.setPage(Number(page));
    }
      }
    );


</script>

<style scoped>
body{
    background: rgb(228, 226, 228);
}

.text-center {
   color: #000000;
}


.red {
  display: flex;
  /* margin : 0;  */
}


.matrica{
    padding-top: 10px;
    display: flex;
    flex-direction: column;    
    justify-content: center;   
    align-items: center;       
    flex-grow: 1;              
               
}



.pixel {
  width: 20px; 
  height: 20px; 
  cursor: pointer; 
  /* box-sizing: border-box;  */
  outline: 1px solid #d1c7c7; 
  /* background-color: white;  */
}

.desno{
text-align: right;
}

</style>