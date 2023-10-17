<template>
  <form
    @submit.prevent="createCampaignName"
    class="rounded shadow elevation-4 pa-8 bg-card"
  >
    <v-overlay v-model="loader" contained class="align-center justify-center" persistent>
      <v-progress-circular
        indeterminate
        color="primary"
      ></v-progress-circular> </v-overlay
    >
    <v-card-title>Register</v-card-title>
    <v-alert v-if="error" type="error">{{ error }}</v-alert>
    <v-form @submit.prevent="register">
      <v-row>
        <v-col cols="4" class="text-right">
          <label for="name">Name</label>
        </v-col>
        <v-col cols="6">
          <v-text-field
            id="name"
            v-model="name"
            required
            autofocus
          ></v-text-field>
        </v-col>
      </v-row>

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
        <v-col cols="8" offset-cols="4">
          <v-btn type="submit" color="primary">Register</v-btn>
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
const loader = ref(false);
const name = ref("");
const email = ref("");
const password = ref("");
const error = ref(null);

const register = async () => {
  loader.value = true;
  try {
    await loginStore.register(email.value, password.value);
    loader.value = false;
    router.push({ name: "Home" });
  } catch (err) {
    console.log(err);
    error.value = err.message;
    loader.value = false;
  }
};
</script>
