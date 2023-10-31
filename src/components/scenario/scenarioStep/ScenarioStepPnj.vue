<script setup lang="ts">
import { ref } from "vue";
import { useScenarioStore } from "../../../store/modules/scenario";
import AddPnj from "../itemSelect/AddPnj.vue";
const scenarioStore = useScenarioStore();
const isAddEnabled = ref<boolean>(false);
const setIsAddEnabled = (value: boolean) => {
  isAddEnabled.value = !isAddEnabled.value;
}

const removePnj = (index: number) => {
  scenarioStore.removeNpcFromStep(index);
};

</script>
<template>
  <v-card>
    <v-toolbar color="secondary">
      <v-toolbar-title>NPC</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn variant="text" icon="mdi-plus" @click="setIsAddEnabled(true)"></v-btn>
    </v-toolbar>
    <v-list v-if="isAddEnabled" lines="two">
      <v-list-item
        v-for="(pnj, index) in scenarioStore.activeStep?.pnj"
        :key="index"
        :title="pnj.name"
        :subtitle="pnj.name"
        :class="'text-left'"
      >
        <template v-slot:append>
          <v-btn
            color="info"
            icon="mdi-information"
            variant="text"
          ></v-btn>
          <v-btn color="red" icon="mdi-delete" variant="text" @click="removePnj(index)"></v-btn>
        </template>
      </v-list-item>
      <v-list-item>
        <AddPnj />
      </v-list-item>
    </v-list>
  </v-card>
</template>
