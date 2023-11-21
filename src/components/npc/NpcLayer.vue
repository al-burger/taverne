<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";
import NpcInfoField from "./NpcInfoField.vue"; // Assure-toi d'ajuster le chemin selon ta structure de dossier

const props = defineProps({
  isLayerOpened: Boolean,
  npc: {
    type: Object,
    required: true,
  },
});

const drawerOpen = ref(props.isLayerOpened);

const emit = defineEmits(["closeLayer", "update:npc"]);

const closeLayer = () => {
  if (!drawerOpen.value) {
    emit("closeLayer", drawerOpen.value);
  }
  drawerOpen.value = false;
  emit("closeLayer", drawerOpen.value);
};
const setNpcTitle = (value: string) => {
  props.npc.title = value;
};

const setNpcDescription = (value: string) => {
  props.npc.description = value;
};

const setNpcLocation = (value: string) => {
  props.npc.location = value;
};

const saveNpc = () => {
  emit("update:npc", props.npc)
};

watch(
  () => props.isLayerOpened,
  (newIsActive) => {
    drawerOpen.value = newIsActive;
  }
);
</script>
<template>
  <v-navigation-drawer
    width="700"
    v-model="drawerOpen"
    @update:modelValue="closeLayer"
    temporary
    location="right"
  >
    <v-container fluid>
      <v-row>
        <v-col>
          <v-card-title>{{ npc.name }}</v-card-title>
          <v-card-text>
            <NpcInfoField label="Title" @update:value="setNpcTitle" />
            <NpcInfoField label="Location" @update:value="setNpcLocation" />
            <NpcInfoField
              label="Description"
              v-model="npc.description"
              @update:value="setNpcDescription"
              textArea
            />
          </v-card-text>
          <v-btn color="primary" variant="outlined" @click="closeLayer"
            >Close</v-btn
          >
          <v-btn color="primary" @click="saveNpc">Save</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>

<style scoped>
/* Ajoute tes styles ici si nécessaire */
</style>
