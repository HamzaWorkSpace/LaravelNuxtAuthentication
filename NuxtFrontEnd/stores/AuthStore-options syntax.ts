//import  "@/types/AuthStoreTypes";

// import { createPinia } from 'pinia'
// import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// const pinia = createPinia()
// pinia.use(piniaPluginPersistedstate)

export const SanctumAuth = defineStore('Authentication',{

    state: () => { 
        return{
            user : <User|null>null,
            isLoggedIn :<Boolean|String>false,
            errMsg : <ErrMsg|String>'',
            socialLoginToken :<String>'',
            socialLoginName : <String>'',
            socialLoginEmail : <String>'',
            socialLoginAvatar : <String>'',
            authservice :<String>'',
            isSocialLogin:<Boolean|String>false,
            localStorageReload:<Boolean|String>false
        }
    },
    actions: {

        async  fetchUser(isSocialLogin:boolean){
            
            if(isSocialLogin){

            }
            else{
                const{data,error:errMsg}=await useApiFetch('/api/user'); 
                this.user = data.value as User;
                
                return errMsg;
            }            
        },
        async  login(credentials:Credentials){

            await useApiFetch('/sanctum/csrf-cookie');

            const loginchk = await useApiFetch('/login',{   

                method:"POST",
                body:credentials
            });        

            const findUser =await this.fetchUser(false);

            // findUser.value==null is NO ERROR| findUser.value!=null(data->dhsaflhfjahj) (not null is error)
            findUser==null  ? this.errMsg = 'SUCCESS': this.errMsg= 'ERROR';

            // loginchk.error.value==null means no error, login successfull
            loginchk.error.value==null ? this.isLoggedIn = true : this.isLoggedIn = false;

            return loginchk;
        },
        async logout(){

            await useApiFetch('/logout', { method:"POST" });

            this.user = null;
            this.isLoggedIn = false;
            navigateTo("/");//home page
        },
        async  register(info:RegistrationInfo){

            await useApiFetch('/sanctum/csrf-cookie');

            const registerchk = await useApiFetch('/register',{   

                method:"POST",
                body:info
            });
        
            await this.fetchUser(false);

            return registerchk;
        },

        // setValuesFromLocalstorageForSession(){
        // //    this.socialLoginToken = localStorage.getItem("isSocialLogin")
        // //    this.socialLoginName =localStorage.getItem("isSocialLogin")
        // //    this.socialLoginAvatar =localStorage.getItem("isSocialLogin")
        // //    this.authservice =localStorage.getItem("isSocialLogin")
        // let socialLoginChk='';
        // if (process.client) {
        //     socialLoginChk = localStorage.getItem("isSocialLogin") as string;
        // }
        //    console.log(typeof socialLoginChk);

        //    socialLoginChk ? this.isSocialLogin=true:this.isSocialLogin=false;

        //    console.log("inside setValuesFromLocalstorageForSession function");
        //    console.log("typeof socialLoginChk");
        //    console.log(typeof socialLoginChk);
        //    console.log("typeof this.isSocialLogin");
        //    console.log(typeof this.isSocialLogin);
          
        // }
    },
    persist: true,
})