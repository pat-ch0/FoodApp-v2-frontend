import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 's9frdg',
  component: {
    devServer: {
      framework: "angular",
      bundler: "webpack",
    },
    specPattern: "**/*.cy.ts",
  },
});
