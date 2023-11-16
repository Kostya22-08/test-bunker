<template>
  <div class="custom-date-picker">
    <div class="custom-date-picker__box-label">
      <UiTextsTittleImportant :isImportant="isImportant">
        <p class="custom-date-picker__label">{{ label }}</p>
      </UiTextsTittleImportant>
      <div>
        <slot name="headerRight"></slot>
      </div>
    </div>

    <VField :name="name" v-slot="{ field, meta, errors }">
      <VueDatePicker
        :locale="locale"
        v-bind="field"
        v-model="date"
        :placeholder="placeholder"
        :disabled="isDisabled"
        :format="format"
        @input="onInputHandler"
        :enable-time-picker="false"
        :cancelText="$t('button.cancel')" 
        :selectText="$t('button.done')"
        :flow="flow"
        :clearable="false"
        :month-change-on-scroll="false"
      >
        <template #month="{ text }">
          {{ text.charAt(0).toUpperCase() + text.slice(1) }}
        </template>
        <template #month-overlay-value="{ text }">
          {{ text.charAt(0).toUpperCase() + text.slice(1) }}
      </template>
        <template #input-icon>
          <img class="input-slot-image" src="~/assets/icons/datepicker/calendar-month-outline.svg"/>
        </template>
        <template #calendar-icon>
            <img class="input-slot-image" src="~/assets/icons/datepicker/calendar-month-outline-grey.svg"/>
        </template>
        <template #arrow-left>
          <img class="slot-icon-arrow" src="~/assets/icons/datepicker/arrow-left.svg"/>
        </template>
        <template #arrow-right>
          <img class="slot-icon-arrow" src="~/assets/icons/datepicker/arrow-right.svg"/>
        </template>
      </VueDatePicker>

      <div 
        class="custom-date-picker__sub-box" 
        v-show="errors?.length || errorKey?.length && ERROR_MESSAGE_STORE.getErrorMessageKeys(errorKey) || isSlotHelperText"
        :id="errorKey || ''"
      >
        <VErrorMessage v-if="errors?.length" :name="name" as="span" class="custom-date-picker__error" />
        <span v-else-if="errorKey?.length && ERROR_MESSAGE_STORE.getErrorMessageKeys(errorKey)" class="custom-date-picker__error">
          {{ ERROR_MESSAGE_STORE.getErrorMessageKeys(errorKey) }}
        </span>
        <span v-show="isSlotHelperText"><slot name="helperText"></slot></span>
      </div>

    </VField>

  </div>
</template>

<script>
export default {
  name: "UiFieldsDatePicker",
  props: {
    value: {
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    isImportant: Boolean,
    placeholder: {
      type: String,
      default: "",
    },
    isDisabled: Boolean,
    errorKey: {
      type: String,
      default: null,
    },
    isSlotHelperText: Boolean,
  },
  // emits: ['update:value'],
  data: () => ({
    date: null,
  }),

  methods: {
    onInputHandler() {
      this.ERROR_MESSAGE_STORE.setErrorMessageKeys(this.errorKey, null)
    }
  },

  computed: {
    ERROR_MESSAGE_STORE() {
      return useErrorMessageStore()
    },

    format() {
      return 'dd.MM.yyyy'
    },
    locale() {
      return 'ru'
    },
    flow() {
      return this.name == 'birthday' ? ['year', 'month', 'calendar'] : []
    }
  },

  watch: {
    date: {
      handler(newValue) {
        if (newValue) {
          // this.$emit('update:value', newValue);
        } else {
          // this.$emit('update:value', null);
        }
      }
    },
    value: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.date = newValue;
        } else {
          this.date = null;
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.custom-date-picker {

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

  &__is-error {
    border: 1px solid #F06C5D;
  }
}

@media only screen and (max-width: 768px) {
  .custom-date-picker {

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

<style lang="scss" >
.dp__input {
  font-family: 'Montserrat';
  width: 100%;
  padding: 10px 42px 10px 12px;
  background: #fff;
  border: 1px solid #D6D7D9;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
  transition-duration: 0.3s;

  &::placeholder {
    font-family: 'Montserrat';
    color: #D6D7D9;
  }

  &:hover,
  &:focus,
  &:active {
    outline: none;
  }
}

.dp__menu_index {
  z-index: 150;
}

.dp__input_icon {
  // right: 12px;
  left: calc(100% - 32px);
}

.input-slot-image {
  width: 20px;
  height: 20px;
  // right: 12px;
  // top: 12px;
}

.dp__overlay_cell_active {
  font-family: 'Montserrat';
  background: #F4F4FD;
  color: #1D2434;
}

.dp__active_date {
  font-family: 'Montserrat';
  background: linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%);
  border: none;
}

.dp__today {
  font-family: 'Montserrat';
  background: #F4F4FD;
  border: none;
}

.dp__action_buttons {
  display: flex;
  align-items: center;
}

.dp__action {
  font-family: 'Montserrat';
  font-size: 14px;
  font-weight: 600;
  line-height: 15px;
  text-align: left;
}

.dp__cancel,
.dp__action_cancel {
  font-family: 'Montserrat';
  color: #1D2434;
  border: none;
  font-family: 'Montserrat';
  font-size: 14px;
  font-weight: 600;
  line-height: 15px;
  text-align: left;
}

.dp__select,
.dp__action_select {
  font-family: 'Montserrat';
  background: -webkit-linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-family: 'Montserrat';
  font-size: 14px;
  font-weight: 600;
  line-height: 15px;
  text-align: left;

  &:hover {
    background: -webkit-linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}

.dp__calendar_header_separator {
  background: #F4F4FD;
}

.dp__calendar_header_item {
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
}

.dp__month_year_select {
  font-family: 'Montserrat';
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
}

.slot-icon-arrow {
  width: 25px;
  height: 25px;
}
</style>