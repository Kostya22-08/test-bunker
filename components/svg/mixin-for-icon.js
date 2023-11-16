export default {
  props: {
    gradientType: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'another', 'gold', 'silver', 'bronze', 'lightPink'].includes(value)
      }
    },
    defaultFill: {
      type: String,
      default: 'dark',
      validator(value) {
        return ['dark', 'grey', 'white', 'telegram', 'greyLight'].includes(value)
      }
    },
    isBold: Boolean,
    isGradient: Boolean,
    isNoHover: Boolean
  },
  data: () => ({
    showGradient: false,
  }),
  methods: {
    mouseoverHandler() {
      if(!this.isNoHover) {
        this.showGradient = true
      }
    },
    mouseoutHandler() {
      if(!this.isGradient) {
        this.showGradient = false
      }
    }
  },
  watch: {
    isGradient: {
      immediate: true,
      handler(newValue) {
        this.showGradient = newValue;
      }
    }
  }
}