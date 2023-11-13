<script setup lang="ts">
import { ref } from "vue";
import { useScenarioStore } from "@/store/modules/scenario";
import AddStory from "../itemSelect/AddTimeLineItem.vue";
const panel = ref([0]);
const scenarioStore = useScenarioStore();

const removeTimelineItemFromStep = (index: number) => {
  scenarioStore.removeTimelineItemFromStep(index);
};
</script>
<template>
  <v-expansion-panels v-model="panel" class="pb-4">
    <v-expansion-panel expand>
      <v-expansion-panel-title color="secondary">
        Story
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-timeline density="compact" side="end"  class="pa-4">
          <v-timeline-item
            v-for="(item, index) in scenarioStore.activeStep?.timelineItems"
            :key="index"
            :dot-color="'primary'"
            size="small"
          >
            <v-card class="text-left">
              <v-card-title
                :class="['text-h6', 'bg-secondary', 'py-0', 'px-4']"
              >
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
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<style>
.v-timeline-item__body {
  width: 100%;
}
</style>
