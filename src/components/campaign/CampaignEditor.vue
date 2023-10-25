<script setup lang="ts">
import { ref } from "vue";
import { usePlayerStore } from "../../store/modules/player";
import { useScenarioStore } from "../../store/modules/scenario";
import ScenarioPreview from "../scenario/ScenarioPreview.vue";
import PlayerLayer from "../player/PlayerLayer.vue";

const playerStore = usePlayerStore();
const scenarioStore = useScenarioStore();
const player = ref<any>({});
const isActive = ref<boolean>(false);

const editPlayer = (playerToEdit: any) => {
  player.value = playerToEdit;
  isActive.value = true;
}

const closeLayer = () => {
  isActive.value = false;
};
</script>
<template>
  <v-card class="mx-auto my-12 bg-card" max-width="700">
    <v-img cover height="250" :src="playerStore._campaign.imageURL"></v-img>
    <v-card-item>
      <v-card-title>{{ playerStore._campaign.name }}</v-card-title>
      <v-card-subtitle>
        <span class="me-1">{{ playerStore._campaign.game }}</span>
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <p>
        Lorem ipsum dolor sit amet. Et accusamus dolorem sit necessitatibus
        beatae et consequatur suscipit ea iure assumenda.
      </p>
    </v-card-text>
    <v-divider class="mx-4 mb-1"></v-divider>
    <v-card-title>Joueurs</v-card-title>
    <div class="px-4">
      <v-chip
        v-for="(player, index) in playerStore._campaign.players"
        :key="index"
        closable
        class="ma-2"
        color="dark"
        @click="editPlayer(player)"
      >
        {{ player.name }}
      </v-chip>
    </div>
    <PlayerLayer
      :player="player"
      :isActive="isActive"
      @close-layer="closeLayer"
    />
    <v-list class="bg-card">
      <v-list-item v-for="scenario in scenarioStore._scenarios">
        <ScenarioPreview :key="scenario.name" :scenario="scenario" />
        <v-divider></v-divider>
      </v-list-item>
    </v-list>
  </v-card>
</template>
