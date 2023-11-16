<template>
  <div class="custom-select">
    <div class="custom-select__box-label" >
      <UiTextsTittleImportant :isImportant="isImportant">
        <p class="custom-select__label">{{ label }}</p>
      </UiTextsTittleImportant>
      <div>
        <slot name="headerRight"></slot>
      </div>
    </div>
    
    <div 
      class="custom-select__select" 
      :tabindex="tabindex" 
      @click="openSelectDropdown" 
      @focusout="setFocusoutSelect"
    >
      <div class="custom-select__select__selected" :data-text="placeholder" 
        :class="`border-${selectStyleType} size-${textSize}-selected ${errorKey?.length && useErrorMessageStore().getErrorMessageKeys(errorKey) ? 'custom-select__is-error' : ''} ${(fieldValue?.id || fieldValue?.id == null || fieldValue?.length > 0) ? 'not-show-placeholder' : 'show-placeholder'}`"
        :ref="(el) => setSelectDropdownMargin(el)"
      >
        <div class="custom-select__select__selected__value">
          <span 
            v-show="isMulti"
            v-for="item in fieldValue"
            :key="`${item?.title}` + `${item?.id}` + 'custom-select'"
            class="custom-select__select__selected__value__multi-item"
            @click="removeItemInMulti(item.id)"
          >
            {{ item?.title }}
            <div class="custom-select__select__selected__value__multi-item__close">
              <hr />
            </div>
          </span>
          <span  
            v-if="!isMulti" 
            class="custom-select__select__selected__value__item"
            :class="`size-${textSize}-text`"
          >
            {{ fieldValue?.title }}
          </span>
          <input v-if="isShowSearch"/>
        </div>
        <ChevronDownIcon 
          v-if="!isNoUseDropdown"
          isNoHover 
          :style="`transition: 0.3s; ${isActiveDropdown ? 'transform: rotate(180deg);' : ''}`"
        />
      </div>
      <ul class="custom-select__select__dropdown" 
        :class="`size-${textSize}-dropdown`"
        :style="`margin-top: ${mtForDropdown}px`"
        v-show="isActiveDropdown"
      >
        <div v-if="isLoading" class="spinner"></div>
        <input 
          v-if="isShowSearchInDropdown"
          :tabindex="5" 
          @focus="isFocusInputInDropdown = true" 
          @focusout="isFocusInputInDropdown = false"
          class="custom-select__select__dropdown__search"
          placeholder="Search"
          :value="searchWordInDropdown"
          @input="(e) => $emit('inputSearchInDropdown', e.target.value)"
        />
        <div v-if="options.length == 0" class="custom-select__select__dropdown__no-data-message">
          {{ noDataMessage }}
        </div>
        <li v-else-if="isEmptyValueOption"
          @click="selectedValue({ id: null, title: $t('messages.not_selected') })"
          :class="`size-${textSize}-dropdown-text`"
        >
          {{ $t('messages.not_selected') }}
        </li>
        <li 
          v-for="option in options" 
          :key="`${option.id}` + `${option.title}`"
          @click="selectedValue(option)"
          :class="`size-${textSize}-dropdown-text`"
        >
        {{ option.title }}
        </li>
      </ul>
    </div>

    <div class="custom-select__sub-box" v-if="gradientSubBoxText || isSlotHelperText || (errorKey?.length && useErrorMessageStore().getErrorMessageKeys(errorKey))">
      <UiTextsTextGradient 
        v-if="gradientSubBoxText"
        isSpanText 
        :title="gradientSubBoxText"
        @click="$emit('clickGradientSubBoxText')"
        style="margin-right: 8px;"
      />
      <span v-if="errorKey?.length && useErrorMessageStore().getErrorMessageKeys(errorKey)" :id="errorKey" class="custom-select__error">
        {{ useErrorMessageStore().getErrorMessageKeys(errorKey) }}
      </span>
      <span v-show="isSlotHelperText" style="margin-right: 8px;">
        <slot name="helperText"></slot>
      </span>
    </div>

    <div v-if="isMulti && additionalArray" class="custom-select__additional-values">
      <div class="custom-select__additional-values__item"
        v-for="item in additionalArray"
        :key="item.id + 'additionalArray'"
        @click="checkIsSelectedValue(item.id) ? removeItemInMulti(item.id) : selectedValue(item)"
      >
        {{ item.title }}
        <div :class="checkIsSelectedValue(item.id) ? 'custom-select__additional-values__item__close' : 'custom-select__additional-values__item__add'">
          <hr />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconMixin from "@/components/svg/mixin"

export default {
  name: "UiFieldsCustomSelect",
  mixins: [IconMixin],
  props: {
    selectStyleType: {
      type: String,
      default: "classic",
      validator(value) {
        return ['classic', 'green'].includes(value)
      }
    },
    textSize: {
      type: String,
      default: "normal",
      validator(value) {
        return ['normal', 'small'].includes(value)
      }
    },
    label: {
      type: String,
      required: true,
    },
    isImportant: Boolean,
    value: {
      // type: String | Object | Array,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
    options: {
      type: Array,
      required: true,
      default: []
    },
    isEmptyValueOption: Boolean,
    isShowSearchInDropdown: Boolean,
    searchWordInDropdown: {
      type: String,
      default: "",
    },
    noDataMessage: {
      type: String,
      default: "No data",
    },
    gradientSubBoxText: {
      type: String,
      default: null,
    },
    errorKey: {
      type: String,
      default: null,
    },
    additionalArray: {
      type: Array,
      default: null,
    },
    isMulti: Boolean,
    isShowSearch: Boolean,
    isLoading: Boolean,
    isSlotHelperText: Boolean,
    isNoUseDropdown: Boolean,
  },
  emits: ['inputSearchInDropdown', 'update:value'],

  data: () => ({
    isActiveDropdown: false,
    isFocusInputInDropdown: false,

    fieldValue: null,
    tabindex: 1,

    mtForDropdown: 50,
  }),

  methods: {
    openSelectDropdown() {
      if (this.isActiveDropdown == true && this.isFocusInputInDropdown == false) {
        this.isActiveDropdown = false;
      } else if (!this.isNoUseDropdown) {
        this.isActiveDropdown = true;
      }
      event.stopPropagation();
    },

    setSelectDropdownMargin(el) {
      this.mtForDropdown = el?.offsetHeight
    },

    checkIsSelectedValue(id) {
      if (this.value) {
        return this.value.find(item => item.id == id) ? true : false;
      }
      return false
    },

    selectedValue(option) {
      if (this.isMulti) {
        if (Array.isArray(this.value)) {
          if (!(this.value.find(item => item.id == option.id))) {
            // this.value.push(option)
            const res = [...this.value, option]
            this.$emit('update:value', res)
          }
        } else {
          // this.value = [option]
          this.$emit('update:value', [option])
        }
      } else {
        this.$emit('update:value', option.id)
        // this.value = option.id

        // openAndCloseDropdown
        this.openAndCloseDropdown()
        setTimeout(() => {
          this.openAndCloseDropdown()
        }, 0)
      }

      useErrorMessageStore().setErrorMessageKeys(this.errorKey, null)
      event.stopPropagation();
    },

    removeItemInMulti(id) {
      const res = this.value.filter(item => item.id != id)
      this.$emit('update:value', res)

      useErrorMessageStore().setErrorMessageKeys(this.errorKey, null)
      event.stopPropagation();
    },

    openAndCloseDropdown() {
      if (this.tabindex == null) {
        this.tabindex = 1
      } else {
        this.tabindex = null
        this.isActiveDropdown = false
      }
    },

    setFocusoutSelect() {
      if (this.isShowSearchInDropdown) {
        setTimeout(() => {
          if (!this.isFocusInputInDropdown) {
            this.isActiveDropdown = false
          }
        }, 300)
      } else {
        this.isActiveDropdown = false
      }
    }
  },

  computed: {
  },

  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        if (newValue && this.options?.length) {
          if (this.isMulti) {
            this.fieldValue = newValue
          } else {
            if (this.options.find(item => item.id == newValue)) {
              this.fieldValue = this.options.find(item => item.id == newValue)
            } else if (this.isEmptyValueOption) {
              this.fieldValue = { id: null, title: this.$t('messages.not_selected') }
            } else {
              this.fieldValue = null
            }
          }
        }
        if (newValue == null) {
          if (this.isEmptyValueOption) {
            this.fieldValue = { id: null, title: this.$t('messages.not_selected') }
          } else {
            this.fieldValue = null
          }
        }
      }
    },

    options: {
      immediate: true,
      handler(newValue) {
        if (newValue?.length && this.value) {
          if (this.isMulti) {
            this.fieldValue = this.value
          } else {
            this.fieldValue = this.options.find(item => item.id == this.value)
          }
        }
      }
    },

    isFocusInputInDropdown(newValue) {
      if (newValue) {
        this.isActiveDropdown = true
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.border-green {
  border: 1px solid $colorGreen2;
}

.border-classic {
  border: 1px solid #D6D7D9;
}

.size {
  &-normal {
    &-selected {
      min-height: 48px;
      padding: 10px 12px;

      &::before {
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
      }
    }

    &-text {
      font-size: 14px;
      font-weight: 500;
      line-height: 24px;
    }

    &-dropdown {
      // margin-top: 50px;
    }

    &-dropdown-text {
      padding: 16px 24px;
      font-size: 14px;
      font-weight: 500;
      line-height: 24px;
    }
  }

  &-small {
    &-selected {
      min-height: 32px;
      padding: 5px 12px;

      &::before {
        font-size: 12px;
        font-weight: 500;
        line-height: 24px;
      }
    }

    &-text {
      font-size: 12px;
      font-weight: 500;
      line-height: 24px;
    }

    &-dropdown {
      // margin-top: 35px;
    }

    &-dropdown-text {
      padding: 16px 24px;
      font-size: 14px;
      font-weight: 500;
      line-height: 24px;
    }
  }
}

.spinner {
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  z-index: 5;
  border-radius: 10px;
  background: linear-gradient(white, white) padding-box;

  &::before {
    content: '';
    width: 20px;
    height: 20px;
    border-radius: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    animation: spin 1s infinite ease;

    border: 2px solid rgb(208, 13, 217, 0.1);
    border-top: 2px solid #D00DD9;
  }
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.custom-select {

  &__box-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__label {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    margin-bottom: 6px;
    padding-right: 2px;
  }

  &__select {
    position: relative;

    &__selected {
      width: 100%;
      // padding: 10px 12px;
      // min-height: 48px;
      background: #fff;
      // border: 1px solid #D6D7D9;
      border-radius: 8px;
      // font-size: 14px;
      // font-weight: 500;
      // line-height: 24px;
      transition-duration: 0.3s;
      cursor: pointer;
      display: flex;
      // align-items: flex-start;
      align-items: flex-start;
      justify-content: space-between;

      &>svg {
        width: 20px;
        height: 20px;

        min-width: 20px;
        min-height: 20px;
      }

      &__value {
        display: flex;
        flex-wrap: wrap;
        // flex-direction: column;

        &__item {
          // font-size: 14px;
          // font-weight: 500;
          // line-height: 24px;
        }

        &__multi-item {
          margin: 2px;
          background: #F4F4FD;
          padding: 2px 13px;
          font-size: 14px;
          font-weight: 500;
          line-height: 24px;
          display: flex;
          align-items: center;
          border-radius: 36px;
          display: flex;
          align-items: center;

          &__close {
            margin-top: -3px;
            margin-left: 5px;
            height: 8px;
            width: 10px;
            cursor: pointer;

            &>hr {
              width: 0;
              height: 0;
              border: none;
              margin-top: 5px;
            }

            &>hr::before {
              content: '';
              transform: rotate(-45deg);
              margin-top: 0;
              width: 10px;
              position: absolute;
              height: 1px;
              background: linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%);
            }

            &>hr::after {
              content: '';
              transform: rotate(45deg);
              margin-top: 0;
              width: 10px;
              position: absolute;
              height: 1px;
              background: linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%);
            }
          }
        }
      }
    }

    &__dropdown {
      position: absolute;
      padding: 8px 0;
      background-color: #fff;
      box-shadow: 0px 4px 23px 0px #14142B24;
      border-radius: 10px;
      // margin-top: 50px;
      top: 9px;
      left: 0;
      width: 100%;
      max-height: 280px;
      z-index: 10;

      overflow-y: auto;
      scrollbar-width: none;

      &::-webkit-scrollbar {
        width: 0px;
        height: 0px;
      }

      &>li {
        background-image: none;
        // padding: 16px 24px;

        &:hover {
          cursor: pointer;
          background: #F3F3FD;
        }
      }

      &__search {
        margin: 16px 24px 0 24px;
        width: calc(100% - 48px);
        padding: 10px 12px 10px 42px;
        background: #fff;
        border: 1px solid #D6D7D9;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
        transition-duration: 0.3s;
        position: relative;

        background-image: url("@/assets/icons/search-icon.svg");
        background-repeat: no-repeat;
        background-position: 12px 12px;
        background-size: 20px;

        &::placeholder {
          color: #D6D7D9;
        }

        &:hover,
        &:focus,
        &:active {
          outline: none;
        }
      }

      &__no-data-message {
        padding: 16px 24px;
        width: 100%;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
      }
    }
  }

  &__sub-box {
    margin-top: 6px;
    // min-height: 18px;

    &>span {
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      line-height: 21px;
    }
  }

  &__additional-values {
    margin-top: -2px;
    display: flex;
    flex-wrap: wrap;

    &__item {
      margin: 16px 16px 0 0;
      display: flex;
      align-items: center;
      border-radius: 26px;
      padding: 8px 20px;
      background: linear-gradient(white, white) padding-box,
        linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%) border-box;
      border: 1px solid transparent;
      font-size: 14px;
      font-weight: 500;
      line-height: 17px;
      cursor: pointer;

      &__close {
        margin-top: -3px;
        margin-left: 10px;
        height: 8px;
        width: 10px;
        cursor: pointer;

        &>hr {
          width: 0;
          height: 0;
          border: none;
          margin-top: 5px;
        }

        &>hr::before {
          content: '';
          transform: rotate(-45deg);
          margin-top: 0;
          width: 10px;
          position: absolute;
          height: 1px;
          background: linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%);
        }

        &>hr::after {
          content: '';
          transform: rotate(45deg);
          margin-top: 0;
          width: 10px;
          position: absolute;
          height: 1px;
          background: linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%);
        }
      }

      &__add {
        margin-top: -3px;
        margin-left: 10px;
        height: 8px;
        width: 10px;
        cursor: pointer;

        &>hr {
          width: 0;
          height: 0;
          border: none;
          margin-top: 5px;
        }

        &>hr::before {
          content: '';
          transform: rotate(-90deg);
          margin-top: 0;
          width: 10px;
          position: absolute;
          height: 1px;
          background: linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%);
        }

        &>hr::after {
          content: '';
          transform: rotate(0deg);
          margin-top: 0;
          width: 10px;
          position: absolute;
          height: 1px;
          background: linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%);
        }
      }
    }
  }

  &__error {
    position: relative;
    color: #F06C5D;
    font-size: 12px !important;
    font-weight: 500 !important;
    line-height: 18px !important;
    margin-right: 12px;
    padding-left: 20px;

    &::before {
      position: absolute;
      top: 0;
      left: 0;
      width: 16px;
      height: 16px;
      background-image: url("~/assets/icons/error-warning-fill.svg");
      background-position: top;
      background-repeat: no-repeat;
      background-size: cover;
      content: '';
    }
  }

  &__is-error {
    border: 1px solid #F06C5D;
  }
}

.not-show-placeholder {
  &::before {
    display: none;
  }
}

.show-placeholder {
  &::before {
    content: attr(data-text);
    color: #D6D7D9;
  }
}

@media only screen and (max-width: 768px) {
  .size {
    &-normal {
      &-selected {
        min-height: 44px;

        &::before {
          font-size: 14px;
          font-weight: 500;
          line-height: 24px;
        }
      }

      &-text {
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
      }

      &-dropdown {
        // margin-top: 48px;
      }

      &-dropdown-text {
        padding: 14px 15px;
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
      }
    }

    &-small {
      &-selected {
        min-height: 32px;
        padding: 5px 12px;

        &::before {
          font-size: 12px;
          font-weight: 500;
          line-height: 24px;
        }
      }

      &-text {
        font-size: 12px;
        font-weight: 500;
        line-height: 24px;
      }

      &-dropdown {
        // margin-top: 35px;
      }

      &-dropdown-text {
        padding: 14px 15px;
        font-size: 14px;
        font-weight: 500;
        line-height: 24px;
      }
    }
  }

  .custom-select {

    &__label {
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;

      margin-bottom: 6px;
    }

    &__select {


      &__selected {
        // min-height: 44px;
        // font-size: 14px;
        // font-weight: 500;
        // line-height: 24px;

        &__value {

          &__item {
            // font-size: 14px;
            // font-weight: 500;
            // line-height: 24px;
          }

          &__multi-item {
            // background: #F4F4FD;
            // padding: 2px 13px;
            // font-size: 14px;
            // font-weight: 500;
            // line-height: 24px;
            // display: flex;
            // align-items: center;
            // border-radius: 36px;
          }
        }
      }

      &__dropdown {
        border-radius: 8px;
        // margin-top: 48px;
        top: 10px;
        max-height: 280px;


        &>li {
          background-image: none;
          // padding: 14px 15px;

          &:hover {
            cursor: pointer;
            background: #F3F3FD;
          }
        }

        &__search {
          margin: 14px 15px 0 15px;
        }
      }
    }

    &__additional-values {
      margin-top: 4px;

      &__item {
        margin: 12px 8px 0 0;
        font-size: 12px;
        font-weight: 500;
        line-height: 15px;
      }
    }

  }
}
</style>