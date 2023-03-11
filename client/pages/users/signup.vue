<template>
  <section>
    <FormAuth type="signup" :errors="errors" @submit="submitForm">
      <template #header>
        <h1>S'enregistrer</h1>
        <p class="subtitle">Pour garder vos scores</p>
      </template>
      <template #form-inputs>
        <FormTextInput
          v-model="user.username"
          type="text"
          label="Nom d'utilisateur"
        />
        <FormTextInput v-model="user.email" type="email" label="E-mail" />
        <FormTextInput
          v-model="user.password1"
          type="password"
          label="Mot de passe"
        />
        <FormTextInput
          v-model="user.password2"
          type="password"
          label="Confirmez le mot de passe"
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
        errors.text = Object.values(response._data).flat();
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

  h1,
  .subtitle {
    text-align: center;
    margin: 0px auto;
  }
}
</style>
