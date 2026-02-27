import { FormSection } from "@/components/form-section";
import { FormLine } from "@/components/form-line";
import { SummaryLine } from "@/components/summary-line";
import { FactInput } from "@/components/fact-input";
import { FactCheckbox } from "@/components/fact-checkbox";
import { FactSelect } from "@/components/fact-select";
import { XmlSnippet } from "@/components/xml-snippet";
import { ReceiptLayout, useView } from "@/components/receipt-layout";
import { useFactGraphContext } from "@/App";

const FILING_STATUS_OPTIONS = [
  { value: "single", label: "Single" },
  { value: "mfj", label: "Married Filing Jointly" },
  { value: "hoh", label: "Head of Household" },
  { value: "mfs", label: "Married Filing Separately" },
  { value: "qss", label: "Qualifying Surviving Spouse" },
];

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
  const { getFact, version: _v } = useFactGraphContext();
  void _v;
  const hasSch1OtherIncome = getFact("/hasSch1OtherIncome") === "true";
  const hasSch1Adjustments = getFact("/hasSch1Adjustments") === "true";

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
      <FormSection title="Income" />

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
        {hasSch1OtherIncome ? (
          <SummaryLine line="8" label="Other income (Sched. 1)" path="/otherIncome" link="schedule1#part1" />
        ) : (
          <FormLine line="8" label="Other income (Sched. 1)" path="/otherIncomeWritable" link="schedule1#part1"><FactInput path="/otherIncomeWritable" /></FormLine>
        )}
      </div>

      <div className="mt-2">
        <SummaryLine line="9" label="TOTAL INCOME" path="/totalIncome" bold />
      </div>

      <div className="mt-3 space-y-0.5">
        {hasSch1Adjustments ? (
          <SummaryLine line="10" label="Adjustments (Sched. 1)" path="/adjustmentsToIncome" link="schedule1#part2" />
        ) : (
          <FormLine line="10" label="Adjustments (Sched. 1)" path="/adjustmentsToIncomeWritable" link="schedule1#part2"><FactInput path="/adjustmentsToIncomeWritable" /></FormLine>
        )}
      </div>
      <div className="mt-2">
        <SummaryLine line="11" label="ADJUSTED GROSS INCOME" path="/agi" bold />
      </div>

      {/* ===== Tax and Credits ===== */}
      <FormSection title="Tax & Credits" />

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
          <div className="flex gap-2 mb-1">
            <span className="w-6 shrink-0 text-muted-foreground/60 text-[10px]">12d</span>
            <span className="text-[10px] text-muted-foreground/60">Check if applicable:</span>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 ml-8 mb-2">
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
        <SummaryLine line="16" label="Tax" path="/tax" />
        <FormLine line="17" label="Additional tax" path="/additionalTax"><FactInput path="/additionalTax" /></FormLine>
        <SummaryLine line="18" label="Tentative tax" path="/tentativeTax" />
      </div>

      <div className="text-[10px] text-muted-foreground mt-4 mb-2">Credits</div>
      <div className="space-y-0.5">
        <FormLine line="19" label="CTC / ODC (Sched. 8812)" path="/ctcOdcCredit"><FactInput path="/ctcOdcCredit" /></FormLine>
        <FormLine line="20" label="Nonrefundable credits" path="/schedule3NonRefundableCredits"><FactInput path="/schedule3NonRefundableCredits" /></FormLine>
        <SummaryLine line="21" label="Total credits" path="/totalNonRefundableCredits" />
        <SummaryLine line="22" label="Tax after credits" path="/tentativeTaxNetOfNonRefundableCredits" />
        <FormLine line="23" label="Other taxes" path="/otherTaxes"><FactInput path="/otherTaxes" /></FormLine>
      </div>
      <div className="mt-2">
        <SummaryLine line="24" label="TOTAL TAX" path="/totalTax" bold />
      </div>

      {/* ===== Payments ===== */}
      <FormSection title="Payments" />

      <div className="text-[10px] text-muted-foreground mb-2">Federal Tax Withheld</div>
      <div className="space-y-0.5">
        <FormLine line="25a" label="W-2 withholding" path="/withholdingsW2"><FactInput path="/withholdingsW2" /></FormLine>
        <FormLine line="25b" label="1099 withholding" path="/withholdings1099"><FactInput path="/withholdings1099" /></FormLine>
        <FormLine line="25c" label="Other withholding" path="/withholdingsOther"><FactInput path="/withholdingsOther" /></FormLine>
        <SummaryLine line="25d" label="Total withheld" path="/totalWithholdings" />
      </div>

      <div className="mt-3 space-y-0.5">
        <FormLine line="26" label="Estimated tax payments" path="/estimatedTaxPayments"><FactInput path="/estimatedTaxPayments" /></FormLine>
      </div>

      <div className="text-[10px] text-muted-foreground mt-4 mb-2">Refundable Credits</div>
      <div className="space-y-0.5">
        <FormLine line="27a" label="Earned income credit (EIC)" path="/earnedIncomeCredit"><FactInput path="/earnedIncomeCredit" /></FormLine>

        {/* EIC checkboxes — form view */}
        <div
          className="transition-all duration-300"
          style={{
            opacity: showXml ? 0 : 1,
            maxHeight: showXml ? 0 : 200,
            overflow: "hidden",
          }}
        >
          <div className="flex flex-wrap gap-x-3 gap-y-1 ml-8 mb-2">
            <FactCheckbox path="/eicClergy" label="27b Clergy (Sched. SE)" />
            <FactCheckbox path="/eicOptOut" label="27c Don't claim EIC" />
          </div>
        </div>

        {/* EIC checkboxes — xml view */}
        <CheckboxXmlGroup paths={["/eicClergy", "/eicOptOut"]} />

        <FormLine line="28" label="Additional child tax credit" path="/additionalChildTaxCredit"><FactInput path="/additionalChildTaxCredit" /></FormLine>
        <FormLine line="29" label="American opportunity credit" path="/americanOpportunityTaxCredit"><FactInput path="/americanOpportunityTaxCredit" /></FormLine>
        <FormLine line="30" label="Adoption credit" path="/refundableAdoptionCredit"><FactInput path="/refundableAdoptionCredit" /></FormLine>
        <FormLine line="31" label="Refundable credits" path="/schedule3RefundableCredits"><FactInput path="/schedule3RefundableCredits" /></FormLine>
        <SummaryLine line="32" label="Total other payments/credits" path="/totalOtherPaymentsAndRefundableCredits" />
      </div>

      <div className="mt-2">
        <SummaryLine line="33" label="TOTAL PAYMENTS" path="/totalPayments" bold />
      </div>

      {/* ===== Refund ===== */}
      <FormSection title="Refund" />

      <div className="space-y-0.5">
        <SummaryLine line="34" label="Amount overpaid" path="/overpaymentAmount" />
        <FormLine line="35a" label="Refund to you" path="/refundAmount"><FactInput path="/refundAmount" /></FormLine>
        <FormLine line="36" label="Applied to 2026 estimated tax" path="/appliedToNextYear"><FactInput path="/appliedToNextYear" /></FormLine>
      </div>

      {/* ===== Amount You Owe ===== */}
      <FormSection title="Amount You Owe" />

      <div className="space-y-0.5">
        <SummaryLine line="37" label="AMOUNT YOU OWE" path="/amountYouOwe" bold />
        <FormLine line="38" label="Estimated tax penalty" path="/estimatedTaxPenalty"><FactInput path="/estimatedTaxPenalty" /></FormLine>
      </div>
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
