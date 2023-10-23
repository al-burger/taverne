<script setup lang="ts">
import { usePlayerStore } from "../../store/modules/player";

const playerStore = usePlayerStore();

const emitRemovePlayer = (index: number) => {
  playerStore.removePlayer(index);
}
</script>

<template>
  <div>
    <v-chip
      v-for="(player, index) in playerStore._campaign.players"
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