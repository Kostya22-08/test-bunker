<template>
  <div 
    class="dropdown" 
    :tabindex="0" 
    @click="focusHandler" 
    @focusout="isActiveDropdown = false"
  >
    <div 
      v-if="isBurger"
      class="dropdown__burger"
      :class="isActiveDropdown ? `dropdown__burger-active` : ''"
      @click="isActiveDropdown = !isActiveDropdown"
    >
      <hr />
    </div>
    <DotsVerticalIcon 
      v-else-if="isDotsVerticalIcon" 
      :isGradient="isActiveDropdown"
      width="24px" 
      height="24px" 
      style="cursor: pointer;"
    />
    <TextGradient 
      v-else
      :title="title" 
      :imgLeft="imgLeft"
      :componentIconLeft="componentIconLeft || ''"
      :componentIconRight="'ChevronDownIcon'" 
      :isHoverRottedIconRight="isActiveDropdown"
      isHoverGradient
      :isActive="isActiveDropdown"
      style="padding: 14px 12px;"
    />
    <div 
      v-show="isActiveDropdown && list" 
      class="dropdown__list"
      :class="`${isDotsVerticalIcon ? 'for-icon-position' : ''}`"
    >
      <div 
        class="dropdown__list__item" 
        v-for="item in list"
        :key="item.id"
      >
        <hr v-if="item.isShowBorderTop"/>  
        <div v-if="item.id == 'projects'" class="project-box">
          <div class="project-box__header" @click="isOpenProjectsMenuItems = !isOpenProjectsMenuItems">
            <TextGradient 
              :title="item.title" 
              :componentIconLeft="item.componentIconLeft || ''"
              :defaultFillIconLeft="item.defaultFillIconLeft"
              :componentIconRight="item.componentIconRight || ''" 
            />
            <TextStatus status="soon" style="margin-left: 12px; margin-right: 29px;"/>
          </div>
          
          <div class="project-box__menu" v-show="isOpenProjectsMenuItems">
            <TextGradient 
              :title="$t('navigation.teams')" 
              componentIconLeft="AccountGroupIcon" 
              defaultFillIconLeft="grey"
              classToIconLeft="projects-menu-dropdown__icon"
              classToText="projects-menu-dropdown__text"
              style="padding: 8px 15px;"
              @click="goToPage('/teams')"
            />
            <TextGradient 
              :title="$t('navigation.courses')" 
              componentIconLeft="BookOpenPageVariantIcon" 
              defaultFillIconLeft="grey"
              classToIconLeft="projects-menu-dropdown__icon"
              classToText="projects-menu-dropdown__text"
              style="padding: 8px 15px;"
              @click="goToPage('/courses')"
            />
          </div>
        </div>
        <TextGradient 
          v-else
          :title="item.title" 
          :componentIconLeft="item.componentIconLeft || ''"
          :defaultFillIconLeft="item.defaultFillIconLeft"
          :componentIconRight="item.componentIconRight || ''" 
          :countIconLeft="item.countIconLeft || 0"
          :countColorIconLeft="item.countColorIconLeft"
          isHoverBase
          @click="$emit('select', item.id)"
          style="padding: 14px 12px;"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TextGradient from "@/components/ui/texts/TextGradient.vue"
import TextStatus from "@/components/ui/texts/TextStatus.vue"

export default {
  name: "UiFieldsDropdown",
  components: {
    TextGradient,
    TextStatus
  },
  props: {
    title: {
      type: String,
      // required: true,
      default: null,
    },
    imgLeft: {
      type: String,
      default: null,
    },
    componentIconLeft: {
      type: String,
      required: false,
      default: null,
    },
    list: {
      type: Array,
      required: true,
      default: null,
    },
    isBurger: Boolean,
    isDotsVerticalIcon: Boolean,
  },
  data: () => ({
    isActiveDropdown: false,

    isOpenProjectsMenuItems: false,
  }),

  methods: {
    focusHandler(event) {
      if (!this.isBurger) {
        this.isActiveDropdown = true
      }
      event.stopPropagation()
    }
  },

  watch: {
    isActiveDropdown(newValue) {
      if (newValue == false) this.isOpenProjectsMenuItems = false
    }
  }
}
</script>

<style lang="scss" scoped>
.for-icon-position {
  margin-top: 38px !important;
}

.dropdown {
  position: relative;

  &__burger {
    height: 12px;
    width: 18px;
    cursor: pointer;

    &>hr {
      width: 18px;
      height: 2px;
      background: #1D2434;
      transition-duration: 0.3s;
      border: none;
      margin-top: 5px;
    }

    &>hr::before {
      content: '';
      width: 18px;
      position: absolute;
      height: 2px;
      background: #1D2434;
      margin-top: -5px;
      transition-duration: 0.3s;
    }

    &>hr::after {
      content: '';
      width: 18px;
      position: absolute;
      height: 2px;
      background: #1D2434;
      margin-top: 5px;
      transition-duration: 0.3s;
    }

    &-active {
      height: 14px;
      width: 18px;

      &>hr {
        width: 0;
        height: 0;
        border: none;
      }

      &>hr::before {
        transform: rotate(-45deg);
        margin-top: 0;
        width: 18px;
        background: linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%);
      }

      &>hr::after {
        transform: rotate(45deg);
        margin-top: 0;
        width: 18px;
        background: linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%);
      }
    }
  }

  &__list {
    position: absolute;
    padding: 8px 0;
    background-color: #fff;
    border-radius: 10px;
    margin-top: 50px;
    top: 0;
    right: 0;
    min-width: 200px;
    box-shadow: 0px 6px 40px 0px #14142B1A;
    z-index: 200;

    &__item {

      &>hr {
        margin: 0 15px;
        width: calc(100% - 30px);
        height: 1px;
        background-color: #F3F4F5;
      }
    }
  }
}

.project-box {

  &__header {
    display: flex;
    align-items: center;
    padding: 14px 15px;
    cursor: pointer;

    &:hover {
      background: #F3F3FD;
    }
  }

  &__menu {

    &>h4 {
      padding: 0 15px 0;
      display: flex;
      align-items: center;
      margin-bottom: 8px;
      font-size: 12px;
      font-weight: 500;
      line-height: 18px;

      &>hr {
        margin-right: 8px;
        width: 2px;
        height: 16px;
      }

      & .hr-blue {
        background: #696BED;
      }

      & .hr-green {
        background: #35C9D3;
      }

      & .hr-red {
        background: #F06B5D;
      }
    }

    &>div {
      &:hover {
        border-radius: 4px;
        background: #F3F3FD;
      }
    }
  }
}
</style>

<style lang="scss">
.projects-menu-dropdown__icon {
  width: 16px;
  height: 16px;
}

.projects-menu-dropdown__text {
  margin-right: 0 !important;

  &>p {
    font-size: 12px !important;
    font-weight: 500 !important;
    line-height: 16px !important;
  }
}
</style>