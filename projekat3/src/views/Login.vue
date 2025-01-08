<template>
    <Header title="Login"/>
  <v-sheet class="mx-auto" width="300">
    
    <v-form fast-fail @submit.prevent>
      <v-text-field
        v-model="userName"
        :rules="userNameRules"
        label="User name"
      ></v-text-field>

      <v-text-field
        v-model="password"
        :rules="passwordRules"
        label="Password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        
        
        
        @click:append-inner="visible = !visible"
      ></v-text-field>
      

      <v-btn class="mt-2" type="submit" block @click = "handleLogin">Login</v-btn>
    </v-form>
    <Information ref="information"/>
  </v-sheet>


</template>

<script setup lang="ts">
import Information from '@/components/Information.vue';
import Header from '@/components/Header.vue';
import { ref } from 'vue';
import { computed } from 'vue';
import { useAutoStore } from '@/stores/AutoStore';
import { LoginError } from '@/types/greska';
import router from '@/router';




const information = ref <InstanceType<typeof Information> | null>(null)

const userName = ref('');
const userNameRules =computed(() => [
  (value: string) => !!value || 'Username is required',
  (value: string) => (value?.length >= 2 && value?.length <= 32) || 'Username must be between 2 and 32 characters',
]);

const confirmPassword = ref('')
const password = ref('');
const passwordRules = computed(()=>[
(value: string)=> !!value || 'Password is required',
(value: string) =>(value?.length >= 8 && value?.length <= 128) || 'Password must be between 8 and 128 characters', 
])

const visible = ref(false)
const autoStore = useAutoStore();

const handleLogin = async() => {
  //console.log(localStorage);
  
    try {
        await autoStore.login({username: userName.value, password:password.value})
        if(information.value)
          information.value.prikaz('Login successfully');
        router.push("/")
    } catch (error) {
        console.error(error)
        if(information.value)
        if(error instanceof Error)
          information.value.prikaz(error.message,"error");
    }
    
}
</script>



<style scoped>

</style>
