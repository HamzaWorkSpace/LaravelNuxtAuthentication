<template>
      <div class="my-32 w-96 mx-auto">

        <h1 class="text-center text-2xl font-bold mb-5">Create an Account</h1>

        <FormKit
            type="form"
            @submit="submitRegistrationForm"
            submit-label="Register"
            id="registrationForm"
        >
                <FormKit
                    type="text"
                    label="Name"
                    name="name"
                    validation="required"
                    placeholder="Enter your name..."
                />

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
                <FormKit
                    type="password"
                    name="password_confirmation"
                    label="Confirm Password"
                    validation="required|confirm:password|required"
                    placeholder="Re-enter your password..."
                    validation-visibility="live"
                    validation-label="Confirm Password"
                    suffix-icon="eyeClosed"
                    @suffix-icon-click="handleIconClick"
                />

        </FormKit>


        <i class="text-gray-700 text-sm">

            Already have an Account ?

            <NuxtLink to="/auth/login" class="text-blue-500 hover:text-blue-700">
                Login
            </NuxtLink>
        </i>

        <!-- <div v-if="serverError">

            <p class="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative ">
                Unable to Register
            </p>      
        
        </div>

        <div v-if="isSuccess" class="mt-2">

            <p class="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded relative ">
                You have registered successfully !
            </p>
        
        </div> -->

    </div>

</template>

<script setup>

    //import { reset } from '@formkit/core'

    import {SanctumAuth} from '@/stores/AuthStore'

    const authStore = SanctumAuth();

    const submitRegistrationForm = async (formData) => {
        // formData comes from formkit which has the data of all input field
         /*  we can use reset function at the end of the function to reset the form by passing in the 
            HTML form ID WHICH IS registrationForm in our case
        */


        const {error} = await authStore.register(formData);

        if(error.value==null){// error.value==null means no error, login successfull

            //reset('registrationForm')
            return navigateTo("/auth/newUserVerification", { replace: true });

        }
        else{
            console.log(authStore.user);
        }

        
    };

    const handleIconClick = (node, e) => {
        node.props.suffixIcon = node.props.suffixIcon === 'eye' ? 'eyeClosed' : 'eye'
        node.props.type = node.props.type === 'password' ? 'text' : 'password'
    }


/**
 * 
 * {
    "message": "The password field confirmation does not match. (and 1 more error)",
    "errors": {
        "password": [
            "The password field confirmation does not match.",
            "The password field must be at least 8 characters."
        ]
    }
}
 */


 /**
  * 
  * |confirmed| always work with laravel naming conversions For example, 
  * if the field under validation is password, 
  * a matching password_confirmation field must be present in the input.
  *   is that your input name is password_confirmation ?? if not do that   
  * 
  */


</script>

<style  scoped>

.formkit-suffix-icon:hover {
  color: var(--fk-color-primary);
}

</style>