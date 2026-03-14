import { describe } from "vitest";
import { runScenarios } from "./helpers/scenario-runner";

describe("Form 8889", () => {
  runScenarios("f8889.csv");
});
