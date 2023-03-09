<template>
  <NuxtPage />
</template>

<script setup>
import { useUserStore } from "./store/users";

const appConfig = useAppConfig();

const store = useUserStore();

// store.fetchUser();
</script>
