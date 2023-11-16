<template>
  <button :class="`UiBtnsCopyButton__copy-button ${isMobile ? 'UiBtnsCopyButton__is-not-show' : ''}`" @click="copyHandler(copyInfo)">
    {{ $t('button.copy') }}
  </button>
  <button :class="`UiBtnsCopyButton__copy-button-mobile ${isMobile ? 'UiBtnsCopyButton__is-show' : ''}`" @click="copyHandler(copyInfo)">
    <img src="~/assets/icons/copy-icon.svg"/>
  </button>
</template>

<script>
export default {
  name: "UiBtnsCopyButton",
  setup() {
    useHead({
      style: [
        {
          type: "text/css",
          id: "UiBtnsCopyButton",
          children: `
          .UiBtnsCopyButton__is-not-show {
	 display: none !important;
}
 .UiBtnsCopyButton__is-show {
	 display: flex !important;
}
 .UiBtnsCopyButton__disabled {
	 background: #9599a0;
	 box-shadow: none;
	 cursor: not-allowed;
}
 .UiBtnsCopyButton__copy-button {
	 cursor: pointer;
	 padding: 5px 10px;
	 color: #fff;
	 font-size: 14px;
	 font-weight: 600;
	 line-height: 17px;
	 border-radius: 4px;
	 background: linear-gradient(141.71deg, #686aec 10.15%, #d00dd9 96.32%);
}
 .UiBtnsCopyButton__copy-button:hover {
	 outline: none;
	 box-shadow: 0px 5px 15px 0px #696bed59;
	 cursor: pointer;
}
 .UiBtnsCopyButton__copy-button:focus {
	 outline: none;
	 box-shadow: 0px 5px 15px 0px #696bed80;
}
 .UiBtnsCopyButton__copy-button:active {
	 outline: none;
	 background: linear-gradient(113.74deg, #4b4dee 14.98%, #d109da 82.95%);
}
 .UiBtnsCopyButton__copy-button-mobile {
	 display: none;
	 cursor: pointer;
	 padding: 5px 5px;
	 border-radius: 4px;
	 background: linear-gradient(141.71deg, #686aec 10.15%, #d00dd9 96.32%);
	 align-items: center;
}
 .UiBtnsCopyButton__copy-button-mobile:hover {
	 outline: none;
	 box-shadow: 0px 5px 15px 0px #696bed59;
	 cursor: pointer;
}
 .UiBtnsCopyButton__copy-button-mobile:focus {
	 outline: none;
	 box-shadow: 0px 5px 15px 0px #696bed80;
}
 .UiBtnsCopyButton__copy-button-mobile:active {
	 outline: none;
	 background: linear-gradient(113.74deg, #4b4dee 14.98%, #d109da 82.95%);
}
 @media only screen and (max-width: 768px) {
	 .UiBtnsCopyButton__copy-button {
		 display: none;
	}
	 .UiBtnsCopyButton__copy-button-mobile {
		 display: flex;
	}
}
        `,
        }
      ]
    })
  },
  props: {
    copyInfo: {
      type: String,
      required: true,
    },
    isMobile: Boolean,
  },
}
</script>