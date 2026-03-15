import { describe } from "vitest";
import { runScenarios } from "./helpers/scenario-runner";

describe("Schedule 8812", () => {
  runScenarios("schedule8812.csv");
});
