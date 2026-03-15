import { describe } from "vitest";
import { runScenarios } from "./helpers/scenario-runner";

describe("Schedule A", () => {
  runScenarios("scheduleA.csv");
});
