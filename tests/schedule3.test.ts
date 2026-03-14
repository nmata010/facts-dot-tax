import { describe } from "vitest";
import { runScenarios } from "./helpers/scenario-runner";

describe("Schedule 3", () => {
  runScenarios("schedule3.csv");
});
