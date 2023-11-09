<script setup lang="ts">
import { ref, defineProps, watch } from "vue";

const props = defineProps({
  isLayerOpened: Boolean,
  npc: {
    type: Object,
    required: true,
  },
});

const drawerOpen = ref(props.isLayerOpened);

const emit = defineEmits(["closeLayer"]);

watch(
  () => props.isLayerOpened,
  (newIsActive) => {
    drawerOpen.value = newIsActive;
  }
);

const closeLayer = () => {
  if (drawerOpen.value == false) {
    emit("closeLayer", drawerOpen.value);
  }
  drawerOpen.value = false;
  emit("closeLayer", drawerOpen.value);
};

</script>
<template>
  <v-navigation-drawer
    width="700"
    v-model="drawerOpen"
    @update:modelValue="closeLayer"
    temporary
    location="right"
  >
  <div class="mt-8">

  </div>
    <div>{{ npc.name }}</div>
    <div>Appearance : {{ npc.appearance }}</div>
    <div>location : {{ npc.location }}</div>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn text="Close Dialog" @click="closeLayer"></v-btn>
    </v-card-actions>
  </v-navigation-drawer>
</template>
