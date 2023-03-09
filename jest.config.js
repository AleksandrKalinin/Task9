module.exports = {
  setupFiles: ["jest-canvas-mock"],
  moduleFileExtensions: ["ts", "js", "json", "vue"],
  transform: {
    "^.+\\.(t|j)sx?$": "ts-jest",
    "^.+\\.vue$": [
      "<rootDir>/node_modules/@vue/vue3-jest",
      "<rootDir>/node_modules/vue-router",
      "<rootDir>/node_modules/vuex",
    ],
  },
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
};
