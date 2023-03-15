import { defineStore } from "pinia";

const config = useRuntimeConfig();
const baseApi = config.public.apiBase;

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

export const useUserStore = defineStore("user", {
  state: () => ({ user: initialState }),
  getters: {
    userLogged() {
      return this.user.status.loggedIn;
    },
    currentUser() {
      return this.user.user;
    },
  },
  actions: {
    // async fetchUser() {
    //   try {
    //     const response = await fetch(baseApi + "user/");
    //     if (response.ok) {
    //       console.log(response);
    //     } else {
    //       console.log(response.statusText);
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    // async login(user) {
    //   try {
    //     const response = await fetch(baseApi + "login/", {
    //       method: "post",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({
    //         username: user.username,
    //         email: user.email,
    //         password: user.password,
    //       }),
    //     });
    //     if (response.ok) {
    //       console.log(response);
    //     } else {
    //       return response.statusText;
    //     }
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },
    // async signup(user) {
    //   const response = await useFetch(baseApi + "registration/", {
    //     method: "post",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username: user.username,
    //       email: user.email,
    //       password1: user.password1,
    //       password2: user.password2,
    //     }),
    //   }).then((response) => {
    //     console.log(response);
    //     const myError = response.error.value.response._data;
    //     return myError;
    //   });
    // },
    saveUser(user) {
      this.user = { status: { loggedIn: true }, user };
      localStorage.setItem("user", JSON.stringify(user));
    },
    async logout() {
      try {
        const { data, error } = await useFetch(baseApi + "/auth/logout/", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.user = { status: { loggedIn: false }, user: null };
        localStorage.removeItem("user");
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
});
