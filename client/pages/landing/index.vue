<template>
  <div class="container">
    <h1>Wikipédi<span>a</span></h1>
    <div v-if="userLogged">
      <p>Current user: {{ user.username }}</p>
      <button @click="logout">Logout</button>
    </div>
    <div v-else>
      <p>No one's connected</p>
      <NuxtLink to="users/login">Login</NuxtLink>
      <NuxtLink to="users/signup">Signup</NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from "~~/store/users";

definePageMeta({
  alias: "/",
});

const store = useUserStore();
const router = useRouter();

const userLogged = computed(() => store.userLogged);
const user = computed(() => store.currentUser);

const logout = () => {
  store.logout();
  router.push("/landing");
};
</script>
