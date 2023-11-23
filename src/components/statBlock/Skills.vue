<template>
  <v-card class="skills-card">
    <v-card-title>Compétences</v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          v-for="skill in skills"
          :key="skill.index"
          cols="12"
          md="6"
          lg="6"
        >
          <v-row>
            <v-col cols="6">
              <strong>{{ skill.name }}</strong>
            </v-col>
            <v-col cols="6">
              <v-chip class="skill-chip"
                ><template v-if="skill.value">{{ skill.value }}</template
                ><template v-else>0</template></v-chip
              >
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  skills: {
    type: Object,
    required: true,
  },
});

const competences = ref({
  Acrobaties: 4,
  Arcanes: 2,
  Athlétisme: 5,
  Discrétion: 3,
  Dressage: 1,
  Escamotage: 6,
  Histoire: 2,
  Intimidation: 4,
  Investigation: 2,
  Médecine: 1,
  Nature: 2,
  Perception: 3,
  Perspicacité: 3,
  Persuasion: 4,
  Religion: 2,
  Représentation: 1,
  Survie: 1,
});
</script>

<style scoped>
.skills-card {
  border: 2px solid #607d8b;
  background-color: #eceff1;
  margin: 8px;
}

.skill-chip {
  background-color: #ffffff;
  margin: auto;
  border: 2px solid #607d8b;
  padding: 8px;
}
</style>
