<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { usePlayerStore } from "../../store/modules/player";
import { Player } from "../../types/appTypes";
// @ts-ignore
import PlayerForm from "./PlayerForm.vue"

const router = useRouter();
const playerStore = usePlayerStore(); // Utilise le store

const error = ref<string>("");
const loader = ref<boolean>(false);

// Appelle l'action pour récupérer les classes
playerStore.fetchClasses();
playerStore.fetchRaces();

const players = computed<Player[]>(() => playerStore._players);
const races = computed<string[]>(() => playerStore._races);
const classes = computed<string[]>(() => playerStore._classes);

function handleClick(event: string) {
  router.push({ name: event });
}

async function createCampaign() {
  loader.value = true;
  try {
    await playerStore.createCampaign(players.value);
    loader.value = false;
    router.push({ name: "MyCampaign" });
  } catch (err: any) {
    loader.value = false;
    error.value = err.message;
  }
}
</script>
<template>
  <form
    @submit.prevent="createCampaign"
    class="bg-white elevation-4 pa-8 rounded shadow"
  >
    <v-overlay
      v-model="loader"
      contained
      class="align-center justify-center"
      persistent
    >
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>
    <PlayerForm
      v-for="(player, index) in players"
      :key="index"
      v-model="players[index]"
      :player="player"
      :classes="classes"
      :races="races"
    ></PlayerForm>
    <v-row>
      <v-col cols="12">
        <v-btn
          type="submit"
          color="primary"
          variant="outlined"
          class="mr-4"
          @click="handleClick('CampaignForm')"
        >
          Modifier ma campagne
        </v-btn>
        <v-btn type="submit" color="primary"> Valider mes personnages </v-btn>
      </v-col>
    </v-row>
  </form>
</template>
