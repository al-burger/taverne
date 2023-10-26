<script setup lang="ts">
import { ref } from "vue";
import { useScenarioStore } from "../../../store/modules/scenario";

const scenarioStore = useScenarioStore();
const emit = defineEmits(["emitPnjStats"]);
const inputPnj = ref<string>("");
const addPnj = () => {
  const inputPnjName = inputPnj.value;
  const pnjExists = scenarioStore.activeStep?.pnj.some(
    (item) => item.name === inputPnjName
  );
  if (!pnjExists) {
    const pnj = { name: inputPnjName };
    scenarioStore.addPnjToStep(pnj);
  } else {
    alert("Le PNJ existe déjà");
  }
};
const fetchPnjStats = async (pnj: any) => {
  emit("emitPnjStats", pnj);
};

const removePnj = async (index: number) => {
  scenarioStore.removeNpcFromStep(index);
};
</script>

<template>
  <div>
    <div v-for="(pnj, index) in scenarioStore.activeStep?.pnj" class="text-right">
      {{ pnj.name }} <v-btn variant="outlined" @click="removePnj(index)">Remove</v-btn><v-btn @click="fetchPnjStats(pnj.name)">(?)</v-btn
      >
    </div>
    <v-text-field label="Select" v-model="inputPnj">
      <template v-slot:append>
        <v-btn @click="addPnj">add</v-btn>
      </template>
    </v-text-field>
  </div>
</template>
