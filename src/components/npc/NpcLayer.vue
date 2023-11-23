<script setup lang="ts">
import { ref, defineProps, defineEmits, watch } from "vue";
import NpcInfoField from "./NpcInfoField.vue";
import ButtonsBloc from "@/components/common/ButtonsBloc.vue";

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
  emit("update:npc", props.npc);
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
    <v-container v-if="drawerOpen" fluid>
      <v-row>
        <v-col>
          <v-card-title>{{ npc.name }}</v-card-title>
          <v-card-text>
            <NpcInfoField
              label="Title"
              :value="npc.title"
              @update:value="setNpcTitle"
            />
            <NpcInfoField
              label="Location"
              :value="npc.location"
              @update:value="setNpcLocation"
            />
            <NpcInfoField
              label="Description"
              :value="npc.description"
              @update:value="setNpcDescription"
              textArea
            />
          </v-card-text>
          <buttons-bloc
            left-button-text="Close"
            right-button-text="Save"
            @left-click="closeLayer"
            @right-click="saveNpc"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>