<script setup lang="ts">
import { defineEmits, ref, watch } from "vue";

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  value: String,
  textArea: Boolean,
});
const emit = defineEmits();
const localValue = ref("");
const updateValue = (newValue: any) => {
  localValue.value = newValue;
  emit("update:value", newValue);
};
</script>

<template>
  <div>{{ label }}: {{ value }}</div>
  <v-text-field
    v-if="!textArea"
    v-model="localValue"
    :label="`Enter ${label.toLowerCase()}`"
    @update:modelValue="updateValue"
  ></v-text-field>
  <v-textarea
    v-else
    v-model="localValue"
    :label="`Enter ${label.toLowerCase()}`"
    @update:modelValue="updateValue"
  ></v-textarea>
</template>
