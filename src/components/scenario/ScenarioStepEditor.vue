<script setup lang="ts">
import { useScenarioStore } from "@/store/modules/scenario";
import { onMounted } from "vue";
import ScenarioStepStory from "./scenarioStep/ScenarioStepTimeLine.vue";
import ScenarioStepNpc from "./scenarioStep/ScenarioStepNpc.vue";
import ScenarioStepMonsters from "./scenarioStep/ScenarioStepMonsters.vue";
import ScenarioStepItems from "./scenarioStep/ScenarioStepItems.vue";
import ScenarioStepSummary from "./scenarioStep/ScenarioStepSummary.vue";
import ScenarioStepPlaces from "./scenarioStep/ScenarioStepPlaces.vue";

const scenarioStore = useScenarioStore();
const emit = defineEmits(["emitStep"]);
onMounted(() => {
  scenarioStore.fetchMonsters();
  scenarioStore.fetchItems();
});
</script>
<template>
  <v-container class="container">
    <v-row>
      <v-col md="12" class="py-8">
        <span class="text">
          {{ scenarioStore._scenarioToEdit.name }}
        </span>
        <div>
          {{ scenarioStore.activeStep.name }}
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="12">
        <ScenarioStepSummary class="summary" />
      </v-col>
    </v-row>
    <v-row>
      <v-col md="8">
        <ScenarioStepStory class="story" />
        <ScenarioStepPlaces class="story" />
      </v-col>
      <v-col md="4">
        <ScenarioStepNpc class="npc" />
        <ScenarioStepMonsters class="monsters" />
        <ScenarioStepItems class="items" />
      </v-col>
    </v-row>
  </v-container>
</template>
<style>
.container {
  margin-top: 4rem;
  .text {
    font-size: 1.75rem;
  }
}
</style>
