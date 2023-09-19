<script setup>
</script>

<template>
  <v-layout class="rounded fill-height" fill-height>
    <v-app-bar :color="'#f5f0e6'">
      <v-toolbar-title>
        <router-link to="/">Taverne</router-link>
      </v-toolbar-title>
    </v-app-bar>

    <router-view></router-view>
  </v-layout>
</template>

<style scoped>
</style>
