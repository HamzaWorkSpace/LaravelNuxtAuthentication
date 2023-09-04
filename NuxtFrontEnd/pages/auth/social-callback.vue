<template>
    <div class="container">
        <p>Please Wait...</p>

        {{ token }}
    </div>
</template>

<script setup>
    //import { onMounted } from 'vue';

    import {SanctumAuth} from '@/stores/AuthStore'

    const authStore = SanctumAuth();

    const route = useRoute();

    try{
        const token = ref(route.query.token);
        //setting session cookie
        const socialauthToken = useCookie('socialauthToken')

        socialauthToken.value = token;
    }
    catch(e) {
        await navigateTo("/auth/register?error = Your Token is Invalid,Please Try again", { replace: true });
    } 
    
    //CHECK https://github.com/sidebase/nuxt-session

</script>

<style scoped>

</style>