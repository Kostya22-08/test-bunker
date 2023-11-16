<template>
  <div class="custom-input">
    <div class="custom-input__box-label" :style="`justify-content: ${headerJustifyContent};`">
      <UiTextsTittleImportant :isImportant="isImportant">
        <p class="custom-input__label">{{ label }}</p>
      </UiTextsTittleImportant>
      <div>
        <slot name="headerRight"></slot>
      </div>
    </div>

    <div :class="{ 'custom-input__type-password': type == 'password' }">
      <VField :name="name" v-slot="{ field, meta, errors }">
        <textarea
          v-if="type == 'textarea'"
          class="custom-input__textarea"
          v-bind="field"
          :value="value ? value : field.value"
          :placeholder="placeholder"
          :readonly="isDisabled"
          :class="{
            'custom-input__is-error': (!meta.valid && meta.touched) || ERROR_MESSAGE_STORE.getErrorMessageKeys(errorKey),
            'custom-input__is-disabled': isDisabled
          }"
          :style="`min-height: ${minHeight};`"
          @input="onInputHandler"
        ></textarea>
        <input
          v-else
          class="custom-input__input"
          v-bind="field"
          :value="value ? value : field.value"
          :type="inputType"
          :placeholder="placeholder"  
          :readonly="isDisabled"
          :class="{
            'custom-input__is-error': (!meta.valid && meta.touched) || ERROR_MESSAGE_STORE.getErrorMessageKeys(errorKey),
            'custom-input__is-disabled': isDisabled
          }"
          @input="onInputHandler"
        />

        <div v-if="type == 'password'" class="custom-input__type-password__eyes">
          <EyeOffIcon  v-if="inputType == 'password'" isNoHover defaultFill="grey" @click="inputType = 'text'"/>
          <EyeIcon v-else isNoHover defaultFill="grey" @click="inputType = 'password'"/>
        </div>

        <div 
          class="custom-input__sub-box" 
          v-show="errors?.length || errorKey?.length && ERROR_MESSAGE_STORE.getErrorMessageKeys(errorKey) || isSlotHelperText"
          :id="errorKey || ''"
        >
          <VErrorMessage v-if="errors?.length" :name="name" as="span" class="custom-input__error" />
          <span v-else-if="errorKey?.length && ERROR_MESSAGE_STORE.getErrorMessageKeys(errorKey)" class="custom-input__error">
            {{ ERROR_MESSAGE_STORE.getErrorMessageKeys(errorKey) }}
          </span>
          <span v-show="isSlotHelperText"><slot name="helperText"></slot></span>
        </div>
      </VField>
    </div>
  </div>
</template>

<script>
export default {
  name: "UiFieldsInput",
  emits: ['update:value'],
  props: {
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      // required: true,
    },
    value: {
      default: null,
    },
    label: {
      type: String,
      // required: true,
    },
    isImportant: Boolean,
    placeholder: {
      type: String,
      default: "",
    },
    isDisabled: Boolean,
    componentIconLeft: {
      type: String,
      default: null,
    },
    componentIconRight: {
      type: String,
      default: null,
    },
    minHeight: {
      type: String,
      default: 'auto',
    },
    errorKey: {
      type: String,
      default: null,
    },
    isSlotHelperText: Boolean,
    headerJustifyContent: {
      type: String,
      default: 'space-between',
    }
  },

  data: () => ({
    inputType: 'text',
  }),

  methods: {
    onInputHandler(e) {
      this.ERROR_MESSAGE_STORE.setErrorMessageKeys(this.errorKey, null)
      this.$emit('update:value', e.target.value)
    }
  },

  computed: {
    ERROR_MESSAGE_STORE() {
      return useErrorMessageStore()
    }
  },

  watch: {
    type: {
      immediate: true,
      handler(newValue) {
        if (newValue) this.inputType = newValue
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-input {

  &__box-label {
    display: flex;
    align-items: center;
    // justify-content: space-between;
  }

  &__label {
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    margin-bottom: 6px;
    padding-right: 2px;
  }

  &__textarea,
  &__input {
    resize: none;
    width: 100%;
    padding: 10px 12px;
    background: #fff;
    border: 1px solid #D6D7D9;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 500;
    line-height: 24px;
    transition-duration: 0.3s;

    &::placeholder {
      color: #D6D7D9;
    }

    &:hover,
    &:focus,
    &:active {
      outline: none;
    }
  }

  &__type-password {
    position: relative;

    &>input {
      padding-right: 45px;
    }

    &__eyes {
      position: absolute;
      // z-index: 5;
      top: 0;
      right: 0;
      padding: 12px 12px 12px 10px;
      // background: #fff;

      &>svg {
        cursor: pointer;
        width: 20px;
        height: 20px;
      }
    }
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

  &__is-error {
    border: 1px solid #F06C5D;
  }

  &__is-disabled {
    cursor: not-allowed;
    background: #fafafd;
    color: #D6D7D9;
  }
}

@media only screen and (max-width: 768px) {
  .custom-input {

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