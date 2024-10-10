<template>
  <div>
    <label :for="id" class="form-label">{{ label }}</label>
    <input
      :type="type"
      class="form-control"
      :id="id"
      v-model="internalValue"
      :placeholder="placeholder"
    >
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

const props = defineProps({
  modelValue: [String, Number],
  type: {
    type: String,
    default: 'text'
  },
  id: {
    type: String,
    required: true
  },
  label: String,
  placeholder: String
});

const emit = defineEmits(['update:modelValue']);
const internalValue = ref(props.modelValue);

watch(() => props.modelValue, (newValue) => {
  internalValue.value = newValue;
});

watch(internalValue, (newValue) => {
  emit('update:modelValue', newValue);
});
</script>

<style scoped>
</style>
