<template>
  <div class="base-modal-layout">
    <img src="~/assets/imgs/bgs/Registration.svg" alt="registration" data-not-lazy/>

    <div class="box-page base-modal-layout__header">
      <ArrowLeftIcon v-if="isBackBtn" class="back-btn-header-modal" @click="$emit('back')"/>
      <LogoIcon :class="mobileHeaderText ? 'is-mobile-header-text' : ''"/> 
      <span class="mobile-header-text" v-if="mobileHeaderText">
        {{ mobileHeaderText }}
      </span>
      <ExitToAppIcon v-if="isExitBtn" class="exit-btn-header-modal" @click="$emit('exit')"/>
      <div v-else-if="isShowCloseBtn" class="base-modal-layout__header__close" @click="$emit('close')">
        <hr />
      </div>
      <div v-if="isRightEmpty" style="width: 24px;"></div>
    </div>

    <div class="box-page base-modal-layout__content">
      <slot />
    </div>
  </div>
</template>

<script>
import LogoIcon from "@/components/svg/LogoIcon.vue"
import IconMixin from "@/components/svg/mixin"

export default {
  name: "LayoutsPartsModalBaseModalLayout",
  mixins: [IconMixin],
  components: {
    LogoIcon,
  },
  props: {
    isShowCloseBtn: {
      type: Boolean,
      default: true,
    },
    mobileHeaderText: {
      type: String,
      default: null,
    },
    isBackBtn: Boolean,
    isExitBtn: Boolean,
    isRightEmpty: Boolean,
  },

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
.base-modal-layout {
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 200;
  position: fixed;
  top: 0;
  background: #FEFDFF;

  &>img {
    position: absolute;
    min-width: 100%;
    min-height: 100%;
    z-index: -1;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 60px;
    width: 100%;
    left: 50%;
    transform: translate(-50%, -50%);

    &>svg {
      cursor: pointer;
    }

    &__close {
      height: 18px;
      width: 18px;
      cursor: pointer;

      &>hr {
        width: 0;
        height: 0;
        border: none;
        margin-top: 5px;
      }

      &>hr::before {
        content: '';
        transform: rotate(-45deg);
        margin-top: 0;
        width: 20px;
        position: absolute;
        height: 2px;
        background: #1D2434;
      }

      &>hr::after {
        content: '';
        transform: rotate(45deg);
        margin-top: 0;
        width: 20px;
        position: absolute;
        height: 2px;
        background: #1D2434;
      }

      &:hover {
        &>hr::before {
          content: '';
          background: linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%);
        }

        &>hr::after {
          content: '';
          background: linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%);
        }
      }
    }

    .exit-btn-header-modal {
      height: 32px;
      width: 32px;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
}

.back-btn-header-modal {
  display: none;
}

.mobile-header-text {
  display: none;
}

@media only screen and (max-width: 768px) {
  .is-mobile-header-text {
    display: none;
  }

  .mobile-header-text {
    display: block;
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    text-align: center;
    width: calc(100% - 24px);
  }

  .base-modal-layout {
    .back-btn-header-modal {
      display: block;
      height: 24px;
      width: 24px;
    }

    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: fixed;
      top: 0px;
      width: 100%;
      height: 60px;
      padding: 14px 24px;
      background: #fff;
      box-shadow: 0px 0px 21px 0px #1622330F;
      left: 0;
      transform: none;
      z-index: 1;

      &>svg {
        height: 32px;
        width: 148px;
      }

      &__close {
        height: 14px;
        width: 14px;

        &>hr {
          width: 0;
          height: 0;
          border: none;
        }

        &>hr::before {
          transform: rotate(-45deg);
          margin-top: 0;
          width: 18px;
        }

        &>hr::after {
          transform: rotate(45deg);
          margin-top: 0;
          width: 18px;
        }
      }

      .exit-btn-header-modal {
        height: 24px;
        width: 24px;
      }
    }

    &__content {
      display: flex;
      align-items: flex-start;
      justify-content: center;
      height: 100%;
      margin-top: 60px;
      padding: 0;
    }
  }
}
</style>