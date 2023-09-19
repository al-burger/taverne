<template>
  <div class="home">
    <h1 class="text-h3 font-weight-bold">Bienvenue dans la Taverne du Maître de Jeu</h1>
    <v-row class="mt-8">
      <v-col cols="6">
        <v-card class="rounded-lg shadow-lg">
          <v-img src="create-image.png" alt="Créer une campagne" class="w-16 h-16 mx-auto mb-4"></v-img>
          <h2 class="text-h4 font-weight-bold text-center mb-2">Créer une campagne</h2>
          <p class="text--grey-600 text-center">Commencez une nouvelle aventure.</p>
          <router-link to="/create-campaign" class="mt-4">
            <v-btn color="blue" dark>
              Créer
            </v-btn>
          </router-link>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card class="rounded-lg shadow-lg">
          <v-img src="edit-image.png" alt="Reprendre une campagne" class="w-16 h-16 mx-auto mb-4"></v-img>
          <h2 class="text-h4 font-weight-bold text-center mb-2">Reprendre une campagne</h2>
          <p class="text--grey-600 text-center">Continuez une aventure en cours.</p>
          <router-link to="/resume-campaign" class="mt-4">
            <v-btn color="blue" dark>
              Reprendre
            </v-btn>
          </router-link>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>
