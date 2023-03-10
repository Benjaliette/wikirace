<template>
  <ul class="nav-items">
    <li class="nav-item">
      <NuxtLink to="#"><h3>Lancer</h3></NuxtLink>
    </li>
    <li class="nav-item">
      <NuxtLink to="#"><h3>Découvrir</h3></NuxtLink>
    </li>
    <li class="nav-item">
      <NuxtLink to="#"><h3>Dashboard</h3></NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.nav-items {
  display: flex;
  align-items: center;
  list-style: none;

  h3 {
    color: $white;
  }

  .nav-item {
    margin: 0 3rem;
  }
}

@media (max-width: 960px) {
  .nav-items {
    flex-direction: column;
    align-items: flex-start;
    padding: 0px;
    margin-top: 6rem;

    h3 {
      color: $gray;
    }

    .nav-item {
      margin: 1rem 3rem;
    }
  }
}
</style>
