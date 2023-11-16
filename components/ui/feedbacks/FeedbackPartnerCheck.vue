<template>
  <div :class="`feedback-form-check ${isError ? 'feedback-form-check__error' : ''}`">
    <div class="feedback-form-check__row">
      <p>{{ isSoft ? $t('soft_id_page.worth_using') : isCourse ? $t('course_id_page.is_it_worth_buying') : $t('partner_id_page.is_worth') }}</p>
      <div :class="`feedback-form-check__row__icons ${noUpdate ? '' : 'svg-hover'}`">
        <SvgCheckboxMarkedCircleOutlineIcon 
          v-show="noUpdate && form.isWorth == false ? false : true"
          defaultFill="greyLight"
          :isGradient="form.isWorth == true"
          isNoHover
          @click="updateForm('isWorth', true)"
        />
        <SvgCancelIcon 
          v-show="noUpdate && form.isWorth == true ? false : true"
          defaultFill="greyLight"
          :isGradient="form.isWorth == false"
          isNoHover
          @click="updateForm('isWorth', false)"
        />
      </div>
    </div>
    <div class="feedback-form-check__row">
      <p>{{ isCourse ? $t('course_id_page.feedback') : $t('partner_id_page.support') }}</p>
      <div :class="`feedback-form-check__row__icons ${noUpdate ? '' : 'svg-hover'}`">
        <SvgFingerUpIcon 
          v-show="noUpdate && form.support == false ? false : true"
          defaultFill="greyLight"
          :isGradient="form.support == true"
          isNoHover
          @click="updateForm('support', true)"
        />
        <SvgFingerDownIcon 
          v-show="noUpdate && form.support == true ? false : true"
          defaultFill="greyLight"
          :isGradient="form.support == false"
          isNoHover
          @click="updateForm('support', false)"
        />
      </div>
    </div>
    <div class="feedback-form-check__row">
      <p>{{ isSoft ? $t('words.technologies') : isCourse ? $t('course_id_page.utility') : $t('partner_id_page.instruments') }}</p>
      <div :class="`feedback-form-check__row__icons ${noUpdate ? '' : 'svg-hover'}`">
        <SvgFingerUpIcon 
          v-show="noUpdate && form.instruments == false ? false : true"
          defaultFill="greyLight"
          :isGradient="form.instruments == true"
          isNoHover
          @click="updateForm('instruments', true)"
        />
        <SvgFingerDownIcon 
          v-show="noUpdate && form.instruments == true ? false : true"
          defaultFill="greyLight"
          :isGradient="form.instruments == false"
          isNoHover
          @click="updateForm('instruments', false)"
        />
      </div>
    </div>
    <div class="feedback-form-check__row">
      <p>{{ isSoft ? $t('words.efficiency') : isCourse ? $t('course_id_page.quality_training') : $t('partner_id_page.quality_offers') }}</p>
      <div :class="`feedback-form-check__row__icons ${noUpdate ? '' : 'svg-hover'}`">
        <SvgFingerUpIcon 
          v-show="noUpdate && form.quality_offers == false ? false : true"
          defaultFill="greyLight"
          :isGradient="form.quality_offers == true"
          isNoHover
          @click="updateForm('quality_offers', true)"
        />
        <SvgFingerDownIcon 
          v-show="noUpdate && form.quality_offers == true ? false : true"
          defaultFill="greyLight"
          :isGradient="form.quality_offers == false"
          isNoHover
          @click="updateForm('quality_offers', false)"
        />
      </div>
    </div>
    <div class="feedback-form-check__row">
      <p>{{ isCourse ? $t('words.efficiency') : $t('partner_id_page.indulgence') }}</p>
      <div :class="`feedback-form-check__row__icons ${noUpdate ? '' : 'svg-hover'}`">
        <SvgFingerUpIcon 
          v-show="noUpdate && form.reliability == false ? false : true"
          defaultFill="greyLight"
          :isGradient="form.reliability == true"
          isNoHover
          @click="updateForm('reliability', true)"
        />
        <SvgFingerDownIcon 
          v-show="noUpdate && form.reliability == true ? false : true"
          defaultFill="greyLight"
          :isGradient="form.reliability == false"
          isNoHover
          @click="updateForm('reliability', false)"
        />
      </div>
    </div>

    <div :class="`feedback-form-check__result ${noUpdate ? getFinalAssessment >= 85 ? 'feedback-form-check__result__green' : getFinalAssessment < 60 ? 'feedback-form-check__result__red' : 'feedback-form-check__result__yellow' : checkNoSelect ? 'feedback-form-check__result__grey' : ''}`" >
      <p>{{ $t('partner_id_page.final_assessment') }}</p> <span>{{ getFinalAssessmentString }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiFeedbacksFeedbackPartnerCheck',
  emits: ['update:value'],
  props: {
    value: {
      type: Object,
      default: null,
    },
    noUpdate: Boolean,
    isError: Boolean,
    isSoft: Boolean,
    isCourse: Boolean,
  },

  data: () => ({
    form: {
      isWorth: null,
      support: null,
      instruments: null,
      quality_offers: null,
      reliability: null,
    }
  }),

  methods: {
    updateForm(key, value) {
      if (!this.noUpdate) {
        this.form[key] = value;

        this.$emit('update:value', { ...this.form, finalAssessment: this.getFinalAssessment })
      }
    }
  },

  computed: {
    getFinalAssessment() {
      let res = 0
      if (this.form.isWorth) res += 40
      if (this.form.support) res += 15
      if (this.form.instruments) res += 15
      if (this.form.quality_offers) res += 15
      if (this.form.reliability) res += 15

      return res
    },

    getFinalAssessmentString() {
      if (this.getFinalAssessment) {
        const res = this.getFinalAssessment / 10
        return res //.toString().replace('.', ',')
      } else return 0
    },

    checkNoSelect() {
      let res = true;
      if (this.form.isWorth != null) res = false;
      if (this.form.support != null) res = false;
      if (this.form.instruments != null) res = false;
      if (this.form.quality_offers != null) res = false;
      if (this.form.reliability != null) res = false;
      return res
    },
  },

  watch: {
    value: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.form = {
            ...this.form,
            ...newValue,
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bad-result {
  background: $colorRed;
}

.good-result {
  background: $colorGreen2;
}

.normal-result {
  background: $colorOrange;
}

.no-result {
  background: $colorGreyLight;
}

.svg-hover {
  &>svg {
    cursor: pointer;

    &:hover {
      margin: -1px -1px 0px 0px;
      width: 25px;
      height: 25px;
    }

    &:active {
      margin: 1px 1px 0px 0px;
      width: 23px;
      height: 23px;
    }
  }
}

.feedback-form-check {
  border-radius: 8px;
  background: #FAFAFD;
  padding: 20px 10px;
  width: 100%;
  max-width: 255px;

  &__row {
    margin-left: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;

    &:first-child {
      margin-top: 0px;
    }

    &>p {
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
    }

    &__icons {
      display: flex;
      align-items: center;

      &>svg {
        width: 24px;
        height: 24px;
        margin-left: 12px !important;

        &:first-child {
          margin-left: 0px;
        }
      }
    }
  }

  &__result {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 8px;
    border-radius: 6px;
    margin-top: 24px;
    background: $colorPurple;

    &>p {
      font-size: 16px;
      font-style: normal;
      font-weight: 500;
      line-height: normal;
      color: #fff;
    }

    &>span {
      font-size: 18px;
      font-style: normal;
      font-weight: 700;
      line-height: 130%;
      color: #fff;
    }

    &__green {
      background: $colorGreen2 !important;
    }

    &__red {
      background: $colorRed !important;
    }

    &__yellow {
      background: $colorOrange !important;
    }

    &__grey {
      background: #9599A0 !important;
    }
  }

  &__error {
    border: 1px solid #F06C5D !important;
  }
}

@media only screen and (max-width: 1124px) {

  .feedback-form-check {
    border-radius: 8px;
    background: linear-gradient(white, white) padding-box,
      linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%) border-box;
    border: 1px solid transparent;
    position: relative;
    padding: 20px 10px 15px 10px;
    width: 100%;
    max-width: 100%;

    &__row {
      margin-top: 10px;

      &:first-child {
        margin-top: 0px;
      }

      &>p {
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%;
      }

      &__icons {
        display: flex;
        align-items: center;

        &>svg {
          width: 24px;
          height: 24px;
          margin-left: 16px !important;

          &:first-child {
            margin-left: 0px;
          }
        }
      }
    }

    &__result {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 8px;
      border-radius: 6px;
      margin-top: 24px;
      background: $colorPurple;

      &>p {
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: 150%;
        color: #fff;
      }

      &>span {
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: 130%;
        color: #fff;
      }
    }
  }
}
</style>