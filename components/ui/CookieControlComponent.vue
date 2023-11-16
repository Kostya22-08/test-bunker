<template>
  <div class="cookie-control" v-if="showModal && !userApp">
    <div class="cookie-control__text">
      {{ $t('modals.cookie_control.text_1') }} <nuxt-link to="/conditions#confidentiality" target="_blank">{{ $t('modals.cookie_control.text_1_gradient') }}</nuxt-link>
    </div>
    <button class="cookie-control__button" @click="acceptCookies">
      {{ $t('modals.cookie_control.button') }}
    </button>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: "UiCookieControlComponent",

  setup() {
    const acceptCookiesValue = useCookie('acceptCookies')
    const showModal = ref(true)

    if (acceptCookiesValue.value) {
      useAppStore().$state.acceptCookiesValue = true
      showModal.value = false;
    }

    const acceptCookies = () => {
      showModal.value = false;
      acceptCookiesValue.value = true;
      useAppStore().$state.acceptCookiesValue = true
    }

    return {
      showModal,
      acceptCookies
    }
  },

  computed: {
    userApp() {
      return useUserStore().$state?.user
    },
  },

  // watch: {
  //   userApp: {
  //     immediate: true,
  //     handler(newValue) {
  //       if(newValue) {
  //         localStorage.setItem('acceptCookies', true)
  //       }
  //     }
  //   }
  // }
}
</script>

<style lang="scss" scoped>
.cookie-control {
  position: fixed;
  bottom: 40px;
  background: #fff;
  max-width: 1410px;
  width: calc(100% - 48px);
  display: flex;
  align-items: center;
  padding: 27px;
  border-radius: 10px;
  left: 50%;
  transform: translate(-50%, 0);
  z-index: 100;
  box-shadow: 0px 5px 30px 0px #1622330D;

  &__text {
    margin-right: 35px;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: 30px;

    &>a {
      font-size: 18px;
      font-style: normal;
      font-weight: 500;
      line-height: 30px;
      background: -webkit-linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      cursor: pointer;
    }
  }

  &__button {
    border-radius: 10px;
    background: var(--light-theme-linear, linear-gradient(114deg, #686AEC 14.98%, #D00DD9 82.95%));
    padding: 10px 20px;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    color: #FAFAFD;
    cursor: pointer;
  }
}

@media only screen and (max-width: 1024px) {
  .cookie-control {
    bottom: 0px;
    max-width: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 24px;
    z-index: 100;

    &__text {
      margin-right: 0px;
      margin-bottom: 12px;
      font-size: 14px;
      font-weight: 400;
      line-height: 21px;

      &>a {
        font-size: 14px;
        font-weight: 400;
        line-height: 21px;
      }
    }

    &__button {
      text-align: center;
      width: 100%;
    }
  }
}
</style>