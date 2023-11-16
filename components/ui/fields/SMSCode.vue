<template>
  <div ref="otpCont">
    <input
      type="number"
      class="sms-box"
      :class="{ 'bounce': digits[ind] !== null }"
      v-for="(el, ind) in digits"
      :key="el + ind"
      v-model="digits[ind]"
      :autofocus="ind === 0"
      maxlength="1"
      pattern="\d*"
      @keydown="handleKeyDown($event, ind)"
      @input="onInputHandler($event, ind)"
    >
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';

const props = defineProps({
  default: String,

  digitCount: {
    type: Number,
    required: true
  }
});
const emit = defineEmits(['update:otp']);

const digits = reactive([])

if (props.default && props.default.length === props.digitCount) {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = props.default.charAt(i)
  }
} else {
  for (let i = 0; i < props.digitCount; i++) {
    digits[i] = null;
  }
}

const otpCont = ref()

onMounted(() => {
  otpCont.value.children[0].focus()
})

const onInputHandler = (e, i) => {
  let data = e.data || e.target.value;
  if (!data) return;
  if (data.length === 1) return;

  for (let i = 0; i < props.digitCount; i++) {
    otpCont.value.children[i].value = data[i] || '';
    digits[i] = data[i];
  }

  emit('update:otp', data)
}

const handleKeyDown = function (event, index) {
  if (event.key !== "Tab" &&
    event.key !== "ArrowRight" &&
    event.key !== "ArrowLeft"
  ) {
    event.preventDefault();
  }

  if (event.key === "Backspace") {
    digits[index] = null;
    (otpCont.value.children)[index].value = ''

    if (index != 0) {
      (otpCont.value.children)[index - 1].focus();
    }

    return;
  }

  if ((new RegExp('^([0-9])$')).test(event.key)) {
    digits[index] = event.key;

    if (index != props.digitCount - 1) {
      (otpCont.value.children)[index + 1].focus();
    }
  }

  if (digits) {
    emit('update:otp', digits.join(''))
  }
}
</script>


<style lang="scss" scoped>
.sms-box {
  height: 62px;
  width: 53px;
  border: 1px solid #D6D7D9;
  color: #06101D;
  display: inline-block;
  border-radius: 8px;
  margin: 0 7px;
  padding: 19px 12px;

  font-size: 24px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;

  &:first-child {
    margin-left: 0px;
  }

  &:last-child {
    margin-right: 0px;
  }

}

.sms-box:focus {
  outline: 1px solid #D6D7D9;
}

.bounce {
  animation: pulse .3s ease-in-out alternate;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(1.1);
  }
}

@media only screen and (max-width: 768px) {
  .sms-box {
    height: 44px;
    width: 40px;
    padding: 10px 12px;
    margin: 0 6px;

    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
  }
}
</style>