<template>
  <div class="UiFilterComponent__custom-filter-box">
    <div class="UiFilterComponent__custom-filter-box__item"
      v-for="item in filters"
      :key="item.key"
    >
      <p v-if="item.title">{{ item.title }}</p>

      <div class="UiFilterComponent__custom-filter-box__item__fields" v-if="item.type == 'checkbox'">
        <UiFieldsCheckbox 
          v-for="(option, i) in item.options"
          :key="option + 'UiFieldsCheckbox'"
          v-show="isShowItemOption(item.key, i, item.isShowShortList)"
          :isActive="option.value" 
          @setActive="setValue(item.key, option.id, $event)"
        >
          <span class="UiFilterComponent__custom-filter-box__item__fields__checkbox-text">{{ option.title }}</span>
        </UiFieldsCheckbox>
      </div>

      <UiTextsTextGradient 
        v-if="item.options.length > 4 && item.isShowShortList"
        :title="isShowFullItems?.[item.key] ? $t('button.hide') : $t('button.show_more')" 
        isGradientTextDefault
        isHoverUnderline
        isSpanText
        @click="isShowFullItems[item.key] = !isShowFullItems[item.key]"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiFilterComponent',
  emits: ['update:filters'],
  setup() {
    useHead({
      style: [
        {
          type: "text/css",
          id: "UiFilterComponent",
          children: `
.UiFilterComponent__custom-filter-box {
	 width: 100%;
}
 .UiFilterComponent__custom-filter-box__item {
	 border-radius: 16px;
	 background: #fff;
	 padding: 20px;
	 width: 100%;
	 display: flex;
	 flex-direction: column;
}
 .UiFilterComponent__custom-filter-box__item > p {
	 font-size: 18px;
	 font-style: normal;
	 font-weight: 600;
	 line-height: 130%;
	 margin-bottom: 16px;
}
 .UiFilterComponent__custom-filter-box__item > span {
	 font-size: 14px;
	 font-style: normal;
	 font-weight: 600;
	 line-height: 130%;
	 margin-top: 16px;
	 cursor: pointer;
}
 .UiFilterComponent__custom-filter-box__item__fields {
	 display: flex;
	 flex-direction: column;
}
 .UiFilterComponent__custom-filter-box__item__fields > div {
	 margin-top: 12px;
}
 .UiFilterComponent__custom-filter-box__item__fields > div:first-child {
	 margin-top: 0px;
}
 .UiFilterComponent__custom-filter-box__item__fields__checkbox-text {
	 margin-left: 10px;
	 font-size: 16px;
	 font-style: normal;
	 font-weight: 400;
	 line-height: 150%;
	 cursor: pointer;
}
        `,
        }
      ]
    })
  },
  props: {
    filters: {
      type: Array,
      default: [],
    }
  },
  data: () => ({
    isShowFullItems: {},
  }),

  methods: {
    setValue(key, id, value) {
      const filerByKey = this.filters.find(f => f.key == key);
      const newOptions = filerByKey?.options.map(option => {
        if (option.id == id) {
          return { ...option, value: value }
        } else {
          return option
        }
      })

      if (newOptions) {
        this.$emit('update:filters', this.filters.map(filter => {
          if (filter.key == key) {
            return {
              ...filter,
              options: newOptions
            }
          } else {
            return filter
          }
        }))
      }
    },

    isShowItemOption(key, i, isShowShortList) {
      if (isShowShortList) {
        if (this.isShowFullItems?.[key]) {
          return true;
        } else if (i < 4) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    }
  },

  watch: {
    filters: {
      immediate: true,
      handler(newValue) {
        if (newValue?.length) {
          newValue.forEach(filter => {
            if (filter.isShowShortList && !this.isShowFullItems?.[filter.key]) {
              this.isShowFullItems = { ...this.isShowFullItems, [filter.key]: false, }
            }
          })
        }
      }
    }
  }
}
</script>