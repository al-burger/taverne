<script setup lang="ts">
import { PropType, ref } from "vue";
import { useScenarioStore } from "../../../store/modules/scenario";

const props = defineProps({
  currentStep: {
    type: Array as PropType<{ name: string }[]>,
    required: true,
  },
});
const scenarioStore = useScenarioStore();
const autocompleteMonsters = ref<any[]>([]);
const emit = defineEmits(["emitMonsters", "emitMonsterStats"]);
const addMonsters = () => {
  emit("emitMonsters", autocompleteMonsters.value);
};
const getMonsterStats = async (monster: any) => {
  const monsterStats = await scenarioStore.fetchMonsterStats(monster);
  emit("emitMonsterStats", monsterStats);
};
</script>
<template>
  <div>
    <div v-for="item in props.currentStep">
      {{ item }} <v-button @click="getMonsterStats(item)">(?)</v-button>
    </div>
    <v-autocomplete
      label="Select"
      v-model="autocompleteMonsters"
      :items="scenarioStore._monsters"
      itemTitle="name"
      itemValue="index"
      multiple
    >
      <template v-slot:append>
        <v-btn @click="addMonsters">add</v-btn>
      </template>
    </v-autocomplete>
  </div>
</template>
