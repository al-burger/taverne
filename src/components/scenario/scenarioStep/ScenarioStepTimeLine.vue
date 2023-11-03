<script setup lang="ts">
import { useScenarioStore } from "../../../store/modules/scenario";
import AddStory from "../itemSelect/AddTimeLineItem.vue";

const scenarioStore = useScenarioStore();

const removeTimelineItemFromStep = (index: number) => {
  scenarioStore.removeTimelineItemFromStep(index);
};
</script>
<template>
  <v-card>
    <v-toolbar class="text-left" color="secondary">
      <v-toolbar-title>Story</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn variant="text" icon="mdi-plus"></v-btn>
    </v-toolbar>
    <v-card-text>
      <v-timeline density="compact" side="end">
        <v-timeline-item
          v-for="(item, index) in scenarioStore.activeStep?.timelineItems"
          :key="index"
          :dot-color="'primary'"
          size="small"
        >
          <v-card class="text-left">
            <v-card-title :class="['text-h6', 'bg-secondary', 'py-0', 'px-4']">
              {{ item.title }}
              <v-btn
                color="white"
                icon="mdi-delete"
                variant="text"
                @click="removeTimelineItemFromStep(index)"
              ></v-btn>
            </v-card-title>
            <v-card-text class="bg-white text--primary py-4">
              <p>
                {{ item.description }}
              </p>
            </v-card-text>
          </v-card>
        </v-timeline-item>
        <v-timeline-item :dot-color="'primary'" size="small">
          <AddStory />
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>
<style>
.v-timeline-item__body {
  width: 100%;
}
</style>
