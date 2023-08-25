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
</template>

<script setup>

import {SanctumAuth} from '@/stores/AuthStore'


  definePageMeta({
          middleware:['guest']
  })

const authStore = SanctumAuth();


const submitLoginForm = async (formData) => {

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
    console.log(authStore.user);
  }


};
</script>

<style scoped>

</style>