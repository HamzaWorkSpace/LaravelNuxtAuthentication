<template>
    <div class="container">
        <p>Please Wait...</p>
    </div>
</template>

<script setup>
    import { onMounted } from 'vue';

    import {SanctumAuth} from '@/stores/AuthStore'
    const authStore = SanctumAuth();

    const {token} = useRoute().params;

    authStore.socialLoginToken = token ? token:null;

    console.log(authStore.socialLoginToken);

    onMounted(() => {
        console.log('myheader mounted');
    });

</script>

<style scoped>

</style>