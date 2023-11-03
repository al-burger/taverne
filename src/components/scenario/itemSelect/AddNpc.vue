<script setup lang="ts">
import { ref } from "vue";
import { useScenarioStore } from "../../../store/modules/scenario";

const scenarioStore = useScenarioStore();
const emit = defineEmits(["emitNpcStats"]);
const inputNpc = ref<string>("");
const addNpc = () => {
  const inputNpcName = inputNpc.value;
  const npcExists = scenarioStore.activeStep?.npc?.some(
    (item) => item.name === inputNpcName
  );
  if (!npcExists) {
    const npc = { name: inputNpcName, title: '' };
    inputNpc.value = '';
    scenarioStore.addNpcToStep(npc);
  } else {
    alert("Le NPC existe déjà");
  }
};
</script>

<template>
  <div>
    <v-text-field label="Select" v-model="inputNpc">
      <template v-slot:append>
        <v-btn @click="addNpc" color="primary">add</v-btn>
      </template>
    </v-text-field>
  </div>
</template>
