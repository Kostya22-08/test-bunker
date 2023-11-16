<template>
  <div id="upload" v-if="isShowUploadComponent">
    <form enctype="multipart/form-data" novalidate>
      <div class="dropbox" v-if="!file" @click="toggleShow">
        <!-- <input 
          type="file"
          :disabled="isDisabled"  
          :name="uploadFieldName" 
          @change="filesChange($event.target.files);"
          accept="image/*" 
          class="input-file" > -->
          <img src="~/assets/icons/phone.svg" alt="phone"/>
      </div>
      <div v-else class="photo-and-button">
        <UiImgComponent 
          :src="uploadedFile" 
          :alt="uploadedFile"
        />
        <div class="photo-and-button__btn" @click="toggleShow">
          <img src="~/assets/icons/pencil.svg" alt="pencil"/>
          <!-- <input 
            type="file"  
            :disabled="isDisabled"
            :name="uploadFieldName" 
            @change=" filesChange($event.target.files);"
            accept="image/gif, image/jpeg, image/png, image/bmp, image/webp"
            :class="`${isDisabled ? 'disabled' : ''}`" 
          /> -->
          <!-- accept="image/*"  accept=".heic"-->
        </div>
      </div>
    </form>

    <my-upload field="img"
      @crop-success="cropSuccess"
      v-model="show"
      :width="300"
      :height="300"
      :allowImgFormat="['gif', 'jpeg', 'png', 'bmp', 'webp']"
      langType="ru"
      :langExt="langExt"
    >
    </my-upload>
    <!-- <img :src="imgDataUrl"> -->
  </div>
</template>

<script>
const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;
import myUpload from 'vue-image-crop-upload';

export default {
  name: "UiFieldsUploadAvatar",
  components: {
    myUpload
  },
  props: {
    uploadFieldName: {
      type: String,
      default: 'photos'
    },
    file: {
      default: "",
    },

    isDisabled: Boolean,
  },
  emits: ['update:file', 'saveOnlyFile'],

  data: () => ({
    isShowUploadComponent: false,

    uploadedFile: null,
    uploadError: null,
    currentStatus: 2,

    show: false,
  }),

  mounted() {
    this.isShowUploadComponent = true;
  },

  methods: {
    toggleShow() {
      this.show = true;
    },
    cropSuccess(imgDataUrl, field) {
      if (imgDataUrl) {
        var file = this.dataURLtoFile(imgDataUrl, 'photo.webp');
        this.$emit('saveOnlyFile', file)

        this.$emit('update:file', imgDataUrl)
      }
    },

    dataURLtoFile(dataurl, filename) {
      var arr = dataurl?.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[arr.length - 1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },

    // reset() {
    //   this.currentStatus = STATUS_INITIAL;
    //   // this.uploadedFile = null;
    //   this.uploadError = null;
    // },

    // upload(files, titles) {
    //   const promises = files.map((x) => this.getImage(x)
    //     .then(img => ({
    //       originalName: x.name,
    //       fileName: x.name,
    //       url: img,
    //       title: titles[0],
    //     })
    //     ));

    //   return Promise.all(promises);
    // },
    // getImage(file) {
    //   return new Promise((resolve, reject) => {
    //     const fReader = new FileReader();
    //     fReader.readAsDataURL(file);

    //     const img = document.createElement('img');

    //     fReader.onload = () => {
    //       img.src = fReader.result;
    //       resolve(fReader.result);
    //     }
    //   })
    // },

    // async save(formData) {
    //   this.currentStatus = STATUS_SAVING;

    //   const files = formData.getAll('file');
    //   const titles = formData.getAll('title');

    //   if (formData) {
    //     this.upload(files, titles)
    //       .then(x => {
    //         this.uploadedFile = x[0]?.url || null;
    //         this.currentStatus = STATUS_SUCCESS;
    //       })
    //       .catch(err => {
    //         this.uploadedFile = null;
    //         this.uploadError = err.response;
    //         this.currentStatus = STATUS_FAILED;
    //       });
    //   } else {
    //     this.currentStatus = STATUS_FAILED;
    //   }
    // },

    // filesChange(fileList) {
    //   const formData = new FormData();

    //   if (!fileList?.length) return;
    //   formData.append('file', fileList[0]);
    //   formData.append('title', "avatar");

    //   this.$emit('saveOnlyFile', fileList[0])
    //   this.save(formData);
    // }
  },

  computed: {
    langExt() {
      return {
        hint: this.$t('forms.upload_avatar.hint'),
        loading: this.$t('forms.upload_avatar.loading'),
        noSupported: this.$t('forms.upload_avatar.noSupported'),
        success: this.$t('forms.upload_avatar.success'),
        fail: this.$t('forms.upload_avatar.fail'),
        preview: this.$t('forms.upload_avatar.preview'),
        btn: {
          off: this.$t('forms.upload_avatar.btn.off'),
          close: this.$t('forms.upload_avatar.btn.close'),
          back: this.$t('forms.upload_avatar.btn.back'),
          save: this.$t('forms.upload_avatar.btn.save')
        },
        error: {
          onlyImg: this.$t('forms.upload_avatar.error.onlyImg'),
          outOfSize: this.$t('forms.upload_avatar.error.outOfSize'),
          lowestPx: this.$t('forms.upload_avatar.error.lowestPx')
        }
      }
    }
  },

  watch: {
    // uploadedFile: {
    //   handler(newValue) {
    //     this.currentStatus = STATUS_SAVING
    //     this.$emit('update:file', newValue)

    //     setTimeout(() => {
    //       this.currentStatus = STATUS_SUCCESS
    //     }, 100)
    //   },
    //   deep: true,
    // },
    file: {
      immediate: true,
      handler(newValue) {
        // this.reset()

        if (newValue && newValue.length) {
          this.currentStatus = STATUS_SAVING
          this.uploadedFile = newValue

          setTimeout(() => {
            this.currentStatus = STATUS_SUCCESS
          }, 100)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropbox {
  position: relative;
  cursor: pointer;
  border: 2px solid #D6D7D9;
  width: 140px;
  height: 140px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &>input {
    top: 0;
    left: 0;
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: pointer;
  }
}

.photo-and-button {
  position: relative;
  border: 2px solid #D6D7D9;
  width: 140px;
  height: 140px;
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  &>img {
    width: 100%;
    height: 100%;
    border-radius: 100%;
  }

  &__btn {
    position: absolute;
    cursor: pointer;
    bottom: 0;
    right: 0;
    width: 32px;
    height: 32px;
    border: 2px solid #fff;
    background: linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%);
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    &>img {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    &>input {
      top: -2px;
      left: -2px;
      opacity: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      cursor: pointer;
    }
  }
}

@media only screen and (max-width: 768px) {
  .dropbox {
    width: 120px;
    height: 120px;
  }

  .photo-and-button {
    width: 120px;
    height: 120px;
  }
}
</style>