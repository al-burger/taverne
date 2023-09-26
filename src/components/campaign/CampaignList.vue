<script setup lang="ts">
import { useRouter } from "vue-router";
import { usePlayerStore } from "../../store/modules/player";
const router = useRouter();
const playerStore = usePlayerStore(); // Utilise le store

function selectCampaign(campaignName: string) {
    router.push({ name: "MyCampaign", params: { campaignName }});
}
</script>
<template>
  <v-card
    class="mx-auto mb-4 p-8 text-center bg-card"
    width="800"
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
      <v-btn class="ma-auto" @click="selectCampaign(campaign.name)" color="primary"> Reprendre </v-btn>
    </v-card-item>
  </v-card>
</template>
<style lang="scss"></style>