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
    //SHOULD WRITE COMPLETE WORD  password_confirmation AS IN LARAVEL IT IS USED TO GET DATA FROM HTML NAME PROPERTY
}


type ErrMsg = {
    message:string;
}
export const SanctumAuth = defineStore('Authentication',() => {

    const user = ref<User|null>(null);

    const isLoggedIn = computed(()=>!!user.value);

    const errMsg = ref<ErrMsg|string>('');  

    async function fetchUser(){

        const{data,error:errMsg}=await useApiFetch('/api/user'); 
        user.value = data.value as User;

        return errMsg;
        //console.log(error);
    }

    async function login(credentials:Credentials){

        await useApiFetch('/sanctum/csrf-cookie');

        const loginchk = await useApiFetch('/login',{   

            method:"POST",
            body:credentials
        });        

        const findUser =await fetchUser();

        if(findUser.value==null)// null is NO ERROR| not null(data->dhsaflhfjahj) (not null is error)
        {
            errMsg.value = 'SUCCESS'
        }
        else{
            errMsg.value= 'ERROR';
        }

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

    


    return {user, login, isLoggedIn, fetchUser, logout, register,errMsg}
});


// awsome video links
//https://www.youtube.com/watch?v=NY9yoqoN72w
//https://www.youtube.com/watch?v=HLPoKz9j9KY