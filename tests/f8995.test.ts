import { describe } from "vitest";
import { runScenarios } from "./helpers/scenario-runner";

describe("Form 8995", () => {
  runScenarios("f8995.csv");
});
