<script module lang="ts">
import { usePlayerStore } from "../../store/modules/player";

const playerStore = usePlayerStore();

const updateCampaign = () => {
  playerStore.updateCampaign();
};
</script>
<template>
  <v-btn :class="'fixed'" @click="updateCampaign"
    >Mettre à jour la campagne</v-btn
  >
</template>
<style>
.fixed {
  position: fixed;
  bottom: 2rem;
  right: 4rem;
}
</style>
