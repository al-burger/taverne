<script setup lang="ts">
import { computed, ref } from "vue";
import { useScenarioStore } from "@/store/modules/scenario";
import { TimelineItem } from "@/types/appTypes";

const scenarioStore = useScenarioStore();
const timelineItem = ref<TimelineItem>({
  title: "",
  description: "",
});
const showTimelineItem = ref<boolean>(false);

const addTimelineItemsToStep = () => {
  // Créez une copie de l'objet timelineItem avant de l'ajouter
  const newItem = { ...timelineItem.value };
  scenarioStore.addTimelineItemToStep(newItem);
};

const showTimelineItemHandler = () => {
  showTimelineItem.value = !showTimelineItem.value;
};

const isAddButtonDisabled = computed<boolean>(() => {
  return !(timelineItem.value.title.length && timelineItem.value.description.length);
});
</script>

<template>
  <v-card v-if="showTimelineItem">
      <v-card-title :class="['text-h6', 'bg-primary']">
        <v-text-field
          id="storycard-title"
          v-model="timelineItem.title"
          label="Title"
        ></v-text-field>
      </v-card-title>
      <v-card-text class="bg-white text--primary">
        <v-text-field
          id="storycard-description"
          v-model="timelineItem.description"
          label="Description"
        ></v-text-field>
        <v-btn variant="outlined" @click="showTimelineItemHandler"
          >Cancel</v-btn
        >
        <v-btn
          class="ml-2"
          color="primary"
          @click="addTimelineItemsToStep"
          :disabled="isAddButtonDisabled"
          >Add</v-btn
        >
      </v-card-text>
  </v-card>
  <template v-else>
    <v-btn color="primary" @click="showTimelineItemHandler">Add</v-btn>
  </template>
</template>
