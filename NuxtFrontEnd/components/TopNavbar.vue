<template>

    <nav class="bg-gray-800">

        <div class="max-w-screen-2xl mx-auto px-1 sm:px-1 lg:px-1" 
        >

            <div class="flex items-center justify-between h-16">

                <div class="flex items-center">

                    <div class="flex-shrink-0">
                        <a href="/" class="text-white font-bold text-xl">mainLOGO</a>
                    </div>
                    
                    <div class="mr-64 hidden md:block">

                        <div class="ml-10 flex items-baseline">

                            <NuxtLink
                                to="/"
                                class="px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
                            >
                                Home
                            </NuxtLink>

                            <NuxtLink
                                to="/contact"
                                class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
                            >
                                Contact
                            </NuxtLink>

                            <NuxtLink
                                to="/auth-only"
                                class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
                            >
                                Auth Only
                            </NuxtLink>

                            <NuxtLink
                                to="/guest-only"
                                class="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white hover:text-gray-300"
                            >
                                Guest Only
                            </NuxtLink>

                           
                        </div>

                    </div>

                </div>

                
                <div v-if="!props.isloggedIn" class="ml-96 hidden md:block">

                    <div class="ml-1 flex items-center md:ml-1">  

                        <NuxtLink
                            to="/auth/login"
                            class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-1 rounded"
                        >
                            Login

                        </NuxtLink>

                    </div>
                    
                </div>

                <div v-else class="ml-96 hidden md:block">

                    <div class="ml-1 flex items-center md:ml-1">  

                        <NuxtLink
                            to="/user/dashboard"
                            class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                        >

                            <span v-if="authStore.isLoggedIn">
                                {{authStore.user.name}}
                            </span>
                            <span v-else>
                                {{authStore.socialLoginName}}
                            </span>
                        </NuxtLink>

                        &nbsp;&nbsp;

                        <button 
                            v-if="props.isloggedIn" 
                            class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                            @click="handleLogout"
                        >
                            Logout
                        </button>

                    </div>

                    

                </div>

                





















                <!-- mobile responsive nav bar code below -->

                <div class="ml-72 md:hidden z-50">
                    <!-- Mobile menu button -->
                    <button
                        @click="isMobileMenuOpen = !isMobileMenuOpen"
                        type="button"
                        class="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        aria-controls="mobile-menu"
                        aria-expanded="false"
                    >
                        <span class="sr-only">Open main menu</span>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                            :class="{
                                hidden: isMobileMenuOpen,
                                'inline-flex': !isMobileMenuOpen,
                            }"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                            />
                        </svg>

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                            :class="{
                                hidden: !isMobileMenuOpen,
                                'inline-flex': isMobileMenuOpen,
                            }"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                <!-- Mobile menu, show/hide based on mobile menu state. -->
                    <div
                        v-if="isMobileMenuOpen"
                        class="absolute top-0 inset-x-0 transition transform md:hidden mt-16"
                    >
                        <div class="shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">

                            <div class="px-2 pt-2 pb-3 space-y-1">
                                <NuxtLink
                                    to="/"
                                    class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                    @click="isMobileMenuOpen = false"
                                >
                                    Home
                                </NuxtLink>

                                <NuxtLink
                                    to="/contact"
                                    class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                    @click="isMobileMenuOpen = false"
                                >
                                    Contact
                                </NuxtLink>
                                <NuxtLink
                                    to="/user/dashboard"
                                    class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                    @click="isMobileMenuOpen = false"
                                    v-if="props.isloggedIn"
                                >
                                    Dashboard
                                </NuxtLink>
                            </div>

                            <div v-if="!props.isloggedIn">
                                <div class="px-5 py-2 mb-5">
                                    <NuxtLink
                                        to="/auth/login"
                                        class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded w-full"
                                        @click="isMobileMenuOpen = false"
                                    >
                                        Login
                                    </NuxtLink>

                                    <!-- <NuxtLink
                                        to="/register"
                                        class="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 mt-2 rounded w-full ml-4"
                                        @click="isMobileMenuOpen = false"
                                    >
                                        Register
                                    </NuxtLink> -->

                                </div>

                            </div>

                        </div>

                    </div>

                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" v-model="props.toggleDarkMode" @click="toggleDarkMode" class="sr-only peer">
                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                        
                    </div>
                    <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
                </label>
            </div>
            
        </div>

        
    </nav>

</template>


<script setup>
    import {SanctumAuth} from '@/stores/AuthStore'

    const authStore = SanctumAuth();

    
    
    const isMobileMenuOpen = ref(false);

    const props = defineProps({
        isloggedIn: {
            type: Boolean,
            required: true,
        },
        toggleDarkMode: {
            type: Boolean,
            required: true,
        },
        
       
    });
    
    

    async function handleLogout()   {

        await authStore.logout();
    };

</script>



<style  scoped>

    .router-link-active {
    background-color: chartreuse;
    color: black;
    }

</style>