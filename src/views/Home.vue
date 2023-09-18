<template>
    <div class="home">
      <h1 class="text-3xl font-semibold">Bienvenue dans la Taverne du Maître de Jeu</h1>
      <div class="grid grid-cols-2 gap-4 mt-8">
        <div class="bg-white rounded-lg shadow-lg p-6">
          <img src="create-image.png" alt="Créer une campagne" class="w-16 h-16 mx-auto mb-4" />
          <h2 class="text-xl font-semibold text-center mb-2">Créer une campagne</h2>
          <p class="text-gray-600 text-center">Commencez une nouvelle aventure.</p>
          <router-link to="/create-campaign" class="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full block mx-auto text-center">Créer</router-link>
        </div>
  
        <div class="bg-white rounded-lg shadow-lg p-6">
          <img src="edit-image.png" alt="Reprendre une campagne" class="w-16 h-16 mx-auto mb-4" />
          <h2 class="text-xl font-semibold text-center mb-2">Reprendre une campagne</h2>
          <p class="text-gray-600 text-center">Continuez une aventure en cours.</p>
          <router-link to="/resume-campaign" class="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full block mx-auto text-center">Reprendre</router-link>
        </div>
      </div>
    </div>
  </template>