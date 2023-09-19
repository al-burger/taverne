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
        @remove-player="removePlayer(index)"
        @edit-player="editPlayer(index)"
      />
    </v-row>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import PlayerBadge from "./PlayerBadge.vue";

const newPlayerName = ref("");
const isEditing = ref(false);
const players = reactive([]);
const selectedPlayer = ref(null);

function addPlayer() {
  if (newPlayerName.value.trim() !== "") {
    players.push({ name: newPlayerName.value, race: "", level: "", class: "" });
    newPlayerName.value = "";
  }
}

function removePlayer(index) {
  players.splice(index, 1);
}

function editPlayer(index) {
  selectedPlayer.value = players[index];
  isEditing.value = true;
}
</script>

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
