const { spawnSync } = require("node:child_process");

const extraArgs = process.argv.slice(2);

const cucumberResult = spawnSync(
  "cucumber-js",
  ["--config", "tests/bdd/support/cucumber.js", ...extraArgs],
  {
    stdio: "inherit",
    shell: true,
    env: process.env
  }
);

const reportResult = spawnSync("node", ["tests/bdd/support/generate-report.js"], {
  stdio: "inherit",
  shell: true,
  env: process.env
});

if (reportResult.status !== 0) {
  process.exit(reportResult.status ?? 1);
}

process.exit(cucumberResult.status ?? 1);
