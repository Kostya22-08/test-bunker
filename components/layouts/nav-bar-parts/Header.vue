<template>
  <div class="nav-bar-header">
    <div class="nav-bar-header__top">
      <div class="nav-bar-header__top__left">
        <div class="p-10 border-radius-10 background_282D44 pointer wh_44" :class="`${false ? 'rotate_180' : ''}`">
          <SvgAltArrowIcon />
        </div>
      </div>

      <div class="nav-bar-header__top__right">
        <UiBtnsCustomButton 
          btnClass=""
          textClass=""
          type="dark"
          :label="'Sign In'"
          @click="openLoginModal"
        />
        <UiBtnsCustomButton 
          btnClass="ml_12"
          textClass=""
          :label="'Register'"
          @click="openRegisterModal"
        />
      </div>
    </div>

    
  </div>
</template>

<script>
export default {
  name: "LayoutsNavBarPartsHeader",

  methods: {
    openLoginModal() {
      console.log(1);
    },
    openRegisterModal() {
      console.log(1);
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

    &__left {
      display: flex;
      align-items: center;
    }

    &__right {
      display: flex;
      align-items: center;
    }
  }
}
</style>