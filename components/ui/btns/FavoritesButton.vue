<template>
  <div v-if="isMobile" class="UiBtnsFavoritesButton__favorites-button">
    <!-- <HeartBorderIcon 
      v-if="isShowBtn"
      width="26px" 
      height="26px" 
      style="min-width: 26px;"  
      isNoHover 
      :isGradient="isActive"
      @click="addToNotebook"
    /> -->
    <!-- <div v-if="isLoadingFavoriteItem" :class="`${isFavoriteItem ? 'spinner-active' : 'spinner'}`"></div> -->
  </div>
  <div v-else class="UiBtnsFavoritesButton__favorites-button">
    <!-- <HeartBorderIcon 
      v-if="isShowBtn"
      :width="size" 
      :height="size" 
      isNoHover 
      :isGradient="isActive"
      @click="addToNotebook"
    /> -->
    <!-- <div v-if="isLoadingFavoriteItem" :class="`${isFavoriteItem ? 'spinner-active' : 'spinner'}`"></div> -->
  </div>
</template>

<script>
export default {
  name: 'UiBtnsFavoritesButton',
  setup() {
    useHead({
      style: [
        {
          type: "text/css",
          id: "UiBtnsFavoritesButton",
          children: `
          .UiBtnsFavoritesButton__favorites-button {
	 position: relative;
   cursor: pointer;
}
 .UiBtnsFavoritesButton__spinner-active {
	 top: -2px;
	 width: 100%;
	 height: 100%;
	 position: absolute;
	 display: flex;
	 z-index: 5;
	 border-radius: 10px;
	 background: rgba(255, 255, 255, 0.3);
	 cursor: not-allowed;
}
 .UiBtnsFavoritesButton__spinner-active::before {
	 content: '';
	 width: 35%;
	 height: 35%;
	 border-radius: 100%;
	 position: absolute;
	 top: 0;
	 bottom: 0;
	 left: 0;
	 right: 0;
	 margin: auto;
	 animation: spin 1s infinite ease;
	 border: 2px solid #fafafd;
	 border-top: 2px solid #fafafd;
}
 .UiBtnsFavoritesButton__spinner {
	 top: -2px;
	 width: 100%;
	 height: 100%;
	 position: absolute;
	 display: flex;
	 z-index: 5;
	 border-radius: 10px;
	 background: rgba(255, 255, 255, 0.3);
	 cursor: not-allowed;
}
 .UiBtnsFavoritesButton__spinner::before {
	 content: '';
	 width: 35%;
	 height: 35%;
	 border-radius: 100%;
	 position: absolute;
	 top: 0;
	 bottom: 0;
	 left: 0;
	 right: 0;
	 margin: auto;
	 animation: spin 1s infinite ease;
	 border: 2px solid #d00dd9;
	 border-top: 2px solid #d00dd9;
}
 @keyframes spin {
	 from {
		 transform: rotate(0deg);
	}
	 to {
		 transform: rotate(360deg);
	}
}
        `,
        }
      ]
    })
  },
  props: {
    id: {
      required: true,
    },
    size: {
      type: String,
      default: '40px',
    },
    type: {
      type: String,
      required: true,
      validator(value) {
        return ['vacancies', 'employees', 'partner', 'softs', 'courses'].includes(value)
      }
    },
    isMobile: Boolean,
    isShowOnlyActive: Boolean,
  },

  data: () => ({
    isActive: false,
  }),

  methods: {
    addToNotebook(event) {
      if (this.userApp) {
        let bodyFormData = new FormData();
        if (this.isCreatedFavoritesList) {
          const arrayByType = this.favoritesList || []

          if (this.isFavoriteItem) {
            bodyFormData.append(this.type, `[${arrayByType.filter(item => item != this.id)}]`);
            bodyFormData.append('_method', 'PUT');
            useFavoritesStore().setFavorites(bodyFormData, 'del')
            this.isActive = false;
          } else {
            bodyFormData.append(this.type, `[${[...arrayByType, this.id]}]`);
            bodyFormData.append('_method', 'PUT');
            useFavoritesStore().setFavorites(bodyFormData, 'add')
            this.isActive = true;
          }
        } else {
          bodyFormData.append(this.type, `[${this.id}]`);
          useFavoritesStore().setFavorites(bodyFormData, 'create')
          this.isActive = true;
        }
      } else {
        useModalStore().setIsShowModalKeys('registrationAppModal', true)
      }

      event.preventDefault();
      event.stopPropagation()
    },
  },
  computed: {
    USER_STORE() {
      return useUserStore()
    },
    userApp() {
      return this.USER_STORE.$state?.user
    },
    isShowBtn() {
      if (this.userApp) {
        if (this.userApp.vacancy_employee == 'employee' && this.type == 'vacancies') {
          if (this.isShowOnlyActive) {
            return this.isActive;
          }
          return true
        }
        if (this.userApp.vacancy_employee == 'recruiter' && this.type == 'employees') {
          if (this.isShowOnlyActive) {
            return this.isActive;
          }
          return true
        }
        if (this.type == 'partner') {
          if (this.isShowOnlyActive) {
            return this.isActive;
          }
          return true
        }
        if (this.type == 'softs') {
          if (this.isShowOnlyActive) {
            return this.isActive;
          }
          return true
        }
        if (this.type == 'courses') {
          if (this.isShowOnlyActive) {
            return this.isActive;
          }
          return true
        }
        return false
      } else {
        if (this.isShowOnlyActive) {
          return false
        }
        return true
      }
    },

    favoritesList() {
      return this.type ? useFavoritesStore().getFavoritesListIds(this.type == 'partner' ? 'partners' : this.type) : null;
    },

    isCreatedFavoritesList() {
      return this.userApp?.favourites && Object.keys(this.userApp.favourites)?.length > 0 ? true : false
    },
    isFavoriteItem() {
      const isFindInArray = this.favoritesList?.find(item => item == this.id) || null;

      return isFindInArray ? true : false
    },

    isLoadingFavoriteItem() {
      return useLoadingStore().getIsLoadingsKeys('favoritesList')
    }
  },

  watch: {
    isFavoriteItem: {
      immediate: true,
      handler(newValue) {
        this.isActive = newValue
      }
    }
  }
}
</script>