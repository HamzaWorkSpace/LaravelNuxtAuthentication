<template>
    <div class="container">
        <p>Please Wait...</p>

        {{ authStore.socialLoginToken }}

        <br/><br/><br/>

        {{authStore.socialLoginName}}     

        <br/><br/><br/>

        {{authStore.socialLoginAvatar }}

        <br/><br/><br/>

        {{authStore.isSocialLogin }}

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

        authStore.socialLoginToken  =   ref(route.query.token);
        authStore.socialLoginAvatar =   ref(route.query.avatar);
        authStore.socialLoginName   =   ref(route.query.name);
        authStore.socialLoginemail  =   ref(route.query.email);
        authStore.isSocialLogin     =   ref(route.query.isSocialLogin);
        authStore.authservice       =   ref(route.query.authservice);

        //setting token session cookie
        const socialauthToken = useCookie('socialauthToken')
        socialauthToken.value = ref(route.query.token);

        //set the above values in local storage
    }
    catch(e) {
        await navigateTo("/auth/register?error = Your Token is Invalid,Please Try again", { replace: true });
    } 

</script>

<style scoped>

</style>