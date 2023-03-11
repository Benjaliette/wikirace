<template>
  <section>
    <FormAuth type="login" :errors="errors" @submit="submitForm">
      <template #header>
        <h1>Se connecter</h1>
        <p class="subtitle">Et gardez vos scores</p>
      </template>
      <template #form-inputs>
        <FormTextInput
          v-model="user.username"
          type="text"
          label="Nom d'utilisateur"
        />
        <FormTextInput
          v-model="user.password"
          type="password"
          label="Mot de passe"
        />
      </template>
    </FormAuth>
  </section>
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

const errors = reactive({
  isAny: false,
  text: null,
});

const url = "http://localhost:8000/api/auth/login/";

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
      password: user.password,
    }),
    onResponse({ _request, response, _options }) {
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
