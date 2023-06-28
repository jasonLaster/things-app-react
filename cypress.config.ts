import { defineConfig } from "cypress";
import { resetDbTask } from './cypress/tasks/resetDb'

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        resetDbTask
      })
    },
    baseUrl: 'http://localhost:3000'
  },
});
