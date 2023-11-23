<!-- MyDualButton.vue -->
<template>
  <div class="my-dual-button">
    <v-btn @click="handleLeftClick" color="primary" variant="outlined">
      {{ leftButtonText }}
    </v-btn>
    <v-btn @click="handleRightClick" color="primary">
      {{ rightButtonText }}
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from "vue";

const props = defineProps([
  "leftButtonText",
  "rightButtonText",
]);
const emit = defineEmits();

const handleLeftClick = () => {
  emit("leftClick");
};

const handleRightClick = () => {
  emit("rightClick");
};
</script>

<style scoped>
.my-dual-button {
  display: flex;
  gap: 1rem; /* Ajustez selon vos besoins */
  justify-content: center;
}
</style>
