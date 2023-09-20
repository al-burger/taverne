<template>
  <v-main class="wrapper d-flex align-center text-center justify-center pt-0 grainy-background flex-column">
    <div class="ma-auto">
      <h1 class="text-h3 font-weight-bold">Bienvenue dans la Taverne du Maître de Jeu</h1>
      <v-row class="mt-8">
        <v-col cols="6">
          <router-link to="/create-campaign">
            <v-card class="rounded-lg shadow-lg d-flex align-center" style="background-color: #f2be75;">
              <h2 class="text-h4 font-weight-bold text-center mb-2">Créer une campagne</h2>
            </v-card>
          </router-link>
        </v-col>

        <v-col cols="6">
          <router-link to="/resume-campaign">
            <v-card class="rounded-lg shadow-lg d-flex align-center" style="background-color: #e16d64;">
              <h2 class="text-h4 font-weight-bold text-center mb-2">Reprendre une campagne</h2>
            </v-card>
          </router-link>
        </v-col>
      </v-row>
    </div>

  </v-main>
</template>

<style scoped>
.v-card {
  height:25rem;
  text-align: center;
}

h2 {
  margin: 0 auto ;
}

a {
  text-decoration: none;
}
</style>
