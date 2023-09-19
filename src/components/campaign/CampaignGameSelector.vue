<template>
  <div>
    <v-select
      v-model="selectedGame"
      :items="games"
      label="Sélectionner le jeu"
      outlined
      @change="emitSelectedGame"
    ></v-select>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps(['games']);
const selectedGame = ref(null);
const emit = defineEmits(['update:games']);

function emitSelectedGame() {
  emit('update:games', selectedGame.value);
}
</script>
