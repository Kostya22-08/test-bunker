<template>
  <div class="footer-registered-user">
    <nuxt-link class="footer-registered-user__item"
      :class="`${isActiveRout(item.additionalPath || item.path) ? 'footer-registered-user__item-active' : ''} ${item.countIcon > 0 ? `footer-registered-user__count-for-icon-${item.countColorIcon}` : ''}`"
      :count-value="item.countIcon"
      v-for="item in navArray"
      :key="item.path"
      :to="item.path"
    >
      <component 
        :is="item.icon" 
        isNoHover
        :isGradient="isActiveRout(item.additionalPath || item.path)"
        class="footer-registered-user__item__icon"
      />
      <p>{{ item.name }}</p>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: "FooterRegisteredUser",

  setup() {
    useHead({
      style: [
        {
          type: "text/css",
          id: 'FooterRegisteredUser',
          children: `
.footer-registered-user {
	 background: #fff;
	 box-shadow: 0px 5px 15px 0px #1622330D;
	 display: flex;
	 align-items: center;
	 justify-content: space-between;
	 padding: 8px 24px 9px 24px;
	 border-radius: 20px 20px 0px 0px;
	 position: fixed;
	 bottom: 0;
	 left: 0;
	 width: 100%;
	 z-index: 100;
	 height: 60px;
}
 .footer-registered-user__item {
	 display: flex;
	 flex-direction: column;
	 align-items: center;
}
 .footer-registered-user__item__icon {
	 width: 24px;
	 height: 24px;
}
 .footer-registered-user__item > p {
	 margin-top: 4px;
	 font-size: 12px;
	 font-weight: 500;
	 line-height: 15px;
	 text-align: center;
}
 .footer-registered-user__item-active > p {
	 background: -webkit-linear-gradient(113.74deg, #686aec 14.98%, #d00dd9 82.95%);
	 -webkit-background-clip: text;
	 -webkit-text-fill-color: transparent;
}
          `
        }
      ]
    })
  },
  props: {
    isPartnersLayout: Boolean,
    isSoftLayout: Boolean,
    isCoursesLayout: Boolean,
  },
  methods: {
    isActiveRout(path) {
      let res = false

      if (path == '/soft') {
        if (this.$route?.fullPath?.includes(path) && (useAppStore().$state.selectedLanguage == 'ru' ? !(this.$route?.fullPath == '/profile/soft/reviews' || this.$route?.fullPath == '/profile/soft/management') : !(this.$route?.fullPath == '/uk/profile/soft/reviews' || this.$route?.fullPath == '/uk/profile/soft/management'))) {
          res = true
        }
      } else if (this.$route?.fullPath?.includes(path)) {
        res = true
      }

      if (path == '/profile' || path == '/uk/profile') {
        if (this.$route?.fullPath == '/profile' || this.$route?.fullPath == '/uk/profile') {
          res = true
        } else {
          res = false
        }

      }
      return res
    },
  },

  computed: {
    user() {
      return useUserStore().$state?.user
    },
    isEmployee() {
      return this.user?.vacancy_employee == "employee" ? true : false
    },
    favoritesListPartner() {
      return this.user ? useFavoritesStore().getFavoritesListIds('partners') : [];
    },
    favoritesListSoft() {
      return this.user ? useFavoritesStore().getFavoritesListIds('softs') : [];
    },
    favoritesListCourses() {
      return this.user ? useFavoritesStore().getFavoritesListIds('courses') : [];
    },
    favoritesList() {
      return this.user ? useFavoritesStore().getFavoritesListIds(this.isEmployee ? 'vacancies' : 'employees') : [];
    },

    navArray() {
      let menu = []
      if (this.isPartnersLayout) {
        menu = [
          {
            name: this.$t('navigation.list'),
            path: '/partners',
            icon: 'ClipboardListIcon',
          },
          {
            name: this.$t('navigation.notebook'),
            path: '/notebook',
            icon: 'HeartIcon',
            countIcon: this.favoritesListPartner?.length || 0,
            countColorIcon: 'grey',
          },
          {
            name: this.isEmployee ? this.$t('navigation.reviews') : this.$t('navigation.management'),
            path: this.isEmployee ? '/profile/partner/reviews' : '/profile/partner/management',
            icon: this.isEmployee ? 'MessageTextIcon' : 'WrenchIcon',
          },
          {
            name: this.$t('navigation.profile'),
            path: '/profile',
            additionalPath: '/profile',
            icon: 'AccountCircleIcon',
          },
        ]
      } else if (this.isSoftLayout) {
        menu = [
          {
            name: this.$t('navigation.list'),
            path: '/soft',
            icon: 'ClipboardListIcon',
          },
          {
            name: this.$t('navigation.notebook'),
            path: '/notebook',
            icon: 'HeartIcon',
            countIcon: this.favoritesListSoft?.length || 0,
            countColorIcon: 'grey',
          },
          {
            name: this.isEmployee ? this.$t('navigation.reviews') : this.$t('navigation.management'),
            path: this.isEmployee ? '/profile/soft/reviews' : '/profile/soft/management',
            icon: this.isEmployee ? 'MessageTextIcon' : 'WrenchIcon',
          },
          {
            name: this.$t('navigation.profile'),
            path: '/profile',
            additionalPath: '/profile',
            icon: 'AccountCircleIcon',
          },
        ]
      } else if (this.isCoursesLayout) {
        menu = [
          {
            name: this.$t('navigation.list'),
            path: '/courses',
            icon: 'ClipboardListIcon',
          },
          {
            name: this.$t('navigation.notebook'),
            path: '/notebook',
            icon: 'HeartIcon',
            countIcon: this.favoritesListCourses?.length || 0,
            countColorIcon: 'grey',
          },
          {
            name: this.$t('navigation.profile'),
            path: '/profile',
            additionalPath: '/profile',
            icon: 'AccountCircleIcon',
          },
        ]
      } else {
        menu = [
          {
            name: this.isEmployee ? this.$t('navigation.vacancy') : this.$t('navigation.employee'),
            path: this.isEmployee ? '/vacancy' : '/employee',
            additionalPath: this.isEmployee ? '/vacancy' : '/employee',
            icon: 'ClipboardSearchIcon',
          },
          {
            name: this.$t('navigation.notebook'),
            path: '/notebook',
            icon: 'HeartIcon',
            countIcon: this.favoritesList?.length || 0,
            countColorIcon: 'grey',
          },
          {
            name: this.isEmployee ? this.$t('navigation.my_cv') : this.$t('navigation.my_vacancy'),
            path: this.isEmployee ? '/profile/my-cv' : '/profile/my-vacancy',
            additionalPath: this.isEmployee ? '/profile/my-cv' : '/profile/my-vacancy',
            icon: 'ClipboardTextIcon',
          },
          {
            name: this.$t('navigation.profile'),
            path: '/profile',
            additionalPath: '/profile',
            icon: 'AccountCircleIcon',
          },
        ]
      }

      return menu
    }
  }
}
</script>

<style lang="scss" scoped>
.footer-registered-user__count-for-icon-red {
  position: relative;
}

.footer-registered-user__count-for-icon-red::before {
  content: attr(count-value);
  border: 1px solid #fff;
  background: #f06c5d;
  font-size: 9px;
  font-weight: 500;
  line-height: 10px;
  text-align: center;
  color: #fff;
  width: 13px;
  height: 11.5px;
  border-radius: 100%;
  padding-top: 1.5px;
  position: absolute;
  top: -4px;
  right: -4px;
}

.footer-registered-user__count-for-icon-grey {
  position: relative;
}

.footer-registered-user__count-for-icon-grey::before {
  content: attr(count-value);
  border: 1px solid #fff;
  background: #9599a0;
  font-size: 9px;
  font-weight: 500;
  line-height: 10px;
  text-align: center;
  color: #fff;
  width: 13px;
  height: 11.5px;
  border-radius: 100%;
  padding-top: 1.5px;
  position: absolute;
  top: -4px;
  right: 7px;
}
</style>