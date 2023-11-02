<script setup lang="ts">
import { ref } from "vue";
import { useScenarioStore } from "../../../store/modules/scenario";
import AddNpc from "../itemSelect/AddNpc.vue";
const scenarioStore = useScenarioStore();
const isAddEnabled = ref<boolean>(false);
const panel = ref<number[]>([0]);
const removeNpc = (index: number) => {
  scenarioStore.removeNpcFromStep(index);
};
</script>
<template>
  <v-expansion-panels v-model="panel" class="pb-4">
    <v-expansion-panel expand>
      <v-expansion-panel-title color="secondary"> NPC </v-expansion-panel-title>
      <v-expansion-panel-text class="p-0">
        <v-list v-if="isAddEnabled" lines="two">
          <v-list-item
            v-for="(npc, index) in scenarioStore.activeStep?.npc"
            :key="index"
            :title="npc.name"
            :subtitle="npc.name"
            :class="'text-left'"
          >
            <template v-slot:append>
              <v-btn color="info" icon="mdi-information" variant="text"></v-btn>
              <v-btn
                color="red"
                icon="mdi-delete"
                variant="text"
                @click="removeNpc(index)"
              ></v-btn>
            </template>
          </v-list-item>
          <v-list-item>
            <AddNpc />
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
