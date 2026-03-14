import { describe } from "vitest";
import { runScenarios } from "./helpers/scenario-runner";

describe("Schedule 1", () => {
  runScenarios("schedule1.csv");
});
