<script setup lang="ts">
import { ref } from "vue";

const messages = ref([
  {
    from: "You",
    message: `Sure, I'll see you later.`,
    time: "10:42am",
    color: "deep-purple-lighten-1",
  },
  {
    from: "John Doe",
    message: "Yeah, sure. Does 1:00pm work?",
    time: "10:37am",
    color: "green",
  },
  {
    from: "You",
    message: "Did you still want to grab lunch today?",
    time: "9:47am",
    color: "deep-purple-lighten-1",
  },
]);
</script>
<template>
  <v-card>
    <v-toolbar color="secondary">
      <v-btn variant="text" icon="mdi-menu"></v-btn>

      <v-toolbar-title>Story</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn variant="text" icon="mdi-magnify"></v-btn>

      <v-btn variant="text" icon="mdi-view-module"></v-btn>
    </v-toolbar>
    <v-card-text>
      <v-timeline density="compact" align="start">
        <v-timeline-item
          v-for="message in messages"
          :key="message.time"
          :dot-color="message.color"
          size="x-small"
        >
          <div class="mb-4">
            <div class="font-weight-normal">
              <strong>{{ message.from }}</strong> @{{ message.time }}
            </div>
            <div>{{ message.message }}</div>
          </div>
        </v-timeline-item>
      </v-timeline>
    </v-card-text>
  </v-card>
</template>
