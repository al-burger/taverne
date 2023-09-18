import { mount, test } from 'vitest';
import CreateCampaign from '../../../src/views/campaign/CreateCampaign.vue';

test('renders the component', async () => {
  const wrapper = mount(CreateCampaign);
  // Vérifie que le composant est rendu
  expect(wrapper.exists()).toBe(true);
});