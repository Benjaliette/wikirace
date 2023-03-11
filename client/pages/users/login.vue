<template>
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
      <div v-if="errors.isAny" class="error__div">
        <ul>
          <li v-for="(error, index) in errors.text" :key="index">
            {{ error }}
          </li>
        </ul>
      </div>
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
        // store.saveUser(user);
        // router.push("/landing");
      } else {
        console.log(response._data);
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

    .error__div {
      width: 100%;
      border: 2px solid $red;
      background-color: $light-red;
      padding: 1rem;
      text-align: left;
      box-sizing: border-box;

      ul {
        margin: 0;
        padding: 0;
        list-style-type: none;

        li {
          color: $red;
          font-size: 0.9rem;
        }
      }
    }
  }
}
</style>
