import { SanctumAuth } from '@/stores/AuthStore'
export default defineNuxtRouteMiddleware((to, from) => {
    
    const authStore = SanctumAuth();

    if(authStore.isLoggedIn || authStore.isSocialLogin) {
        return navigateTo("/", {replace:true});
    }

    //here {replace:true} will replace the link in the browser history
})