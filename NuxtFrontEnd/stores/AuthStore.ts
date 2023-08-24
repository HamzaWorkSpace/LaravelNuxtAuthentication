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

type RegistrationInfo={
    name:string;
    email:string;
    password:string;
    password_confirmation:string;
}
export const SanctumAuth = defineStore('Authentication',() => {

    const user = ref<User|null>(null);

    const isLoggedIn = computed(()=>!!user.value)

    async function fetchUser(){

        const{data,error}=await useApiFetch('/api/user'); 
        user.value = data.value as User;

        console.log(error);
    }

    async function login(credentials:Credentials){

        await useApiFetch('/sanctum/csrf-cookie');

        const loginchk = await useApiFetch('/login',{   

            method:"POST",
            body:credentials
        });        

        await fetchUser();

        return loginchk;
    }


    async function logout(){

         await useApiFetch('/logout', { method:"POST" });

        user.value = null;
        navigateTo("/");//home page

    }

    async function register(info:RegistrationInfo){

        await useApiFetch('/sanctum/csrf-cookie');

        const registerchk = await useApiFetch('/register',{   

            method:"POST",
            body:info
        });        

        await fetchUser();

        return registerchk;
    }

    


    return {user, login, isLoggedIn, fetchUser, logout, register}
});


// awsome video links
//https://www.youtube.com/watch?v=NY9yoqoN72w
//https://www.youtube.com/watch?v=HLPoKz9j9KY