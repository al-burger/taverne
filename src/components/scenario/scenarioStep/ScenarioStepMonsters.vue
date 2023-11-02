<script setup lang="ts">
import { ref } from "vue";
import { useScenarioStore } from "../../../store/modules/scenario";
import AddMonsters from "../itemSelect/AddMonsters.vue";
const scenarioStore = useScenarioStore();
const removeMonsters = (index: number) => {
  scenarioStore.removeMonsterFromStep(index);
};
const panel = ref([0]);
</script>
<template>
  <v-expansion-panels v-model="panel" class="pb-4">
    <v-expansion-panel expand>
      <v-expansion-panel-title color="secondary">
        Monsters
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-list lines="two">
          <v-list-item
            v-for="(monster, index) in scenarioStore.activeStep?.monsters"
            :key="index"
            :title="monster"
            :subtitle="monster.name"
            :class="'text-left'"
          >
            <template v-slot:append>
              <v-btn color="info" icon="mdi-information" variant="text"></v-btn>
              <v-btn
                color="red"
                icon="mdi-delete"
                variant="text"
                @click="removeMonsters(index)"
              ></v-btn>
            </template>
          </v-list-item>
          <v-list-item>
            <AddMonsters />
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
