const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    experimentalSessionAndOrigin: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },  
  chromeWebSecurity: false,
  browser: {
  chrome: {
  preferences: {
        'profile.default_content_setting_values.notifications': 1, // 1 para permitir, 2 para bloquear
      },
    },
  }
});
