<script setup lang="ts">
import { ref } from "vue";
import { useScenarioStore } from "@/store/modules/scenario";
import { AddItems } from "../itemSelect";
const scenarioStore = useScenarioStore();

const removeItem = async (index: number) => {
  scenarioStore.removeItemFromStep(index);
};
const panel = ref([0]);
</script>
<template>
  <v-expansion-panels v-model="panel" class="pb-4">
    <v-expansion-panel expand>
      <v-expansion-panel-title color="secondary">
        Items
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-list>
          <v-list-item
            v-for="(item, index) in scenarioStore.activeStep?.items"
            :key="index"
            :title="item"
            :class="'text-left'"
          >
            <template v-slot:append>
              <v-btn color="info" icon="mdi-information" variant="text"></v-btn>
              <v-btn
                color="red"
                icon="mdi-delete"
                variant="text"
                @click="removeItem(index)"
              ></v-btn>
            </template>
          </v-list-item>
          <v-list-item>
            <AddItems />
          </v-list-item>
        </v-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
