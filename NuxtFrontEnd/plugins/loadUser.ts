import {SanctumAuth} from '@/stores/AuthStore'

   
export default defineNuxtPlugin(async (nuxtApp) => {
   
    const authStore = SanctumAuth();

    if(authStore.isLoggedIn && !authStore.isSocialLogin) {

        await authStore.fetchUser(false);//false means it is not social login
    }
})




//if defineNuxtPlugin displaying error follow this link for solution
//https://stackoverflow.com/questions/75941108/cannot-find-name-definenuxtconfig-ts2304