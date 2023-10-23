<script lang="ts" setup>
import { ref } from 'vue';
import { usePlayerStore } from "../../store/modules/player";

const playerStore = usePlayerStore(); // Utilise le store

const props = defineProps({
  games: Array
});
const game = ref(playerStore._campaign.game);

const setGame = () => {
  playerStore.setGame(game.value);
}
</script>

<template>
  <div>
    <v-select
      v-model="game"
      :items="props.games"
      label="Sélectionner le jeu"
      outlined
      @update:modelValue="setGame"
    ></v-select>
  </div>
</template>