import { defineStore } from "pinia";
import type {User} from "@/types/user";
import {ref, computed} from "vue";
import {LoginError} from "@/types/greska"
import type {PictureDto,BasePictureDto,NewPictureRes} from "@/types/picture"
import { useAutoStore } from "./AutoStore";
//import type { APIErrorCommon } from "@/types/greska";
export const usePicureStore = defineStore({
    id:'pic',
    state: ()=>({
        token: localStorage.getItem('autoToken') || '',
        pictures: []as PictureDto[],
        total: 0,
        page:1,
        limit:9,
        author:"",
        filtriraneSlike: []as PictureDto[],
        filteredTotal :0,
        filteredPage :1,
    }),
    // getters:{
    //     filtrirano: (state) => (picture:PictureDto)=>{
    //         return state.pictures.filter((pic) => pic.author.username===picture.author.username)
    //       },
          
    // },
    actions: {
        async loadPictures(autor=""){
          if(autor===""){
              try {
                
                const resp = await fetch(`http://localhost:3000/pictures/?limit=${this.limit}&page=${this.page}`);
                if(!resp.ok){
                    throw new Error("greska")
                }
                const data = await resp.json(); 
                this.pictures = data.pictures;
                this.total = data.total;
                //window.history.pushState(null, '', `?page=${this.page}`);
            } catch (error) {
                console.log(error);
            }
          }else{
            try {
                
              const resp = await fetch(`http://localhost:3000/pictures/?limit=${this.limit}&page=${this.page}&author=${autor}`);
              if(!resp.ok){
                  throw new Error("greska")
              }
              const data = await resp.json(); 
              this.pictures = data.pictures;
              this.total = data.total;
              //window.history.pushState(null, '', `?page=${this.page}`);
          } catch (error) {
              console.log(error);
          }
          }

        },
        setPage(nova: number){
            this.page = nova;
            this.loadPictures();
        },
        setPageA(nova: number,autor:string){
          this.page = nova;
          this.loadPictures(autor);
      },
        async dodajSliku(nova : {name: string; picture_data:string[][]}){
            try {
                const token = localStorage.getItem('autoToken');
                
                
                // if(!token){
                //     throw new Error(LoginError.INVALID_DATA)
                // }
                const autoStore = useAutoStore();
                
                const resp = await fetch('http://localhost:3000/pictures/',{
                    method:'POST',
                    headers:{
                        'Content-type' : 'application/json',
                        'Authorization' : `Bearer ${token}`
                    },
                    body: JSON.stringify(nova),
                });
                
                if(!resp.ok){
                    const er = await resp.json();
                    throw new Error(er.code)
                    
                }
                const data: NewPictureRes = await resp.json();
                
                console.log('Nova slika ID:', data.picture_id);

  
                
                const novaSlika: PictureDto = {

                    picture_id: data.picture_id,
                    author: {
                        user_id: autoStore.user?.id ?? 'unknown',
                        username: autoStore.user?.username ?? 'unknown'
                    },
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),

                    name: nova.name,
                    picture_data: nova.picture_data

                }
                this.pictures.push(novaSlika);
            } catch (error) {
                throw error;
            }
        },
        async getPicture(pictureId:string){
            try {
                //console.log(123)
                const resp = await fetch(`http://localhost:3000/pictures/${pictureId}`);
                if(!resp.ok){
                    const er = await resp.json();
                    throw new Error(er.code)
                    
                }
                    
                const data = await resp.json();
                
                if(data.failed){
                    throw new Error('Request faileddsds')
                }
                const pic : PictureDto = data.picture;
                //console.log(data.picture)
                return pic;
            } catch (error) {
                throw error;
            }
        },
        async updatePicture(pictureId: string, updateData: Partial<BasePictureDto>) {
            try {
                const token = localStorage.getItem('autoToken')
                console.log(token)
                const response = await fetch(`http://localhost:3000/pictures/${pictureId}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(updateData),
              });
          
              const data = await response.json();
          
              if (!response.ok) {
                // Obrada greške
                throw new Error(data.code);
              }
              const trazenaSlika = this.pictures.find((picture) => picture.picture_id === pictureId);
              if (trazenaSlika) {
                console.log(updateData.name)
                // trazenaSlika.name = updateData.name;
                // trazenaSlika.picture_data = updateData.picture_data;
                // trazenaSlika.updated_at = new Date().toISOString();
              }
              
              console.log("Uspešno ažuriranje:", data);
              return data;
            } catch (error) {
              throw error;
            }
          },
          async  deletePicture(pictureId: string){
            try {
              const resp = await fetch(`http://localhost:3000/pictures/${pictureId}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("autoToken")}`,
                },
              });
          
              if (!resp.ok) {
                const error = await resp.json();
                throw new Error(error.code);
              }
          
              const data = await resp.json();
          
              if (!data.failed) {
                console.log("uspesno");
              }
              const slikeBezObrisane = this.pictures.filter((picture) => picture.picture_id !==pictureId);
              this.pictures=slikeBezObrisane;
            } catch (error) {
              throw error;
            }
          },
          filtrirano (picture:PictureDto){
            this.filtriraneSlike = this.pictures.filter((pic) => pic.author.username===picture.author.username)
            
          },
        
        
    }
})