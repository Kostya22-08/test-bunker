<template>
  <div :class="`${positionRelative ? 'loader-container-relative' : 'loader-container-fixed'}`">
    <div id="loader-container-loader">
      <div id="loader-container-shadow"></div>
      <div id="loader-container-box"></div>
    </div>
  </div>
  </template>
  
<script>
export default {
  name: 'LayoutsLoaderSquare',
  props: {
    positionRelative: Boolean,
  }
}
</script>
  
<style lang='scss' scoped>
.loader-container {
  &-fixed {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;

    &>#loader-container-loader {
      position: absolute;
      top: calc(15% - 20px);
      left: calc(50% - 20px);
      // z-index: 5;
    }

    // &>img {
    //   position: absolute;
    //   top: 0;
    //   left: 0;
    //   width: 100%;
    // }
  }

  &-relative {
    position: relative;
    z-index: 50;
    width: 100%;
    height: 100%;

    // &>img {
    //   display: none;
    // }

    &>#loader-container-loader {
      position: absolute;
      top: calc(20% - 20px);
      left: calc(50% - 20px);
    }
  }
}

@keyframes loader {
  0% {
    left: -100px
  }

  100% {
    left: 110%;
  }
}

#loader-container-box {
  width: 50px;
  height: 50px;
  background: linear-gradient(113.74deg, #686AEC 14.98%, #D00DD9 82.95%);
  animation: animate .5s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px;
}

@keyframes animate {
  17% {
    border-bottom-right-radius: 3px;
  }

  25% {
    transform: translateY(9px) rotate(22.5deg);
  }

  50% {
    transform: translateY(18px) scale(1, .9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }

  75% {
    transform: translateY(9px) rotate(67.5deg);
  }

  100% {
    transform: translateY(0) rotate(90deg);
  }
}

#loader-container-shadow {
  width: 50px;
  height: 5px;
  background: #000;
  opacity: 0.1;
  position: absolute;
  top: 59px;
  left: 0;
  border-radius: 50%;
  animation: shadow .5s linear infinite;
}

@keyframes shadow {
  50% {
    transform: scale(1.2, 1);
  }
}
</style>
  