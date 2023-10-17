<template>
  <form @submit.prevent="login" class="rounded shadow elevation-4 pa-8 bg-card">
    <v-card-title>Login</v-card-title>
    <v-alert v-if="error" type="error">{{ error }}</v-alert>
    <v-row>
      <v-col cols="4" class="text-right">
        <label for="email">Email</label>
      </v-col>
      <v-col cols="6">
        <v-text-field
          id="email"
          v-model="email"
          required
          autofocus
          type="email"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4" class="text-right">
        <label for="password">Password</label>
      </v-col>
      <v-col cols="6">
        <v-text-field
          id="password"
          v-model="password"
          required
          type="password"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="8" offset-cols="4" class="ma-auto">
        <div class="d-flex justify-space-around">
          <router-link to="/register">
            <v-btn color="primary" variant="outlined"
              >Créer un compte</v-btn
            ></router-link
          >
          <v-btn type="submit" color="primary">Se connecter</v-btn>
        </div>
      </v-col>
    </v-row>
  </form>
</template>

<script setup lang="ts">
import { useAuthStore } from "../../store/modules/auth";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const loginStore = useAuthStore();

const email = ref<string>("");
const password = ref<string>("");
const error = ref<string>("");

// Méthode pour effectuer la connexion
const login = async () => {
  // Effectuez votre logique de connexion ici
  await loginStore.login(email.value, password.value);
  router.push({ name: 'Home' });
};
</script>
