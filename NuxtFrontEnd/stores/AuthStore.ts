import { defineStore } from "pinia";
//import { useApiFetch } from "@/composables/useApiFetch";

type User={
    id:number;
    name:string;
    email:string;
}


type Credentials={
    email:string;
    password:string;
}
export const SanctumAuth = defineStore('Authentication',() => {

    const user = ref<User|null>(null)
    
    async function login(credentials:Credentials){

        await useApiFetch('/sanctum/csrf-cookie');

        const loginchk = await useApiFetch('/login',{   

            method:"POST",
            body:credentials
        });

        const{data}=await useApiFetch('/api/user'); 
        user.value = data.value as User;

        return loginchk;
    }
    return {user, login}
});


// awsome video link
//https://www.youtube.com/watch?v=NY9yoqoN72w