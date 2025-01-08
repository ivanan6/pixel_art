<template>
    <Header title="Register"/>
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
      <v-text-field
        v-model="confirmPassword"
        :rules="passwordConfRules"
        label="Confirm password"
        :append-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible2 ? 'text' : 'password'"
        @click:append-inner="visible2 = !visible2"
      ></v-text-field>

      <v-btn class="mt-2" type="submit" block @click="handleRegister">Register</v-btn>
    </v-form>
    <Information ref="information"/>
  </v-sheet>
</template>

<script setup lang="ts">
import Header from '@/components/Header.vue';
import { ref } from 'vue';
import { computed } from 'vue';
import { useAutoStore } from '@/stores/AutoStore';
import { useRouter } from 'vue-router';
import Information from '@/components/Information.vue';

const router = useRouter();
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
const passwordConfRules = computed(()=>[
() => password.value === confirmPassword.value || 'Passwords do not match', 
])
const visible = ref(false)
const visible2 = ref(false)

const autoStore = useAutoStore();
const handleRegister = async()=>{
    if (!userName.value || !password.value || !confirmPassword.value) {
        console.error("All fields are required!");
        return;
    }
    if (password.value !== confirmPassword.value) {
        console.error("Passwords do not match!");
        return;
  }
    console.log(userName.value)
    try{
        await autoStore.register({username: userName.value, password:password.value});
        router.push("/login");
        console.log("Registration successful!");
    }catch(e){
      if(e instanceof Error)
        information.value?.prikaz(e.message,'error')
    }
}
</script>



<style scoped>

</style>
