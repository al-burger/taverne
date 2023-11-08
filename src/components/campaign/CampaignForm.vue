<script lang="ts" setup>
import { computed, ref } from "vue";
import CampaignGameSelector from "./CampaignGameSelector.vue";
import PlayerList from "../player/PlayerList.vue";
import { useRouter } from "vue-router";
import { usePlayerStore } from "../../store/modules/player";

const router = useRouter();
const playerStore = usePlayerStore(); // Utilise le store

const campaignName = ref<string>(playerStore._campaign.name);
const games = ref<string[]>(["Donjon & Dragon", "Cthulhu"]);
const selectedFile = ref<File>();
const isCreateDisabled = computed(() => {
  return playerStore._campaign.players?.length && campaignName && playerStore._campaign.game;
});

function initCampaign() {
  playerStore.setCampaignName(campaignName.value);
  playerStore.setCampaignPicture(selectedFile.value as File);
  router.push({ name: "PlayerStats" });
}

function handleFileChange(event: any) {
  selectedFile.value = event.target.files[0];
}
</script>

<template>
  <form
    @submit.prevent="initCampaign"
    class="rounded shadow elevation-4 pa-8 bg-card"
  >
    <v-row class="mb-4">
      <v-col cols="12">
        <label for="campaignName" class="text--grey-600 text-h6 mb-2"
          >Campaign name</label
        >
        <v-text-field
          id="campaignName"
          v-model="campaignName"
          label="Enter campaign name"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="mb-4">
      <v-col cols="12">
        <label for="selectedGame" class="text--grey-600 text-h6 mb-2"
          >Select game</label
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
        <label for="selectedGame" class="text--grey-600 text-h6 mb-2"
          >Select cover image</label
        >
        <v-file-input label="File input" @change="handleFileChange" v-model="selectedFile"></v-file-input>
        {{ selectedFile }}
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-btn type="submit" color="primary" :disabled="!isCreateDisabled"
          >Create players</v-btn
        >
      </v-col>
    </v-row>
  </form>
</template>
