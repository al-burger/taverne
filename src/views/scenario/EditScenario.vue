<script setup lang="ts">
import { useScenarioStore } from "../../store/modules/scenario";
import { usePlayerStore } from "../../store/modules/player";
import { useRouter } from "vue-router";

const scenarioStore = useScenarioStore();
const playerStore = usePlayerStore()
const router = useRouter();

const backToCampaign = () => {
    router.push({name : "MyCampaign", params: { campaignName: playerStore._campaign.name}})
}
</script>

<template>
    <div><v-btn @click="backToCampaign" color="primary" class="ml-2">
        Retour
      </v-btn></div>
  <div class="d-flex justify-space-between py-2"> PAGE SCENARIO
    <span class="ma-auto ml-0">{{ scenarioStore._scenarioToEdit }}</span>
    <div>
    </div>
  </div>
</template>
