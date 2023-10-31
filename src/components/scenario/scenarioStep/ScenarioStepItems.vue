<script setup lang="ts">
import { useScenarioStore } from "../../../store/modules/scenario";
import { AddItems } from "../itemSelect";
const scenarioStore = useScenarioStore();

const removeItem = async (index: number) => {
  scenarioStore.removeItemFromStep(index);
};
</script>
<template>
  <v-card>
    <v-toolbar color="secondary">
      <v-toolbar-title>Items</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn variant="text" icon="mdi-plus"></v-btn>
    </v-toolbar>

    <v-list>
      <v-list-item
        v-for="(item, index) in scenarioStore.activeStep?.items"
        :key="index"
        :title="item"
        :class="'text-left'"
      >
        <template v-slot:append>
          <v-btn
            color="info"
            icon="mdi-information"
            variant="text"
          ></v-btn>
          <v-btn color="red" icon="mdi-delete" variant="text" @click="removeItem(index)"></v-btn>
        </template>
      </v-list-item>
      <v-list-item>
        <AddItems />
      </v-list-item>
    </v-list>
  </v-card>
</template>
