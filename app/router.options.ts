import type { RouterOptions } from '@nuxt/schema'
export default <RouterOptions> { 
  scrollBehavior(to, from, savedPosition) {
    return { 
      top: 0,
      behavior: 'smooth',
    }
  }
}