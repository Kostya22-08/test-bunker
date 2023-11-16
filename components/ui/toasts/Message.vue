<template>
  <div 
    class="w-toast-message" 
    :class="typeClass || 'default'"
    @click="close"
    @mouseover="mouseoverHandler" 
    @mouseout.self="mouseoutHandler"
  >
    <div class="message-box">
      <!-- <div class="w-col-icon" v-if="isShowIcon">
        <Danger v-if="isError"/>
        <Success v-if="isInfo"/>
      </div> -->
      <div class="message-box__message">
        <!-- <div class="message-label"
        :style="`color: ${isError ? '#C4200B' : '#24ba69'}`"
        >{{isError ? 'Attention' : 'Success'}}</div> -->
        {{ message.message }}
      </div>
      <div class="message-box__close">
        <hr />
      </div>
    </div>
  </div>
</template>

<script>
let timeout


var Timer = function (callback, delay) {
  var timerId, start, remaining = delay;

  this.pause = function () {
    window.clearTimeout(timerId);
    timerId = null;
    remaining -= Date.now() - start;
  };

  this.resume = function () {
    if (timerId) {
      return;
    }

    start = Date.now();
    timerId = window.setTimeout(callback, remaining);
  };

  this.resume();
};

export default {
  props: {
    message: {
      type: Object
    },
  },

  mounted() {
    timeout = new Timer(() => {
      this.close()
    }, 4000);
  },

  beforeUnmount() {
    clearTimeout(timeout)
  },

  methods: {
    close() {
      const arrCopy = Array.from(useToastsStore().$state.toastsList)
      const objWithIdIndex = arrCopy.findIndex((obj) => obj.id == this.message.id);
      useToastsStore().$state.toastsList.splice(objWithIdIndex, 1);
    },

    mouseoverHandler() {
      timeout.pause()
    },
    mouseoutHandler() {
      timeout.resume()
    }
  },

  computed: {
    typeClass() {
      return this.message.type
    }
  },
}
</script>

<style lang="scss" scoped>
.w-toast-message {
  display: flex;
  flex-direction: column;
  justify-content: center;
  // max-width: 340px;
  // min-height: 3em;
  min-width: 340px;
  margin: 0.5em 0;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  width: fit-content;

  .message-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    &__message {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      // margin-left: 10px;
      width: 100%;
      word-break: break-word;
      color: #fff;
      font-size: 14px;
      font-weight: 500;
      line-height: 21px;
      // .message-label {
      //   font-size: 15px;
      //   font-weight: 700;
      //   margin-bottom: 5px;
      // }
    }

    &__close {
      margin-left: 20px;
      height: 12px;
      width: 12px;
      cursor: pointer;

      &>hr {
        width: 0;
        height: 0;
        border: none;
        margin-top: 5px;
      }

      &>hr::before {
        content: '';
        transform: rotate(-45deg);
        margin-top: 0;
        width: 14px;
        position: absolute;
        height: 2px;
        background: #fff;
      }

      &>hr::after {
        content: '';
        transform: rotate(45deg);
        margin-top: 0;
        width: 14px;
        position: absolute;
        height: 2px;
        background: #fff;
      }
    }
  }

  // .w-col-icon,
  // .w-col-close {
  //   // max-width: 30px;
  //   padding: 0;
  //   display: flex;
  //   align-items: center;
  //   justify-content: center;

  //   svg path {
  //     fill: #4185f7;
  //   }
  // }

  // .w-col-close {
  //   position: relative;
  //   margin-left: 8px;
  //   cursor: pointer;
  // }

  // &.w-danger {
  //   background: #ffffff;
  //   box-shadow: 0px 7px 20px #00000027;

  //   svg path {
  //     fill: #C4200B;
  //   }
  // }

  // &.w-info {
  //   background: #ffffff;
  //   box-shadow: 0px 7px 20px #00000027;

  //   svg path {
  //     fill: #24ba69;
  //   }
  // }
}

.default {
  background-color: #343a40;
}

.success {
  background-color: #11B9AF;
}

.info {
  background-color: #17a2b8;
}

.warning {
  // background-color: $colorOrange;
}

.error {
  background-color: #dc3545;
}

@media only screen and (max-width: 768px) {
  .w-toast-message {
    display: flex;
    flex-direction: column;
    justify-content: center;
    // max-width: 340px;
    // min-height: 3em;
    min-width: 136px;
    margin: 0.5em 0;
    padding: 14px;
    border-radius: 8px;
    cursor: pointer;
    width: fit-content;

    .message-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      &__message {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        // margin-left: 10px;
        width: 100%;
        word-break: break-word;
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        line-height: 21px;
        // .message-label {
        //   font-size: 15px;
        //   font-weight: 700;
        //   margin-bottom: 5px;
        // }
      }

      &__close {
        margin-left: 20px;
        height: 12px;
        width: 12px;
        cursor: pointer;

        &>hr {
          width: 0;
          height: 0;
          border: none;
          margin-top: 5px;
        }

        &>hr::before {
          content: '';
          transform: rotate(-45deg);
          margin-top: 0;
          width: 14px;
          position: absolute;
          height: 2px;
          background: #fff;
        }

        &>hr::after {
          content: '';
          transform: rotate(45deg);
          margin-top: 0;
          width: 14px;
          position: absolute;
          height: 2px;
          background: #fff;
        }
      }
    }

    // .w-col-icon,
    // .w-col-close {
    //   // max-width: 30px;
    //   padding: 0;
    //   display: flex;
    //   align-items: center;
    //   justify-content: center;

    //   svg path {
    //     fill: #4185f7;
    //   }
    // }

    // .w-col-close {
    //   position: relative;
    //   margin-left: 8px;
    //   cursor: pointer;
    // }

    // &.w-danger {
    //   background: #ffffff;
    //   box-shadow: 0px 7px 20px #00000027;

    //   svg path {
    //     fill: #C4200B;
    //   }
    // }

    // &.w-info {
    //   background: #ffffff;
    //   box-shadow: 0px 7px 20px #00000027;

    //   svg path {
    //     fill: #24ba69;
    //   }
    // }
  }
}
</style>