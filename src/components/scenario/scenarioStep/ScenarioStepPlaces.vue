<script setup lang="ts">
import { ref } from "vue";
import { useScenarioStore } from "../../../store/modules/scenario";
import AddPlace from "../itemSelect/AddSummary.vue";
const scenarioStore = useScenarioStore();
const panel = ref([0]);
</script>
<template>
  <v-expansion-panels v-model="panel">
    <v-expansion-panel expand>
      <v-expansion-panel-title color="secondary">
        Places
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-card v-if="scenarioStore.activeStep?.summary?.length">
          <v-card-item>
            <p>{{ scenarioStore.activeStep?.summary }}</p>
          </v-card-item>
        </v-card>
        <AddPlace v-else />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
