<template>
  <div class="custom-text-editor">
    <div class="custom-text-editor__box-label" >
      <UiTextsTittleImportant :isImportant="isImportant">
        <p class="custom-text-editor__label">{{ label }}</p>
      </UiTextsTittleImportant>
      <div>
        <slot name="headerRight"></slot>
      </div>
    </div>

    <UiFieldsHtmlEditor 
      :value="value" 
      :placeholder="placeholder"
      @updateValue="setValue"
      :isError="errorKey?.length && useErrorMessageStore().getErrorMessageKeys(errorKey)"
    />

    <div class="custom-text-editor__sub-box" v-if="isSlotHelperText || (errorKey?.length && useErrorMessageStore().getErrorMessageKeys(errorKey))" :id="errorKey">
      <span v-if="errorKey?.length && useErrorMessageStore().getErrorMessageKeys(errorKey)" :id="errorKey" class="custom-text-editor__error">
        {{ useErrorMessageStore().getErrorMessageKeys(errorKey) }}
      </span>
      <span v-show="isSlotHelperText" style="margin-right: 8px;">
        <slot name="helperText"></slot>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "UiFieldsCustomSelect",

  props: {
    label: {
      type: String,
      required: true,
    },
    isImportant: Boolean,
    value: {
      type: String,
      required: true,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    errorKey: {
      type: String,
      default: null,
    },
    isSlotHelperText: Boolean,
  },

  methods: {
    setValue(e) {
      this.$emit('update:value', e)

      if (this.errorKey) {
        useErrorMessageStore().setErrorMessageKeys(this.errorKey, null)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-text-editor {

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
    margin-top: 6px;
    // min-height: 18px;

    &>span {
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      line-height: 21px;
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

@media only screen and (max-width: 768px) {
  .custom-text-editor {

    &__label {
      font-size: 14px;
      font-weight: 600;
      line-height: 20px;

      margin-bottom: 6px;
    }
  }
}
</style>