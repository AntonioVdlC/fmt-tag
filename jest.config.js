module.exports = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageThreshold: {
    // There seems to be a bug with Jest coverage, which is not stable
    // and yields varying results depending on the run, sometimes flagging
    // code as uncovered while others runs correctly cover it ...
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
  testEnvironment: "node",
  setupFilesAfterEnv: ["jest-extended"],
};
