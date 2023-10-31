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
    const pnj = { name: inputPnjName, title: '' };
    inputPnj.value = '';
    scenarioStore.addPnjToStep(pnj);
  } else {
    alert("Le PNJ existe déjà");
  }
};
</script>

<template>
  <div>
    <v-text-field label="Select" v-model="inputPnj">
      <template v-slot:append>
        <v-btn @click="addPnj" color="primary">add</v-btn>
      </template>
    </v-text-field>
  </div>
</template>
