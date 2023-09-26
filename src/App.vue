<script setup lang="ts">
</script>

<template>
  <v-layout class="rounded fill-height" fill-height>
    <v-app-bar :color="'#f5f0e6'">
      <v-toolbar-title>
        <router-link to="/">Taverne</router-link>
      </v-toolbar-title>
    </v-app-bar>
    <v-main class="wrapper d-flex align-center text-center justify-center pt-0 bg-background flex-column">
      <router-view></router-view>
    </v-main>
  </v-layout>
</template>

<style scoped>
</style>
