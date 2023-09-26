<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { usePlayerStore } from "../../store/modules/player";
const playerStore = usePlayerStore(); // Utilise le store
const router = useRouter();

function getCampaignByName() {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const param = router.currentRoute._value.params.campaignName;
  playerStore.getCampaignByName(param);
}

onMounted(() => {
  getCampaignByName();
});
</script>
<template>Votre campagne : {{ playerStore._campaign }}</template>
