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
const currentStep = ref<any>({});
const isLayerOpened = ref<boolean>(false);
const activeStepIndex = scenarioStore._activeStepIndex;
const dataToDisplay = ref<any>({});
  const emit = defineEmits(["emitStep"]);

watch(
  () => scenarioStore._activeStepIndex,
  (newActiveStepIndex, oldActiveStepIndex) => {
    if (newActiveStepIndex !== -1) {
        currentStep.value = scenarioStore._scenarioToEdit.steps[newActiveStepIndex];
    }
  }
);

const addPnj = (pnj: any) => {
  scenarioStore.addPnjToStep(activeStepIndex, pnj);
};

const addMonster = (monster: any) => {
  scenarioStore.addMonsterToStep(activeStepIndex, monster);
};

const addItem = (item: any) => {
  scenarioStore.addItemToStep(activeStepIndex, item);
};

const removeItem = (index: number) => {
  scenarioStore.removeItemFromStep(activeStepIndex, index);
};

const removeMonster = (index: number) => {
  scenarioStore.removeMonsterFromStep(activeStepIndex, index);
};

const removePnj = (index: number) => {
  scenarioStore.removeNpcFromStep(activeStepIndex, index);
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
  <v-main class="pl-0 mt-8">
    <h3 class="pb-8">{{ currentStep.name }}</h3>
    <AddMonsters
      :currentStep="currentStep.monsters"
      @emitMonsters="addMonster"
      @emitMonsterStats="openLayer"
      @emitMonsterToRemove="removeMonster"
    />
    <AddPnj
      :currentStep="currentStep.pnj"
      @emitPnj="addPnj"
      @emitPnjStats="openLayer"
      @emitPnjToRemove="removePnj"
    />
    <AddItems
      :currentStep="currentStep.items"
      @emitItems="addItem"
      @emitItemStats="openLayer"
      @emitItemToRemove="removeItem"
    />
    <ScenarioLayer
      :isLayerOpened="isLayerOpened"
      :data="dataToDisplay"
      @closeLayer="closeLayer"
    />
  </v-main>
</template>
