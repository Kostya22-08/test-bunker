<template>
  <div :class="`footer-layout__language__btn ${isNavBarBtn ? 'nav-bar_btn' : ''} ${isShowOnlyIcon ? 'language_btn_only_icon' : ''} ${isShowIconAndAB ? 'language_btn_icon_and_ab' : ''}`" 
    @click="setLanguageLocal"
  >
    <img v-if="lang == 'ru'" src="~/assets/flags/uk.svg" alt="uk"/>
    <img v-else src="~/assets/flags/planet.webp" alt="planet"/>
    <!-- <div v-else class="footer-layout__language__btn__empty"></div> -->
    {{ isShowOnlyIcon ? '' : isShowIconAndAB ? lang == 'uk' ? 'RU' : 'UA' : lang == 'uk' ? 'Русский' : 'Українська' }} 
  </div>
</template>

<script>
import { useI18n } from 'vue-i18n'
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import { setAcceptLanguage } from '@/helpers/axios/methods'

export default {
  name: "UiChangeLanguageComponent",

  setup() {
    const router = useRouter()
    const route = useRoute()
    const { path, query, hash } = route;
    const { locale, fallbackLocale } = useI18n({ useScope: 'global' })
    const i18n_locale = useCookie('i18n_locale')

    const lang = ref(i18n_locale.value)

    const setLanguageLocal = () => {
      lang.value = i18n_locale.value == 'uk' ? 'ru' : 'uk'
      setAcceptLanguage(lang.value)
      i18n_locale.value = lang.value
      locale.value = lang.value
      fallbackLocale.value = lang.value
      useAppStore().$state.selectedLanguage = lang.value

      if (lang.value == 'ru') {
        router.push(path.replace('/uk/', '/').replace('/uk', '/'), query, hash)
      } else {
        router.push('/uk' + path, query, hash)
      }
    }

    useHead({
      style: [
        {
          type: "text/css",
          id: "UiChangeLanguageComponent",
          children: `
.footer-layout__language__btn {
  border: 1.5px solid #1d2434;
  border-radius: 12px;
  padding: 9px 12px;
  font-size: 14px;
  text-decoration: none;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  color: #1d2434;
  background: #fff;
  text-align: left;
  min-width: 260px;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.footer-layout__language__btn > img {
  width: 20px;
  height: 20px;
  margin-right: 9px;
  border-radius: 100%;
}
.footer-layout__language__btn__empty {
  width: 20px;
  height: 20px;
  margin-right: 9px;
  border-radius: 100%;
  background-color: #E6E6EC;
}

.nav-bar_btn {
  background: none !important;
  color: #fff !important;
  padding: 0px !important;
  border: none !important;
}

.language_btn_only_icon {
  border: none !important;
  // padding: 0px !important;
}

.language_btn_only_icon > img {
  margin-right: 0px !important;
}
.language_btn_only_icon .footer-layout__language__btn__empty {
  margin-right: 0px !important;
}

.language_btn_icon_and_ab {
  border: none !important;
  min-width: auto !important;
}

@media only screen and (max-width: 880px) {
  .footer-layout__language__btn {
    margin-top: 16px;
    border: 1px solid #1d2434;
    border-radius: 12px;
    padding: 9px 12px;
    text-decoration: none;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: 150%;
    color: #1d2434;
    background: #fff;
    text-align: left;
    width: 100%;
    display: flex;
    align-items: center;
  }
  .footer-layout__language__btn > img {
    width: 21px;
    height: 21px;
    margin-right: 11px;
  }
  .footer-layout__language__btn__empty {
    width: 21px;
    height: 21px;
    margin-right: 11px;
  }
}
          `,
        }
      ]
    })

    return {
      setLanguageLocal,
      lang,
    }
  },

  props: {
    isNavBarBtn: Boolean,
    isShowOnlyIcon: Boolean,
    isShowIconAndAB: Boolean,
  },

  // methods: {
  //   setLan() {
  //     this.setLanguageLocal()
  //   },
  // }
}
</script>

<style></style>