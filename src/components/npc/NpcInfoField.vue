<script setup lang="ts">
import { defineProps, defineEmits, ref } from "vue";

interface Props {
  label: string;
  value?: string;
  textArea?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits();

const localValue = ref(props.value || '');
const isEditing = ref(!props.value);

const updateValue = () => {
  emit("update:value", localValue.value);
  isEditing.value = false;
};

const enableEditing = () => {
  isEditing.value = true;
};
</script>

<template>
  <div class="npc-info-field">
    <div class="label">{{ props.label }}:</div>
    <div class="input-container">
      <template v-if="!props.textArea">
        <v-text-field
          v-model="localValue"
          :label="`Enter ${props.label.toLowerCase()}`"
          :disabled="!isEditing"
          hide-details
        ></v-text-field>
      </template>
      <template v-else>
        <v-textarea
          v-model="localValue"
          :label="`Enter ${props.label.toLowerCase()}`"
          :disabled="!isEditing"
          auto-grow
          hide-details
        ></v-textarea>
      </template>
      <v-btn
        icon
        @click="isEditing ? updateValue() : enableEditing()"
        class="edit-button"
      ><v-icon>{{ isEditing ? 'mdi-check' : 'mdi-pencil' }}</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<style scoped>
.npc-info-field {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
}

.input-container {
  display: flex;
  align-items: center;
}

.edit-button {
  margin-left: 10px;
}
</style>
