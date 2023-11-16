<template>
  <div class="flex align-items-center">
    <NuxtImg 
      v-if="img" 
      format="webp" 
      :src="img" 
      :alt="img"
      :class="`${iconClass}`"
    />
    <component 
      v-else-if="icon" 
      :is="icon" 
      :class="`${iconClass}`"
    />
    <span v-if="label" :class="`ml_12 color_ADADC2 s16__w500__h24 ${textClass}`">
      {{ label }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'UiTextsTextIconBg',
  props: {
    label: {
      type: String,
      default: ''
    },
    textClass: {
      type: String,
      default: ''
    },
    iconClass: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: null
    },
    img: {
      type: String,
      default: null
    },
    isActive: Boolean,
  },
}
</script>