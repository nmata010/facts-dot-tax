import { FormSection } from "@/components/form-section";
import { FormLine } from "@/components/form-line";
import { FactInput } from "@/components/fact-input";
import { FactCheckbox } from "@/components/fact-checkbox";
import { FactSelect } from "@/components/fact-select";
import { DerivedValue } from "@/components/derived-value";
import { XmlSnippet } from "@/components/xml-snippet";
import { ReceiptLayout, useView } from "@/components/receipt-layout";

const FILING_STATUS_OPTIONS = [
  { value: "single", label: "Single" },
  { value: "mfj", label: "Married Filing Jointly" },
  { value: "hoh", label: "Head of Household" },
  { value: "mfs", label: "Married Filing Separately" },
  { value: "qss", label: "Qualifying Surviving Spouse" },
];

function SummaryLine({ line, label, path, bold = false }: { line: string; label: string; path: string; bold?: boolean }) {
  const view = useView();
  const showXml = view === "xml";

  return (
    <div className="relative">
      {/* Form view */}
      <div
        className={`flex items-center gap-2 text-xs leading-7 transition-all duration-300 ${bold ? "border-t border-double border-foreground/30 mt-1 pt-1" : ""}`}
        style={{
          opacity: showXml ? 0 : 1,
          maxHeight: showXml ? 0 : 100,
          overflow: "hidden",
        }}
      >
        <span className="w-6 shrink-0 text-muted-foreground/60 text-[10px]">{line}</span>
        <span className={`shrink-0 ${bold ? "font-bold" : "text-muted-foreground"}`}>{label}</span>
        <span className="flex-1 border-b border-dotted border-foreground/15 self-end mb-[5px]" />
        <DerivedValue path={path} className={`w-28 shrink-0 text-right text-xs ${bold ? "font-bold" : ""}`} />
      </div>

      {/* XML view */}
      <div
        className="transition-all duration-300"
        style={{
          opacity: showXml ? 1 : 0,
          maxHeight: showXml ? 500 : 0,
          overflow: "hidden",
        }}
      >
        <div className="flex gap-2 min-w-0">
          <span className="w-6 shrink-0 text-muted-foreground/60 text-[10px] leading-6">{line}</span>
          <XmlSnippet path={path} className="flex-1 min-w-0" />
        </div>
      </div>
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

function CheckboxXmlGroup({ paths }: { paths: string[] }) {
  const view = useView();
  if (view !== "xml") return null;
  return (
    <div
      className="transition-all duration-300"
      style={{
        opacity: 1,
        maxHeight: 500,
        overflow: "hidden",
      }}
    >
      {paths.map((path) => (
        <div key={path} className="flex gap-2">
          <span className="w-6 shrink-0" />
          <XmlSnippet path={path} className="flex-1" />
        </div>
      ))}
    </div>
  );
}

function Form1040Content() {
  const view = useView();
  const showXml = view === "xml";

  return (
    <>
      {/* Filing Status */}
      <div className="mb-4">
        <div
          className="transition-all duration-300"
          style={{
            opacity: showXml ? 0 : 1,
            maxHeight: showXml ? 0 : 100,
            overflow: "hidden",
          }}
        >
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Filing Status</div>
          <FactSelect path="/filingStatus" options={FILING_STATUS_OPTIONS} defaultValue="single" />
        </div>
        <div
          className="transition-all duration-300"
          style={{
            opacity: showXml ? 1 : 0,
            maxHeight: showXml ? 500 : 0,
            overflow: "hidden",
          }}
        >
          <div className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1">Filing Status</div>
          <XmlSnippet path="/filingStatus" />
        </div>
      </div>

      {/* ===== Income ===== */}
      <FormSection title="Income" lines="Lines 1–11" />

      <div className="text-[10px] text-muted-foreground mb-2">Wages, Salaries, Tips</div>
      <div className="space-y-0.5">
        <FormLine line="1a" label="W-2 wages" path="/wagesFromW2"><FactInput path="/wagesFromW2" /></FormLine>
        <FormLine line="1b" label="Household employee wages" path="/householdEmployeeWages"><FactInput path="/householdEmployeeWages" /></FormLine>
        <FormLine line="1c" label="Tip income" path="/unreportedTipIncome"><FactInput path="/unreportedTipIncome" /></FormLine>
        <FormLine line="1d" label="Medicaid waiver payments" path="/medicaidWaiverPayments"><FactInput path="/medicaidWaiverPayments" /></FormLine>
        <FormLine line="1e" label="Dependent care benefits" path="/taxableDependentCareBenefits"><FactInput path="/taxableDependentCareBenefits" /></FormLine>
        <FormLine line="1f" label="Adoption benefits" path="/employerAdoptionBenefits"><FactInput path="/employerAdoptionBenefits" /></FormLine>
        <FormLine line="1g" label="Form 8919 wages" path="/wagesFrom8919"><FactInput path="/wagesFrom8919" /></FormLine>
        <FormLine line="1h" label="Other earned income" path="/otherEarnedIncome"><FactInput path="/otherEarnedIncome" /></FormLine>
        <SummaryLine line="1z" label="Total wages" path="/totalWages" />
      </div>

      <div className="text-[10px] text-muted-foreground mt-4 mb-2">Other Income</div>
      <div className="space-y-0.5">
        <FormLine line="2a" label="Tax-exempt interest" path="/taxExemptInterest"><FactInput path="/taxExemptInterest" /></FormLine>
        <FormLine line="2b" label="Taxable interest" path="/taxableInterest"><FactInput path="/taxableInterest" /></FormLine>
        <FormLine line="3a" label="Qualified dividends" path="/qualifiedDividends"><FactInput path="/qualifiedDividends" /></FormLine>
        <FormLine line="3b" label="Ordinary dividends" path="/ordinaryDividends"><FactInput path="/ordinaryDividends" /></FormLine>
        <FormLine line="4a" label="IRA distributions" path="/iraDistributions"><FactInput path="/iraDistributions" /></FormLine>
        <FormLine line="4b" label="IRA taxable" path="/taxableIraDistributions"><FactInput path="/taxableIraDistributions" /></FormLine>
        <FormLine line="5a" label="Pensions & annuities" path="/pensionsAndAnnuities"><FactInput path="/pensionsAndAnnuities" /></FormLine>
        <FormLine line="5b" label="Pensions taxable" path="/taxablePensionsAndAnnuities"><FactInput path="/taxablePensionsAndAnnuities" /></FormLine>
        <FormLine line="6a" label="Social security" path="/socialSecurityBenefits"><FactInput path="/socialSecurityBenefits" /></FormLine>
        <FormLine line="6b" label="SS taxable" path="/taxableSocialSecurityBenefits"><FactInput path="/taxableSocialSecurityBenefits" /></FormLine>
        <FormLine line="7" label="Capital gain/(loss)" path="/capitalGainOrLoss"><FactInput path="/capitalGainOrLoss" /></FormLine>
        <FormLine line="8" label="Other income" path="/otherIncome"><FactInput path="/otherIncome" /></FormLine>
      </div>

      <div className="mt-2">
        <SummaryLine line="9" label="TOTAL INCOME" path="/totalIncome" bold />
      </div>

      <div className="mt-3 space-y-0.5">
        <FormLine line="10" label="Adjustments" path="/adjustmentsToIncome"><FactInput path="/adjustmentsToIncome" /></FormLine>
      </div>
      <div className="mt-2">
        <SummaryLine line="11" label="ADJUSTED GROSS INCOME" path="/agi" bold />
      </div>

      {/* ===== Tax and Credits ===== */}
      <FormSection title="Tax & Credits" lines="Lines 12–24" />

      <div className="text-[10px] text-muted-foreground mb-2">Deductions</div>
      <div className="space-y-0.5">
        {/* Checkboxes — form view */}
        <div
          className="transition-all duration-300"
          style={{
            opacity: showXml ? 0 : 1,
            maxHeight: showXml ? 0 : 200,
            overflow: "hidden",
          }}
        >
          <div className="text-[10px] text-muted-foreground/60 mb-1 ml-8">12d — Check if applicable:</div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 ml-8 mb-2">
            <FactCheckbox path="/filerBornBefore1961" label="Born before 1/2/1961" />
            <FactCheckbox path="/filerBlind" label="Blind" />
            <FactCheckbox path="/spouseBornBefore1961" label="Spouse born before 1/2/1961" />
            <FactCheckbox path="/spouseBlind" label="Spouse blind" />
          </div>
        </div>

        {/* Checkboxes — xml view */}
        <CheckboxXmlGroup
          paths={["/filerBornBefore1961", "/filerBlind", "/spouseBornBefore1961", "/spouseBlind"]}
        />

        <SummaryLine line="12e" label="Standard deduction" path="/standardDeduction" />
        <FormLine line="13a" label="QBI deduction" path="/qbiDeduction"><FactInput path="/qbiDeduction" /></FormLine>
        <FormLine line="13b" label="Additional deductions" path="/additionalDeductions"><FactInput path="/additionalDeductions" /></FormLine>
        <SummaryLine line="14" label="Total deductions" path="/totalDeductions" />
      </div>

      <div className="mt-2">
        <SummaryLine line="15" label="TAXABLE INCOME" path="/taxableIncome" bold />
      </div>

      <div className="mt-3 space-y-0.5">
        <FormLine line="16" label="Tax" path="/tax"><FactInput path="/tax" /></FormLine>
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
    </>
  );
}

export function Form1040() {
  return (
    <ReceiptLayout subtitle="U.S. Individual Income Tax Return" formName="Form 1040">
      <Form1040Content />
    </ReceiptLayout>
  );
}
