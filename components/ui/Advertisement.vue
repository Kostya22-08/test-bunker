<template>
  <div :class="`advertisement-component ${advertisementType}-type`"
    v-if="oneAdvertisementCompany && !notShowAdvertisement"
    @click="clickToItem"
  >
    <UiImgComponent 
      v-if="oneAdvertisementCompany && !notShowAdvertisement && isSowElementOnMOunted" 
      :class="`advertisement-component__background-wid ${advertisementType}-type__background-wid`"
      :src="(oneAdvertisementCompany.image_wide_rectangle_uk && useAppStore().$state.selectedLanguage == 'uk') ? storageApiSiteUrlForImg + oneAdvertisementCompany.image_wide_rectangle_uk : storageApiSiteUrlForImg + oneAdvertisementCompany.image_wide_rectangle" 
      :alt="oneAdvertisementCompany.name"
    />
    <UiImgComponent 
      v-else-if="oneAdvertisementCompany && !notShowAdvertisement && !isSowElementOnMOunted" 
      :class="`advertisement-component__background-wid ${advertisementType}-type__background-wid`"
      :src="(oneAdvertisementCompany.image_wide_rectangle_uk && useAppStore().$state.selectedLanguage == 'uk') ? storageApiSiteUrlForImg + oneAdvertisementCompany.image_wide_rectangle_uk : storageApiSiteUrlForImg + oneAdvertisementCompany.image_wide_rectangle" 
      :alt="oneAdvertisementCompany.name"
    />
    <UiImgComponent 
      v-if="oneAdvertisementCompany && !notShowAdvertisement && isSowElementOnMOunted" 
      :class="`advertisement-component__background ${advertisementType}-type__background`"
      :src="(oneAdvertisementCompany.image_rectangle_uk && useAppStore().$state.selectedLanguage == 'uk') ? storageApiSiteUrlForImg + oneAdvertisementCompany.image_rectangle_uk : storageApiSiteUrlForImg + oneAdvertisementCompany.image_rectangle" 
      :alt="oneAdvertisementCompany.name"
    />
    <UiImgComponent 
      v-else-if="oneAdvertisementCompany && !notShowAdvertisement && !isSowElementOnMOunted" 
      :class="`advertisement-component__background ${advertisementType}-type__background`"
      :src="(oneAdvertisementCompany.image_rectangle_uk && useAppStore().$state.selectedLanguage == 'uk') ? storageApiSiteUrlForImg + oneAdvertisementCompany.image_rectangle_uk : storageApiSiteUrlForImg + oneAdvertisementCompany.image_rectangle" 
      :alt="oneAdvertisementCompany.name"
    />
    <div class="advertisement-component__content">
      <div class="advertisement-component__content_left">
        <div class="advertisement-component__content__text" v-html="oneAdvertisementCompany.banner_title"></div>
        <a :href="oneAdvertisementCompany?.link" target="_blank" class="advertisement-component__content__btn" @click="clickToItem">
          {{ oneAdvertisementCompany.button_text }}
        </a>
        <ChevronDownIcon 
          defaultFill="white" 
          isNoHover 
          class="advertisement-component__content__btn-arrow"
        />
      </div>
      <div class="advertisement-component__content_right">
        <div v-if="advertisementType == 'header'" class="advertisement-component__content__close" @click.stop="$emit('close')">
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: "UiAdvertisement",
  setup() {
    useHead({
      style: [{
        type: "text/css",
        id: "UiAdvertisement",
        children: `
.advertisement-component {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  cursor: pointer;
}

.advertisement-component__background-wid {
  width: 100%;
  height: auto;
  // height: 100%;
  // position: absolute;
  // z-index: 0;
}

.advertisement-component__background {
  width: 100%;
  height: auto;
  // height: 100%;
  // position: absolute;
  // z-index: 0;
}

.advertisement-component__content {
  position: relative;
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1458px;
  padding: 10px 24px;
  width: 100%;
}

.advertisement-component__content_left {
  display: flex;
  align-items: center;
}

.advertisement-component__content__text {
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  color: #fff;
}

.advertisement-component__content__text > p {
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 130%;
  color: #fff;
}

.advertisement-component__content__btn {
  border-radius: 10px;
  background: #FFF;
  padding: 12px 24px;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 150%;
  margin-left: 24px;
}
.advertisement-component__content__btn-arrow {
  transform: rotate(-90deg);
  width: 0px;
  height: 0px;
  opacity: 0;
}

.advertisement-component__content__close {
  height: 18px;
  width: 18px;
  cursor: pointer;
}

.advertisement-component__content__close > hr {
  width: 0;
  height: 0;
  border: none;
  margin-top: 5px;
}

.advertisement-component__content__close > hr::before {
  content: '';
  transform: rotate(-45deg);
  margin-top: 4px;
  width: 20px;
  position: absolute;
  height: 2px;
  background: #fff;
}

.advertisement-component__content__close > hr::after {
  content: '';
  transform: rotate(45deg);
  margin-top: 4px;
  width: 20px;
  position: absolute;
  height: 2px;
  background: #fff;
}

.header-type {
  background: #1D2434;
  min-height: 65px;
}
.header-type__background-wid {
  display: none;
}
.header-type__background {
  display: none;
}

.bar-type {
  min-height: 110px;
}

.bar-type .advertisement-component__background-wid {
  border-radius: 14px;
  // min-height: 110px;
}

.bar-type .advertisement-component__background {
  display: none;
  // min-height: 287px;
  border-radius: 14px;
}

.bar-type .advertisement-component__content__btn {
  display: none;
}
.bar-type .advertisement-component__content,
.bar-type .advertisement-component__content_left {
  justify-content: center;
  display: none;
}

.rectangle-type {
  min-height: 287px;
  width: 100%;
}

.rectangle-type .advertisement-component__background-wid {
  display: none !important;
}

.rectangle-type .advertisement-component__background {
  display: block !important;
  width: 100%;
  // min-height: 287px;
  border-radius: 14px;
}

.rectangle-type .advertisement-component__content__btn {
  display: none;
}
.rectangle-type .advertisement-component__content,
.rectangle-type .advertisement-component__content_left {
  justify-content: center;
  display: none;
}



@media only screen and (max-width: 1024px) {
  .header-type .advertisement-component__content__text {
    font-size: 16px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 130% !important;
  }
  .header-type .advertisement-component__content__text > p {
    font-size: 16px !important;
    font-style: normal !important;
    font-weight: 400 !important;
    line-height: 130% !important;
  }
  .header-type .advertisement-component__content__btn {
    display: none !important;
  }
  // .header-type .advertisement-component__content__btn-arrow {
  //   opacity: 1 !important;
  //   width: 24px !important;
  //   height: 24px !important;
  //   min-width: 24px !important;
  //   min-height: 24px !important;
  // }
}
@media only screen and (max-width: 1024px) {
  .bar-type {
    min-height: 287px !important;
  }

  .bar-type .advertisement-component__background-wid {
    display: none !important;
  }

  .bar-type .advertisement-component__background {
    display: block !important;
    // min-height: 287px;
    border-radius: 14px;
    // height: auto !important;
  }

}
        `
      }]
    })
  },

  props: {
    advertisementType: {
      type: String,
      default: 'bar',
      validator(value) {
        return ['bar', 'rectangle', 'blog-rectangle', 'header'].includes(value)
      }
    },
    page: {
      type: String,
      default: null,
      validator(value) {
        return [null, 'main', 'blog', 'blog-one', 'courses', 'course-one', 'teams', 'soft', 'soft-one', 'partners', 'partner-one', 'conditions', 'employee-one'].includes(value)
      }
    }
  },

  data: () => ({
    notShowAdvertisement: false,
  }),

  mounted() {
    if (!this.notShowAdvertisement && this.oneAdvertisementCompany && useAdvertisementStore().$state.advertisementDemonstrationShow != this.oneAdvertisementCompany.id) {
      useAdvertisementStore().$state.advertisementDemonstrationShow = this.oneAdvertisementCompany.id
      useAdvertisementStore().advertisementDemonstration(this.oneAdvertisementCompany.id, this.userApp?.id || null)
    }
  },

  methods: {
    clickToItem() {
      if (this.oneAdvertisementCompany) {
        this.openLinkInNewWindow(this.oneAdvertisementCompany?.link)
        useAdvertisementStore().advertisementClick(this.oneAdvertisementCompany.id, this.userApp?.id || null)
      }
    }
  },

  computed: {
    userApp() {
      return useUserStore().$state?.user
    },
    oneAdvertisementCompany() {
      return useAdvertisementStore().getAdvertisementCompanyOneToComponent
    },
    advertisementCompaniesList() {
      return useAdvertisementStore().getAdvertisementCompaniesListToComponent
    }
  },
  watch: {
    oneAdvertisementCompany: {
      immediate: true,
      handler(newValue) {
        const isShowItemInPage = newValue?.pages?.find(item => item.slug == this.page) || null

        if (this.page && this.advertisementCompaniesList) {
          if (!isShowItemInPage) {
            const currentIndex = this.advertisementCompaniesList?.indexOf(newValue)
            const indexArrayByPage = []
            this.advertisementCompaniesList?.forEach((item, i) => {
              const isContainCurrentPage = item?.pages?.find(item => item.slug == this.page) || null

              if (isContainCurrentPage) {
                indexArrayByPage.push(i)
              }
            })
            const newIndex = indexArrayByPage.find(item => item > currentIndex) || indexArrayByPage.find(item => item < currentIndex) || null
            if (newIndex != null) {
              useAdvertisementStore().setActiveToShowAdvertisementItem(newIndex)
            } else {
              this.notShowAdvertisement = true
            }
          }
        }
      }
    }
  }
}
</script>