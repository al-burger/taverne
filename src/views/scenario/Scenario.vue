<script setup lang="ts">
import { ref } from "vue";
import ScenarioStepEditor from "../../components/scenario/ScenarioStepEditor.vue";
import ScenarioStepList from "../../components/scenario/ScenarioStepList.vue";
const currentStep = ref<any>({});

const setCurrentStep = (step: Object) => {
  currentStep.value = step;
};
</script>
<template>
  <ScenarioStepList @emitCurrentStep="setCurrentStep"/>
  <ScenarioStepEditor :currentStep="currentStep" />
</template>
