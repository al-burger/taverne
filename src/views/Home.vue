<script setup lang="ts">
import { onMounted } from "vue";
import { useAuthStore } from "../store/modules/auth";
import { usePlayerStore } from "../store/modules/player";
import { useRouter } from "vue-router";
const loginStore = useAuthStore();
const router = useRouter();
const playerStore = usePlayerStore();
 
function resetCampaign() {
  const resetedCampaign = {
    name: "",
    players: [],
    game: "",
    uid: "",
    imageURL: "",
    scenarios: [],
    id: ""
  };
  playerStore.setCampaign(resetedCampaign);
}

onMounted(() => {
  if (!loginStore.isUserLogged) {
    router.push({ name: "Login" });
  }
});
</script>

<template>
  <div class="ma-auto">
    <h1 class="text-h3 font-weight-bold">
      Bienvenue dans la Taverne du Maître de Jeu
    </h1>
    <v-row class="mt-8">
      <v-col cols="6">
        <router-link to="/create-campaign">
          <v-card
            class="rounded-lg shadow-lg d-flex align-center flex-column"
            style="background-color: #f2be75"
            @click="resetCampaign"
          >
            <h2 class="text-h4 font-weight-bold text-center mb-2">
              Create a campaign
            </h2>
            <div>
              <img src="../assets/adventure.svg" />
            </div>
          </v-card>
        </router-link>
      </v-col>

      <v-col cols="6">
        <router-link to="/campaign-list">
          <v-card
            class="rounded-lg shadow-lg d-flex align-center flex-column"
            style="background-color: #e16d64"
          >
            <h2 class="text-h4 font-weight-bold text-center mb-2">Resume a campaign</h2>
            <div>
              <img src="../assets/wizard.svg" />
            </div>
          </v-card>
        </router-link>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped lang="scss">
.v-card {
  height: 25rem;
  text-align: center;
  justify-content: center;
  transition: 0.2s ease;
  &:hover {
    box-shadow: 0px 2px 4px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.4)),
      0px 4px 5px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.3)),
      0px 1px 10px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.3)) !important;
    img {
      padding-top: 0.75rem;
    }
  }
  img {
    transition: 0.3s ease;
  }
}

h2 {
  margin: 0 auto;
  padding-bottom: 2rem;
}

a {
  text-decoration: none;
}
</style>
