import CredentialsProvider from "next-auth/providers/credentials";
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     username: {
    //       label: "Nom d'utilisateur",
    //       type: "text",
    //       placeholder: "pseudoDu75",
    //     },
    //     email: {
    //       label: "Adresse e-mail",
    //       type: "email",
    //       placeholder: "exemple@mail.fr",
    //     },
    //     password: { label: "Password", type: "password" },
    //   },
    //   async authorize(credentials, req) {
    //     const res = await fetch("localhost:8000/api/user/", {
    //       method: "POST",
    //       body: JSON.stringify(credentials),
    //       headers: { "Content-Type": "application/json" },
    //     });
    //     const user = await res.json();
    //     if (res.ok && user) {
    //       return user;
    //     }
    //     return null;
    //   },
    // }),
  ],
});
