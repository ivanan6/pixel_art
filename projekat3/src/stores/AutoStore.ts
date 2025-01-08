import { defineStore } from "pinia";
import type {User} from "@/types/user";
import {ref, computed} from "vue";
import {LoginError} from "@/types/greska"

export const useAutoStore = defineStore({
    id:"auto",

    state: () => ({
        user: ref<User | null>(null),
    }),

    getters: {
        isLogg(): boolean{
            return this.user !==null;
              
        }
    },

    actions: {
        initializeAuth() {
            const userFromStorage = localStorage.getItem('user');
      
            if (userFromStorage ) {
              this.user = JSON.parse(userFromStorage);
              
            } else {
              this.user = null;
            }
          },
        checkLogg (){
            const token = localStorage.getItem('autoToken');
            
            if(token)
                throw new Error(LoginError.LOGGED_IN);
        },

        async login(kredencijali : {username: string; password:string}){
            try{
                //console.log(localStorage.getItem('autoToken'))
                if(this.isLogg){
                    throw new Error(LoginError.LOGGED_IN);
                }
                const resp = await fetch('http://localhost:3000/auth/login',{
                    method : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(kredencijali)
                });

                if(!resp.ok){
                  const er = await resp.json();
                  throw new Error(er.code)
                  
                }
                  
                const data = await resp.json()
                this.user = {
                    id: data.user_id,
                    username: data.username,
                    token: data.token,
                };
                localStorage.setItem('autoToken',data.token);
                localStorage.setItem('user', JSON.stringify(this.user));
            }catch(error){
                
                throw error; 
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('autoToken');
            localStorage.removeItem('user');
        },

         // Register akcija
    async register(credentials: { username: string; password: string }) {
        try {
          const response = await fetch('http://localhost:3000/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          });
          console.log(response)
          if (!response.ok) {
            const er = await response.json();
            throw new Error(er.code)
          }
          
          const data = await response.json();
          console.log(data)
          //this.user = { id: data.user_id, username: credentials.username, token: '' };
          localStorage.setItem('autoToken', '');
        } catch (error) {
          //console.error('Error during registration:', error);
          throw error;
        }
      },

    
      
    }

});