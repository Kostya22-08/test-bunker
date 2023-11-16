<template>
  <div :class="{
    'UiTextsTittleImportant__important-icon': isImportant
  }" style="padding-right: 8px;">
    <slot />
  </div>
</template>

<script>
export default {
  name: "UiTextsTittleImportant",

  setup() {
    useHead({
      style: [
        {
          type: "text/css",
          id: "UiTextsTittleImportant",
          children: `
.UiTextsTittleImportant__important-icon {
	 position: relative;
	 width: fit-content;
}
 .UiTextsTittleImportant__important-icon::after {
	 content: '*';
	 color: #f06c5d;
	 position: absolute;
	 top: 0;
	 right: 0px;
	 font-size: 18px;
	 font-weight: 600;
	 line-height: 23px;
}
        `,
        }
      ]
    })
  },
  props: {
    isImportant: Boolean,
  }
}
</script>

<style lang="scss" scoped>
.UiTextsTittleImportant__important-icon {
  position: relative;
  width: fit-content;

  &::after {
    content: '*';
    color: #F06C5D;
    position: absolute;
    top: 0;
    right: 0px;
    font-size: 18px;
    font-weight: 600;
    line-height: 23px;
  }
}
</style>