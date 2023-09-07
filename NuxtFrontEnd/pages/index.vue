<template>
    <div>
        <client-only>   
            <h2 class="text-2xl text-center my-8">All Products</h2>

            <br/> <br/> <br/>

        {{authStore.socialLoginToken}}
            <br/> <br/> <br/>
        {{authStore.socialLoginAvatar}}
        <br/> <br/> <br/>
        {{authStore.socialLoginName}}
        <br/> <br/> <br/>
        <!-- {{ authStore.socialLoginEmail}}  -->
        <br/> <br/> <br/>
        {{authStore.isSocialLogin}}
        <br/> <br/> <br/>
        {{authStore.authservice}}  
        
        <br/><br/><br/>

        <img :src="authStore.socialLoginAvatar" width="200" height="100">
        
    </client-only>

      
    </div>
</template>

<script lang="ts" setup>
import { SanctumAuth } from '@/stores/AuthStore'
const authStore = SanctumAuth();

if(!authStore.isLoggedIn)// if the login is not Laravel sanctum login and it is social login
{
    let socialLoginChk:string|null ='';

    if (process.client) {

        socialLoginChk= localStorage.getItem("isSocialLogin");
        socialLoginChk=='true'? authStore.isSocialLogin = true : authStore.isSocialLogin = false;

        authStore.socialLoginToken = localStorage.getItem("socialauthToken") as string;
        authStore.socialLoginName =localStorage.getItem("name") as string;
        authStore.socialLoginEmail =localStorage.getItem("email")as string;
        authStore.socialLoginAvatar =localStorage.getItem("avatar")as string;
        authStore.authservice =localStorage.getItem("authservice")as string;
            
    }
}
</script>

<style scoped>

</style>