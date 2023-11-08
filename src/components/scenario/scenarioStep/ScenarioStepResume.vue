<script setup lang="ts">
import { ref } from "vue";
const panel = ref([0]);
</script>
<template>
  <v-expansion-panels v-model="panel">
    <v-expansion-panel expand>
      <v-expansion-panel-title color="secondary">
        Resume
      </v-expansion-panel-title>
      <v-expansion-panel-text>
        <v-card>
          <v-card-item>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </v-card-item>
        </v-card>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
