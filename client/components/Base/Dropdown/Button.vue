<template>
  <button :class="buttonColor">
    <div ref="ignoreElRef" class="dropdown-toggle" @click="toggleDropdown">
      <span><slot></slot></span>
      <IconArrowDown />
    </div>
    <div
      v-if="isDropdown"
      v-on-click-outside="onClickOutsideHandler"
      class="dropdown-menu"
    >
      <ul>
        <BaseDropdownUserMenu v-if="props.for === 'user'" />
      </ul>
    </div>
  </button>
</template>

<script setup>
import { vOnClickOutside } from "@vueuse/components";

const props = defineProps({
  color: {
    type: String,
    required: false,
    default: "dark",
  },
  for: {
    type: String,
    required: true,
    default: "user",
  },
});

const isDropdown = ref(false);
const ignoreElRef = ref();

const toggleDropdown = () => {
  isDropdown.value = !isDropdown.value;
};

const buttonColor = computed(() => {
  return `btn-dropdown-${props.color}`;
});

const onClickOutsideHandler = [
  () => {
    isDropdown.value = false;
  },
  { ignore: [ignoreElRef] },
];
</script>

<style scoped lang="scss">
button {
  padding: 0;
  border: none;
  font: inherit;
  outline: inherit;
  cursor: pointer;

  &.btn-dropdown-dark {
    background-color: $black;

    span {
      color: $white;
    }
  }

  .dropdown-toggle {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    position: relative;
    padding: 1rem;
  }

  .dropdown-menu {
    position: absolute;
    background-color: $medium-light-gray;
    border: 1px solid $gray;
    border-radius: 5px;
    top: 4rem;
    right: 5rem;
    width: 10rem;

    ul {
      padding: 0;
      list-style-type: none;
      text-align: left;
      margin: 1em;
    }
  }
}
</style>
