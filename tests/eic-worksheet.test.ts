import { describe } from "vitest";
import { runScenarios } from "./helpers/scenario-runner";

describe("EIC Worksheet", () => {
  runScenarios("eic-worksheet.csv");
});
