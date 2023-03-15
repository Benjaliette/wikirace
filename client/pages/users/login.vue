<template>
  <section>
    <FormAuth type="login" :errors="errors.other" @submit="submitForm">
      <template #header>
        <h1>Se connecter</h1>
        <p class="subtitle">Et gardez vos scores</p>
      </template>
      <template #form-inputs>
        <FormTextInput
          v-model="user.username"
          type="text"
          label="Nom d'utilisateur"
          :error="errors.username"
        />
        <FormTextInput
          v-model="user.password"
          type="password"
          label="Mot de passe"
          :error="errors.password"
        />
      </template>
    </FormAuth>
  </section>
</template>

<script setup>
import { useUserStore } from "~~/store/users";

const store = useUserStore();
const router = useRouter();
const config = useRuntimeConfig();

const user = reactive({
  username: "",
  email: "",
  password: "",
});

const errors = reactive({
  isAny: false,
  username: [],
  password: [],
  other: [],
});

const url = config.public.apiBase + "/auth/login/";

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
        Object.entries(response._data).forEach(([field, error]) => {
          if (field === "non_field_errors") {
            errors.other = error;
          } else {
            errors[field] = error;
          }
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
