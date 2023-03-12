<template>
  <section>
    <FormAuth type="signup" :errors="errors.other" @submit="submitForm">
      <template #header>
        <h1>S'enregistrer</h1>
        <p class="subtitle">Pour garder vos scores</p>
      </template>
      <template #form-inputs>
        <FormTextInput
          v-model.trim="user.username"
          type="text"
          label="Nom d'utilisateur"
          :error="errors.username"
        />
        <FormTextInput
          v-model.trim="user.email"
          type="text"
          label="E-mail"
          :error="errors.email"
        />
        <FormTextInput
          v-model.trim="user.password1"
          type="password"
          label="Mot de passe"
          :error="errors.password1"
        />
        <FormTextInput
          v-model.trim="user.password2"
          type="password"
          label="Confirmez le mot de passe"
          :error="errors.password2"
        />
      </template>
    </FormAuth>
  </section>
</template>

<script setup>
import { useUserStore } from "~~/store/users";

const store = useUserStore();
const router = useRouter();
const url = "http://localhost:8000/api/auth/registration/";
const errors = reactive({
  isAny: false,
  username: [],
  email: [],
  password1: [],
  password2: [],
  other: [],
});

const user = reactive({
  username: "",
  email: "",
  password1: "",
  password2: "",
});

const submitForm = async () => {
  errors.isAny = false;
  errors.text = null;
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
    onResponse({ request, response, options }) {
      if (response.ok) {
        store.saveUser(user);
        router.push("/landing");
      } else {
        errors.isAny = true;
        Object.entries(response._data).forEach(([field, error]) => {
          errors[field] = error;
        });
      }
    },
  });
};

definePageMeta({
  layout: "auth",
});
</script>

<style scoped lang="scss">
section {
  flex-grow: 1;
  height: 100vh;
  display: flex;

  h1,
  .subtitle {
    text-align: center;
    margin: 0px auto;
  }
}

@media (max-width: 960px) {
  section {
    position: absolute;
    top: 16%;
    left: 10%;
    width: 80%;
    height: 80%;
    background-color: $medium-light-gray;
    border-radius: 10px;
  }
}

@media (max-width: 540px) {
  section {
    position: absolute;
    top: 14%;
    left: 8%;
    width: 84%;
    height: 83%;
    background-color: $medium-light-gray;
    border-radius: 10px;
  }
}
</style>
