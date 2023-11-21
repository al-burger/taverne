<script setup lang="ts">
import { useAuthStore } from "@/store/modules/auth";
import { usePlayerStore } from "@/store/modules/player";

const playerStore = usePlayerStore();

const loginStore = useAuthStore();
const updateCampaign = () => {
  playerStore.updateCampaign();
};
</script>
<template>
  <v-overlay
      :model-value="playerStore._isLoading"
      class="align-center justify-center"
    >
      <v-progress-circular
        color="primary"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  <v-btn v-if="loginStore.isUserLogged" :class="'fixed'" @click="updateCampaign"
    >Update campaign</v-btn
  >
</template>
<style>
.fixed {
  position: fixed;
}
</style>
