<template>
  <div>
    <form action="" @submit.prevent="submitForm">
      <div class="form-group">
        <label for="username">Nom d'utilisateur:</label>
        <input id="username" v-model="user.username" type="text" />
      </div>
      <div class="form-group">
        <label for="email">Adresse e-mail:</label>
        <input id="email" v-model="user.email" type="email" />
      </div>
      <div class="form-group">
        <label for="password">Mot de passe:</label>
        <input id="password" v-model="user.password" type="password" />
      </div>
      <div class="form-actions">
        <button type="submit">Se connecter</button>
      </div>
    </form>
    <ul v-if="errors.isAny">
      <li v-for="(error, index) in errors.text" :key="index">
        {{ error }}
      </li>
    </ul>
    <p v-if="token">{{ token }}</p>
  </div>
</template>

<script setup>
import { useUserStore } from "~~/store/users";

const store = useUserStore();
const router = useRouter();

const user = reactive({
  username: "",
  email: "",
  password: "",
});

const token = ref(null);
const errors = reactive({
  isAny: false,
  text: {},
});

const url = "http://localhost:8000/api/auth/login/";

const submitForm = async () => {
  errors.isAny = false;
  const { data, error } = await useFetch(url, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.username,
      email: user.email,
      password: user.password,
    }),
    onRequest({ request, options }) {
      console.table("Request: " + request, options);
    },
    onRequestError({ request, options, error }) {
      console.error("Request error: " + error);
      // Handle the request errors
    },
    onResponse({ request, response, options }) {
      // Process the response data
      if (response.ok) {
        store.saveUser(user);
        router.push("/landing");
      } else {
        errors.isAny = true;
        errors.text = Object.values(response._data);
      }
    },
    // onResponseError({ request, response, options }) {
    //   // Handle the response errors
    //   console.error(response._data);
    // },
  });

  // console.log(data);
  // console.log(error);

  // if (error.value.response.ok) {
  //   console.log(data);
  // } else {
  //   errors.isAny = true;
  //   errors.text = Object.values(error.value.data);
  // }
};
</script>
