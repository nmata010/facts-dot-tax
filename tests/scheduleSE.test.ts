import { describe } from "vitest";
import { runScenarios } from "./helpers/scenario-runner";

describe("Schedule SE", () => {
  runScenarios("scheduleSE.csv");
});
