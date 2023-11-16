<template>
  <div class="popup-modal-layout" @click.self="$emit('close')">
    <slot />
  </div>
</template>

<script>

export default {
  name: "LayoutsPartsModalPopupModalLayout",
  emits: ['close'],

  mounted() {
    if (document) {
      const el = document.getElementsByTagName('html');
      if (el?.[0]) el[0].style.overflow = 'hidden';
    }
  },
  beforeUnmount() {
    if (document) {
      const el = document.getElementsByTagName('html');
      if (el?.[0]) el[0].style.overflow = 'auto';
    }
  },
}
</script>

<style lang="scss" scoped>
.popup-modal-layout {
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 200;
  position: fixed;
  top: 0;
  background: #11111159;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 24px;
}
</style>