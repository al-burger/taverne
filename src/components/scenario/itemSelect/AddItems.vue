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
const emit = defineEmits(["emitItems", "emitItemStats", "emitItemToRemove"]);
const fetchItemStats = async (item: string) => {
  const itemStats = await scenarioStore.fetchItemStats(item);
  emit("emitItemStats", itemStats);
};

const addItems = () => {
  emit("emitItems", autocompleteItems.value);
};
const removeItem = async (index: number) => {
  emit("emitItemToRemove", index);
}
</script>

<template>
  <div>
    <div v-for="(item, index) in props.currentStep">
      {{ item }} <v-btn @click="fetchItemStats(item)">(?)</v-btn><v-btn @click="removeItem(index)">(x)</v-btn>
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
