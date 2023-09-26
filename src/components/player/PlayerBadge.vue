<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "../../store/modules/player";

const playerStore = usePlayerStore(); // Utilise le store
const players = ref<any>(playerStore.players);

function emitRemovePlayer(index: number) {
  playerStore.removePlayer(index);
}
</script>

<template>
  <div>
    <v-chip
      v-for="(player, index) in players"
      :key="index"
      closable
      class="ma-2"
      color="dark"
      @click:close="emitRemovePlayer(index)"
    >
      {{ player.name }}
    </v-chip>
  </div>
</template>