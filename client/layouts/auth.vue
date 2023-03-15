<template>
  <main>
    <TheBanner />
    <slot />
  </main>
</template>

<style scoped lang="scss">
main {
  display: flex;
}

@media (max-width: 960px) {
  main {
    position: relative;
    align-items: center;
    justify-content: center;
  }
}
</style>
