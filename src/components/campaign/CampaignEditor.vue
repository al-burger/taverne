<script setup lang="ts">
import { usePlayerStore } from "../../store/modules/player";
const playerStore = usePlayerStore();
</script>
<template>
  <v-card class="mx-auto my-12" max-width="374">
    <v-img
      cover
      height="250"
      :src="playerStore._campaign.imageURL"
    ></v-img>
    <v-card-item>
      <v-card-title>{{ playerStore._campaign.name }}</v-card-title>
      <v-card-subtitle>
        <span class="me-1">{{ playerStore._campaign.game }}</span>
      </v-card-subtitle>
    </v-card-item>
    <v-card-text>
      <p>
        Lorem ipsum dolor sit amet. Et accusamus dolorem sit necessitatibus beatae et consequatur suscipit ea iure assumenda.
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
      >
        {{ player.name }}
      </v-chip>
    </div>
    <v-card-actions>
      <v-btn color="deep-purple-lighten-2" variant="text"> Reserve </v-btn>
    </v-card-actions>
  </v-card>
</template>
