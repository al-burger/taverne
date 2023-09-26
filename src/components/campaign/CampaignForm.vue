<script lang="ts" setup>
import { computed, ref } from "vue";
import CampaignGameSelector from "./CampaignGameSelector.vue";
import PlayerList from "../player/PlayerList.vue";
import { useRouter } from "vue-router";
import { usePlayerStore } from "../../store/modules/player";

const router = useRouter();
const playerStore = usePlayerStore(); // Utilise le store

const campaignName = ref<string>(playerStore._campaignName);
const games = ref<string[]>(["Donjon & Dragon", "Cthulhu"]);
const isCreateDisabled = computed(() => {
  return playerStore.players.length && campaignName && playerStore._game;
});

function createCampaignName() {
  playerStore.createCampaignName(campaignName.value);
  router.push({ name: "PlayerStats" });
}
</script>

<template>
  <form
    @submit.prevent="createCampaignName"
    class="rounded shadow elevation-4 pa-8 bg-card"
  >
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
        <CampaignGameSelector :games="games" />
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12">
        <PlayerList />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn type="submit" color="primary" :disabled="!isCreateDisabled"
          >Créer les joueurs</v-btn
        >
      </v-col>
    </v-row>
  </form>
</template>
