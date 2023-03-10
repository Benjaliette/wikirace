<template>
  <section>
    <div class="logo">
      <NuxtLink to="/">
        <img src="~/assets/images/logo-dark.png" alt="logo" />
      </NuxtLink>
    </div>
    <div class="img__background">
      <img src="~/assets/images/wikipedia-globe.png" alt="wikipedia globe" />
    </div>
  </section>
</template>

<script setup></script>

<style lang="scss" scoped>
section {
  height: 100vh;
  width: 65%;
  background-color: $black;
  display: flex;
  flex-direction: column;
  align-items: center;

  .logo {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .img__background {
    position: relative;
    width: 100%;
    height: 80%;
    overflow: hidden;

    img {
      position: absolute;
      width: 100%;
      object-fit: contain;
      bottom: -14rem;
      filter: opacity(50%);
    }
  }
}

@media (max-width: 960px) {
  section .img__background {
    height: 60%;
  }
}
</style>
