module.exports = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/client/$1",
    "^~/(.*)$": "<rootDir>/src/client/$1",
    "^vue$": "vue/dist/vue.common.js",
  },
  moduleFileExtensions: ["ts", "js", "vue", "json"],
  transform: {
    "^.+\\.ts$": "ts-jest",
    "^.+\\.js$": "babel-jest",
    ".*\\.(vue)$": "vue-jest",
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/components/**/*.vue",
    "<rootDir>/pages/**/*.vue",
  ],
  testEnvironment: "jsdom",
}
