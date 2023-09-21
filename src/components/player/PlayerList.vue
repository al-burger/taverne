<script setup lang="ts">
import { ref } from "vue";
import PlayerBadge from "./PlayerBadge.vue";

const newPlayerName = ref<string>("");
const players = ref<string[]>([]);
const emit = defineEmits(['emitPlayers']);

function emitPlayers() {
  emit('emitPlayers', players);
}

function addPlayer() {
  if (newPlayerName.value.trim() !== "") {
    players.value.push(newPlayerName.value);
    newPlayerName.value = "";
    emitPlayers();
  }
}
</script>

<template>
  <div>
    <label for="campaignName" class="text--grey-600 text-h6 mb-2"
      >Gestion des Joueurs</label
    >

    <!-- Formulaire pour ajouter un joueur -->
    <div class="d-flex">
      <v-text-field
        v-model="newPlayerName"
        label="Nom du joueur"
      ></v-text-field>
      <v-btn @click.prevent="addPlayer" color="primary" class="mt-2 ml-2"> Ajouter </v-btn>
    </div>

    <!-- Liste des joueurs sous forme de badges -->
    <v-row>
      <PlayerBadge
        :players="players"
      />
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
