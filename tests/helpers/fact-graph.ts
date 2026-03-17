import { createReturn, type TaxReturn } from "../../lib";

/**
 * Create a fresh fact graph with all XML files loaded.
 * Returns helpers for setting inputs and reading outputs.
 */
export async function createTestGraph() {
  const ret = await createReturn();

  return {
    /** Set a writable fact. Value should be a string ("50000", "single", "true"). */
    set(path: string, value: string) {
      ret.setFact(path, value);
    },

    /** Get the string value of a fact. Returns the raw toString() output. */
    get(path: string): string {
      return ret.getFact(path);
    },

    /** Get a Dollar fact as a number (e.g. "$1,234.00" → 1234). */
    getDollar(path: string): number {
      return ret.getDollar(path);
    },
  };
}
