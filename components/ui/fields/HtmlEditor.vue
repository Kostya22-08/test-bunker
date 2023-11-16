<script setup>
import { ref, watch } from 'vue'
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const props = defineProps({
  value: String,
  placeholder: String,
  isError: Boolean,
})
const emit = defineEmits(['updateValue'])

const text = ref('')

if (props?.value) {
  text.value = props.value
}

watch(text, (newValue, oldValue) => {
  emit('updateValue', newValue)
})
</script>

<template>
  <ClientOnly>
    <div :class="`${isError ? 'error-box-html-editor' : ''}`">
      <QuillEditor 
        theme="snow" 
        toolbar="minimal" 
        v-model:content="text"
        contentType="html"
        :placeholder="props?.placeholder || ''"
      />
    </div>
  </ClientOnly>
</template>

<style lang="scss">
.ql-toolbar {
  border-radius: 8px 8px 0px 0px;
  border: 1px solid #D6D7D9 !important;
  background: #fff;
}

.ql-container {
  min-height: 165px;
  border-radius: 0px 0px 8px 8px;
  border-bottom: 1px solid #D6D7D9 !important;
  border-left: 1px solid #D6D7D9 !important;
  border-right: 1px solid #D6D7D9 !important;
  background: #fff;
}

.ql-editor {
  padding: 10px 12px !important;
}

.ql-editor.ql-blank::before {
  color: #D6D7D9 !important;
  font-size: 14px !important;
  font-weight: 500 !important;
  line-height: 24px !important;
  font-style: normal !important;
}

.error-box-html-editor {
  &>.ql-toolbar {
    border-color: #F06C5D !important;
  }

  &>.ql-container {
    border-color: #F06C5D !important;
  }
}
</style>

