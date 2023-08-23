import { defineStore } from "pinia";

export const SanctumAuth = defineStore('Authentication', {

    state:()=>({


    }),
    actions:{

        async loginsetup(formData){

           await useFetch('http://localhost:8000/sanctum/csrf-cookie',{
                credentials:"include"
            });

            this.loginUser(formData)
        },

        async loginUser(formData){

            const token = useCookie('XSRF-TOKEN');
            
                await useFetch('http://localhost:8000/login',{
                credentials:"include",
                method:"POST",
                body:formData,

                headers:{
                    'X-XSRF-TOKEN':token
                }

            });            
            
        }
        //console.log("login successful")

    }
})