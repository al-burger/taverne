<script setup lang="ts">
import { ref } from "vue";
import { useScenarioStore } from "../../../store/modules/scenario";

const scenarioStore = useScenarioStore();
const description = ref<string>("");
const addSummary = () => {
  scenarioStore.addSummaryToStep(description.value)
};
</script>

<template>
  <div class="pb-8">
    <v-textarea
      id="campaignName"
      v-model="description"
      label="Enter a description of the current act"
    ></v-textarea>
    <v-btn color="primary" @click="addSummary">Add</v-btn>
  </div>
</template>
