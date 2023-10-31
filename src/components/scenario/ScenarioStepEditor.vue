<script setup lang="ts">
import { useScenarioStore } from "../../store/modules/scenario";
import { onMounted, ref } from "vue";
import {
  AddItems,
  AddPnj,
  AddMonsters,
} from "../../components/scenario/itemSelect";
import ScenarioLayer from "../../components/scenario/ScenarioLayer.vue";
import ScenarioStepStory from "./scenarioStep/ScenarioStepStory.vue";
import ScenarioStepPnj from "./scenarioStep/ScenarioStepPnj.vue";
import ScenarioStepMonsters from "./scenarioStep/ScenarioStepMonsters.vue";
import ScenarioStepItems from "./scenarioStep/ScenarioStepItems.vue";

const scenarioStore = useScenarioStore();
const isLayerOpened = ref<boolean>(false);
const dataToDisplay = ref<any>({});
const emit = defineEmits(["emitStep"]);

const addPnj = (pnj: any) => {
  scenarioStore.addPnjToStep(pnj);
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
  <div class="grid w-100 mt-16">
    <ScenarioStepStory class="story" />
    <ScenarioStepPnj class="pnj" />
    <ScenarioStepMonsters class="monsters" />
    <ScenarioStepItems class="items" />
  </div>
</template>
<style>
.grid {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(3, 1fr);
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
}

.items {
  grid-area: 1 / 2 / 2 / 3;
}
.pnj {
  grid-area: 2 / 2 / 3 / 3;
}
.monsters {
  grid-area: 3 / 2 / 4 / 3;
}
.story {
  grid-area: 1 / 1 / 4 / 2;
}
</style>
