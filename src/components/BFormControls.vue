<template>
  <div>
    <label :for="computedId" class="form-label">{{ label }}</label>
    <input
      :type="type"
      class="form-control"
      :id="computedId"
      v-model="internalValue"
      :placeholder="placeholder"
    >
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, watch } from 'vue';

const generateUniqueId = (existingIds: string | unknown[]) => {
  let newId;
  do {
    newId = `input-${Math.random().toString(36).slice(2, 11)}`;
  } while (existingIds.includes(newId));
  return newId;
};


const props = defineProps({
  modelValue: [String, Number],
  type: {
    type: String,
    default: 'text'
  },
  id: {
    type: String,
    default: null
  },
  existingIds: {
    type: Array,
    default: () => []
  },
  label: String,
  placeholder: String
});

const emit = defineEmits(['update:modelValue']);
const computedId = ref(props.id || generateUniqueId(props.existingIds));

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
