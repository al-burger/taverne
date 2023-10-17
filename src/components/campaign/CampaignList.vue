<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePlayerStore } from "../../store/modules/player";
const router = useRouter();
const playerStore = usePlayerStore(); // Utilise le store

function selectCampaign(campaign: any) {
  playerStore.setActiveCampaign(campaign);
  router.push({ name: "MyCampaign" });
}

function getCampaignByUser() {
  playerStore.getCampaignByUser();
}

function handleRedirect() {
  router.push({ name: "CreateCampaign" });
}

onMounted(() => {
  getCampaignByUser();
});
</script>
<template>
  <v-card
    v-if="!playerStore.campaigns.length"
    class="mx-auto mb-4 p-8 text-center bg-card"
    width="800"
  >
    <v-card-item>
      <div>
        <p class="pb-2">Vous n'avez pas de campagne</p>
        <v-btn class="ma-auto" @click="handleRedirect" color="primary">
          Creer
        </v-btn>
      </div>
    </v-card-item>
  </v-card>
  <v-card
    class="mx-auto mb-4 p-8 text-center bg-card"
    width="800"
    v-else
    v-for="campaign in playerStore.campaigns"
  >
    <v-card-item>
      <div>
        <div class="text-overline mb-1">
          {{ campaign.game }}
        </div>
        <div class="text-h6 mb-1">{{ campaign.name }}</div>
        <div class="text-caption">
          <v-chip-group class="justify-center">
            <v-chip v-for="player in campaign.players">{{
              player.name
            }}</v-chip>
          </v-chip-group>
        </div>
      </div>
      <v-btn class="ma-auto" @click="selectCampaign(campaign)" color="primary">
        Reprendre
      </v-btn>
    </v-card-item>
  </v-card>
</template>
<style lang="scss"></style>
