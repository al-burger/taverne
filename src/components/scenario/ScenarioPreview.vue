<script setup lang="ts">
import { useScenarioStore } from "../../store/modules/scenario";
import { useRouter } from "vue-router";

const scenarioStore = useScenarioStore();
const router = useRouter();

const props = defineProps({
  scenario: Object,
});

const emitRemovePlayer = (index: number) => {
  playerStore.removePlayer(index);
}

const editScenario = () => {
  scenarioStore.setScenarioToEdit(props.scenario);
  router.push({
    name: "Scenario",
    params: { scenarioName: props.scenario.name },
  });
}
</script>

<template>
  <div class="d-flex justify-space-between py-2">
    <span class="ma-auto ml-0">{{ props.scenario.name }}</span>
    <div>
      <v-btn @click="addPlayer" color="primary" variant="outlined" class="ml-2">
        Supprimer
      </v-btn>
      <v-btn @click="editScenario" color="primary" class="ml-2">
        Modifier
      </v-btn>
    </div>
  </div>
</template>
