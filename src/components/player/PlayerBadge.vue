<template>
  <div>
    <!-- Liste des joueurs sous forme de chips closables -->
    <v-chip
      v-for="(player, index) in players"
      :key="index"
      closable
      class="ma-2"
      color="dark"
    >
      {{ player }}
    </v-chip>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["players"]);
</script>