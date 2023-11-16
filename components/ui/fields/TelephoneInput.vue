<template>
  <div class="phone-input" ref="vueTelInput">
    <div class="phone-input__box-label">
      <UiTextsTittleImportant :isImportant="isImportant">
        <p class="phone-input__label">{{ label }}</p>
      </UiTextsTittleImportant>
      <div>
        <slot name="headerRight"></slot>
      </div>
    </div>

    <VueTelInput 
      class="custom-telephone-input"
      :defaultCountry="'UA'"
      :ignoredCountries="['RU']"
      :dropdownOptions="dropdownOptions"
      :inputOptions="inputOptions"
      :validCharactersOnly="true"
      mode="international"
      v-model="valueField"
      @validate="onValidate"
    ></VueTelInput>

    <div 
      class="phone-input__sub-box" 
      v-show="errorKey?.length && useErrorMessageStore().getErrorMessageKeys(errorKey) || isSlotHelperText"
      :id="errorKey || ''"
    >
      <span v-if="errorKey?.length && useErrorMessageStore().getErrorMessageKeys(errorKey)" class="phone-input__error">
        {{ useErrorMessageStore().getErrorMessageKeys(errorKey) }}
      </span>
      <span v-show="isSlotHelperText"><slot name="helperText"></slot></span>
    </div>
  </div>
</template>

<script>
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';

export default {
  name: "UiFieldsTelephoneInput",
  components: {
    VueTelInput,
  },

  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      required: true,
    },
    isImportant: Boolean,
    errorKey: {
      type: String,
      default: null,
    },
    isSlotHelperText: Boolean,
  },

  data: () => ({
    valueField: null,

    dropdownOptions: {
      "showDialCodeInList": true,
      // "showDialCodeInSelection": true,
      "showFlags": true,
      "showSearchBox": true,
      tabindex: 1
    },
    inputOptions: {
      "placeholder": "",
      autofocus: true,
      showDialCode: true,
      type: 'tel',
    }
  }),

  mounted() {
    this.valueField = this.value || null;

    // if (window) {
    //   const modalElement = document.getElementById('modal-scroll')

    //   if (modalElement) {
    //     modalElement.addEventListener("scroll", () => {
    //       this.setPositionForDropdown(true)
    //     });
    //   } else {
    //     window.addEventListener("scroll", () => {
    //       this.setPositionForDropdown()
    //     });
    //   }
    // }
    // if (document) {
    //   const elements = document?.getElementsByClassName('vti__input')
    //   for (let i = 0; i < elements.length; i++) {
    //     elements[i].setAttribute("pattern", `\\d*`)
    //   }
    // }
  },

  methods: {
    onValidate(e) {
      this.$emit('onValidate', e);
    },

    // setPositionForDropdown(isModal) {
    //   const wHeight = window.innerHeight
    //   const el = this.$refs.vueTelInput
    //   const elPosition = el?.getBoundingClientRect()
    //   const top = elPosition.top

    //   if (isModal && top > 200) {
    //     const elDropdown = document.getElementsByClassName('vti__dropdown-list')
    //     if (elDropdown) {
    //       

    //     }
    //   } else {

    //   }
    // },
  },

  watch: {
    valueField: {
      handler(newValue) {
        this.$emit('update:value', newValue)
        if (this.errorKey) useErrorMessageStore().setErrorMessageKeys(this.errorKey, null)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.phone-input {
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

  &__sub-box {
    margin-top: 8px;
  }

  &__error {
    position: relative;
    color: #F06C5D;
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
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

  // &__is-error {
  //   border: 1px solid #F06C5D;
  // }
}

@media only screen and (max-width: 768px) {
  .phone-input {
    &__label {
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;
      margin-bottom: 6px;
      padding-right: 2px;
    }
  }
}
</style>

<style lang="scss">
.custom-telephone-input {
  padding: 10px 12px;
  background: #fff;
  border: 1px solid #D6D7D9;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  width: 100%;

  &:focus-within {
    box-shadow: none !important;
    border-color: #D6D7D9 !important;
  }

  .vti__input {
    padding-left: 0px;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
  }

  .vti__dropdown {
    padding: 0;

    &:hover {
      background-color: #fff;
    }
  }

  .vti__dropdown.open {
    background-color: #fff;
  }

  .vti__flag {
    border-radius: 2px;
    margin-right: 10px;
  }

  .vti__country-code {
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    margin-top: 1px;
  }

  .vti__dropdown-arrow {
    display: none !important;
  }

  .vti__dropdown-list {
    padding: 20px 0 5px 0;
    background: #FEFEFF;
    box-shadow: 0px 0px 21px 0px #1622330F;
    border-radius: 8px;
    border: none;
    max-height: 440px;
    min-height: 80px;
    left: -14px;
    top: 54px;

    scrollbar-width: none;

    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
  }

  .vti__search_box {
    margin: 0 20px;
    padding: 10px 12px 10px 42px;
    background: #fff;
    border: 1px solid #D6D7D9;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    width: calc(100% - 40px);
    margin-bottom: 14px;

    background-image: url("@/assets/icons/search-icon.svg");
    background-repeat: no-repeat;
    background-position: 12px 12px;
    background-size: 20px;
  }

  .vti__dropdown-item {
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    background-image: none;
    padding: 16px 20px;
    display: flex;
    align-items: center;

    &>strong {
      font-size: 14px;
      font-weight: 600;
      line-height: 24px;
    }

    &>span {
      font-size: 14px;
      font-weight: 500;
      line-height: 24px;
      margin-left: 8px;
    }
  }

  .highlighted {
    background: #F3F3FD !important;
  }
}

@media only screen and (max-width: 768px) {
  .custom-telephone-input {
    .vti__dropdown-list {
      max-height: 300px;
      max-width: calc(100vw - 48px);
    }
  }
}
</style>