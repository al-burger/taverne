import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/store/modules/auth";
import Home from "@/views/Home.vue";
import Scenario from "@/views/scenario/Scenario.vue";
import CreateCampaign from "@/views/campaign/createCampaign.vue";
import EditCampaign from "@/views/campaign/EditCampaign.vue";
import CampaignForm from "@/components/campaign/CampaignForm.vue";
import PlayerStats from "@/components/player/PlayerStats.vue";
import CampaignEditor from "@/components/campaign/CampaignEditor.vue";
import CampaignList from "@/components/campaign/CampaignList.vue";
import Login from "@/components/login/Login.vue";
import Register from "@/components/login/Register.vue";
import Dashboard from "@/components/login/Dashboard.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/create-campaign",
    name: "CreateCampaign",
    component: CreateCampaign,
    children: [
      {
        path: "",
        name: "CampaignForm",
        component: CampaignForm,
      },
      {
        path: "/player-stats",
        name: "PlayerStats",
        component: PlayerStats,
      },
    ],
  },
  {
    path: "/edit-campaign",
    name: "EditCampaign",
    component: EditCampaign,
  },
  {
    path: "/campaign-list",
    name: "CampaignList",
    component: CampaignList,
  },
  {
    path: "/my-campaign/:campaignName",
    name: "MyCampaign",
    component: CampaignEditor,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/scenario/:scenarioName",
    name: "Scenario",
    component: Scenario,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Garde de navigation global
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const isUserLogged = authStore.isUserLogged;

  // Si l'utilisateur n'est pas connecté et la route requiert une authentification
  if (!isUserLogged && to.meta.requiresAuth) {
    // Rediriger vers la page de connexion
    next("/login");
  } else {
    // Sinon, continuer normalement
    next();
  }
});

export default router;
