<template>
  <div class="container">
    <h1>Wikipédi<span>a</span></h1>
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
