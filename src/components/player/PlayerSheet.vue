<script setup lang="ts">
import { onMounted } from "vue";
import { usePlayerStore } from "@/store/modules/player";
import Characteristics from "@/components/statBlock/Characteristics.vue";
import Stats from "@/components/statBlock/Stats.vue";
import Skills from "@/components/statBlock/Skills.vue";

const playerStore = usePlayerStore();
const props = defineProps({
  player: {
    type: Object,
    required: true,
  },
});

onMounted(async () => {
  await playerStore.fetchSkills();
  await playerStore.fetchAbilityScores();
});
</script>
<template>
  <v-card>
    <v-card-title class="headline">{{ props.player.name }}</v-card-title>
    <v-card-subtitle
      >{{ props.player.class }} - {{ props.player.level }}</v-card-subtitle
    >
    <Stats />
    <Characteristics :characteristics="playerStore._abilityScores" />
    <Skills :skills="playerStore._skills" />
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <!-- Informations de base -->
          <v-list>
            <v-list-item>
              <v-list-item-title>Race</v-list-item-title>
              <v-list-item-subtitle>{{
                props.player.race
              }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
