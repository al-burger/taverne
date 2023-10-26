<script setup lang="ts">
import { PropType, ref } from "vue";
import { useScenarioStore } from "../../../store/modules/scenario";

const props = defineProps({
  currentStep: {
    type: Array as PropType<{ name: string }[]>,
    required: true,
  },
});
const emit = defineEmits(["emitPnj", "emitPnjStats", "emitPnjToRemove"]);
const inputPnj = ref<string>("");
const addPnj = () => {
  const inputPnjName = inputPnj.value;
  const pnjExists = props.currentStep.some(
    (item) => item.name === inputPnjName
  );

  if (!pnjExists) {
    const pnj = { name: inputPnjName };
    emit("emitPnj", pnj);
  } else {
    alert("Le PNJ existe déjà");
  }
};
const fetchPnjStats = async (pnj: any) => {
  emit("emitPnjStats", pnj);
};

const removeItem = async (index: number) => {
  emit("emitPnjToRemove", index);
}
</script>

<template>
  <div>
    <div v-for="(item, index) in props.currentStep">
      {{ item.name }} <v-btn  @click="fetchPnjStats(item)">(?)</v-btn ><v-btn @click="removeItem(index)">(x)</v-btn>
    </div>
    <v-text-field label="Select" v-model="inputPnj">
      <template v-slot:append>
        <v-btn @click="addPnj">add</v-btn>
      </template>
    </v-text-field>
  </div>
</template>
