import { describe } from "vitest";
import { runScenarios } from "./helpers/scenario-runner";

describe("Schedule 1-A", () => {
  runScenarios("schedule1A.csv");
});
