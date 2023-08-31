// file: ~/server/api/auth/[...].ts
import { NuxtAuthHandler } from '#auth'
import GoogleProvider from "next-auth/providers/google"
export default NuxtAuthHandler({
    providers: [
      GoogleProvider.default({
          clientId:process.env.GOOGLE_CLIENT_ID!,
          clientSecret:process.env.GOOGLE_CLIENT_SECRET!,

          authorization: {
            params: {
              prompt: "consent",
              access_type: "offline",
              response_type: "code"
            }
          }
        })
      ]
})

// if getting error on import { NuxtAuthHandler } from '#auth' just do yarn install
//https://stackoverflow.com/questions/54496398/typescript-type-string-undefined-is-not-assignable-to-type-string
//https://www.youtube.com/watch?v=FxGI8DG5mTY