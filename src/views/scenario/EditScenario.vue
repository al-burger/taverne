<script setup lang="ts">
import { useScenarioStore } from "../../store/modules/scenario";
import { onMounted, ref } from "vue";
import {
  AddItems,
  AddPnj,
  AddMonsters,
} from "../../components/scenario/itemSelect";
import ScenarioLayer from "../../components/scenario/ScenarioLayer.vue";

const scenarioStore = useScenarioStore();
const currentStep = ref<any>({ monsters: [], pnj: [] });
const isLayerOpened = ref<boolean>(false);
const dataToDisplay = ref<any>({});

const showStep = (step: Object) => {
  currentStep.value = step;
};

const addPnj = (pnj: any) => {
  currentStep.value.pnj.push(...pnj);
};

const addItems = (items: any) => {
  currentStep.value.items.push(...items);
};

const addMonsters = (monsters: any) => {
  currentStep.value.monsters.push(...monsters);
};

const getItemStats = (item: Object) => {
  openLayer(item);
};

const getPnjStats = (pnj: any) => {
  openLayer(pnj);
};

const getMonsterStats = (monster: any) => {
  openLayer(monster);
};

const openLayer = (data: any) => {
  dataToDisplay.value = data;
  isLayerOpened.value = true;
}

const closeLayer = () => {
  isLayerOpened.value = false;
}

onMounted(() => {
  scenarioStore.fetchMonsters();
  scenarioStore.fetchItems();
});
</script>
<template>
  <v-navigation-drawer color="grey-darken-2" permanent name="drawer">
    <v-list :lines="false" nav>
      <v-list-item
        v-for="(item, i) in scenarioStore._scenarioToEdit.steps"
        :key="i"
        :value="item"
        color="primary"
        @click="showStep(item)"
      >
        <v-list-item-title v-text="item.name"></v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-main class="pl-0 mt-8">
    <template v-if="currentStep">
      <div>
        <AddMonsters
          :currentStep="currentStep.monsters"
          @emitMonsters="addMonsters"
          @emitMonsterStats="getMonsterStats"
        />
      </div>
      <div>
        <AddPnj
          :currentStep="currentStep.pnj"
          @emitPnj="addPnj"
          @emitPnjStats="getPnjStats"
        />
      </div>
      <div>
        <AddItems
          :currentStep="currentStep.items"
          @emitItems="addItems"
          @emitItemStats="getItemStats"
        />
      </div>
      <ScenarioLayer :isLayerOpened="isLayerOpened" :data="dataToDisplay" @closeLayer="closeLayer" />
    </template>
  </v-main>
</template>
