<script setup lang="ts">
import { ref } from "vue";
import { useScenarioStore } from "@/store/modules/scenario";

const scenarioStore = useScenarioStore();
const autocompleteMonsters = ref<any[]>([]);
const emit = defineEmits(["emitMonsterStats"]);

const addMonsters = () => {
  scenarioStore.addMonsterToStep(autocompleteMonsters.value);
  autocompleteMonsters.value = [];
};

const removeMonster = async (index: number) => {
  scenarioStore.removeMonsterFromStep(index);
};

const getMonsterStats = async (monster: any) => {
  const monsterStats = await scenarioStore.fetchMonsterStats(monster);
  emit("emitMonsterStats", monsterStats);
};
</script>
<template>
    <v-autocomplete
      label="Select"
      v-model="autocompleteMonsters"
      :items="scenarioStore._monsters"
      itemTitle="name"
      itemValue="index"
      multiple
    >
      <template v-slot:append>
        <v-btn @click="addMonsters" color="primary">add</v-btn>
      </template>
    </v-autocomplete>
</template>
