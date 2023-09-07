<template>
    <div class="container">
        <p>Please Wait...</p>
    </div>
</template>

<script setup>
    const route = useRoute();
    
    //set the routes values in local storage
    if (process.client) {

        localStorage.setItem('socialauthToken', route.query.token);
        localStorage.setItem('avatar'        , route.query.avatar);
        localStorage.setItem('name'          , route.query.name);
        localStorage.setItem('email'         , route.query.email);
        localStorage.setItem('isSocialLogin' , route.query.isSocialLogin);
        localStorage.setItem('authservice'   , route.query.authservice);

        if(route.query.isSocialLogin=='true'){// route.query.isSocialLogin type is string
            
            window.location.href = "http://localhost:3000";
        }
        else{
            window.location.href = "http://localhost:3000/auth/login"                    
        }                
    }
</script>

<style scoped>

</style>