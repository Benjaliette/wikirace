<template>
  <div class="form-group" :class="errored">
    <input
      required
      class="form-control"
      :type="type"
      @input="updateValue"
      @blur="clearError"
    />
    <label class="form-label">{{ label }}</label>
    <div v-for="(err, index) in error" :key="index" class="error__div">
      <div v-if="clear">{{ err }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "text",
    required: true,
  },
  label: {
    type: String,
    default: "Label",
    required: true,
  },
  error: {
    type: Array,
    default: new Array(0),
    required: true,
  },
});

const clear = ref(true);

const emits = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emits("update:modelValue", event.target.value);
};

const isError = computed(() => {
  return props.error.length !== 0;
});

const clearError = (event) => {
  if (event.target.value !== "") {
    clear.value = false;
  }
};

watch(
  () => props.error,
  (_count, _prevCount) => {
    clear.value = true;
  }
);

const errored = computed(() => {
  return { error: clear.value && isError.value };
});
</script>

<style lang="scss" scoped>
.form-group {
  position: relative;
  font-size: 15px;
  color: $black;

  & + & {
    margin-top: 30px;
  }

  .form-label {
    position: absolute;
    z-index: 1;
    left: 0;
    top: 20px;
    transition: all 0.3s ease-out;
  }

  .form-control {
    width: 100%;
    position: relative;
    z-index: 3;
    height: 35px;
    background: none;
    border: none;
    padding: 10px 0 0px 0;
    transition: all 0.3s ease-out;
    border-bottom: 1px solid $black;
    color: $black;
    font-size: 1rem;

    &:invalid {
      outline: none;
    }

    &:focus,
    &:valid {
      outline: none;

      box-shadow: 0 1px $blue;
      border-color: $blue;

      + .form-label {
        font-size: 12px;
        color: $blue;
        transform: translateY(-25px);
      }
    }
  }

  &.error {
    .form-label {
      color: $red;
    }

    .form-control {
      border-bottom: 1px solid $red;
      color: $red;

      &:invalid {
        outline: none;
      }

      &:focus,
      &:valid {
        outline: none;

        box-shadow: 0 1px $red;
        border-color: $red;

        + .form-label {
          font-size: 12px;
          color: $red;
          transform: translateY(-25px);
        }
      }
    }

    .error__div {
      margin: 0;
      margin-top: 5px;

      div {
        color: $red;
        font-size: 12px;
        font-style: italic;
        position: relative;
      }
    }
  }
}
</style>
