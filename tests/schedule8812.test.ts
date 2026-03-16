import { describe } from "vitest";
import { runScenarios } from "./helpers/scenario-runner";

describe("Schedule 8812", () => {
  runScenarios("schedule8812.csv", [
    "three_children_fica", // known bug: see form-references/bug-reports/schedule-8812-fica-eic-interaction.md
  ]);
});
