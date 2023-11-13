<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useScenarioStore } from "@/store/modules/scenario";

const scenarioStore = useScenarioStore();
const description = ref<string>("");
const emit = defineEmits(["toggleEditMode"]);

const addSummary = () => {
  scenarioStore.addSummaryToStep(description.value)
  cancelEditing();
};

const cancelEditing = () => {
  emit("toggleEditMode", false);
}

onMounted(() => {
  if (scenarioStore.activeStep?.summary) {
    description.value = scenarioStore.activeStep?.summary;
  }
});
</script>

<template>
  <div class="pb-8">
    <v-textarea
      id="campaignName"
      v-model="description"
      label="Enter a description of the current act"
    ></v-textarea>
    <v-btn color="primary" variant="outlined" @click="cancelEditing" class="mr-4">Cancel</v-btn>
    <v-btn color="primary" @click="addSummary">Add</v-btn>
  </div>
</template>
