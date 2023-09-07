<template>
    <div>

        <TopNavbar
            :isloggedIn="authStore.isLoggedIn?authStore.isLoggedIn:authStore.isSocialLogin"
        />
        <!-- <TopNavbar/> -->
        <!-- <header class="p-4 bg-gray-600 text-white">
                by ajay yadav tutorial
            <NuxtLink to='/login' class="p-2 bg-red-600 text-white rounded">Login</NuxtLink>
            <NuxtLink to='/' class="ml-4 p-2 bg-red-600 text-white rounded">Home</NuxtLink>
           
        </header> -->
        authStore.isSocialLogin->{{ authStore.isSocialLogin }}<br/>
        authStore.isLoggedIn->{{authStore.isLoggedIn }}
        <div>
            <slot />
        </div>

    </div>
</template>

<script lang="ts" setup>
import { SanctumAuth } from '@/stores/AuthStore'
    const authStore = SanctumAuth();

    if(authStore.isLoggedIn)
    {
        await authStore.fetchUser(false);
    }
  

</script>

<style  scoped>
/* .router-link-active{
    background-color:chartreuse;
    color:black;
} */
</style>