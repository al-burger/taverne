<script setup lang="ts">
import { useScenarioStore } from "../../store/modules/scenario";
import { onMounted } from "vue";
import ScenarioStepStory from "./scenarioStep/ScenarioStepStory.vue";
import ScenarioStepNpc from "./scenarioStep/ScenarioStepNpc.vue";
import ScenarioStepMonsters from "./scenarioStep/ScenarioStepMonsters.vue";
import ScenarioStepItems from "./scenarioStep/ScenarioStepItems.vue";

const scenarioStore = useScenarioStore();
const emit = defineEmits(["emitStep"]);
onMounted(() => {
  scenarioStore.fetchMonsters();
  scenarioStore.fetchItems();
});
</script>
<template>
  <v-container class="container px-0">
    <v-row>
      <v-col md="8">
        <ScenarioStepStory class="story" />
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
}
</style>
