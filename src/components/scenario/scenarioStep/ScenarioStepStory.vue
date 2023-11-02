<script setup lang="ts">
import { useScenarioStore } from "../../../store/modules/scenario";

const scenarioStore = useScenarioStore();
</script>
<template>
  <v-card>
    <v-toolbar class="text-left" color="secondary">
      <v-toolbar-title>Story</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn variant="text" icon="mdi-plus"></v-btn>
    </v-toolbar>
    <v-card-text>
      <v-timeline side="end">
        <v-timeline-item
          v-for="(item, i) in scenarioStore._timelineItems"
          :key="i"
          :dot-color="'primary'"
          size="small"
        >
          <v-card>
            <v-card-title :class="['text-h6', 'bg-primary']">
              {{ item.title }}
            </v-card-title>
            <v-card-text class="bg-white text--primary">
              <p>
                {{ item.description }}
              </p>
              <v-btn :color="'primary'" variant="outlined"> Button </v-btn>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>
