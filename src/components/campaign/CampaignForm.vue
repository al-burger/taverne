
<script setup>
import { ref } from 'vue';
import CampaignGameSelector from './CampaignGameSelector.vue';
import PlayerList from '../player/PlayerList.vue';

const campaignName = ref('');
const players = ref('');
const games = ['Donjon & Dragon', 'Cthulhu'];
const selectedGame = ref(null);

function updateGame(newSelectedGame) {
    selectedGame.value = newSelectedGame;
}

function createCampaign() {
  console.log('Campagne créée :', campaignName.value);
  console.log('Joueurs :', players.value);
  console.log('Jeu sélectionné :', selectedGame.value);
}
</script>

<template>
  <div>
    <form @submit.prevent="createCampaign" class="bg-white p-6 rounded shadow">
      <div class="mb-4">
        <label for="campaignName" class="block text-gray-600 text-sm font-medium mb-2">Nom de la campagne</label>
        <input
          v-model="campaignName"
          type="text"
          id="campaignName"
          name="campaignName"
          placeholder="Entrez le nom de la campagne"
          class="border rounded w-full py-2 px-3 text-white focus:outline-none focus:border-blue-500"
        />
      </div>

      <div class="mb-4">
        <PlayerList />
      </div>

      <div class="mb-4">
        <label for="selectedGame" class="block text-gray-600 text-sm font-medium mb-2">Sélectionner le jeu</label>
        <CampaignGameSelector :games="games" @update:games="updateGame" />
      </div>

      <div class="mt-6">
        <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none">
          Créer la campagne
        </button>
      </div>
    </form>
  </div>
</template>
