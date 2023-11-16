<template>
  <span v-if="isSpanText" :class="{
    'UiTextsTextGradient__span-gradient-primary': gradientType == 'primary',
    'UiTextsTextGradient__span-gradient-another': gradientType == 'another'
  }"
  >
    {{ title }}
  </span>
  <div 
    v-else
    class="UiTextsTextGradient__text-gradient" 
    :class="{
      'UiTextsTextGradient__hover-base': isHoverBase,
      'UiTextsTextGradient__hover-gradient-primary': isHoverGradient && gradientType == 'primary',
      'UiTextsTextGradient__hover-gradient-another': isHoverGradient && gradientType == 'another',
      'UiTextsTextGradient__hover-rotted-left': isHoverRottedIconLeft && !isActive,
      'UiTextsTextGradient__hover-rotted-right': isHoverRottedIconRight && !isActive,
      'UiTextsTextGradient__hover-box-shadow-primary': isHoverBoxShadowPrimary,
      'UiTextsTextGradient__hover-underline-primary': isHoverUnderline && gradientType == 'primary',
      'UiTextsTextGradient__hover-underline-another': isHoverUnderline && gradientType == 'another',
      'UiTextsTextGradient__active-rotted-left': isHoverRottedIconLeft && isActive,
      'UiTextsTextGradient__active-rotted-right': isHoverRottedIconRight && isActive,
    }"
    @mouseover="mouseoverHandler" 
    @mouseout.capture="mouseoutHandler"
  >
    
    <UiTextsTooltip 
      v-if="componentIconLeft || imgLeft" 
      :tooltip-text="tooltipIconLeft"
      style="display: flex; align-items: center;"
      :class="`${countIconLeft > 0 ? `UiTextsTextGradient__count-for-icon-${countColorIconLeft}` : ''}`"
      :count-value="countIconLeft"
    >
      <UiImgComponent 
        v-if="imgLeft"
        isNoLazy 
        :src="imgLeft" 
        :alt="imgLeft" 
        style="width: 25px; height: 25px;border-radius: 100%;"
      />
      <component
        v-if="componentIconLeft"
        :is="componentIconLeft"
        class="UiTextsTextGradient__text-gradient__component-left"
        :style="`width: ${sizeIconLeft}; height: ${sizeIconLeft};`"
        :class="`${classToIconLeft}`"
        :isGradient="isGradient"
        :gradientType="gradientType"
        :defaultFill="defaultFillIconLeft"
        :isNoHover="!isHoverGradient"
      />
    </UiTextsTooltip>
    <div class="UiTextsTextGradient__text-gradient__text-box" :class="`${classToText}`" v-if="title || subtitle">
      <p 
        class="UiTextsTextGradient__text-gradient__text-box__title" 
        v-if="title"
        :class="`${(isGradientTextDefault || isActive) ? `UiTextsTextGradient__gradient-text-default-${gradientType}` : ''}`"
      >
        {{ title }}

        <UiTextsTextStatus v-if="isSoon" props="soon" class="UiTextsTextGradient__text-gradient__text-box__title__soon"/>
        <div v-if="isSoonDot" class="UiTextsTextGradient__text-gradient__text-box__title__soon-dot"></div>
      </p>
      <p class="UiTextsTextGradient__text-gradient__text-box__subtitle" v-if="subtitle">
        {{ subtitle }}
      </p>
    </div>
    <UiTextsTooltip 
      v-if="componentIconRight" 
      :tooltip-text="tooltipIconRight" 
      style="display: flex; align-items: center;"
      :class="`${countIconRight > 0 ? `UiTextsTextGradient__count-for-icon-${countColorIconRight}` : ''}`"
      :count-value="countIconRight"
    >
      <component
        v-if="componentIconRight"
        :is="componentIconRight"
        class="UiTextsTextGradient__text-gradient__component-right"
        :style="`width: ${sizeIconRight}; height: ${sizeIconRight};`"
        :class="`${classToIconRight}`"
        :isGradient="isGradient"
        :gradientType="gradientType"
        :defaultFill="defaultFillIconRight"
        :isNoHover="!isHoverGradient"
      />
    </UiTextsTooltip>
  </div>
</template>

<script>

export default {
  name: "UiTextsTextGradient",
  setup() {
    useHead({
      style: [
        {
          type: "text/css",
          id: "UiTextsTextGradient",
          children: `
.UiTextsTextGradient__text-gradient__text-box__title__soon-dot {
  position: absolute;
  top: 0;
  right: -9px;
  width: 7px;
  height: 7px;
  border-radius: 100%;
  background: #f06c5d;
}
.UiTextsTextGradient__text-gradient {
	 display: flex;
	 align-items: center;
	 border-radius: 9px;
	 transition: 0.3s;
}
 .UiTextsTextGradient__text-gradient:hover {
	 cursor: pointer;
}
 .UiTextsTextGradient__text-gradient__text-box {
	 margin: 0 10px;
}
 .UiTextsTextGradient__text-gradient__text-box__title {
  position: relative;
	 font-size: 14px;
	 font-weight: 600;
	 line-height: 21px;
	 transition: 0.3s;

   display: flex;
   align-align: center;
}
.UiTextsTextGradient__text-gradient__text-box__title__soon {
    margin-left: 8px;
    display: flex;
    align-items: center;
    max-height: 18px;
}
 .UiTextsTextGradient__text-gradient__text-box__subtitle {
	 font-size: 12px;
	 font-weight: 400;
	 line-height: 18px;
}
 .UiTextsTextGradient__text-gradient__component-left, .UiTextsTextGradient__text-gradient__component-right {
	 transition: 0.3s;
}
 .UiTextsTextGradient__hover-rotted-left:hover .text-gradient__component-left {
	 transform: rotate(180deg);
}
 .UiTextsTextGradient__hover-rotted-right:hover .text-gradient__component-right {
	 transform: rotate(180deg);
}
 .UiTextsTextGradient__active-rotted-left .text-gradient__component-left {
	 transform: rotate(180deg);
}
 .UiTextsTextGradient__active-rotted-right .text-gradient__component-right {
	 transform: rotate(180deg);
}
 .UiTextsTextGradient__hover-base:hover {
	 background: #f3f3fd;
}
 .UiTextsTextGradient__hover-gradient-primary:hover .text-gradient__text-box__title {
	 background: -webkit-linear-gradient(113.74deg, #686aec 14.98%, #d00dd9 82.95%);
	 -webkit-background-clip: text;
	 -webkit-text-fill-color: transparent;
}
 .UiTextsTextGradient__hover-gradient-another:hover .text-gradient__text-box__title {
	 background: -webkit-linear-gradient(90deg, #6d4aff 0%, #31d1d0 100%);
	 -webkit-background-clip: text;
	 -webkit-text-fill-color: transparent;
}
 .UiTextsTextGradient__hover-box-shadow-primary:hover .text-gradient__text-box__title {
	 text-shadow: 0px 4px 15px #686aec 85;
}
 .UiTextsTextGradient__hover-underline-primary:hover .UiTextsTextGradient__text-gradient__text-box__title {
	 position: relative;
}
 .UiTextsTextGradient__hover-underline-primary:hover .UiTextsTextGradient__text-gradient__text-box__title::before {
	 content: '';
	 position: absolute;
	 top: 88%;
	 width: 100%;
	 left: 0;
	 height: 1px;
	 border-radius: 2px;
	 background: linear-gradient(141.71deg, #686aec 10.15%, #d00dd9 96.32%);
}
 .UiTextsTextGradient__hover-underline-another:hover .UiTextsTextGradient__text-gradient__text-box__title {
	 position: relative;
}
 .UiTextsTextGradient__hover-underline-another:hover .UiTextsTextGradient__text-gradient__text-box__title::before {
	 content: '';
	 position: absolute;
	 top: 88%;
	 width: 100%;
	 left: 0;
	 height: 1px;
	 border-radius: 2px;
	 background: linear-gradient(90deg, #6d4aff 0%, #31d1d0 100%);
}
 .UiTextsTextGradient__gradient-text-default-primary {
	 background: -webkit-linear-gradient(113.74deg, #686aec 14.98%, #d00dd9 82.95%);
	 -webkit-background-clip: text;
	 -webkit-text-fill-color: transparent;
}
 .UiTextsTextGradient__gradient-text-default-another {
	 background: -webkit-linear-gradient(90deg, #6d4aff 0%, #31d1d0 100%);
	 -webkit-background-clip: text;
	 -webkit-text-fill-color: transparent;
}
 .UiTextsTextGradient__span-gradient {
	 font-size: 14px;
	 font-weight: 600;
	 line-height: 21px;
}
 .UiTextsTextGradient__span-gradient-primary {
	 background: -webkit-linear-gradient(113.74deg, #686aec 14.98%, #d00dd9 82.95%);
	 -webkit-background-clip: text;
	 -webkit-text-fill-color: transparent;
}
 .UiTextsTextGradient__span-gradient-another {
	 background: -webkit-linear-gradient(90deg, #6d4aff 0%, #31d1d0 100%);
	 -webkit-background-clip: text;
	 -webkit-text-fill-color: transparent;
}
 .UiTextsTextGradient__count-for-icon-red {
	 position: relative;
}
 .UiTextsTextGradient__count-for-icon-red::before {
	 content: attr(count-value);
	 border: 1px solid #fff;
	 background: #f06c5d;
	 font-size: 9px;
	 font-weight: 500;
	 line-height: 10px;
	 text-align: center;
	 color: #fff;
	 width: 13px;
	 height: 11.5px;
	 border-radius: 100%;
	 padding-top: 1.5px;
	 position: absolute;
	 top: -4px;
	 right: -4px;
}
 .UiTextsTextGradient__count-for-icon-grey {
	 position: relative;
}
 .UiTextsTextGradient__count-for-icon-grey::before {
	 content: attr(count-value);
	 border: 1px solid #fff;
	 background: #9599a0;
	 font-size: 9px;
	 font-weight: 500;
	 line-height: 10px;
	 text-align: center;
	 color: #fff;
	 width: 13px;
	 height: 11.5px;
	 border-radius: 100%;
	 padding-top: 1.5px;
	 position: absolute;
	 top: -4px;
	 right: -4px;
}
        `,
        }
      ]
    })
  },
  props: {
    title: {
      type: String,
      default: null
    },
    classToText: {
      type: String,
      default: ''
    },
    subtitle: {
      type: String,
      default: null
    },
    imgLeft: {
      type: String,
      default: null,
    },
    componentIconLeft: {
      type: String,
      default: null,
    },
    componentIconRight: {
      type: String,
      default: null,
    },
    sizeIconLeft: {
      type: String,
      default: 'auto',
    },
    sizeIconRight: {
      type: String,
      default: 'auto',
    },
    classToIconLeft: {
      type: String,
      default: ''
    },
    classToIconRight: {
      type: String,
      default: ''
    },
    defaultFillIconLeft: {
      type: String,
      default: null,
    },
    defaultFillIconRight: {
      type: String,
      default: null,
    },
    tooltipIconLeft: {
      type: String,
      default: null,
    },
    tooltipIconRight: {
      type: String,
      default: null,
    },
    countIconLeft: {
      type: Number,
      default: 0,
    },
    countIconRight: {
      type: Number,
      default: 0,
    },
    countColorIconLeft: {
      type: String,
      default: 'red',
      validator(value) {
        return ['red', 'grey'].includes(value)
      }
    },
    countColorIconRight: {
      type: String,
      default: 'red',
      validator(value) {
        return ['red', 'grey'].includes(value)
      }
    },
    gradientType: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'another'].includes(value)
      }
    },
    isActive: Boolean,

    isHoverRottedIconLeft: Boolean,
    isHoverRottedIconRight: Boolean,

    isHoverBase: Boolean,
    isHoverGradient: Boolean,
    isHoverGradientOnlyIcon: Boolean,
    isHoverBoxShadowPrimary: Boolean,
    isHoverUnderline: Boolean,

    isGradientTextDefault: Boolean,
    isGradientIconDefault: Boolean,

    isSpanText: Boolean,

    isSoon: Boolean,
    isSoonDot: Boolean,
  },
  data: () => ({
    isGradient: false,
  }),

  methods: {
    mouseoverHandler() {
      if (this.isHoverGradient) {
        this.isGradient = true
      }
      if (this.isHoverGradientOnlyIcon) {
        this.isGradient = true
      }
    },
    mouseoutHandler() {
      if (this.isHoverGradient && !this.isActive) {
        this.isGradient = false
      }
      if (this.isHoverGradientOnlyIcon && !this.isActive) {
        this.isGradient = false
      }
    },
  },
  watch: {
    isGradientIconDefault: {
      immediate: true,
      handler(newValue) {
        this.isGradient = newValue
      }
    },
    isActive: {
      immediate: true,
      handler(newValue) {
        this.isGradient = newValue
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.UiTextsTextGradient__text-gradient {
  display: flex;
  align-items: center;
  // padding: 14px 12px;
  border-radius: 9px;
  transition: 0.3s;

  &:hover {
    cursor: pointer;
  }

  &__text-box {
    margin: 0 10px;

    &__title {
      font-size: 14px;
      font-weight: 600;
      line-height: 21px;
      transition: 0.3s;

      &__soon {
        margin-left: 8px;
        display: flex;
        align-items: center;
      }
    }

    &__subtitle {
      font-size: 12px;
      font-weight: 400;
      line-height: 18px;
    }
  }

  &__component-left,
  &__component-right {
    transition: 0.3s;
  }
}

.UiTextsTextGradient__hover-rotted-left {
  &:hover {
    .text-gradient__component-left {
      transform: rotate(180deg);
    }
  }
}

.UiTextsTextGradient__hover-rotted-right {
  &:hover {
    .text-gradient__component-right {
      transform: rotate(180deg);
    }
  }
}

.UiTextsTextGradient__active-rotted-left {
  .text-gradient__component-left {
    transform: rotate(180deg);
  }
}

.UiTextsTextGradient__active-rotted-right {
  .text-gradient__component-right {
    transform: rotate(180deg);
  }
}

.UiTextsTextGradient__hover-base {
  &:hover {
    background: #F3F3FD;
  }
}

.UiTextsTextGradient__hover-gradient-primary {
  &:hover {
    .text-gradient__text-box__title {
      background: -webkit-linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

.UiTextsTextGradient__hover-gradient-another {
  &:hover {
    .text-gradient__text-box__title {
      background: -webkit-linear-gradient(90deg, #6D4AFF 0%, #31D1D0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
}

.UiTextsTextGradient__hover-box-shadow-primary {
  &:hover {
    .text-gradient__text-box__title {
      text-shadow: 0px 4px 15px #686AEC85;
    }
  }
}

.UiTextsTextGradient__hover-underline-primary {
  &:hover {
    .UiTextsTextGradient__text-gradient__text-box__title {
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: 88%;
        width: 100%;
        left: 0;
        height: 1px;
        border-radius: 2px;
        background: $colorLinearPurpleToPink;
      }
    }
  }
}

.UiTextsTextGradient__hover-underline-another {
  &:hover {
    .UiTextsTextGradient__text-gradient__text-box__title {
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: 88%;
        width: 100%;
        left: 0;
        height: 1px;
        border-radius: 2px;
        background: $colorLinearPurpleToLightBlue;
      }
    }
  }
}

.UiTextsTextGradient__gradient-text-default-primary {
  background: -webkit-linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.UiTextsTextGradient__gradient-text-default-another {
  background: -webkit-linear-gradient(90deg, #6D4AFF 0%, #31D1D0 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.UiTextsTextGradient__span-gradient {
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;

  &-primary {
    background: -webkit-linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &-another {
    background: -webkit-linear-gradient(90deg, #6D4AFF 0%, #31D1D0 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.UiTextsTextGradient__count-for-icon-red {
  position: relative;

  &::before {
    content: attr(count-value);
    border: 1px solid #FFFFFF;
    background: #F06C5D;
    font-size: 9px;
    font-weight: 500;
    line-height: 10px;
    text-align: center;
    color: #fff;
    width: 13px;
    height: 11.5px;
    border-radius: 100%;
    padding-top: 1.5px;

    position: absolute;
    top: -4px;
    right: -4px;
  }
}

.UiTextsTextGradient__count-for-icon-grey {
  position: relative;

  &::before {
    content: attr(count-value);
    border: 1px solid #FFFFFF;
    background: #9599A0;
    font-size: 9px;
    font-weight: 500;
    line-height: 10px;
    text-align: center;
    color: #fff;
    width: 13px;
    height: 11.5px;
    border-radius: 100%;
    padding-top: 1.5px;

    position: absolute;
    top: -4px;
    right: -4px;
  }
}
</style>