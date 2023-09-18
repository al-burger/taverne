<template>
  <div>
    <h2 class="text-2xl text-gray-600 font-semibold mb-4">Gestion des Joueurs</h2>

    <!-- Formulaire pour ajouter un joueur -->
    <div class="mb-4 flex space-x-2">
      <input v-model="newPlayerName" type="text" placeholder="Nom du joueur"
        class="border rounded w-full py-2 px-3 text-white focus:outline-none focus:border-blue-500" />
      <button @click.prevent="addPlayer"
        class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none">
        Ajouter
      </button>
    </div>

    <!-- Liste des joueurs sous forme de badges -->
    <div class="flex">
      <PlayerBadge :players="players" @remove-player="removePlayer(index)" @edit-player="editPlayer(index)" />
    </div>

    <!-- Modale de modification de joueur -->
    <transition name="modal-fade" mode="out-in">
      <div v-if="isEditing" class="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
        <div class="bg-white w-1/3 h-full transform translate-x-full transition-transform ease-in-out duration-300">
          <PlayerLayer :player="selectedPlayer" @close="closePlayerLayer" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import PlayerBadge from './PlayerBadge.vue';
import PlayerLayer from './PlayerLayer.vue';

const newPlayerName = ref('');
const isEditing = ref(false);
const players = reactive([]);
const selectedPlayer = ref(null);

function addPlayer() {
  if (newPlayerName.value.trim() !== '') {
    players.push({ name: newPlayerName.value });
    newPlayerName.value = '';
  }
}

function removePlayer(index) {
  console.log('index', index);
  players.splice(index, 1);
}

function editPlayer(index) {
  console.log(index);
  selectedPlayer.value = players[index];
  isEditing.value = true;
}

function closePlayerLayer() {
  isEditing.value = false;
  selectedPlayer.value = null;
}

</script>
