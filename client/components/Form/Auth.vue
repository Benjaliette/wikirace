<template>
  <div class="section__div">
    <div class="form__header">
      <slot name="header"></slot>
    </div>
    <form novalidate @submit.prevent="submitForm">
      <div class="form__inputs">
        <slot name="form-inputs"></slot>
      </div>
      <div class="form__actions">
        <BaseButton size="lg" color="blue" type="submit">
          {{ buttonText }}
        </BaseButton>
      </div>
      <p v-if="isLogin">
        Vous n'avez pas de compte ? Cliquez
        <NuxtLink to="/users/signup/">ici</NuxtLink>
      </p>
      <p v-else>
        Vous avez déjà un compte ? Cliquez
        <NuxtLink to="/users/login/">ici</NuxtLink>
      </p>
    </form>
    <div v-if="errors.length !== 0" class="error__div">
      <ul>
        <li v-for="(error, index) in errors" :key="index">
          {{ error }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "login",
    required: true,
  },
  errors: {
    type: Array,
    required: true,
  },
});

const emits = defineEmits(["submit"]);

const isLogin = computed(() => {
  return props.type === "login";
});

const buttonText = computed(() => {
  if (props.type === "login") {
    return "Connexion";
  } else if (props.type === "signup") {
    return "S'enregistrer";
  }

  return "";
});

const submitForm = () => {
  emits("submit");
};
</script>

<style lang="scss" scoped>
.section__div {
  width: 80%;
  margin: auto;

  .form__header {
    margin-bottom: 5rem;
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
    min-height: 0px;
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

@media (max-width: 960px) {
  .section__div {
    width: 90%;
    .form__header {
      margin-bottom: 2rem;
    }

    form {
      .form__inputs {
        margin-bottom: 3rem;
      }
    }
  }
}
</style>
