<template>
  <div>
    <form action="" method="post" @submit.prevent="submitForm">
      <div class="form-group">
        <label for="username">Nom d'utilisateur:</label>
        <input id="username" v-model="user.username" type="text" />
      </div>
      <div class="form-group">
        <label for="email">Adresse e-mail:</label>
        <input id="email" v-model="user.email" type="email" />
      </div>
      <div class="form-group">
        <label for="password1">Mot de passe:</label>
        <input id="password1" v-model="user.password1" type="password" />
      </div>
      <div class="form-group">
        <label for="password2">Confirmer le mot de passe:</label>
        <input id="password2" v-model="user.password2" type="password" />
      </div>
      <div class="form-actions">
        <button type="submit">S'enregistrer</button>
      </div>
    </form>
    <ul v-if="errors.isAny">
      <li v-for="(error, index) in errors.text" :key="index">
        {{ error }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useUserStore } from "~~/store/users";

const store = useUserStore();
const router = useRouter();
const url = "http://localhost:8000/api/auth/registration/";
const errors = reactive({
  isAny: false,
  text: null,
});

const user = reactive({
  username: "",
  email: "",
  password1: "",
  password2: "",
});

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
      password1: user.password1,
      password2: user.password2,
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
        console.log(response);
        errors.isAny = true;
        errors.text = Object.values(response._data);
      }
    },
  });
};
</script>
