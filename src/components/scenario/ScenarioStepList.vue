<script setup lang="ts">
import { useScenarioStore } from "../../store/modules/scenario";
import { onMounted, ref } from "vue";

const scenarioStore = useScenarioStore();
const stepToAdd = ref<string>("");

const selectStep = (index: number) => {
  scenarioStore.setActiveStep(index);
};

const addStep = () => {
  scenarioStore.addStep(stepToAdd.value);
  stepToAdd.value = "";
};

onMounted(() => {
  selectStep(0);
});
</script>
<template>
  <v-navigation-drawer color="surface" width="300" permanent name="drawer">
    <v-list :lines="false" nav>
      <v-list-item
        v-for="(item, i) in scenarioStore._scenarioToEdit.steps"
        :key="i"
        :value="item"
        color="primary"
        :active="i === scenarioStore._activeStepIndex"
        @click="selectStep(i)"
      >
        <v-list-item-title v-text="item.name"></v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-text-field label="étape" v-model="stepToAdd">
          <template v-slot:append>
            <v-btn color="primary" @click="addStep">Add</v-btn>
          </template></v-text-field
        >
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
