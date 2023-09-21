<script setup lang="ts">
const props = defineProps({
  players: Array
});
</script>

<template>
  <div>
    <!-- Liste des joueurs sous forme de chips closables -->
    <v-chip
      v-for="(player, index) in props.players"
      :key="index"
      closable
      class="ma-2"
      color="dark"
    >
      {{ player }}
    </v-chip>
  </div>
</template>