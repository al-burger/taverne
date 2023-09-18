<script setup>
const props = defineProps(['players'])
const emit = defineEmits(['removePlayer', 'editPlayer'])

function emitEditedPlayer(index) {
    console.log(index);
    emit('editPlayer', index);
}

function emitRemovedPlayer(index) {
    emit('removePlayer', index);
}
</script>

<template>
    <!-- Liste des joueurs sous forme de badges -->
    <div v-for="(player, index) in players" :key="index" class="cursor-pointer bg-gray-400  mr-2  hover:bg-gray-300">
        <div @click.prevent="emitEditedPlayer(index)" class="inline-flex items-center p-2">
            <span>{{ player.name }}</span>
        </div>
        <span @click.prevent="emitRemovedPlayer(index)"
            class="text-red-600 p-2 inline-flex items-center">&times;</span>
    </div>
</template>