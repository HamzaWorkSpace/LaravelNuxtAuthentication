// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@formkit/nuxt'
  ],
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
