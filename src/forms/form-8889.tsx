import { FormSection } from "@/components/form-section";
import { FormLine } from "@/components/form-line";
import { SummaryLine } from "@/components/summary-line";
import { FactInput } from "@/components/fact-input";
import { FactIntInput } from "@/components/fact-int-input";
import { FactCheckbox } from "@/components/fact-checkbox";
import { FactSelect } from "@/components/fact-select";
import { ReceiptLayout } from "@/components/receipt-layout";
import { useFactGraphContext } from "@/App";

const COVERAGE_TYPE_OPTIONS = [
  { value: "selfOnly", label: "Self-only" },
  { value: "family", label: "Family" },
];

function Form8889Content() {
  const { getFact, version: _v } = useFactGraphContext();
  const hasExceptions = getFact("/hsaHasDistributionExceptions") === "true";

  return (
    <>
      <FormSection title="Base Information" id="base-info" />

      <div className="space-y-1 ml-2">
        <FactCheckbox path="/hsaAge55OrOlder" label="Age 55 or older at end of 2025" />
        <FactCheckbox path="/hsaMarried" label="Married at end of 2025" />
        <FormLine line="" label="Months eligible" path="/hsaEligibleMonths">
          <FactIntInput path="/hsaEligibleMonths" />
        </FormLine>
        <FormLine line="" label="Months enrolled in Medicare" path="/hsaMedicareMonths">
          <FactIntInput path="/hsaMedicareMonths" />
        </FormLine>
      </div>

      <FormSection title="Part I — HSA Contributions and Deduction" id="part1" />

      <div className="space-y-0.5">
        <FormLine line="1" label="Coverage type under HDHP" path="/hsaCoverageType">
          <FactSelect path="/hsaCoverageType" options={COVERAGE_TYPE_OPTIONS} defaultValue="selfOnly" />
        </FormLine>
        
        <FormLine line="2" label="HSA contributions you made for 2025" path="/hsaContributions">
          <FactInput path="/hsaContributions" />
        </FormLine>
        <SummaryLine line="3" label="HSA contribution limit" path="/hsaContributionLimit" />
        <FormLine line="4" label="Archer MSA contributions (Form 8853)" path="/archerMsaContributions">
          <FactInput path="/archerMsaContributions" />
        </FormLine>
        <SummaryLine line="5" label="Subtract line 4 from line 3 (if zero or less, enter -0-)" path="/hsaLimitLessMsa" />
        <FormLine line="6" label="Contribution limit after allocation" path="/hsaContributionLimitAllocated">
          <FactInput path="/hsaContributionLimitAllocated" />
        </FormLine>
        <SummaryLine line="7" label="Additional contribution (age 55 or older)" path="/hsaAdditionalContribution" />
        <SummaryLine line="8" label="Add lines 6 and 7" path="/hsaTotalContributionLimit" />
        <FormLine line="9" label="Employer contributions" path="/hsaEmployerContributions">
          <FactInput path="/hsaEmployerContributions" />
        </FormLine>
        <FormLine line="10" label="Qualified HSA funding distributions" path="/hsaFundingDistributions">
          <FactInput path="/hsaFundingDistributions" />
        </FormLine>
        <SummaryLine line="11" label="Add lines 9 and 10" path="/hsaEmployerAndFunding" />
        <SummaryLine line="12" label="Subtract line 11 from line 8 (if zero or less, enter -0-)" path="/hsaMaxDeductibleContribution" />
        <SummaryLine line="13" label="HSA deduction — smaller of line 2 or line 12 → Schedule 1, line 13" path="/hsaDeductionAmount" bold />
      </div>

      <FormSection title="Part II — HSA Distributions" id="part2" />

      <div className="space-y-0.5">
        <FormLine line="14a" label="Total distributions received" path="/hsaTotalDistributions">
          <FactInput path="/hsaTotalDistributions" />
        </FormLine>
        <FormLine line="14b" label="Rollovers and excess contributions withdrawn" path="/hsaRolloversAndExcess">
          <FactInput path="/hsaRolloversAndExcess" />
        </FormLine>
        <SummaryLine line="14c" label="Subtract line 14b from line 14a" path="/hsaNetDistributions" />
        <FormLine line="15" label="Qualified medical expenses paid" path="/hsaQualifiedMedicalExpenses">
          <FactInput path="/hsaQualifiedMedicalExpenses" />
        </FormLine>
        <SummaryLine line="16" label="Taxable HSA distributions (if zero or less, enter -0-)" path="/hsaTaxableDistributions" />
      </div>

      <div className="mt-3 space-y-0.5">
        <FactCheckbox path="/hsaHasDistributionExceptions" label="17a. Exceptions to the additional 20% tax apply" />
        {hasExceptions && (
          <FormLine line="17b" label="Distributions subject to additional 20% tax" path="/hsaDistributionsSubjectToTax">
            <FactInput path="/hsaDistributionsSubjectToTax" />
          </FormLine>
        )}
        <SummaryLine line="17b" label="Additional 20% tax → Schedule 2, line 17c" path="/hsaAdditionalTax20Pct" bold />
      </div>

      <FormSection title="Part III — Income and Additional Tax for Failure to Maintain HDHP Coverage" id="part3" />

      <div className="space-y-0.5">
        <FormLine line="18" label="Last-month rule income" path="/hsaLastMonthRuleIncome">
          <FactInput path="/hsaLastMonthRuleIncome" />
        </FormLine>
        <FormLine line="19" label="Qualified HSA funding distribution income" path="/hsaFundingDistIncome">
          <FactInput path="/hsaFundingDistIncome" />
        </FormLine>
        <SummaryLine line="20" label="Add lines 18 and 19" path="/hsaTotalIncome" />
        <SummaryLine line="21" label="Additional 10% tax → Schedule 2, line 17d" path="/hsaAdditionalTax10Pct" bold />
      </div>
    </>
  );
}

export function Form8889() {
  return (
    <ReceiptLayout subtitle="Health Savings Accounts (HSAs)" formName="Form 8889">
      <Form8889Content />
    </ReceiptLayout>
  );
}
