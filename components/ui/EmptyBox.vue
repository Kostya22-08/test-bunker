<template>
  <div :class="`UiEmptyBox__page-empty-box ${usePadding == 'modal' ? 'UiEmptyBox__page-empty-box-padding-modal' : usePadding == 'lists' ? 'UiEmptyBox__page-empty-box-padding-lists' : usePadding == 'profile' ? 'UiEmptyBox__page-empty-box-padding-profile' : usePadding == 'my-page' ? 'UiEmptyBox__page-empty-box-padding-my-page' : 'UiEmptyBox__page-empty-box-height'}`">
    <img v-if="imgType == 'group-messages'" src="~/assets/icons/group-messages.svg" alt="group-messages"/>
    <img v-if="imgType == 'group-vacancy'" src="~/assets/icons/group-vacancy.svg" alt="group-vacancy"/>
    <img v-if="imgType == 'group-employee'" src="~/assets/icons/group-employee.svg" alt="group-employee"/>
    <SvgOnlyImgGroupContent v-if="imgType == 'group-content'" class="UiEmptyBox__page-empty-box__img"/>
    <img v-if="imgType == 'group-bell'" src="~/assets/icons/group-bell.svg" alt="group-bell"/>
    <img v-if="imgType == 'group-list'" src="~/assets/icons/group-list.svg" alt="group-list"/>
    <img v-if="imgType == 'group-success'" src="~/assets/icons/group-success.svg" alt="group-success"/>

    <h2 v-if="title">{{ title }}</h2>
    <p v-if="description">{{ description }}</p>

    <UiBtnsCustomButton 
      v-if="btnTitle"
      class="UiEmptyBox__page-empty-box__button"
      :label="btnTitle"
      width="100%"
      @click="$emit('btnClick')"
    />
    <UiBtnsCustomButton 
      v-if="secondaryBtnTitle"
      class="UiEmptyBox__page-empty-box__button"
      :label="secondaryBtnTitle"
      btnType="secondary"
      width="100%"
      @click="$emit('secondaryBtnClick')"
    />
  </div>
</template>

<script>
export default {
  name: 'UiEmptyBox',
  setup() {
    useHead({
      style: [
        {
          type: "text/css",
          id: "UiEmptyBox",
          children: `
.UiEmptyBox__page-empty-box-padding-modal {
	 padding: 30px 30px 0px 30px;
}
 .UiEmptyBox__page-empty-box-padding-lists {
	 padding: 50px 0px 100px 0px;
}
 .UiEmptyBox__page-empty-box-padding-my-page, .UiEmptyBox__page-empty-box-padding-profile {
	 padding: 100px 0px 100px 0px;
}
 .UiEmptyBox__page-empty-box-height {
	 min-height: calc(100vh - 140px - 100px);
}
 .UiEmptyBox__page-empty-box {
	 display: flex;
	 flex-direction: column;
	 align-items: center;
	 justify-content: center;
	 width: 100%;
}
 .UiEmptyBox__page-empty-box > img {
	 width: 200px;
	 height: 200px;
}
.UiEmptyBox__page-empty-box__img {
	 width: 200px;
	 height: 200px;
}
 .UiEmptyBox__page-empty-box > h2 {
	 font-size: 32px;
	 font-weight: 700;
	 line-height: 42px;
	 text-align: center;
	 margin-top: 24px;
	 margin-bottom: 10px;
	 max-width: 593px;
}
 .UiEmptyBox__page-empty-box > p {
	 font-size: 16px;
	 font-weight: 400;
	 line-height: 24px;
	 text-align: center;
	 margin-bottom: 24px;
}
 .UiEmptyBox__page-empty-box__button {
	 margin-bottom: 16px;
	 width: 321px;
}
 .UiEmptyBox__page-empty-box__button:last-child {
	 margin-bottom: 0px;
}
 @media only screen and (max-width: 1024px) {
	 .UiEmptyBox__page-empty-box-padding-modal {
		 padding: 30px 0px 0px 0px;
	}
	 .UiEmptyBox__page-empty-box-padding-lists {
		 padding: 36px 0px 50px 0px;
	}
	 .UiEmptyBox__page-empty-box-padding-my-page {
		 padding: 50px 0px 50px 0px;
	}
	 .UiEmptyBox__page-empty-box-padding-profile {
		 padding: 0px;
		 min-height: calc(100vh - 100px - 90px);
	}
	 .UiEmptyBox__page-empty-box-height {
		 min-height: calc(100vh - 100px - 90px);
	}
	 .UiEmptyBox__page-empty-box > img {
		 width: 200px;
		 height: 200px;
	}
  .UiEmptyBox__page-empty-box__img {
	 width: 200px;
	 height: 200px;
  }
	 .UiEmptyBox__page-empty-box > h2 {
		 font-size: 22px;
		 font-weight: 700;
		 line-height: 29px;
		 text-align: center;
		 margin-top: 24px;
	}
	 .UiEmptyBox__page-empty-box > p {
		 font-size: 16px;
		 font-weight: 400;
		 line-height: 24px;
		 text-align: center;
	}
	 .UiEmptyBox__page-empty-box__button {
		 width: 100%;
		 align-items: center;
	}
}
        `,
        }
      ]
    })
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    imgType: {
      type: String,
      default: null,
      validator(value) {
        return [null,
          'group-messages',
          // 'group-messages-dark',
          'group-vacancy',
          // 'group-vacancy-dark',
          'group-employee',
          // 'group-employee-dark',
          'group-content',
          // 'group-content-dark',
          'group-bell',
          // 'group-bell-dark'
        ].includes(value)
      }
    },
    btnTitle: {
      type: String,
      default: null,
    },
    secondaryBtnTitle: {
      type: String,
      default: null,
    },
    usePadding: {
      type: String,
      default: null,
      validator(value) {
        return [null,
          'modal',
          'lists',
          'profile',
          'my-page',
        ].includes(value)
      }
    },
  },
  emits: ['btnClick', 'secondaryBtnClick'],
}
</script>


<style lang="scss" scoped>
.UiEmptyBox__page-empty-box-padding-modal {
  padding: 30px 30px 0px 30px;
}

.UiEmptyBox__page-empty-box-padding-lists {
  padding: 50px 0px 100px 0px;
}

.UiEmptyBox__page-empty-box-padding-my-page,
.UiEmptyBox__page-empty-box-padding-profile {
  padding: 100px 0px 100px 0px;
}

.UiEmptyBox__page-empty-box-height {
  min-height: calc(100vh - 140px - 100px); // mt & mb
}

.UiEmptyBox__page-empty-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  &>img {
    width: 200px;
    height: 200px;
  }

  &>h2 {
    font-size: 32px;
    font-weight: 700;
    line-height: 42px;
    text-align: center;
    margin-top: 24px;
    margin-bottom: 10px;
    max-width: 593px;
  }

  &>p {
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    text-align: center;
    margin-bottom: 24px;
  }

  &__button {
    margin-bottom: 16px;
    width: 321px;

    &:last-child {
      margin-bottom: 0px;
    }
  }
}

@media only screen and (max-width: 1024px) {
  .UiEmptyBox__page-empty-box-padding-modal {
    padding: 30px 0px 0px 0px;
  }

  .UiEmptyBox__page-empty-box-padding-lists {
    padding: 36px 0px 50px 0px;
  }

  .UiEmptyBox__page-empty-box-padding-my-page {
    padding: 50px 0px 50px 0px;
  }

  .UiEmptyBox__page-empty-box-padding-profile {
    padding: 0px;
    min-height: calc(100vh - 100px - 90px); // mt & mb
  }

  .UiEmptyBox__page-empty-box-height {
    min-height: calc(100vh - 100px - 90px); // mt & mb
  }

  .UiEmptyBox__page-empty-box {

    &>img {
      width: 200px;
      height: 200px;
    }

    &>h2 {
      font-size: 22px;
      font-weight: 700;
      line-height: 29px;
      text-align: center;
      margin-top: 24px;
    }

    &>p {
      font-size: 16px;
      font-weight: 400;
      line-height: 24px;
      text-align: center;
    }

    &__button {
      width: 100%;
      align-items: center;
    }
  }
}
</style>