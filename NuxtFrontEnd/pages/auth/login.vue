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
          validation="email"
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
    </div>
  </div>

  <div class="mt-10 w-96 mx-auto">
         <!-- <button class="hover:text-blue-700" @click="authStore.SocialAuthLogin()">Login with Google</button> 
         -->
          <form action="http://localhost:8000/api/auth/redirect" method="get"> 
            <input type="submit" value="Login with Google"/>
          </form>
  </div>
</template>

<script lang="ts" setup>

import {SanctumAuth} from '@/stores/AuthStore'

  definePageMeta({
          middleware:['guest']
  })

const authStore = SanctumAuth();


const submitLoginForm = async (formData:Credentials) => {

  if(authStore.isLoggedIn) { 

    return navigateTo("/", { replace: true });
  }


  const {error} = await authStore.login(formData);


  console.log("err msg in login.vue below");

  console.log(authStore.errMsg);

  if(error.value==null){// error.value==null means no error, login successfull

    return navigateTo("/", { replace: true });

  }
  else{
    return navigateTo("/auth/login", { replace: true });
  }


};

  const handleIconClick = (node:any) => {
        node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
        node.props.type = node.props.type === 'password' ? 'text' : 'password'
  }

</script>

<style scoped>

input[type=submit]{
  background-color: #ff8080;
  border: none;
  color: white;
  padding: 16px 32px;
  text-decoration: none;
  margin: 4px 2px;
  cursor: pointer;
}

input[type=submit]:hover{
  background-color: blue;
}

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