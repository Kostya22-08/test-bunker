<template>
  <span class="UiTextsErrorText__error-message" v-if="text">
    {{ text }}
  </span>
</template>

<script>
export default {
  name: "UiTextsErrorText",
  props: {
    text: {
      type: String,
      default: "",
    }
  }
}
</script>

<style lang="scss" scoped>
.UiTextsErrorText__error-message {
  position: relative;
  color: #F06C5D;
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  margin-right: 12px;
  padding-left: 20px;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    background-image: url("~/assets/icons/error-warning-fill.svg");
    background-position: top;
    background-repeat: no-repeat;
    background-size: cover;
    content: '';
  }
}
</style>