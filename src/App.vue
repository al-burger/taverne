<script setup lang="ts">
import { useAuthStore } from "./store/modules/auth";
import { usePlayerStore } from "./store/modules/player";
import { useRouter } from "vue-router";
import CampaignSaveButton from "./components/campaign/CampaignSaveButton.vue"


const loginStore = useAuthStore();
const playerStore = usePlayerStore()
const router = useRouter();

function logOut() {
  loginStore.logout();
  router.go(0);
}
</script>

<template>
  <v-layout class="rounded fill-height" fill-height>
    <v-app-bar :color="'#582D30'">
      <v-toolbar-title>
        <router-link to="/">Taverne</router-link>
      </v-toolbar-title>
      <div>
        <v-btn
          :disabled="!loginStore.isUserLogged"
          type="submit"
          color="primary"
          @click="logOut"
          >Log Out</v-btn
        >
      </div>
    </v-app-bar>
    <v-main
      class="wrapper d-flex align-center text-center pt-0 bg-background flex-column"
    >
      <router-view></router-view>
      <CampaignSaveButton v-if="playerStore._campaign.id" />
    </v-main>
  </v-layout>
</template>

<style scoped></style>
