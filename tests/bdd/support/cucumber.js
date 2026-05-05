module.exports = {
  default: {
    timeout: 60_000,
    require: [
      "tests/bdd/steps/**/*.ts",
      "tests/bdd/support/world.ts"
    ],
    requireModule: ["ts-node/register"],
    paths: ["tests/bdd/features/**/*.feature"],
    format: [
      "progress",
      "json:tests/bdd/support/reports/cucumber.json"
    ],
  }
};
