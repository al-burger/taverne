<template>
    <v-card class="info-card">
      <v-card-title>Informations Personnelles</v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="4">
            <v-row>
              <v-col cols="12">
                <strong>CA:</strong>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-chip class="info-chip">{{ informations.ca }}</v-chip>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row>
              <v-col cols="12">
                <strong>HP:</strong>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-chip class="info-chip">{{ informations.hp }}</v-chip>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="4">
            <v-row>
              <v-col cols="12">
                <strong>Vitesse:</strong>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-chip class="info-chip">{{ informations.vitesse }}</v-chip>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  
  const informations = ref({
    ca: 15,
    hp: 45,
    vitesse: "30 ft",
  });
  </script>
  
  <style scoped>
  .info-card {
    border: 2px solid #607D8B;
    background-color: #ECEFF1;
    margin: 8px;
  }
  
  .info-chip {
    background-color: #FFFFFF;
    margin: auto;
    border: 2px solid #607D8B;
    padding: 8px;
  }
  </style>
  