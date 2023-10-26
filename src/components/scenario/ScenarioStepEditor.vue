<script setup lang="ts">
import { useScenarioStore } from "../../store/modules/scenario";
import { onMounted, ref, watch } from "vue";
import {
  AddItems,
  AddPnj,
  AddMonsters,
} from "../../components/scenario/itemSelect";
import ScenarioLayer from "../../components/scenario/ScenarioLayer.vue";

const scenarioStore = useScenarioStore();
const isLayerOpened = ref<boolean>(false);
const dataToDisplay = ref<any>({});
const emit = defineEmits(["emitStep"]);

const addPnj = (pnj: any) => {
  scenarioStore.addPnjToStep(pnj);
};

const removePnj = (index: number) => {
  scenarioStore.removeNpcFromStep(index);
};

const openLayer = (data: any) => {
  dataToDisplay.value = data;
  isLayerOpened.value = true;
};

const closeLayer = () => {
  isLayerOpened.value = false;
};

onMounted(() => {
  scenarioStore.fetchMonsters();
  scenarioStore.fetchItems();
});
</script>
<template>
  <v-main class="pl-0">
    <v-card class="mx-auto my-12 px-8 bg-card" max-width="1000">
      <h3 class="pb-8 pt-8">{{ scenarioStore.activeStep?.name }}</h3>
      <AddMonsters @emitMonsterStats="openLayer" />
      <AddPnj
        @emitPnj="addPnj"
        @emitPnjStats="openLayer"
        @emitPnjToRemove="removePnj"
      />
      <AddItems @emitItemStats="openLayer" />
      <ScenarioLayer
        :isLayerOpened="isLayerOpened"
        :data="dataToDisplay"
        @closeLayer="closeLayer"
      />
    </v-card>
  </v-main>
</template>
