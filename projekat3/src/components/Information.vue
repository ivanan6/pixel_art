<template>
    <v-snackbar
        v-model="visible"
        :timeout="3000"
        bottom
        right
        :color="color">
        {{ message }}
        <template v-slot:actions>
            <v-btn color="white" variant = 'text' @click="closeSnackbar">Close</v-btn>
        </template>
    </v-snackbar>
        

    
</template>

<script setup lang = "ts">

import { ref } from 'vue';

const visible= ref(false);
const message = ref('');
const color = ref('success');

const prikaz = (msg: string, type:string = 'success')=>{
    message.value = msg;
    color.value = type;  
    visible.value = true;
}
const closeSnackbar = () => {
  visible.value = false;
};
defineExpose({ prikaz });
</script>

<style>
</style>