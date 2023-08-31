<template>
  <div>
    <div class="mt-32 w-96 mx-auto">
      <h1 class="text-center text-2xl font-bold mb-5">User Login</h1>

      test@example.com
      <br>

      password

      <FormKit
        type="form"
        @submit="submitLoginForm"
        submit-label="Login"
        id="loginForm"
      >
        <FormKit
          type="text"
          label="Email"
          name="email"
          validation="required|email"
          placeholder="Enter your email..."
        />

        <FormKit
          type="password"
          label="Password"
          name="password"
          validation="required"
          placeholder="Enter your password..."
          suffix-icon="eyeClosed"
          @suffix-icon-click="handleIconClick"
        />
        <div class="mb-2 text-sm">
          <NuxtLink
            to="/auth/reset_password"
            class="text-blue-500 hover:text-blue-700"
            >Forgot Password ?</NuxtLink
          >
        </div>
      </FormKit>
      <i class="text-gray-700 text-sm">
        Do not have Account ?
        <NuxtLink
          to="/auth/register"
          class="text-blue-500 hover:text-blue-700"
          >Create an Account</NuxtLink
        >
      </i>
      <br/>
      <div v-if="authStore.errMsg=='ERROR'">
        <br/>
        <p class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative ">
          ! Incorect Email or password
        </p>      
      </div>
      <div>
        <br/>
       <button @click="googleLogin">Google</button>     
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

import {SanctumAuth} from '@/stores/AuthStore'
const authStore = SanctumAuth();
let { status, signIn, signOut } = useAuth()
    definePageMeta({
            middleware:['guest']
    });

    const submitLoginForm = async (formData:Credentials) => {

      if(authStore.isLoggedIn) { 

              return navigateTo("/", { replace: true });
      }
      else{
              const {error} = await authStore.login(formData);
              
              if(error.value==null){// error.value==null means no error, login successfull

                return navigateTo("/", { replace: true });
              }
              else{
                return navigateTo("/auth/login", { replace: true });
              }
          }

    };

    const googleLogin = async ()=>{
      await signIn('google');
    }

    const handleIconClick = (node:any) => {
          node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
          node.props.type = node.props.type === 'password' ? 'text' : 'password'
    }

</script>

<style scoped>

</style>





      /**
      ANSWER FOR =====>> Cannot find name 'defineNuxtConfig'.ts(2304) ERROR IN VS CODE


      I had the same problem, weirdly enough after trying a few things what fixed it for me was 
      changing the VSCode plugin Volar:Typescript Version to Use workspace version THEN changing 
      back to Use VS Code's Version

      How:

      1-  On VSCode press F1 or Ctrl + Shift + P
      2-  Type Volar: Select Typescript Version
      3-  Select Use workspace version
      4-  Repeat steps 1 & 2
      5-  But this time select Use VS Code's Version
      Bam, all my nuxt3 autoimports are correctly typed, don't know why tho.

      or 

      go to extentions and type @builtin typescript and click on gear icon of result and dispable workspace

      */