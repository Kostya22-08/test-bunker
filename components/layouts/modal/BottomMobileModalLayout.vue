<template>
  <transition  ition name="slide-fade">
    <div class="bottom-mobile-modal-layout" @click.self="$emit('close')">
      <div class="bottom-mobile-modal-layout__box">
        <div class="bottom-mobile-modal-layout__box__header">
          <p class="mobile-header-text" v-if="headerText">
            {{ headerText }}
          </p>
        </div>

        <div class="bottom-mobile-modal-layout__box__content">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
  name: "LayoutsPartsModalBottomMobileModalLayout",
  emits: ['close'],
  props: {
    headerText: {
      type: String,
      default: null,
    },
  },

  // mounted() {
  //   if (document) {
  //     const el = document.getElementsByTagName('html');
  //     if (el?.[0]) el[0].style.overflow = 'hidden';
  //   }
  // },
  // beforeUnmount() {
  //   if (document) {
  //     const el = document.getElementsByTagName('html');
  //     if (el?.[0]) el[0].style.overflow = 'auto';
  //   }
  // },
}
</script>

<style lang="scss" scoped>
.bottom-mobile-modal-layout {
  width: 100%;
  height: 100vh;
  z-index: 200;
  position: fixed;
  top: 0;
  background: #11111159;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  &__box {
    background: #fff;
    padding: 15px 24px 20px 24px;
    border-radius: 30px 30px 0px 0px;
    width: 100%;

    &__header {
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 150%;
      text-align: center;
    }
  }
}

.slide-fade-enter-active {
  transition: all .3s ease;
}

.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(0px);
  opacity: 0;
}
</style>