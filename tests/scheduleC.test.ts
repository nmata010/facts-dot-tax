import { describe } from "vitest";
import { runScenarios } from "./helpers/scenario-runner";

describe("Schedule C", () => {
  runScenarios("scheduleC.csv");
});
