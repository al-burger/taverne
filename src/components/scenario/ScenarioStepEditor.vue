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
    currentStep.value.pnj.push(pnj);
  };

  const saveStep = () => {
    if (activeStepIndex !== -1) {
      scenarioStore.updateStep(activeStepIndex, currentStep.value);
    }
  };

  const addItems = (items: any) => {
    currentStep.value.items.push(...items);
  };

  const addMonsters = (monsters: any) => {
    currentStep.value.monsters.push(...monsters);
  };

  const openLayer = (data: any) => {
    dataToDisplay.value = data;
    isLayerOpened.value = true;
  };

  const closeLayer = () => {
    isLayerOpened.value = false;
  };

  const removeItem = (index: number) => {
    currentStep.value.item.splice(index, 1);
  };

  const removeMonster = (index: number) => {
    currentStep.value.monster.splice(index, 1);
  };

  const removePnj = (index: number) => {
    currentStep.value.pnj.splice(index, 1);
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
          @emitMonsters="addMonsters"
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
          @emitItems="addItems"
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
