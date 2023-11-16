<template>
  <div class="nav-bar-header">
    <div class="nav-bar-header__top">
      <div class="nav-bar-header__top__left">
        <div class="p-10 border-radius-10 background_282D44 shadow_hover_464b62b3 pointer wh_44" 
          @click="isShowFullSideBar = !isShowFullSideBar"
        >
          <SvgAltArrowIcon 
            class="transition_03s" 
            :class="`${!isShowFullSideBar ? 'rotate_180' : ''}`" 
          />
        </div>
        
        <nuxt-link to="/" class="ml_12 pointer flex_center_center">
          <SvgLogoIcon class=""/>
        </nuxt-link>

        <nuxt-link to="/">
          <UiTextsTextIconBg 
            :label="$t('button.game')"
            :img="''"
          />
        </nuxt-link>
        <nuxt-link to="/">
          <UiTextsTextIconBg 
            :label="$t('button.bonuses')"
            :img="''"
          />
        </nuxt-link>
      </div>

      <div class="nav-bar-header__top__right">
        <UiBtnsCustomButton 
          type="dark"
          :label="$t('button.sign_in')"
          @click="openLoginModal"
        />
        <UiBtnsCustomButton 
          btnClass="ml_12"
          :label="$t('button.register')"
          @click="openRegisterModal"
        />
      </div>
    </div>
    
    <div class="nav-bar-header__mobile-top">

    </div>

    <div class="nav-bar-header__sidebar"
      :style="`width: ${isShowFullSideBar ? '228px' : '68px'};`"
    >
      <div class="nav-bar-header__sidebar__top">
        <div class="nav-bar-header__sidebar__top__menu">
          <nuxt-link 
            v-for="item in topMenu"
            :key="item.label"
            to="/"
            class="mt_2 py_11 px_12 border-radius-10"
          >
            <UiTextsTextIconBg 
              :label="isShowFullSideBar ? item.label : ''"
              :icon="item.icon"
              :isActive="isActiveSideBar"
              class="h_24"
            />
          </nuxt-link>
        </div>
      </div>
      <div class="nav-bar-header__sidebar__bottom">
        <div class="nav-bar-header__sidebar__bottom__menu">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LayoutsNavBarPartsHeader",

  setup(props, { emit }) {
    const isShowFullSideBar = ref(false);

    const isFullSideBar = useCookie('isFullSideBar')

    if (!isFullSideBar.value) {
      isFullSideBar.value = isShowFullSideBar.value
    } else {
      isShowFullSideBar.value = isFullSideBar.value
      emit('setFullSideBar', isFullSideBar.value)
    }

    watch(isShowFullSideBar, (newValue) => {
      isFullSideBar.value = newValue
    })

    return {
      isShowFullSideBar
    }
  },

  methods: {
    openLoginModal() {
      console.log(1);
    },
    openRegisterModal() {
      console.log(1);
    }
  },
  computed: {
    topMenu() {
      return [
        // {
        //   label: this.$t('nav.home'),
        //   icon: 'SvgHomeIcon'
        // },
        {
          label: this.$t('nav.top'),
          icon: 'SvgFireIcon'
        },
        {
          label: this.$t('nav.new'),
          icon: 'SvgNewIcon'
        },
        {
          label: this.$t('nav.bonus_buy'),
          icon: 'SvgGiftIcon'
        },
        {
          label: this.$t('nav.mega_ways'),
          icon: 'SvgMegaWaysIcon'
        },
        {
          label: this.$t('nav.drops_and_wins'),
          icon: 'SvgDropsWinsIcon'
        },
        {
          label: this.$t('nav.books_of'),
          icon: 'SvgBookIcon'
        },
        {
          label: this.$t('nav.instant_win'),
          icon: 'SvgRocketIcon'
        },
        {
          label: this.$t('nav.table'),
          icon: 'SvgLayersIcon'
        },
        {
          label: this.$t('nav.jackpots'),
          icon: 'SvgJackpotsIcon'
        },
        {
          label: this.$t('nav.scratchcards'),
          icon: 'SvgCouponIcon'
        },
        {
          label: this.$t('nav.video_poker'),
          icon: 'SvgPokerIcon'
        },
        {
          label: this.$t('nav.other'),
          icon: 'SvgOtherIcon'
        },
      ]
    },
    isActiveSideBar() {
      return false;
    }
  }
}
</script>

<style scoped lang="scss">
.nav-bar-header {
  &__top {
    background: #1E2132;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 64px;

    position: fixed;
    top: 0;
    z-index: 100;
    padding: 0px 16px 0px 12px;

    &__left {
      display: flex;
      align-items: center;
    }

    &__right {
      display: flex;
      align-items: center;
    }
  }

  &__sidebar {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    top: 64px;
    height: calc(100vh - 64px);
    // width: 250px;
    padding: 24px 12px;
    background: #1E2132;
    z-index: 200;

    max-height: calc(100vh - 64px);

    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
  }
}
</style>