<template>
  <div class="w-toast-messages-container">
    <transition-group name="list">
      <UiToastsMessage
        v-for="message in messages"
        :key="message.id"
        :message="message"
      />
    </transition-group>
  </div>
</template>

<script>
export default {
  name: "UiToastsMessageContainer",

  computed: {
    messages() {
      return useToastsStore().$state.toastsList
    }
  }
}
</script>

<style lang="scss" scoped>
.w-toast-messages-container {
  height: auto;
  // width: 400px;
  position: fixed;
  right: 15px;
  bottom: 15px;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>