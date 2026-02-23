import { FormSection } from "@/components/form-section";
import { FormLine } from "@/components/form-line";
import { FactInput } from "@/components/fact-input";
import { FactCheckbox } from "@/components/fact-checkbox";
import { FactSelect } from "@/components/fact-select";
import { DerivedValue } from "@/components/derived-value";

const FILING_STATUS_OPTIONS = [
  { value: "single", label: "Single" },
  { value: "mfj", label: "Married Filing Jointly" },
  { value: "hoh", label: "Head of Household" },
  { value: "mfs", label: "Married Filing Separately" },
  { value: "qss", label: "Qualifying Surviving Spouse" },
];

function SummaryLine({ line, label, path, bold = false }: { line: string; label: string; path: string; bold?: boolean }) {
  return (
    <div className={`flex items-center gap-2 text-xs leading-7 ${bold ? "border-t border-double border-foreground/30 mt-1 pt-1" : ""}`}>
      <span className="w-6 shrink-0 text-muted-foreground/60 text-[10px]">{line}</span>
      <span className={`shrink-0 ${bold ? "font-bold" : "text-muted-foreground"}`}>{label}</span>
      <span className="flex-1 border-b border-dotted border-foreground/15 self-end mb-[5px]" />
      <DerivedValue path={path} className={`w-28 shrink-0 text-right text-xs ${bold ? "font-bold" : ""}`} />
    </div>
  );
}

function Placeholder({ text }: { text: string }) {
  return (
    <div className="py-2 text-[10px] text-muted-foreground/50 italic tracking-wide">
      {text}
    </div>
  );
}

export function Form1040() {
  return (
    <div className="max-w-md mx-auto my-12 font-mono">
      {/* Receipt paper */}
      <div className="bg-background border border-foreground/10 shadow-sm px-8 py-10">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-1">U.S. Individual Income Tax Return</div>
          <div className="text-lg font-bold tracking-tight">Form 1040</div>
          <div className="text-[10px] text-muted-foreground">Tax Year 2025</div>
          <div className="mt-2 border-t border-foreground/10" />
          <p className="mt-2 text-[10px] text-muted-foreground/50">
            Modeled as a{" "}
            <a href="https://github.com/IRS-Public/fact-graph" className="underline underline-offset-2 hover:text-foreground transition-colors">
              fact-graph
            </a>{" "}
            dictionary
          </p>
        </div>

        {/* Filing Status */}
        <div className="mb-4">
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Filing Status</div>
          <FactSelect path="/filingStatus" options={FILING_STATUS_OPTIONS} defaultValue="single" />
        </div>

        {/* ===== Income ===== */}
        <FormSection title="Income" lines="Lines 1–11" />

        <div className="text-[10px] text-muted-foreground mb-2">Wages, Salaries, Tips</div>
        <div className="space-y-0.5">
          <FormLine line="1a" label="W-2 wages"><FactInput path="/wagesFromW2" /></FormLine>
          <FormLine line="1b" label="Household employee wages"><FactInput path="/householdEmployeeWages" /></FormLine>
          <FormLine line="1c" label="Tip income"><FactInput path="/unreportedTipIncome" /></FormLine>
          <FormLine line="1d" label="Medicaid waiver payments"><FactInput path="/medicaidWaiverPayments" /></FormLine>
          <FormLine line="1e" label="Dependent care benefits"><FactInput path="/taxableDependentCareBenefits" /></FormLine>
          <FormLine line="1f" label="Adoption benefits"><FactInput path="/employerAdoptionBenefits" /></FormLine>
          <FormLine line="1g" label="Form 8919 wages"><FactInput path="/wagesFrom8919" /></FormLine>
          <FormLine line="1h" label="Other earned income"><FactInput path="/otherEarnedIncome" /></FormLine>
          <SummaryLine line="1z" label="Total wages" path="/totalWages" />
        </div>

        <div className="text-[10px] text-muted-foreground mt-4 mb-2">Other Income</div>
        <div className="space-y-0.5">
          <FormLine line="2a" label="Tax-exempt interest"><FactInput path="/taxExemptInterest" /></FormLine>
          <FormLine line="2b" label="Taxable interest"><FactInput path="/taxableInterest" /></FormLine>
          <FormLine line="3a" label="Qualified dividends"><FactInput path="/qualifiedDividends" /></FormLine>
          <FormLine line="3b" label="Ordinary dividends"><FactInput path="/ordinaryDividends" /></FormLine>
          <FormLine line="4a" label="IRA distributions"><FactInput path="/iraDistributions" /></FormLine>
          <FormLine line="4b" label="IRA taxable"><FactInput path="/taxableIraDistributions" /></FormLine>
          <FormLine line="5a" label="Pensions & annuities"><FactInput path="/pensionsAndAnnuities" /></FormLine>
          <FormLine line="5b" label="Pensions taxable"><FactInput path="/taxablePensionsAndAnnuities" /></FormLine>
          <FormLine line="6a" label="Social security"><FactInput path="/socialSecurityBenefits" /></FormLine>
          <FormLine line="6b" label="SS taxable"><FactInput path="/taxableSocialSecurityBenefits" /></FormLine>
          <FormLine line="7" label="Capital gain/(loss)"><FactInput path="/capitalGainOrLoss" /></FormLine>
          <FormLine line="8" label="Other income"><FactInput path="/otherIncome" /></FormLine>
        </div>

        <div className="mt-2">
          <SummaryLine line="9" label="TOTAL INCOME" path="/totalIncome" bold />
        </div>

        <div className="mt-3 space-y-0.5">
          <FormLine line="10" label="Adjustments"><FactInput path="/adjustmentsToIncome" /></FormLine>
        </div>
        <div className="mt-2">
          <SummaryLine line="11" label="ADJUSTED GROSS INCOME" path="/agi" bold />
        </div>

        {/* ===== Tax and Credits ===== */}
        <FormSection title="Tax & Credits" lines="Lines 12–24" />

        <div className="text-[10px] text-muted-foreground mb-2">Deductions</div>
        <div className="space-y-0.5">
          <div className="text-[10px] text-muted-foreground/60 mb-1 ml-8">12d — Check if applicable:</div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 ml-8 mb-2">
            <FactCheckbox path="/filerBornBefore1961" label="Born before 1/2/1961" />
            <FactCheckbox path="/filerBlind" label="Blind" />
            <FactCheckbox path="/spouseBornBefore1961" label="Spouse born before 1/2/1961" />
            <FactCheckbox path="/spouseBlind" label="Spouse blind" />
          </div>

          <SummaryLine line="12e" label="Standard deduction" path="/standardDeduction" />
          <FormLine line="13a" label="QBI deduction"><FactInput path="/qbiDeduction" /></FormLine>
          <FormLine line="13b" label="Additional deductions"><FactInput path="/additionalDeductions" /></FormLine>
          <SummaryLine line="14" label="Total deductions" path="/totalDeductions" />
        </div>

        <div className="mt-2">
          <SummaryLine line="15" label="TAXABLE INCOME" path="/taxableIncome" bold />
        </div>

        <div className="mt-3 space-y-0.5">
          <FormLine line="16" label="Tax"><FactInput path="/tax" /></FormLine>
        </div>

        <Placeholder text="Lines 17–24 (credits, other taxes) — not yet modeled" />

        {/* ===== Payments ===== */}
        <FormSection title="Payments" lines="Lines 25–33" />
        <Placeholder text="Lines 25–33 — not yet modeled" />

        {/* ===== Refund ===== */}
        <FormSection title="Refund" lines="Lines 34–36" />
        <Placeholder text="Lines 34–36 — not yet modeled" />

        {/* ===== Amount You Owe ===== */}
        <FormSection title="Amount You Owe" lines="Lines 37–38" />
        <Placeholder text="Lines 37–38 — not yet modeled" />

        {/* Footer */}
        <div className="mt-8 border-t border-foreground/10 pt-3 text-center">
          <div className="text-[9px] text-muted-foreground/40 tracking-wider">THANK YOU</div>
        </div>
      </div>
    </div>
  );
}
