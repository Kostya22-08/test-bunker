<template>
  <div v-if="myReviews && item" class="feedback-form-item-message">
    <div class="feedback-form-item-message__box">
      <UiTextsTooltipRatingFeedback :value="checkForm" :isBottomPosition="isBottomPositionTooltip">
        <UiTextsTextBG 
          class="feedback-form-item-message__rating"
          :text="item.rating >= 85 ? `${$t('partner_id_page.recommends')} | ${$t('partner_id_page.evaluation')} ${(item.rating / 10).toFixed(0)}` : item.rating < 60 ? `${$t('partner_id_page.not_recommend')} | ${$t('partner_id_page.evaluation')} ${(item.rating / 10).toFixed(0)}` : `${$t('partner_id_page.not_decided')} | ${$t('partner_id_page.evaluation')} ${(item.rating / 10).toFixed(0)}`" 
          :bg="item.rating >= 85 ? 'green2' : item.rating < 60 ? 'red' : 'orange'" 
        />
      </UiTextsTooltipRatingFeedback>
      
      <UiFeedbacksFeedbackPartnerCheck 
        class="feedback-form-item-message__mobile__check-boxes" 
        v-model:value="checkForm" 
        noUpdate 
        :isSoft="softId || soft"
        :isCourse="courseId || course"
      />
      <div class="feedback-form-item-message__text">
        {{ item.description }}
      </div>

      <div class="feedback-form-item-message__manager-comment"
        v-show="item.manager_comment?.length"
        v-for="comment in item.manager_comment"
        :key="comment.id + item.id + 'manager_comment'"
      >
        <span>{{ $t('partner_id_page.company_representative') }} {{ partner?.name || soft?.name || course?.name }}</span>
        <p>{{ comment.comment }}</p>
      </div>
    </div>
    <!-- <UiFeedbacksFeedbackPartnerCheck class="feedback-form-item-message__check-boxes" v-model:value="checkForm" noUpdate/> -->
  </div>
  <div v-else-if="item" class="feedback-form-item-message">
    <div class="feedback-form-item-message__box">
      <div class="feedback-form-item-message__person">
        <UiImgComponent :src="item.user?.avatar" :alt="item.user?.firstname"/>
        <div class="feedback-form-item-message__person__info">
          <p>{{ item.user?.firstname }}</p>
          <UiTextsTextBG 
            :text="item.rating >= 85 ? $t('partner_id_page.recommends') : item.rating < 60 ? $t('partner_id_page.not_recommend') : $t('partner_id_page.not_decided')" 
            :bg="item.rating >= 85 ? 'green2' : item.rating < 60 ? 'red' : 'orange'" 
          />
        </div>
      </div>
      <UiFeedbacksFeedbackPartnerCheck 
        class="feedback-form-item-message__mobile__check-boxes" 
        v-model:value="checkForm" 
        noUpdate 
        :isSoft="softId || soft"
        :isCourse="courseId || course"
      />
      <div class="feedback-form-item-message__text">
        {{ item.description }}
      </div>

      <div class="feedback-form-item-message__manager-comment"
        v-show="item.manager_comment?.length"
        v-for="comment in item.manager_comment"
        :key="comment.id + item.id + 'manager_comment'"
      >
        <span>{{ $t('partner_id_page.company_representative') }} {{ partner?.name || soft?.name || course?.name }}</span>
        <p>{{ comment.comment }}</p>
        
      </div>
    </div>
    <UiFeedbacksFeedbackPartnerCheck 
      class="feedback-form-item-message__check-boxes" 
      v-model:value="checkForm" 
      noUpdate 
      :isSoft="softId || soft"
      :isCourse="courseId || course"
    />
  </div>

  <div v-else class="feedback-form-item-form">
    <div class="feedback-form-item-form__fields">
      <UiFieldsInput
        type="textarea"
        v-model:value="description"
        :minHeight="'210px'"
        :placeholder="$t('forms.enter_your_review')"
        errorKey="createFeedbackForm_description"
      />

      <!-- <UiFieldsUploadFiles 
        class="feedback-form-item-form__fields__upload"
      /> -->

      <UiBtnsCustomButton 
        :label="$t('button.send')"
        :isDisabled="false"
        @click="sendFeedbackForm"
        :isLoading="useLoadingStore().getIsLoadingsKeys('feedbackUsersAllList')"
        class="feedback-form-item-form__fields__btn"
      />
    </div>

    <UiFeedbacksFeedbackPartnerCheck 
      v-model:value="checkForm" 
      :isError="isErrorFeedbackFormCheck" 
      :isSoft="softId || soft"
      :isCourse="courseId || course"
    />

    <UiBtnsCustomButton 
      :label="$t('button.send')"
      width="100%"
      :isDisabled="false"
      @click="sendFeedbackForm"
      :isLoading="useLoadingStore().getIsLoadingsKeys('feedbackUsersAllList')"
      class="feedback-form-item-form__bottom-btn"
    />
  </div>
</template>

<script>
export default {
  name: 'UiFeedbacksFeedbackPartnerItem',
  props: {
    item: {
      type: String,
      default: null,
    },
    partnerId: {
      type: String,
      default: null,
    },
    partner: {
      default: null,
    },
    softId: {
      type: String,
      default: null,
    },
    soft: {
      default: null,
    },
    courseId: {
      type: String,
      default: null,
    },
    course: {
      default: null,
    },

    myReviews: Boolean,
    isBottomPositionTooltip: Boolean
  },

  data: () => ({
    isErrorFeedbackFormCheck: false,

    checkForm: {
      isWorth: null,
      support: null,
      instruments: null,
      quality_offers: null,
      reliability: null,
    },
    description: '',
  }),

  methods: {
    sendFeedbackForm() {
      let bodyFormData = new FormData();
      let isError = false;

      if (this.partnerId) bodyFormData.append('partner_id', this.partnerId || null);
      if (this.softId) bodyFormData.append('soft_id', this.softId || null);
      if (this.courseId) bodyFormData.append('course_id', this.courseId || null);

      if (this.description?.length) {
        bodyFormData.append('description', this.description);
      } else {
        isError = true;
        useErrorMessageStore().setErrorMessageKeys('createFeedbackForm_description', this.$t('messages.enter_text_review'))
      }

      bodyFormData.append('rating', this.checkForm.finalAssessment || 0);

      if (this.checkForm.isWorth != null) {
        bodyFormData.append('positive', this.checkForm.isWorth ? 1 : 0);
      } else {
        this.isErrorFeedbackFormCheck = true
        isError = true;
        useErrorMessageStore().setErrorMessageKeys('createFeedbackForm_description', (this.softId || this.soft) ? this.$t('messages.rate_soft') : (this.courseId || this.course) ? this.$t('messages.rate_course') : this.$t('messages.rate_partner'))
      }
      if (this.checkForm.support != null) {
        bodyFormData.append('support', this.checkForm.support ? 1 : 0);
      } else {
        this.isErrorFeedbackFormCheck = true
        isError = true;
        useErrorMessageStore().setErrorMessageKeys('createFeedbackForm_description', (this.softId || this.soft) ? this.$t('messages.rate_soft') : (this.courseId || this.course) ? this.$t('messages.rate_course') : this.$t('messages.rate_partner'))
      }
      if (this.checkForm.instruments != null) {
        bodyFormData.append('tools', this.checkForm.instruments ? 1 : 0);
      } else {
        this.isErrorFeedbackFormCheck = true
        isError = true;
        useErrorMessageStore().setErrorMessageKeys('createFeedbackForm_description', (this.softId || this.soft) ? this.$t('messages.rate_soft') : (this.courseId || this.course) ? this.$t('messages.rate_course') : this.$t('messages.rate_partner'))
      }
      if (this.checkForm.quality_offers != null) {
        bodyFormData.append('quality', this.checkForm.quality_offers ? 1 : 0);
      } else {
        this.isErrorFeedbackFormCheck = true
        isError = true;
        useErrorMessageStore().setErrorMessageKeys('createFeedbackForm_description', (this.softId || this.soft) ? this.$t('messages.rate_soft') : (this.courseId || this.course) ? this.$t('messages.rate_course') : this.$t('messages.rate_partner'))
      }
      if (this.checkForm.reliability != null) {
        bodyFormData.append('reliability', this.checkForm.reliability ? 1 : 0);
      } else {
        this.isErrorFeedbackFormCheck = true
        isError = true;
        useErrorMessageStore().setErrorMessageKeys('createFeedbackForm_description', (this.softId || this.soft) ? this.$t('messages.rate_soft') : (this.courseId || this.course) ? this.$t('messages.rate_course') : this.$t('messages.rate_partner'))
      }
      // "images": "string",

      if (!isError) {
        useErrorMessageStore().setErrorMessageKeys('createFeedbackForm_description', null)
        useFeedbackStore().createFeedbackUsers(bodyFormData)
      }
    }
  },

  watch: {
    item: {
      immediate: true,
      handler(newValue) {
        if (newValue) {
          this.checkForm = {
            isWorth: newValue.positive == 1 ? true : false,
            support: newValue.support == 1 ? true : false,
            instruments: newValue.tools == 1 ? true : false,
            quality_offers: newValue.quality == 1 ? true : false,
            reliability: newValue.reliability == 1 ? true : false,
          }
        }
      }
    },
    checkForm: {
      handler(newValue) {
        this.isErrorFeedbackFormCheck = false
        useErrorMessageStore().setErrorMessageKeys('createFeedbackForm_description', null)
      },
      deep: true
    }
  }
}
</script>

<style lang="scss" scoped>
.feedback-form-item-message {
  border-radius: 30px;
  background: #FFF;
  padding: 30px;
  display: flex;
  align-items: flex-start;
  width: 100%;
  justify-content: space-between;

  &__box {
    width: 100%;
    margin-right: 30px;
  }

  &__person {
    display: flex;
    align-items: center;

    &>img {
      width: 48px;
      height: 48px;
      border-radius: 100%;
      margin-right: 10px;
    }

    &__info {
      &>p {
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%;
        margin-bottom: 4px;
      }

      &>span {
        padding: 5px 10px;
        font-size: 10px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
      }
    }
  }

  &__text {
    margin-top: 12px;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 150%;
  }

  &__manager-comment {
    margin-top: 24px;
    background: linear-gradient(white, white) padding-box,
      linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%) border-box;
    border-radius: 8px;
    border: 1px solid transparent;
    position: relative;
    padding: 20px;

    &>span {
      font-size: 16px;
      font-style: normal;
      font-weight: 700;
      line-height: 150%;
      margin-bottom: 12px;
    }

    &>p {
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
    }
  }

  &__mobile__check-boxes {
    display: none;
  }

  &__rating {
    cursor: pointer;
    font-size: 10px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    padding: 5px 10px;
    border-radius: 4px;
  }
}

.feedback-form-item-form {
  border-radius: 30px;
  background: #FFF;
  padding: 30px;
  display: flex;
  align-items: flex-start;
  width: 100%;
  justify-content: space-between;

  &__fields {
    width: 100%;
    margin-right: 30px;

    &__upload {
      margin-top: 14px;
    }

    &__btn {
      margin-top: 24px; // 34px
    }
  }

  &__bottom-btn {
    display: none !important;
  }
}

@media only screen and (max-width: 1124px) {
  .feedback-form-item-message {
    border-radius: 8px;
    padding: 20px;

    &__box {
      width: 100%;
      margin-right: 0px;
    }

    &__person {
      display: flex;
      align-items: center;

      &>img {
        width: 48px;
        height: 48px;
        border-radius: 100%;
        margin-right: 10px;
      }

      &__info {
        &>p {
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          line-height: 150%;
          margin-bottom: 1px;
        }

        &>span {
          padding: 5px 10px;
          font-size: 10px;
          font-style: normal;
          font-weight: 500;
          line-height: normal;
        }
      }
    }

    &__text {
      margin-top: 16px;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%;
    }

    &__mobile__check-boxes {
      display: block;
      margin-top: 16px;
    }

    &__check-boxes {
      display: none;
    }

    &__manager-comment {
      margin-top: 16px;
      background: linear-gradient(white, white) padding-box,
        linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%) border-box;
      border-radius: 8px;
      border: 1px solid transparent;
      position: relative;
      padding: 20px;

      &>span {
        font-size: 16px;
        font-style: normal;
        font-weight: 700;
        line-height: 150%;
        margin-bottom: 12px;
      }

      &>p {
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 150%;
      }
    }
  }

  .feedback-form-item-form {
    border-radius: 8px;
    padding: 20px;
    flex-direction: column;

    &__fields {
      width: 100%;
      margin-right: 0px;
      margin-bottom: 16px;

      &__upload {
        margin-top: 16px;
        margin-bottom: 0px;
      }

      &__btn {
        display: none !important;
        margin-top: 0px;
      }
    }

    &__bottom-btn {
      margin-top: 16px;
      width: 100%;
      display: block !important;
    }
  }
}
</style>