<template>
  <div class="UiFieldsCheckbox__checkbox" @click="$emit('setActive', !isActive)">
    <div class="UiFieldsCheckbox__checkbox__btn">
      <div v-if="checkboxType == 'square'" class="UiFieldsCheckbox__checkbox__btn__square" 
        :style="`width: ${size}; height: ${size}; ${isActive ? 'border: none;' : ''}`"
      >
        <SvgCheckboxSquare :width="size" :height="size" isNoHover :isGradient="isActive"/>
      </div>
      <div v-else class="UiFieldsCheckbox__checkbox__btn__circle"
        :style="`width: ${size}; height: ${size};`"
      >
        <div v-show="isActive" class="UiFieldsCheckbox__checkbox__btn__circle__active"></div>
      </div>
    </div>
    <div style="width: 100%;">
      <slot />
    </div>
  </div>
</template>

<script>

export default {
  name: "UiFieldsCheckbox",
  props: {
    size: {
      type: String,
      default: "18px"
    },
    checkboxType: {
      type: String,
      default: 'square',
      validator(value) {
        return ['square', 'circle'].includes(value)
      }
    },
    isActive: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.UiFieldsCheckbox__checkbox {
  display: flex;
  align-items: center;

  &__btn {
    cursor: pointer;
    width: fit-content;

    &__square {
      border-radius: 3px;
      // border: 2px solid $colorGreyLight;
      border: 2px solid #D6D7D9;
    }

    &__circle {
      border-radius: 100%;
      background: linear-gradient(white, white) padding-box,
        linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%) border-box;
      border: 2px solid transparent;
      padding: 15%;

      &__active {
        background: linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%);
        width: 100%;
        height: 100%;
        border-radius: 100%;
      }
    }
  }
}
</style>