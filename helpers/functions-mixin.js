export default {
  data:()=>({
    isSowElementOnMOunted: false,
  }),

  mounted() {
    this.isSowElementOnMOunted = true;
  },

  methods: {
    routerPushWithSaveQueryParams(url, newQueryParams = {}) {
      this.$router.push({
        path: url,
        query: {
          ...this.$route.query,
          ...newQueryParams,
        }
      })
    },

    getUrlStringWithSaveQueryParams(url) {
      const query = {...this.$route.query}
      let str = ''

      Object.keys(query).forEach(key => {
        if(key && !(query[key] == null)) {
          str += `${key}=${query[key]}&`;
        }
      })
      
      return str?. length ? (url + '?' + str) : url;
    },

    openLinkInNewWindow(url) {
      if(window && url) window.open(url, '_blank').focus();
    },

    goToPage(url) {
      if(url) this.$router.push(url)
    },

    copyHandler(copyInfo, messageInfo) {
      event.stopPropagation();
      
      const textToCopy = copyInfo;
      let message = {success: this.$t('messages.link_copied'), error: this.$t('messages.link_not_copied')}
      if(messageInfo && messageInfo.success && messageInfo.error) {
        message = messageInfo
      }

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textToCopy)
          .then(() => {
            useToastsStore().setToastsSuccess( message.success)
          })
          .catch((e) => {
            useToastsStore().setToastsError(message.error)
          })
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;

        textArea.style.position = "absolute";
        textArea.style.left = "-999999px";

        document.body.prepend(textArea);
        textArea.select();

        try {
          document.execCommand('copy');
          useToastsStore().setToastsSuccess( message.success)
        } catch (error) {
          useToastsStore().setToastsError(message.error)
        } finally {
          textArea.remove();
        }
      }

      event.stopPropagation();
    },
  },

  computed: {
    storageApiSiteUrlForImg() {
      return this.$config.public.apiUrlForImg
    },
    getUrlHistoryBack() {
      return this.$router?.options?.history?.state?.back || ''
    }
  }
}