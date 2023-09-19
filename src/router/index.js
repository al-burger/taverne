import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import CreateCampaign from '../views/campaign/createCampaign.vue';
import EditCampaign from '../views/campaign/EditCampaign.vue';
import CampaignForm from '../components/campaign/CampaignForm.vue';
import PlayerStats from '../components/player/PlayerStats.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/create-campaign',
        name: 'CreateCampaign',
        component: CreateCampaign,
        children: [
            {
              path: '',
              name: 'CampaignForm',
              component: CampaignForm,
            },
            {
              path: '/player-stats',
              name: 'PlayerStats',
              component: PlayerStats,
            },
        ],
    },
    
    {
        path: '/edit-campaign',
        name: 'EditCampaign',
        component: EditCampaign,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
  });
  
  export default router;