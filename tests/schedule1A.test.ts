import { describe } from "vitest";
import { runScenarios } from "./helpers/scenario-runner";

describe("Schedule 1-A", () => {
  runScenarios("schedule1A.csv", [
    "car_loan_ceiling_rounding", // known bug: see form-references/bug-reports/car-loan-ceiling-rounding.md
  ]);
});
