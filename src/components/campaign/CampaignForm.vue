<script setup>
import { ref } from "vue";
import CampaignGameSelector from "./CampaignGameSelector.vue";
import PlayerList from "../player/PlayerList.vue";
import { useRouter } from "vue-router";

const campaignName = ref("");
const players = ref([]);
const games = ["Donjon & Dragon", "Cthulhu"];
const selectedGame = ref(null);
const router = useRouter();

function updateGame(newSelectedGame) {
  selectedGame.value = newSelectedGame;
}

function createCampaign() {
  console.log("Campagne créée :", campaignName.value);
  console.log("Joueurs :", players.value);
  console.log("Jeu sélectionné :", selectedGame.value);
  router.push({ name: "PlayerStats" });
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
          <PlayerList />
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