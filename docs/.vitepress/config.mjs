import { defineSkipprDocs } from '@skippr/vitepress-theme'

export default defineSkipprDocs({
  name: 'Skippr Data Engineer',
  hostname: 'data-engineer.skippr.io',
  description: 'sde CLI for init, connect, doctor, model, vector, and ask.',
  nav: [{"text": "CLI", "link": "/cli/init"}, {"text": "skipprd", "link": "https://elt.skippr.io"}],
  sidebar: {"/": [{"text": "Home", "link": "/"}, {"text": "CLI", "items": [{"text": "init", "link": "/cli/init"}, {"text": "connect", "link": "/cli/connect"}, {"text": "doctor", "link": "/cli/doctor"}, {"text": "model", "link": "/cli/model"}]}]},
})
