import { describe, it, expect } from "vitest";
import { createReturn, getFormSchema, listForms } from "../lib";

describe("Library API", () => {
  describe("createReturn", () => {
    it("returns a TaxReturn object", async () => {
      const ret = await createReturn();
      expect(ret).toBeDefined();
      expect(typeof ret.setFact).toBe("function");
      expect(typeof ret.getFact).toBe("function");
      expect(typeof ret.getDollar).toBe("function");
      expect(typeof ret.getForm).toBe("function");
    });
  });

  describe("setFact / getFact", () => {
    it("can set and read a writable fact", async () => {
      const ret = await createReturn();
      ret.setFact("/wagesFromW2", "50000");
      expect(ret.getDollar("/wagesFromW2")).toBe(50000);
    });

    it("throws on an invalid fact path", async () => {
      const ret = await createReturn();
      expect(() => ret.setFact("/nonexistentFact", "100")).toThrow();
    });

    it("throws when setting a derived fact", async () => {
      const ret = await createReturn();
      expect(() => ret.setFact("/agi", "50000")).toThrow();
    });
  });

  describe("cross-form computation", () => {
    it("Schedule C flows through to 1040", async () => {
      const ret = await createReturn();
      ret.setFact("/filingStatus", "single");
      ret.setFact("/schCGrossReceipts", "80000");

      // Schedule C line 31 → Schedule 1 line 3 → 1040 line 8
      expect(ret.getDollar("/schCNetProfitOrLoss")).toBe(80000);
      expect(ret.getDollar("/totalIncome")).toBeGreaterThan(0);
    });

    it("setting wages computes a full return", async () => {
      const ret = await createReturn();
      ret.setFact("/filingStatus", "single");
      ret.setFact("/wagesFromW2", "50000");

      expect(ret.getDollar("/agi")).toBe(50000);
      expect(ret.getDollar("/totalTax")).toBeGreaterThan(0);
    });
  });

  describe("getFormSchema", () => {
    it("returns writable facts for a form", () => {
      const schema = getFormSchema("scheduleC");
      expect(schema.length).toBeGreaterThan(0);

      const grossReceipts = schema.find((f) => f.path === "/schCGrossReceipts");
      expect(grossReceipts).toBeDefined();
      expect(grossReceipts!.name).toBe("Gross receipts or sales");
      expect(grossReceipts!.type).toBe("Dollar");
    });

    it("does not include derived facts", () => {
      const schema = getFormSchema("scheduleC");
      const netProfit = schema.find((f) => f.path === "/schCNetProfit");
      expect(netProfit).toBeUndefined();
    });

    it("includes description when available", () => {
      const schema = getFormSchema("scheduleC");
      const grossReceipts = schema.find((f) => f.path === "/schCGrossReceipts");
      expect(grossReceipts!.description).toContain("Schedule C line 1");
    });

    it("throws on unknown form", () => {
      expect(() => getFormSchema("nonexistentForm")).toThrow();
    });
  });

  describe("getForm", () => {
    it("returns all facts for a form with values", async () => {
      const ret = await createReturn();
      ret.setFact("/filingStatus", "single");
      ret.setFact("/schCGrossReceipts", "80000");

      const form = ret.getForm("scheduleC");
      expect(form.length).toBeGreaterThan(0);

      const grossReceipts = form.find((f) => f.path === "/schCGrossReceipts");
      expect(grossReceipts).toBeDefined();
      expect(grossReceipts!.kind).toBe("writable");

      const netProfit = form.find((f) => f.path === "/schCNetProfitOrLoss");
      expect(netProfit).toBeDefined();
      expect(ret.getDollar("/schCNetProfitOrLoss")).toBe(80000);
      expect(netProfit!.kind).toBe("derived");
    });
  });

  describe("listForms", () => {
    it("returns all supported form IDs", () => {
      const forms = listForms();
      expect(forms).toContain("1040");
      expect(forms).toContain("scheduleC");
      expect(forms).toContain("scheduleSE");
    });
  });
});
