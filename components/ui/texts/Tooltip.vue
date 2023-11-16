<template>
  <span 
    @click="openTooltip"
    @mouseover="mouseoverTooltip"
    @mouseout="mouseoutTooltip"
    :ref="tooltipText ? 'tooltipBox' : ''" 
    style="position: relative;"
    >
    <div v-show="isShowTooltip" :class="tooltipText ? 'tooltip' : ''" 
      :tooltip-text="tooltipText"
      id="tooltip"
      :ref="tooltipText ? 'tooltip' : ''" 
    ></div>
    <slot />
  </span>
</template>

<script>
export default {
  name: "UiTextsTooltip",
  props: {
    tooltipText: {
      type: String,
      default: "",
    },
    stopPropagation: Boolean,
    isBottomPosition: Boolean,
    isOneWord: Boolean,
  },

  data: () => ({
    isShowTooltip: false,
  }),

  mounted() {
    if (this.$refs?.tooltip && window) {

      const tooltipBox = this.$refs.tooltipBox
      const tooltip = this.$refs.tooltip
      const elPosition = tooltipBox.getBoundingClientRect()

      // var styleElem = document.head.appendChild(document.createElement("style"));
      const windowWidth = window.innerWidth
      let leftPosition = this.isOneWord ? -20 : -80
      let topPosition = false

      if (elPosition?.top) {
        if (elPosition?.top < 130 || this.isBottomPosition) {
          topPosition = true
        }
      }

      if (elPosition?.width || elPosition.left) {
        if (elPosition.left < 300) {
          leftPosition = -elPosition.left + 24
        } else if ((windowWidth - elPosition.left) > 0 && (windowWidth - elPosition.left) < 300) {
          leftPosition = -(360 - (windowWidth - elPosition.left)) + 24
        } else if ((elPosition.left - windowWidth) > 0) {
          leftPosition = - 210
        }
      }

      if (topPosition) tooltip.className = `${tooltip.className} tooltip-bottom`

      tooltip.style.setProperty('--left', `${leftPosition}px`)
      // styleElem.innerHTML = `#tooltip:after {left: ${leftPosition}px;}`;
    }
  },

  methods: {
    mouseoverTooltip() {
      this.isShowTooltip = true
    },
    mouseoutTooltip() {
      this.isShowTooltip = false

      document.removeEventListener('scroll', this.mouseoutTooltip, true)

    },

    openTooltip() {
      if (this.stopPropagation) {
        event.stopPropagation();
      }
      this.isShowTooltip = true

      document.addEventListener('scroll', this.mouseoutTooltip, true)
    },
  }
}
</script>

<style lang="scss" scoped>
.tooltip {
  position: absolute;
  transition: all 0.4s ease;

  &::before {
    position: absolute;
    content: '';
    border-width: 8px 8px 8px 8px; //8px 8px 0px 8px
    border-style: solid;
    border-color: #1D2434 transparent transparent transparent;
    top: -12px;
    z-index: 5;
    transition: all 0.4s ease;
  }

  &::after {
    content: attr(tooltip-text);
    background-color: #1D2434;
    position: absolute;
    z-index: 1;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
    border-radius: 8px;
    bottom: calc(100% + 10px);
    // left: -80px;
    left: var(--left);
    padding: 12px 16px;
    box-shadow: 0px 8px 16px -2px #1B212C1F;
    width: max-content;
    max-width: 300px;
    transition: all 0.4s ease;
    text-align: left;
    height: fit-content;
    color: $colorWhite;
  }
}

.tooltip-bottom {
  &::before {
    top: 9px;
    border-color: transparent transparent #1D2434 transparent;
  }

  &::after {
    top: calc(100% + 22px);
  }
}
</style>