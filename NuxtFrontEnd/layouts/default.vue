<template>
    <div>

        <AuthHeader/>
        <!-- <TopNavbar/> -->
        <!-- <header class="p-4 bg-gray-600 text-white">
                by ajay yadav tutorial
            <NuxtLink to='/login' class="p-2 bg-red-600 text-white rounded">Login</NuxtLink>
            <NuxtLink to='/' class="ml-4 p-2 bg-red-600 text-white rounded">Home</NuxtLink>
           
        </header> -->
        <div>
            <slot />
        </div>

    </div>
</template>

<script setup>


</script>

<style  scoped>
/* .router-link-active{
    background-color:chartreuse;
    color:black;
} */
</style>