<template>
    <div>
    
            <h2 class="text-2xl text-center my-8">All Products</h2>

            <!-- {{ appStore.data }} -->

            {{ logindata }}
      
    </div>
</template>

<script setup>

import {SanctumAuth} from '@/stores/AuthStore'

//   definePageMeta({
//           middleware:['auth']
//   })

  const authStore = SanctumAuth();


    const {id} = useRoute().params;

   



  const logindata = authStore.getLoggedInGoogleUserData(id);

</script>

<style scoped>

</style>