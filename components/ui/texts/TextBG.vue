<template>
  <span 
    @mouseover="mouseoverHandler" 
    @mouseout.self="mouseoutHandler"
    :class="`UiTextsTextBG__text-bg UiTextsTextBG__bg-${bg} UiTextsTextBG__size-${size} ${isBorderGradient ? 'UiTextsTextBG__border-gradient' : ''}`"
    :style="`${isHot ? 'white-space: nowrap;' : ''}`"
  >
    <component
      v-if="componentIconLeft"
      :is="componentIconLeftSecond && isChangeIcon ? componentIconLeftSecond : componentIconLeft"
      isNoHover
      :isGradient="isGradientIconDefault"
      style="margin-right: 8px; "
    />
    {{ isHot ? $t('status.hot') : text }}
    <component
      v-if="componentIconRight"
      :is="componentIconRightSecond && isChangeIcon ? componentIconRightSecond : componentIconRight"
      isNoHover
      :isGradient="isGradientIconDefault"
      style="margin-left: 8px;"
    />
  </span>
</template>

<script>
import IconMixin from "@/components/svg/mixin"

export default {
  name: "UiTextsTextBG",
  setup() {
    useHead({
      style: [
        {
          type: "text/css",
          id: "UiTextsTextBG",
          children: `
          .UiTextsTextBG__text-bg {
	 color: #1d2434;
}
 .UiTextsTextBG__size-small {
	 padding: 8px 12px;
	 border-radius: 5px;
	 font-size: 12px;
	 font-weight: 500;
	 line-height: 16px;
}
 .UiTextsTextBG__size-middle {
	 padding: 5px 10px;
	 border-radius: 4px;
	 font-size: 18px;
	 font-weight: 500;
	 line-height: 22px;
}
 .UiTextsTextBG__size-hug {
	 padding: 12px 25px;
	 border-radius: 8px;
	 font-size: 16px;
	 font-weight: 600;
	 line-height: 20px;
}
 .UiTextsTextBG__size-normal {
	 padding: 12px 18px;
	 border-radius: 5px;
	 font-size: 18px;
	 font-weight: 500;
	 line-height: 24px;
}
 .UiTextsTextBG__bg-light-blue {
	 background: #eef2fa;
}
 .UiTextsTextBG__bg-grey {
	 background: #e6e6ec;
}
 .UiTextsTextBG__bg-pink {
	 background: #d593a8;
	 color: #fafafd;
}
 .UiTextsTextBG__bg-green2 {
	 background: #11b9af;
	 color: #fafafd;
}
 .UiTextsTextBG__bg-light-green {
	 background: #cff1ef;
}
 .UiTextsTextBG__bg-purple {
	 background: #6966df;
	 color: #fafafd;
}
 .UiTextsTextBG__bg-green {
	 background: #b6d3a2;
	 color: #fafafd;
}
 .UiTextsTextBG__bg-yellow {
	 background: #fae696;
}
 .UiTextsTextBG__bg-orange {
	 background: #feb548;
	 color: #fafafd;
}
.UiTextsTextBG__bg-red {
  background: #F06C5D;
  color: #fafafd;
}
 .UiTextsTextBG__bg-white {
	 background: #fff;
}
 .UiTextsTextBG__border-gradient {
	 background: linear-gradient(white, white) padding-box, linear-gradient(113.74deg, #686aec 14.98%, #d00dd9 82.95%) border-box;
	 border-radius: 26px;
	 border: 1px solid transparent;
}
        `,
        }
      ]
    })
  },
  mixins: [IconMixin],
  props: {
    text: {
      type: String,
      default: "",
    },
    bg: {
      type: String,
      required: true,
      default: "grey",
      validator(value) {
        return ['white', 'grey', 'light-blue', 'pink', 'green2', 'light-green', 'purple', 'green', 'yellow', 'orange', 'red'].includes(value)
      }
    },
    size: {
      type: String,
      default: "middle",
      validator(value) {
        return ['small', 'middle', 'hug', 'normal'].includes(value)
      }
    },
    componentIconLeft: {
      type: String,
      default: null,
    },
    componentIconLeftSecond: {
      type: String,
      default: null,
    },
    componentIconRight: {
      type: String,
      default: null,
    },
    componentIconRightSecond: {
      type: String,
      default: null,
    },
    isGradientIconDefault: Boolean,

    isHot: Boolean,

    isBorderGradient: Boolean,
    gradientType: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'another'].includes(value)
      }
    },
  },

  data: () => ({
    isChangeIcon: false,
  }),

  methods: {
    mouseoverHandler() {
      this.isChangeIcon = true
    },

    mouseoutHandler() {
      this.isChangeIcon = false
    },
  },
}

</script>

<style lang="scss" scoped>
.UiTextsTextBG__text-bg {
  color: #1D2434;
}

.UiTextsTextBG__size-small {
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
}

.UiTextsTextBG__size-middle {
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 500;
  line-height: 22px;
}

.UiTextsTextBG__size-hug {
  padding: 12px 25px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
}

.UiTextsTextBG__size-normal {
  padding: 12px 18px;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 500;
  line-height: 24px;
}

.UiTextsTextBG__bg-light-blue {
  background: #EEF2FA;
}

.UiTextsTextBG__bg-grey {
  background: #E6E6EC;
}

.UiTextsTextBG__bg-pink {
  background: $colorPink;
  color: $colorWhite ;
}

.UiTextsTextBG__bg-green2 {
  background: $colorGreen2;
  color: $colorWhite ;
}

.UiTextsTextBG__bg-light-green {
  background: #CFF1EF;
}

.UiTextsTextBG__bg-purple {
  background: $colorPurple;
  color: $colorWhite ;
}

.UiTextsTextBG__bg-green {
  background: $colorGreen;
  color: $colorWhite ;
}

.UiTextsTextBG__bg-yellow {
  background: #FAE696;
}

.UiTextsTextBG__bg-orange {
  background: $colorOrange;
  color: $colorWhite;
}

.UiTextsTextBG__bg-red {
  background: $colorRed;
  color: $colorWhite;
}

.UiTextsTextBG__bg-white {
  background: #fff;
}

.UiTextsTextBG__border-gradient {
  background: linear-gradient(white, white) padding-box,
    linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%) border-box;
  border-radius: 26px;
  border: 1px solid transparent;
}
</style>