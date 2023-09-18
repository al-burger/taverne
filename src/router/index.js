import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import CreateCampaign from '../views/campaign/createCampaign.vue';
import EditCampaign from '../views/campaign/EditCampaign.vue';

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