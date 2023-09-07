import  "@/types/AuthStoreTypes";
import { defineStore,acceptHMRUpdate } from 'pinia'

export const SanctumAuth = defineStore('Authentication',() => {

        //states
        const user = ref<User|null>(null);
        const isLoggedIn = computed(()=>!!user.value);
        const errMsg = ref<ErrMsg|string>('');

        let socialLoginToken = ref<string>('');
        let socialLoginName = ref<string>('');
        let socialLoginEmail = ref<string>('');
        let socialLoginAvatar = ref<string>('');
        let authservice = ref<string>('');
        let isSocialLogin = ref<boolean>(false);

        //actions
        async function fetchUser(SocialLogin:boolean){
            
            if(SocialLogin==true){
               
            }
            else{

                const{data,error:errMsg}=await useApiFetch('/api/user'); 
                user.value = data.value as User;
                
                return errMsg;
            }           
        }
        async function login(credentials:Credentials){

            await useApiFetch('/sanctum/csrf-cookie');

            const loginchk = await useApiFetch('/login',{
                method:"POST",
                body:credentials
            });
            const findUser =await fetchUser(false);

            // findUser.value==null is NO ERROR| findUser.value!=null(data->dhsaflhfjahj) (not null is error)
            findUser==null  ? errMsg.value = 'SUCCESS': errMsg.value= 'ERROR';
            
            return loginchk;
        }
        async function logout(){

            if(isLoggedIn.value==true)
            {
                await useApiFetch('/logout', { method:"POST" });

                user.value = null;
                window.location.href = "http://localhost:3000/auth/login";
            }
            else{
                localStorage.clear();

                socialLoginToken.value = '';
                socialLoginName .value = '';
                socialLoginEmail .value = '';
                socialLoginAvatar .value = ''; 
                authservice .value = '';
                isSocialLogin .value = false;

                window.location.href = "http://localhost:3000/auth/login";
                //await useApiFetch('/SocialLogout', { method:"POST" });
            }
            
        }
        async function register(info:RegistrationInfo){

            await useApiFetch('/sanctum/csrf-cookie');

            const registerchk = await useApiFetch('/register',{
                method:"POST",
                body:info
            });
            await fetchUser(false);

            return registerchk;
        }

        return {
                user, login, isLoggedIn, fetchUser, logout, register,errMsg
                ,socialLoginEmail,authservice,socialLoginToken,isSocialLogin,
                socialLoginName,socialLoginAvatar
            };
    });

    //following code for hot reload

    if(import.meta.hot){
        import.meta.hot.accept(acceptHMRUpdate(SanctumAuth, import.meta.hot));
    }

    //code for hot reload


//https://www.simplethread.com/choosing-between-two-store-syntaxes-in-pinia/
//https://github.com/iendeavor/pinia-plugin-persistedstate-2
// awsome video links
//https://www.youtube.com/watch?v=zsCc8-0-DIs
//https://www.youtube.com/watch?v=NY9yoqoN72w
//https://www.youtube.com/watch?v=HLPoKz9j9KY
//https://www.youtube.com/watch?v=zLj3ZQmOUX0
//https://www.youtube.com/watch?v=gKC7yvllsPE
//https://vueschool.io/articles/vuejs-tutorials/global-state-management-with-pinia-in-nuxt-3/