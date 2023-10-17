<script setup lang="ts">
import { onMounted } from "vue";
import { usePlayerStore } from "../../store/modules/player";
const playerStore = usePlayerStore();

function getCampaignByUser() {
  playerStore.getCampaignByUser();
}

onMounted(() => {
  getCampaignByUser();
});
</script>
<template>Votre campagne : {{ playerStore._campaign }}</template>
