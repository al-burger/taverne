<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const players = [];

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
                  label="First name"
                  required
                  hide-details
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field
                  v-model="player.level"
                  :rules="nameRules"
                  :counter="10"
                  label="Last name"
                  hide-details
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field
                  v-model="player.race"
                  :rules="emailRules"
                  label="E-mail"
                  hide-details
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" md="3">
                <v-text-field
                  v-model="player.class"
                  :rules="emailRules"
                  label="E-mail"
                  hide-details
                  required
                ></v-text-field>
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