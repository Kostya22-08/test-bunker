import { createI18n } from 'vue-i18n'
import en from '@/locales/en.json' 


export default defineNuxtPlugin(({ $pinia, $router, vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    messages: {
      en, 
    },
  })

  vueApp.use(i18n)

  $pinia.use(({store})=> {
    store.$router = $router
    store.$useCookie = useCookie
    store.$i18n = i18n.global
  })
})