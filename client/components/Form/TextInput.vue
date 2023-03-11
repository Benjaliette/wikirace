<template>
  <div class="form-group">
    <input required class="form-control" :type="type" @input="updateValue" />
    <label class="form-label">{{ label }}</label>
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
});

const emits = defineEmits(["update:modelValue"]);

const updateValue = (event) => {
  emits("update:modelValue", event.target.value);
};
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
}
</style>
