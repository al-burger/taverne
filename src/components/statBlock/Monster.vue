<script setup lang="ts">
import { useScenarioStore } from "../../store/modules/scenario";
import { onMounted, ref } from "vue";
const props = defineProps({
  monster: String,
});
const scenarioStore = useScenarioStore();
const monsterStats = ref<any>({});

onMounted(async () => {
  const monster = props.monster ?? "";
  const monsterLowerCase = monster.toLowerCase().replace(/\s/g, "-");
  monsterStats.value = await scenarioStore.fetchMonsterStats(monsterLowerCase);
});
</script>

<template>
  <v-card class="monster-stats" v-if="monsterStats.data">
    <v-card-title class="monster-header">
      <v-row>
        <v-col>
          <h2 class="monster-name">{{ monsterStats.data.name }}</h2>
          <p class="monster-type">{{ monsterStats.data.type }}</p>
        </v-col>
      </v-row>
    </v-card-title>
    <v-card-text class="stat-block">
      <v-row>
        <v-col>
          <v-row class="stat-line">
            <v-col cols="6" class="stat-label"> Classe d'Armure </v-col>
            <v-col cols="6" class="stat-value">
              {{ monsterStats.data.armor_class[0].value }}
            </v-col>
          </v-row>
          <v-row class="stat-line">
            <v-col cols="6" class="stat-label"> Points de Vie </v-col>
            <v-col cols="6" class="stat-value">
              {{ monsterStats.data.hit_points }}
            </v-col>
          </v-row>
          <v-row class="stat-line">
            <v-col cols="6" class="stat-label"> Vitesse </v-col>
            <v-col cols="6" class="stat-value">
              {{ monsterStats.data.speed.walk }}
            </v-col>
          </v-row>
          <v-row class="abilities">
            <v-col cols="4">
              <v-row class="ability">
                <v-col cols="12" class="ability-name"> Force </v-col>
                <v-col cols="12" class="ability-value">
                  {{  monsterStats.data.strength }}
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4">
              <v-row class="ability">
                <v-col cols="12" class="ability-name"> Dextérité </v-col>
                <v-col cols="12" class="ability-value">
                  {{ monsterStats.data.dexterity }}
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4">
              <v-row class="ability">
                <v-col cols="12" class="ability-name"> Constitution </v-col>
                <v-col cols="12" class="ability-value">
                  {{ monsterStats.data.constitution }}
                </v-col>
              </v-row>
            </v-col>
          </v-row>
          <v-row class="abilities">
            <v-col cols="4">
              <v-row class="ability">
                <v-col cols="12" class="ability-name"> Intelligence </v-col>
                <v-col cols="12" class="ability-value">
                  {{ monsterStats.data.intelligence }}
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4">
              <v-row class="ability">
                <v-col cols="12" class="ability-name"> Sagesse </v-col>
                <v-col cols="12" class="ability-value">
                  {{ monsterStats.data.wisdom }}
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="4">
              <v-row class="ability">
                <v-col cols="12" class="ability-name"> Charisme </v-col>
                <v-col cols="12" class="ability-value">
                  {{ monsterStats.data.charisma }}
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-text class="monster-traits">
      <h3 class="section-title">Traits</h3>
      <div v-for="action in monsterStats.data.special_abilities">
        <h4>{{ action.name }} :</h4>
        <p>{{ action.desc }}</p>
      </div>
    </v-card-text>
    <v-card-text class="monster-actions">
      <h3 class="section-title">Actions</h3>
      <div v-for="action in monsterStats.data.actions">
        <h4>{{ action.name }} :</h4>
        <p>{{ action.desc }}</p>
      </div>
    </v-card-text>
    <v-card-text class="monster-legendary-actions">
      <h3 class="section-title">Actions Légendaires</h3>
      <div v-for="action in monsterStats.data.legendary_actions">
        <h4>{{ action.name }} :</h4>
        <p>{{ action.desc }}</p>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>
.monster-stats {
  border: 2px solid #a38a63;
  border-radius: 5px;
  background-color: #f7e4b9;
  margin: 10px;
  text-align: left;
  font-family: "serif";
  color: #000;
  width: 50%;
}

.monster-header {
  background-color: #a38a63;
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.monster-name {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  color: #fff;
}

.monster-type {
  font-style: italic;
  margin: 0;
  color: #fff;
}

.stat-block {
  padding: 10px;
}

.stat-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
}

.stat-label {
  font-weight: bold;
}

.abilities {
  display: flex;
  justify-content: space-between;
}

.ability {
  flex: 1;
  text-align: center;
  background-color: #f0e6cf;
  border: 1px solid #a38a63;
  padding: 5px;
}

.ability-name {
  font-weight: bold;
}

.section-title {
  background-color: #a38a63;
  color: #fff;
  padding: 5px;
  margin: 10px 0;
}
</style>
