<template>
  <div id="multi_upload" v-if="isShowUploadComponent">
    <div v-if="imgsArray?.length == 0" class="pre-upload">
      <img src="~/assets/icons/upload/img-and-plus.svg" alt="img-and-plus" @click="toggleShow"/>
      <div class="pre-upload__text">
        <h5>
          {{ $t('forms.upload_file.title') }}
        </h5>
        <p>
          {{ $t('forms.upload_file.description') }}
        </p>
      </div>
    </div>

    <div v-else class="uploaded-list">
      <div class="uploaded-list__btn">
        <img src="~/assets/icons/upload/img-and-plus.svg" alt="img-and-plus" @click="toggleShow" />
      </div>
      <div class="uploaded-list__imgs"
        v-for="(img, i) in imgsArray"
        :key="img + 'imgByUploadFiles'"
      >
        <UiImgComponent 
          :src="img" 
          :alt="img"
        />

        <div class="uploaded-list__imgs__btn-del">
          <img src="~/assets/icons/upload/trash-can-outline.svg" alt="trash-can-outline" @click="deleteImg(i)" />
        </div>
      </div>
    </div>

    <my-upload v-if="isShowUpload" field="img"
      @crop-success="cropSuccess"
      v-model="show"
      :width="300"
      :height="300"
      :allowImgFormat="['gif', 'jpeg', 'png', 'bmp', 'webp']"
      langType="ru"
      :langExt="langExt"
    >
    </my-upload>
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload';

export default {
  name: "UiFieldsUploadFiles",
  components: {
    myUpload
  },

  data: () => ({
    isShowUploadComponent: false,

    isShowUpload: true,

    show: false,

    filesArray: [],
    imgsArray: [],
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
        this.isShowUpload = false;
        var file = this.dataURLtoFile(imgDataUrl, 'photo.webp');

        this.filesArray.unshift(file)
        this.imgsArray.unshift(imgDataUrl)

        setTimeout(() => {
          this.isShowUpload = true;
          this.show = false;
        }, 300)
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


    deleteImg(index) {
      this.filesArray.splice(index, 1);
      this.imgsArray.splice(index, 1);
    }
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
    filesArray(newValue) {
      this.$emit('saveFiles', newValue)
    }
  }
}
</script>

<style lang="scss" scoped>
.pre-upload {
  display: flex;
  align-items: center;

  &>img {
    cursor: pointer;
    width: 54px;
    height: 54px;
    margin-right: 10px;
  }

  &__text {
    &>h5 {
      font-size: 14px;
      font-style: normal;
      font-weight: 600;
      line-height: 20px;
      margin-bottom: 4px;
    }

    &>p {
      font-size: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 150%;
      color: $colorGreyLight;
    }
  }
}

.uploaded-list {
  display: flex;
  align-items: flex-end;

  &__imgs {
    padding-top: 8px;
    padding-right: 9px;
    margin-left: 14px;
    height: 58px;
    position: relative;

    &>img {
      width: 50px;
      height: 50px;
      border-radius: 4px;
    }

    &__btn-del {
      position: absolute;
      cursor: pointer;
      top: 0;
      right: 0;
      width: 20px;
      height: 20px;
      border: 1px solid #fff;
      background: linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%);
      border-radius: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      &>img {
        width: 12px;
        height: 12px;
        cursor: pointer;
      }
    }
  }

  &__btn {
    width: 50px;
    height: 50px;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1.3px dashed #D6D7D9;
    cursor: pointer;

    &>img {
      width: 35.714px;
      height: 35.714px;
    }
  }
}
</style>