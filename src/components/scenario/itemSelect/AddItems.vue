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
</script>

<template>
    <v-autocomplete
      label="Select"
      v-model="autocompleteItems"
      :items="scenarioStore._items"
      itemValue="index"
      itemTitle="name"
      multiple
    >
      <template v-slot:append>
        <v-btn @click="addItems" color="primary">add</v-btn>
      </template>
    </v-autocomplete>
</template>
