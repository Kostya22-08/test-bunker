<template>
  <img v-if="isNoLazy && (src && src.length && !isErrorImg)" :src="src" :alt="alt" @error="setIsErrorImg" loading="lazy" format="webp"/>
  <img v-else-if="src && src.length && !isErrorImg" :src="src" :alt="alt" @error="setIsErrorImg" loading="lazy" format="webp"/>
  <img v-else-if="isCompanyLogo" src="~/assets/icons/default-img/company-logo.webp" alt="default-img" class="UiImgComponent__default-img-company"/>
  <img v-else src="~/assets/icons/default-img/logo.svg" alt="default-img" class="UiImgComponent__default-img"/>
  <!-- <SvgOnlyImgDefaultImgLogo v-else class="UiImgComponent__default-img"/> -->
</template>

<script>
export default {
  name: "UiImgComponent",
  setup() {
    useHead({
      style: [
        //         {
        //           type: "text/css",
        //           id: "UiImgComponent",
        //           children: `
        // .UiImgComponent__default-img {
        //     	 position: relative;
        //     	 background-position: center center;
        //     	 background-size: cover;
        //     	 background-repeat: no-repeat;
        //     }
        // .UiImgComponent__default-img-company {
        //   position: relative;
        //   background-position: center center;
        //   background-size: cover;
        //   background-repeat: no-repeat;
        // }
        //             `,
        //         }
      ]
    })
  },
  props: {
    src: {
      type: String,
      default: ""
    },
    alt: {
      type: String,
      default: ""
    },
    isNoLazy: Boolean,
    isCompanyLogo: Boolean,
  },
  data: () => ({
    isErrorImg: false,
  }),

  mounted() {
    if (!(this.src && this.src.length)) {
      this.$emit('setDefaultImg', true)
    }
  },

  methods: {
    setIsErrorImg() {
      this.isErrorImg = true
      this.$emit('setDefaultImg', true)
    }
  },

  watch: {
    src: {
      handler(newValue) {
        if (newValue) {
          this.isErrorImg = true
          setTimeout(() => {
            this.isErrorImg = false
          }, 0)

        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.UiImgComponent__default-img {
  position: relative;
  background: url("~/assets/icons/default-img/bg.svg");
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}

.UiImgComponent__default-img-company {
  position: relative;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>