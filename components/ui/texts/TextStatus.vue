<template>
  <span v-if="status == 'soon'" class="TextStatus__status__soon">
    {{ $t('words.soon_lowercase') }}
  </span>
</template>

<script>
export default {
  name: "UiTextsTextStatus",
  setup() {
    useHead({
      style: [
        {
          type: "text/css",
          id: "UiTextsTextStatus",
          children: `
          .TextStatus__status__soon {
	 padding: 3px 12px;
	 border-radius: 2px;
	 font-size: 10px;
	 font-weight: 600;
	 line-height: 10px;
	 background: #f06c5d;
	 color: #fafafd;
	 text-transform: uppercase;
}
        `,
        }
      ]
    })
  },
  props: {
    status: {
      type: String,
      required: true,
      default: "soon",
      validator(value) {
        return ['soon'].includes(value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.TextStatus__status__soon {
  padding: 3px 12px;
  border-radius: 2px;
  font-size: 10px;
  font-weight: 600;
  line-height: 10px;
  background: #F06C5D;
  color: $colorWhite;
  text-transform: uppercase;
}
</style>