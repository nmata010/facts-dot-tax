import { describe } from "vitest";
import { runScenarios } from "./helpers/scenario-runner";

describe("Schedule 2", () => {
  runScenarios("schedule2.csv");
});
