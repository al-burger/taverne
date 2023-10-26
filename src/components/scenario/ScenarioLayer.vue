<script setup lang="ts">
import { ref, defineProps, watch } from "vue";

const props = defineProps({
  isLayerOpened: Boolean,
  data: Object
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
  drawerOpen.value = false;
  emit("closeLayer", drawerOpen.value);
};

</script>
<template>
  <v-navigation-drawer width="500" v-model="drawerOpen" temporary location="right">
    <v-card title="Dialog">
      <v-card-text> {{ data }} </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Close Dialog" @click="closeLayer"></v-btn>
      </v-card-actions>
    </v-card>
  </v-navigation-drawer>
</template>
