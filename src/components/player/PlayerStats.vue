<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { usePlayerStore } from "../../store/modules/player";

const router = useRouter();
const playerStore = usePlayerStore(); // Utilise le store

// Appelle l'action pour récupérer les classes
playerStore.fetchClasses();
playerStore.fetchRaces();

const players = computed(() => playerStore.players);
const races = computed(() => playerStore.races);
const classes = computed(() => playerStore.classes);

function handleClick(event) {
  router.push({ name: event });
}
</script>
<template>
  <v-main class="wrapper d-flex align-center justify-center pt-0 grainy-background"
    ><form @submit.prevent="createCampaign" class="bg-background elevation-4 pa-8 rounded shadow">
      <template v-for="player in players" :key="player.name">
        <v-form v-model="valid">
          <v-container>
            <v-row>
              <v-col cols="12" md="3">
                <v-text-field
                  v-model="player.name"
                  :rules="nameRules"
                  :counter="10"
                  label="Name"
                  required
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field
                  v-model="player.level"
                  type="number"
                  :counter="10"
                  min="0"
                  max="20"
                  label="Level"
                  hide-details
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-select
                  v-model="player.race"
                  :items="races"
                  label="Race"
                  outlined
                  @change="emitSelectedGame"
                ></v-select>
              </v-col>

              <v-col cols="12" md="3">
                <v-select
                  v-model="player.class"
                  :items="classes"
                  label="Class"
                  outlined
                  @change="emitSelectedGame"
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </template>
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
          <v-btn type="submit" color="primary" @click="handleClick('back')">
            Valider mes personnages
          </v-btn>
        </v-col>
      </v-row>
    </form></v-main
  >
</template>

<style scoped>
.wrapper {
  background-color: #e16d64;
}
</style>