<template>
    <div class="container">
        <p>Please Wait...</p>

        {{ authStore.socialLoginToken }}

        <br/><br/><br/>

        {{authStore.socialLoginName}}     

        <br/><br/><br/>

        {{authStore.socialLoginAvatar }}

        <br/><br/><br/>

        <img :src="authStore.socialLoginAvatar" width="200px" height="100px">
    </div>
</template>

<script setup>
    //import { onMounted } from 'vue';

    import {SanctumAuth} from '@/stores/AuthStore'

    const authStore = SanctumAuth();

    const route = useRoute();

    try{
        const token = ref(route.query.token);
        const name = ref(route.query.name);
        const avatar = ref(route.query.avatar);

        authStore.socialLoginToken  =   token;
        authStore.socialLoginAvatar =   avatar;
        authStore.socialLoginName   =   name;

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