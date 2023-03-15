<template>
  <NuxtLink
    v-if="type === 'link'"
    :to="to"
    class="btn"
    :class="buttonType"
    :type="type"
  >
    <slot></slot>
  </NuxtLink>
  <button v-else class="btn" :class="buttonType" :type="type">
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: "lg",
    required: true,
  },
  color: {
    type: String,
    default: "blue",
    required: true,
  },
  type: {
    type: String,
    default: "button",
    required: false,
  },
  to: {
    type: String,
    default: "/",
    required: false,
  },
});

const buttonType = computed(() => {
  return `btn-${props.size} btn-${props.color}`;
});
</script>

<style lang="scss" scoped>
button,
input[type="submit"],
input[type="reset"] {
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}

a {
  font: inherit;
  text-decoration: none;
}

.btn {
  border-radius: 10px;
  transition: box-shadow 0.15s ease, transform 0.15s ease;
  display: block;
  box-sizing: border-box;
  text-align: center;

  &.btn-lg {
    width: 100%;
    padding: 1rem;
    text-transform: uppercase;
    font-weight: bold;
  }

  &.btn-sm {
    width: fit-content;
    padding: 0.4rem 0.6rem;
  }

  &.btn-blue {
    background-color: $blue;
    color: $white;
  }

  &.btn-white {
    background-color: $white;
    border: 1px solid $black;
  }

  &.btn-gray {
    background-color: $gray;
    color: $white;
  }

  &.btn-black {
    background-color: $black;
    color: $white;
  }

  &:hover {
    box-shadow: 0px 1rem 1rem $medium-light-gray;
  }

  &:active {
    box-shadow: inset 0px 3px 7px #5a748e;
    transform: translateY(2px);
  }
}
</style>
