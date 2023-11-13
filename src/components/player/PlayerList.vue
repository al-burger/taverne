<script setup lang="ts">
import { ref } from "vue";
import PlayerBadge from "./PlayerBadge.vue";
import { usePlayerStore } from "@/store/modules/player";
const playerStore = usePlayerStore(); // Utilise le store

const newPlayer = ref<string>("");

const addPlayer = () => {
  if (newPlayer.value.trim() !== "") {
    playerStore.addPlayer(newPlayer.value);
    newPlayer.value = "";
  }
}
</script>

<template>
  <div>
    <!-- Formulaire pour ajouter un joueur --><label
      for="playerField"
      class="text--grey-600 text-h6 mb-2"
      >Enter your players</label
    >
    <div class="d-flex">
      <v-text-field
        id="playerField"
        v-model="newPlayer"
        label="Player Name"
      ></v-text-field>
      <v-btn @click.prevent="addPlayer" color="primary" class="mt-2 ml-2">
        Ajouter
      </v-btn>
    </div>
    <!-- Liste des joueurs sous forme de badges -->
    <v-row>
      <PlayerBadge />
    </v-row>
  </div>
</template>

<style scoped>
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.3s;
}

.drawer-fade-enter,
.drawer-fade-leave-to {
  opacity: 0;
}
</style>
