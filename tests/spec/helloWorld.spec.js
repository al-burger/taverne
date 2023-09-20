import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import CampaignForm from '../../src/components/campaign/CampaignForm.vue'

const vuetify = createVuetify({
  components,
  directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

test('displays message', async () => {
  const wrapper = mount({
    template: '<v-layout><campaign-form></campaign-form></v-layout>'
  }, {
    props: {},
    global: {
      components: {
        CampaignForm,
      },
      plugins: [vuetify],
    }
  });

  const textInput = wrapper.find('#campaignName');

  await textInput.setValue('Test campaign name');
  // Assert the rendered text of the component
  expect(wrapper.find('#campaignName').element.value).toBe('Test campaign name')
})