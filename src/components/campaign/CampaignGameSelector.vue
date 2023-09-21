<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps({
  games: Array
});
const selectedGame = ref(null);
const emit = defineEmits(['update:games']);

function emitSelectedGame() {
  emit('update:games', selectedGame.value);
}
</script>

<template>
  <div>
    <v-select
      v-model="selectedGame"
      :items="props.games"
      label="Sélectionner le jeu"
      outlined
      @change="emitSelectedGame"
    ></v-select>
  </div>
</template>