import { FormSection } from "@/components/form-section";
import { FormLine } from "@/components/form-line";
import { SummaryLine } from "@/components/summary-line";
import { FactInput } from "@/components/fact-input";
import { FactIntInput } from "@/components/fact-int-input";
import { ReceiptLayout } from "@/components/receipt-layout";

export function Schedule8812() {
  return (
    <ReceiptLayout subtitle="Credits for Qualifying Children and Other Dependents" formName="Schedule 8812">
      {/* ===== Part I — Child Tax Credit and Credit for Other Dependents ===== */}
      <FormSection title="Part I — Child Tax Credit and Credit for Other Dependents" id="part1" />

      <div className="space-y-0.5">
        <SummaryLine line="1" label="AGI (Form 1040, line 11a)" path="/agi" link="form1040" />
        <FormLine line="2a" label="Puerto Rico excluded income" path="/puertoRicoExcludedIncome">
          <FactInput path="/puertoRicoExcludedIncome" />
        </FormLine>
        <FormLine line="2b" label="Form 2555 excluded income" path="/form2555ExcludedIncome">
          <FactInput path="/form2555ExcludedIncome" />
        </FormLine>
        <FormLine line="2c" label="Form 4563 excluded income" path="/form4563ExcludedIncome">
          <FactInput path="/form4563ExcludedIncome" />
        </FormLine>
        <SummaryLine line="2d" label="Total excluded income" path="/totalExcludedIncome" />
        <SummaryLine line="3" label="Modified AGI" path="/dependentCreditMagi" />
      </div>

      <div className="mt-3 space-y-0.5">
        <FormLine line="4" label="Qualifying children under 17" path="/ctcEligibleDependents">
          <FactIntInput path="/ctcEligibleDependents" />
        </FormLine>
        <SummaryLine line="5" label="Line 4 × $2,200" path="/totalPotentialCtc" />
        <FormLine line="6" label="Other dependents" path="/odcEligibleDependents">
          <FactIntInput path="/odcEligibleDependents" />
        </FormLine>
        <SummaryLine line="7" label="Line 6 × $500" path="/totalPotentialOdc" />
        <SummaryLine line="8" label="Add lines 5 and 7" path="/totalPotentialDependentCredits" />
      </div>

      <div className="mt-3 space-y-0.5">
        <SummaryLine line="9" label="Phaseout threshold" path="/dependentCreditPhaseoutThreshold" />
        <SummaryLine line="10" label="Excess above threshold (rounded up)" path="/roundedMagiAboveThreshold" />
        <SummaryLine line="11" label="Line 10 × 5%" path="/dependentCreditPhaseout" />
        <SummaryLine line="12" label="Line 8 minus line 11" path="/dependentCreditLessPhaseout" />
        <SummaryLine line="13" label="Credit Limit Worksheet A" path="/creditLimit" />
      </div>

      <div className="mt-2">
        <SummaryLine line="14" label="CHILD TAX CREDIT AND ODC" path="/totalCtcAndOdc" bold />
      </div>

      {/* ===== Part II-A — Additional Child Tax Credit for All Filers ===== */}
      <FormSection title="Part II-A — Additional Child Tax Credit" id="part2a" />

      <div className="space-y-0.5">
        <SummaryLine line="16a" label="Line 12 minus line 14" path="/remainingCtcAndOdc" />
        <SummaryLine line="16b" label="Line 4 × $1,700" path="/totalPotentialActc" />
        <SummaryLine line="17" label="Smaller of 16a or 16b" path="/remainingPotentialActc" />
      </div>

      <div className="mt-3 space-y-0.5">
        <FormLine line="18a" label="Earned income" path="/earnedIncome">
          <FactInput path="/earnedIncome" />
        </FormLine>
        <FormLine line="18b" label="Nontaxable combat pay" path="/nontaxableCombatPay">
          <FactInput path="/nontaxableCombatPay" />
        </FormLine>
        <SummaryLine line="19" label="Line 18a minus $2,500" path="/earnedIncomeAboveActcThreshold" />
        <SummaryLine line="20" label="Line 19 × 15%" path="/regularMaximumActc" />
      </div>

      {/* ===== Part II-B — Three or More Qualifying Children ===== */}
      <FormSection title="Part II-B — Three or More Qualifying Children" id="part2b" />

      <div className="space-y-0.5">
        <FormLine line="21" label="Withheld SS, Medicare, Add'l Medicare" path="/withheldSocialSecurityMedicare">
          <FactInput path="/withheldSocialSecurityMedicare" />
        </FormLine>
        <SummaryLine line="22" label="SE tax + Sched. 2 lines 5, 6, 13" path="/seTaxAndAdditionalTaxes" />
        <SummaryLine line="23" label="Add lines 21 and 22" path="/totalFicaAndSeTax" />
        <SummaryLine line="24" label="EIC + excess SS tax" path="/eicAndExcessSocialSecurity" />
        <SummaryLine line="25" label="Line 23 minus line 24" path="/ficaExcessOverEic" />
        <SummaryLine line="26" label="Larger of line 20 or line 25" path="/maximumActc" />
      </div>

      {/* ===== Part II-C — Additional Child Tax Credit ===== */}
      <FormSection title="Part II-C — Additional Child Tax Credit" id="part2c" />

      <div className="mt-2">
        <SummaryLine line="27" label="ADDITIONAL CHILD TAX CREDIT" path="/additionalCtc" bold />
      </div>
    </ReceiptLayout>
  );
}
