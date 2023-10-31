<script setup lang="ts">
import { useScenarioStore } from "../../../store/modules/scenario";
import AddMonsters from "../itemSelect/AddMonsters.vue";
const scenarioStore = useScenarioStore();
const removeMonsters = (index: number) => {
  scenarioStore.removeMonsterFromStep(index);
};
</script>
<template>
  <v-card>
    <v-toolbar color="secondary">
      <v-btn variant="text" icon="mdi-menu"></v-btn>
      <v-toolbar-title>Monsters</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn variant="text" icon="mdi-magnify"></v-btn>
      <v-btn variant="text" icon="mdi-view-module"></v-btn>
    </v-toolbar>
    <v-list lines="two">
      <v-list-item
        v-for="(monster, index) in scenarioStore.activeStep?.monsters"
        :key="index"
        :title="monster"
        :subtitle="monster.name"
        :class="'text-left'"
      >
        <template v-slot:append>
          <v-btn
            color="info"
            icon="mdi-information"
            variant="text"
          ></v-btn>
          <v-btn color="red" icon="mdi-delete" variant="text" @click="removeMonsters(index)"></v-btn>
        </template>
      </v-list-item>
      <v-list-item>
        <AddMonsters />
      </v-list-item>
    </v-list>
  </v-card>
</template>
