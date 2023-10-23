<script setup lang="ts">
import { ref, defineProps, watch } from "vue";

const props = defineProps({
  isActive: Boolean,
  player: String,
});

const drawerOpen = ref(props.isActive);

const emit = defineEmits(["closeLayer"]);

watch(
  () => props.isActive,
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
  <v-navigation-drawer width="500" v-model="drawerOpen" temporary right>
    <v-card title="Dialog">
      <v-card-text> player : {{ props.player }} </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn text="Close Dialog" @click="closeLayer"></v-btn>
      </v-card-actions>
    </v-card>
  </v-navigation-drawer>
</template>
