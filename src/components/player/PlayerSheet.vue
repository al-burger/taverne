<script setup lang="ts">
import { onMounted } from "vue";
import { usePlayerStore } from "@/store/modules/player";

const playerStore = usePlayerStore();
const props = defineProps({
  player: {
    type: Object,
    required: true
  }
});

onMounted( async() => {
  await playerStore.fetchSkills();
  await playerStore.fetchAbilityScores();
});
</script>
<template>
  <v-card>
    <v-card-title class="headline">{{ props.player.name }}</v-card-title>
    <v-card-subtitle>{{ props.player.class }} - {{ props.player.level }}</v-card-subtitle>
    <v-card-text>
      <v-row>
        <v-col cols="6">
          <!-- Informations de base -->
          <v-list>
            <v-list-item>
              <v-list-item-title>Race</v-list-item-title>
              <v-list-item-subtitle>{{ props.player.race }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="6">
          <!-- Caractéristiques -->
          <v-list>
            <v-list-item-group>
            <v-list-item v-for="abilityScore in playerStore._abilityScores" :key="abilityScore">
                <v-list-item-title>{{ abilityScore }}</v-list-item-title>
                <v-list-item-subtitle>+ 1</v-list-item-subtitle>
            </v-list-item>
            </v-list-item-group>
        </v-list>
        </v-col>
      </v-row>

      <!-- Compétences -->
      <v-list>
        <v-list-item-group>
          <v-list-item v-for="skill in playerStore._skills" :key="skill">
            <v-list-item-title>{{ skill }}</v-list-item-title>
            <v-list-item-subtitle>+ 1</v-list-item-subtitle>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
  </v-card>
</template>
