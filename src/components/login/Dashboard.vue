<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="8">
        <v-card>
          <v-card v-if="user.loggedIn">
            <v-card-title>Welcome, {{ user.data.displayName }}</v-card-title>
            <v-card-text>
              <v-alert type="success">You are logged in!</v-alert>
              <div class="my-4">
                <v-btn @click="signOut" color="primary">Log Out</v-btn>
              </div>
            </v-card-text>
          </v-card>
          <v-card v-else>
            <v-alert type="error">You are not logged in!</v-alert>
          </v-card>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useRouter } from "vue-router";
import { computed } from "vue";
import { useAuthStore } from "../../store/modules/auth";

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    auth.onAuthStateChanged((user) => {
      authStore.fetchuser(user);
    });

    const user = computed(() => {
      return authStore.user;
    });

    const signOut = async () => {
      authStore.logout();
    };

    return { user, signOut };
  },
};
</script>
