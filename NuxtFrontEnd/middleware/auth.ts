import { SanctumAuth } from '@/stores/AuthStore'
export default defineNuxtRouteMiddleware((to, from) => {
    
    const authStore = SanctumAuth();

    if(!authStore.isLoggedIn ) {
        return navigateTo("/auth/login", {replace:true});
    }

    if(!authStore.isSocialLogin) {
        return navigateTo("/auth/login", {replace:true});
    }

    //here {replace:true} will replace the link in the browser history
})