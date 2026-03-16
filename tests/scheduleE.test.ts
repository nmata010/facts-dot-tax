import { describe } from "vitest";
import { runScenarios } from "./helpers/scenario-runner";

describe("Schedule E", () => {
  runScenarios("scheduleE.csv");
});
