/* eslint-disable @typescript-eslint/ban-ts-comment */
import { defineConfig } from "cypress";
import { resetDbTask } from './cypress/tasks/resetDb';
import replay from "@replayio/cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', { resetDbTask })
      replay(on, config);

      return config
    },
    baseUrl: 'http://localhost:3000'
  },
});
