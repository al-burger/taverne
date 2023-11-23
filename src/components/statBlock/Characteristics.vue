<template>
  <v-container>
    <v-row>
      <v-col
        v-for="characteristic in characteristics"
        :key="characteristic.index"
        cols="12"
        md="4"
      >
        <v-card class="carac-card">
          <v-row>
            <v-col cols="12" class="text-center">
              <v-row>
                <v-col cols="12" class="carac-label">
                  {{ characteristic.name }}
                </v-col>
              </v-row>
              <v-row class="carac-header">
                <v-col cols="12">
                  + {{ calculerModificateur(characteristic.value) }}
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6" class="carac-content">
                  <template v-if="characteristic.value">{{ characteristic.value }}</template>
                  <template v-else>10</template>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.carac-card {
  border: 2px solid #607d8b; /* Bordure de la carte */
  background-color: #eceff1; /* Couleur de fond de l'en-tête */
  margin: 8px; /* Marge autour de la carte */
}

.carac-label {
  background-color: #607d8b; /* Couleur de fond de l'étiquette */
  color: #ffffff; /* Couleur du texte de l'étiquette */
  padding: 8px;
}

.carac-header {
  padding: 8px;
}

.carac-content {
  background-color: #ffffff; /* Couleur de fond de l'étiquette */
  margin: auto;
  border: 2px solid #607d8b; /* Bordure de la carte */
  padding: 8px;
}
</style>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps({
  characteristics: {
    type: Object,
    required: true,
  },
});

const calculerModificateur = (value: any) => {
  if (!value) {
    value = 10;
  }
  return Math.floor((value - 10) / 2);
};
</script>
