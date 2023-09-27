<template>
  <form
    @submit.prevent="createCampaignName"
    class="rounded shadow elevation-4 pa-8 bg-card"
  >
    <v-card-title>Login</v-card-title>
    <v-alert v-if="error" type="error">{{ error }}</v-alert>
    <v-form @submit.prevent="login">
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
    </v-form>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../../store/modules/auth";
import { useRouter } from "vue-router";

const loginStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const error = ref(null);

const login = async () => {
  try {
    console.log(email.value, password.value);
    await loginStore.login(email.value, password.value);
  } catch (err) {
    error.value = err.message;
  }
};
</script>
