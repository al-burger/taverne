<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { usePlayerStore } from "../../store/modules/player";
const router = useRouter();
const playerStore = usePlayerStore(); // Utilise le store
const loader = ref(true);

const selectCampaign = (campaign: any) => {
  playerStore.setCampaign(campaign);
  router.push({ name: "MyCampaign", params: { campaignName: campaign.name } });
};

const getCampaignByUser = async () => {
  await playerStore.getCampaignByUser();
};

const deleteCampaign = async (campaign: any) => {
  await playerStore.deleteCampaign(campaign);
};

onMounted(() => {
  getCampaignByUser();
  loader.value = false;
});
</script>
<template>
  <template v-if="loader">
    <v-progress-circular indeterminate color="primary"></v-progress-circular>
  </template>
  <template v-else>
    <v-card
      v-if="!playerStore.campaigns.length"
      class="m-auto mb-4 p-8 text-center bg-card"
      width="800"
    >
      <v-card-item>
        <div>
          <p class="pb-2">Vous n'avez pas de campagne</p>
          <router-link to="/create-campaign">
            <v-btn class="ma-auto" color="primary"> Creer </v-btn>
          </router-link>
        </div>
      </v-card-item>
    </v-card>
    <v-card
      class="my-auto p-8 text-center bg-card"
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
        <v-btn
          class="ma-auto"
          @click="deleteCampaign(campaign)"
          color="primary"
          variant="outlined"
        >
          Supprimer
        </v-btn>
        <v-btn
          class="ma-auto"
          @click="selectCampaign(campaign)"
          color="primary"
        >
          Reprendre
        </v-btn>
      </v-card-item>
    </v-card>
  </template>
</template>
<style lang="scss"></style>
