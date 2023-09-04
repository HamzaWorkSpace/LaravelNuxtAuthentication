// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@formkit/nuxt',
  ],

  piniaPersistedstate: {
    cookieOptions: {
      sameSite: 'strict',
    },
    storage: 'localStorage'
  },

  // runtimeConfig: {
  //   SOCIAL_LOGIN_BASE_URL: process.env.SOCIAL_LOGIN_BASE_URL ||'http://localhost:8000/api/auth/login',
  // },

  experimental: {
    renderJsonPayloads: false
  },//solving error Cannot stringify a function on using useFetch()

  //to fix samesite console error 
  // piniaPersistedstate:{
  //   cookieOptions:{
  //     sameSite:"strict",
  //   }
  // },

  app:{
    head:{
      link:[
        {
          //google fonts
          rel:'stylesheet',
          href:'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined'
        },

        {
          //poppins font
          rel:'stylesheet',
          href:'https://fonts.googleapis.com/css?family=Poppins'
        }
       

      ]
    }
  }
})
