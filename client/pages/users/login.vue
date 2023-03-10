<template>
  <!-- <div>
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
  </div> -->
  <section>
    <div class="section__div">
      <div class="form__header">
        <h1>Se connecter</h1>
        <p>Et gardez vos scores</p>
      </div>
      <form action="" @submit.prevent="submitForm">
        <div class="form__inputs">
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
        </div>
        <div class="form__actions">
          <BaseButton size="lg" color="blue" type="submit">
            Connexion
          </BaseButton>
        </div>
        <p>
          Vous n'avez pas de compte ? Cliquez
          <NuxtLink to="/users/signup/">ici</NuxtLink>
        </p>
      </form>
    </div>
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

const token = ref(null);
const errors = reactive({
  isAny: false,
  text: {},
});

const url = "http://localhost:8000/api/auth/login/";

const submitForm = async () => {
  console.log(user.username);
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

definePageMeta({
  layout: "auth",
});
</script>

<style scoped lang="scss">
section {
  flex-grow: 1;
  height: 100vh;

  .section__div {
    width: 80%;
    margin: 6rem auto 0 auto;

    .form__header {
      margin-bottom: 5rem;

      h1,
      p {
        text-align: center;
        margin: 0px auto;
      }
    }

    form {
      a {
        text-decoration: underline;
        font-weight: bold;

        &:hover {
          color: $blue;
        }
      }

      p {
        font-size: 0.9rem;
      }

      .form__inputs {
        margin-bottom: 6rem;
      }
    }
  }
}
</style>
