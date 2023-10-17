<script setup>
const props = defineProps({
  player: Object,
  races: Array,
  classes: Array,
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="3">
      <v-text-field
        v-model="player.name"
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
      ></v-select>
    </v-col>
    <v-col cols="12" md="3">
      <v-select
        v-model="player.class"
        :items="classes"
        label="Class"
        outlined
      ></v-select>
    </v-col>
  </v-row>
</template>