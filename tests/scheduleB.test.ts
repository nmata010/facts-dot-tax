import { describe } from "vitest";
import { runScenarios } from "./helpers/scenario-runner";

describe("Schedule B", () => {
  runScenarios("scheduleB.csv");
});
