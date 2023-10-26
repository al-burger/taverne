<script setup lang="ts">
import { ref } from "vue";
import { useScenarioStore } from "../../../store/modules/scenario";

const scenarioStore = useScenarioStore();
const autocompleteItems = ref<string[]>([]);
const emit = defineEmits(["emitItemStats"]);

const fetchItemStats = async (item: string) => {
  const itemStats = await scenarioStore.fetchItemStats(item);
  emit("emitItemStats", itemStats);
};

const addItems = () => {
  scenarioStore.addItemToStep(autocompleteItems.value);
  autocompleteItems.value = [];
};

const removeItem = async (index: number) => {
  scenarioStore.removeItemFromStep(index);
};
</script>

<template>
  <div>
    <div
      v-for="(item, index) in scenarioStore.activeStep?.items"
      class="text-right"
    >
      {{ item
      }}<v-btn variant="outlined" @click="removeItem(index)">Remove</v-btn
      ><v-btn @click="fetchItemStats(item)">(?)</v-btn>
    </div>
    <v-autocomplete
      label="Select"
      v-model="autocompleteItems"
      :items="scenarioStore._items"
      itemValue="index"
      itemTitle="name"
      multiple
    >
      <template v-slot:append>
        <v-btn @click="addItems">add</v-btn>
      </template>
    </v-autocomplete>
  </div>
</template>
