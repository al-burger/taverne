<script setup lang="ts">
import { PropType, ref } from "vue";
import { useScenarioStore } from "../../../store/modules/scenario";

const props = defineProps({
  currentStep: {
    type: Array as PropType<string[]>,
    required: true,
  },
});
const scenarioStore = useScenarioStore();
const autocompleteItems = ref<string[]>([]);
const emit = defineEmits(["emitItems", "emitItemStats"]);
const fetchItemStats = async (item: string) => {
  const itemStats = await scenarioStore.fetchItemStats(item);
  emit("emitItemStats", itemStats);
};

const addItems = () => {
  emit("emitItems", autocompleteItems.value);
};
</script>

<template>
  <div>
    <div v-for="item in props.currentStep">
      {{ item }} <button @click="fetchItemStats(item)">(?)</button>
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
