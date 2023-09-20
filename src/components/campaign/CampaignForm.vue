<script  lang="ts" setup>
import { ref } from "vue";
import CampaignGameSelector from "./CampaignGameSelector.vue";
import PlayerList from "../player/PlayerList.vue";
import { useRouter } from "vue-router";
import { usePlayerStore } from "../../store/modules/player";

const router = useRouter();
const playerStore = usePlayerStore(); // Utilise le store

const campaignName = ref("");
const players = ref<string[]>([]);
const games = ["Donjon & Dragon", "Cthulhu"];
const selectedGame = ref(null);

function updateGame(newSelectedGame: object) {
  selectedGame.value = newSelectedGame;
}

function createCampaign() {
  playerStore.createPlayers(players.value);
  router.push({ name: "PlayerStats" });
}

function getPlayers(emitedPlayers: Array<string>) {
  players.value = emitedPlayers;
}
</script>

<template>
  <v-main class="wrapper d-flex align-center justify-center pt-0 grainy-background"
    ><form @submit.prevent="createCampaign" class="rounded shadow bg-background elevation-4 pa-8">
      <v-row class="mb-4">
        <v-col cols="12">
          <label for="campaignName" class="text--grey-600 text-h6 mb-2"
            >Nom de la campagne</label
          >
          <v-text-field
          id="campaignName"
            v-model="campaignName"
            label="Entrez le nom de la campagne"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row class="mb-4">
        <v-col cols="12">
          <label for="selectedGame" class="text--grey-600 text-h6 mb-2"
            >Sélectionner le jeu</label
          >
          <CampaignGameSelector :games="games" @update:games="updateGame" />
        </v-col>
      </v-row>

      <v-row class="mb-4">
        <v-col cols="12">
          <PlayerList @emitPlayers="getPlayers<String>" />
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <v-btn type="submit" color="primary">Créer les joueurs</v-btn>
        </v-col>
      </v-row>
    </form>
  </v-main>
</template>

<style scoped>
.wrapper {
  background-color: #f2be75;
}
</style>