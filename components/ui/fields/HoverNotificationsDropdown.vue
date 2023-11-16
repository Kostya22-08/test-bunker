<template>
  <div 
    class="notifications-dropdown" 
    @mouseover="isActiveDropdown = true" 
    @mouseout="isActiveDropdown = false"
  >
    <nuxt-link :to="'/notifications'">
      <TextGradient 
        :componentIconLeft="'BellIcon'"
        isHoverGradient
        :isActive="isActiveDropdown || isActiveRout('/notifications')"
        style="padding: 14px 12px;"
      />
    </nuxt-link>
    <div 
      v-show="isActiveDropdown" 
      class="notifications-dropdown__list"
    >
      <div 
        class="notifications-dropdown__list__item" 
        v-for="item in list"
        :key="item.id"
      >
        <hr v-if="item.isShowBorderTop"/>  
      </div>

      <div v-if="!list || list?.length == 0" class="notifications-dropdown__list__empty-box">
        <img src="~/assets/icons/group-bell.svg" alt="group-bell"/>
        <h2>{{ $t('notification_page.notification_title') }}</h2>
        <p>{{ $t('notification_page.notification_description_empty') }}</p>
        <UiBtnsCustomButton 
          v-if="isEmployee"
          class="notifications-dropdown__list__empty-box__button"
          :label="$t('button.search_vacancy')"
          @click="toVacancyFind"
        />
        <UiBtnsCustomButton 
          v-else
          class="notifications-dropdown__list__empty-box__button"
          :label="$t('button.search_resume')"
          @click="toEmployeeFind"
        />
      </div>

    </div>
  </div>
</template>

<script>
import TextGradient from "@/components/ui/texts/TextGradient.vue"
import TextStatus from "@/components/ui/texts/TextStatus.vue"

export default {
  name: "HoverNotificationsDropdown",
  components: {
    TextGradient,
    TextStatus
  },
  props: {
    list: {
      type: Array,
      // required: true,
      default: null,
    },
  },
  data: () => ({
    isActiveDropdown: false,
  }),

  methods: {
    isActiveRout(path) {
      let res = false
      // if (this.$route?.path?.includes(path)) {
      //   res = true
      // }
      return res
    },

    toVacancyFind() {
      this.$router.push('/vacancy')
    },
    toEmployeeFind() {
      this.$router.push('/employee')
    },
  },

  computed: {
    USER_STORE() {
      return useUserStore()
    },
    user() {
      return this.USER_STORE.$state?.user
    },
    isEmployee() {
      return this.user?.vacancy_employee == "employee" ? true : false
    },
  },
}
</script>

<style lang="scss" scoped>
.notifications-dropdown {
  position: relative;

  &__list {
    position: absolute;
    // padding: 8px 0;
    background-color: #fff;
    border-radius: 10px;
    margin-top: 50px;
    top: 0;
    right: 0;
    width: 500px;
    box-shadow: 0px 6px 40px 0px #14142B1A;

    &__item {

      &>hr {
        margin: 0 15px;
        width: calc(100% - 30px);
        height: 1px;
        background-color: #F3F4F5;
      }
    }

    &__empty-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 40px 35px;

      &>img {
        width: 157px;
        height: 160px;
      }

      &>h2 {
        font-size: 22px;
        font-weight: 700;
        line-height: 29px;
        text-align: center;
        margin-top: 24px;
        margin-bottom: 10px;
        max-width: 261px;
      }

      &>p {
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        text-align: center;
        margin-bottom: 24px;
      }
    }
  }
}
</style>