<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useScenarioStore } from "@/store/modules/scenario";
import AddSummary from "../itemSelect/AddSummary.vue";
const scenarioStore = useScenarioStore();
const panel = ref([0]);
const hasSummary = computed<any>(() => scenarioStore.activeStep?.summary?.length);
const editSummary = () => {
  isEditing.value = true;
};
const isEditing = ref<boolean>(true);
const toggleEditMode = (value: boolean) => {
  isEditing.value = value;
}
onMounted(() => {
  if (hasSummary) {
    isEditing.value = false;
  }
});
</script>
<template>
  <v-expansion-panels v-model="panel">
    <v-expansion-panel expand>
      <v-expansion-panel-title color="secondary">
        Summary
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-card v-if="!isEditing">
          <v-card-item>
            <v-row align="center" no-gutters>
              <v-col cols="11"
                ><p class="text-left">{{ scenarioStore.activeStep?.summary }}</p></v-col
              >
              <v-col cols="1" class="text-right">
                <v-btn
                  variant="text"
                  icon="mdi-pencil"
                  color="blue-lighten-2"
                  @click="editSummary"
                ></v-btn>
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>
        <AddSummary v-else @toggle-edit-mode="toggleEditMode" />
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
