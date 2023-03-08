module.exports = {
  moduleFileExtensions: ["js", "json", "vue", "ts"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
    "^.+\\.vue$": [
      "<rootDir>/node_modules/@vue/vue3-jest",
      "<rootDir>/node_modules/vue-router",
    ],
  },
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  moduleNameMapper: {
    "/^@/(.*)$/": "<rootDir>/$1",
  },
};
