
<script setup>
import { ref } from 'vue'

const props = defineProps(['games'])
const selectedGame = ref(null);
const emit = defineEmits(['update:games'])
function emitSelectedGame() {
  emit('update:games', selectedGame.value);
}

</script>
  
<template>
  <div>
    <select v-model="selectedGame" id="gameSelect" @change="emitSelectedGame" class="border rounded w-full py-2 px-3 text-white">
      <option v-for="game in games" :key="game" class="text-white">{{ game }}</option>
    </select>
  </div>
</template>
  
