import FunctionsMixin from "@/helpers/functions-mixin.js"

import { setApiUrl } from '@/helpers/axios/methods'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()

  setApiUrl(config.public.apiUrl)
  nuxtApp.vueApp.mixin(FunctionsMixin)
});