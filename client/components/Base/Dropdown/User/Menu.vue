<template>
  <li @click="logout">Déconnexion</li>
</template>

<script setup>
import { useUserStore } from "~~/store/users";

const store = useUserStore();
const router = useRouter();

const logout = () => {
  store.logout();
  router.push("/");
};
</script>
