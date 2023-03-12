<template>
  <nav @resize="changeToggle">
    <div class="toggle-btn" :class="{ cross: toggled }" @click="toggle">
      <IconHamburger />
    </div>
    <div class="container nav__container">
      <div class="logo">
        <NuxtLink to="/">
          <img src="~/assets/images/logo-dark-sm.png" alt="logo" />
        </NuxtLink>
      </div>
      <Transition>
        <div v-if="canToggle" class="nav-menu">
          <NavLinks />
          <div class="nav-account">
            <NuxtLink v-if="!userLogged" to="/users/login">
              <h3>Connexion</h3>
            </NuxtLink>
            <BaseDropdownButton v-else color="dark" for="user">
              Bienvenue {{ username }}
            </BaseDropdownButton>
          </div>
        </div>
      </Transition>
      <span></span>
    </div>
  </nav>
</template>

<script setup>
import { useUserStore } from "~~/store/users";

const toggled = ref(false);

const store = useUserStore();

const userLogged = computed(() => store.userLogged);
const user = computed(() => store.currentUser);

const canToggle = computed(() => {
  if (window.innerWidth < 960) {
    return toggled.value;
  }

  return true;
});

const toggle = () => {
  toggled.value = !toggled.value;
};

const username = computed(() => {
  const word = user.value.username;
  return word.charAt(0).toUpperCase() + word.slice(1);
});
</script>

<style scoped lang="scss">
nav {
  background-color: $black;
  height: 73px;
  width: 100%;
  position: relative;

  h3 {
    color: $white;
  }

  .toggle-btn {
    border: 1px solid $light-gray;
    border-radius: 10px;
    display: none;
    padding: 0.2rem 0.4rem;
    position: absolute;
    top: 18%;
    left: 8%;

    &.cross {
      z-index: 1;
      border: 1px solid transparent;
    }
  }

  .nav__container {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .logo {
      height: 100%;
      width: fit-content;

      img {
        height: 100%;
      }
    }

    .nav-menu {
      flex-grow: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    > span {
      display: none;
    }
  }
}

@media (max-width: 960px) {
  nav {
    .toggle-btn {
      display: block;
    }

    .nav__container {
      justify-content: center;

      > span {
        display: block;
      }

      .nav-menu {
        flex-direction: column;
        align-items: flex-start;
        position: absolute;
        top: 0px;
        left: 0px;
        background-color: $super-light-gray;
        height: 100vh;
        width: 80%;
      }
    }
  }

  .v-leave-active,
  .v-enter-active {
    transition: 0.4s;
  }
  .v-enter-from,
  .v-leave-to {
    transform: translate(-100%, 0);
  }
}
</style>
