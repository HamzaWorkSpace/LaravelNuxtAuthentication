import { defineStore } from "pinia";
import  "@/types/AuthStoreTypes";


export const SanctumAuth = defineStore('Authentication',() => {

    //states
    const user = ref<User|null>(null);

    const isLoggedIn = computed(()=>!!user.value);

    const errMsg = ref<ErrMsg|string>('');  

    //actions
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

        // findUser.value==null is NO ERROR| findUser.value!=null(data->dhsaflhfjahj) (not null is error)
        findUser.value==null? errMsg.value = 'SUCCESS': errMsg.value= 'ERROR';
        
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