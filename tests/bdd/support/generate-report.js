const report = require("multiple-cucumber-html-reporter");

report.generate({
  jsonDir: "tests/bdd/support/reports",
  reportPath: "tests/bdd/support/reports/html",
  metadata: {
    browser: { name: "chromium" },
    device: "Local",
    platform: { name: process.platform }
  },
  customData: {
    title: "Execução BDD",
    data: [
      { label: "ENV", value: process.env.ENV || "dev" }
    ]
  }
});
