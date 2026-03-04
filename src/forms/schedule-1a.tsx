import { FormSection } from "@/components/form-section";
import { FormLine } from "@/components/form-line";
import { SummaryLine } from "@/components/summary-line";
import { FactInput } from "@/components/fact-input";
import { ReceiptLayout } from "@/components/receipt-layout";
import { useFactGraphContext } from "@/App";


function Schedule1AContent() {
  const { getFact, version: _v } = useFactGraphContext();
  void _v;
  const hasAgiFrom1040 = getFact("/hasAgiFrom1040") === "true";

  return (
    <>
      {/* ===== Part I — Modified Adjusted Gross Income (MAGI) Amount ===== */}
      <FormSection title="Part I — Modified Adjusted Gross Income (MAGI) Amount" id="part1" />

      <div className="space-y-0.5">
        {hasAgiFrom1040 ? (
          <SummaryLine line="1" label="AGI (Form 1040, line 11b)" path="/schedule1aAgi" link="form1040" />
        ) : (
          <FormLine line="1" label="AGI (Form 1040, line 11b)" path="/schedule1aAgiWritable" link="form1040"><FactInput path="/schedule1aAgiWritable" /></FormLine>
        )}
        <FormLine line="2a" label="Puerto Rico excluded income" path="/puertoRicoExcludedIncome">
          <FactInput path="/puertoRicoExcludedIncome" />
        </FormLine>
        <FormLine line="2b" label="Form 2555, line 45" path="/form2555Line45">
          <FactInput path="/form2555Line45" />
        </FormLine>
        <FormLine line="2c" label="Form 2555, line 50" path="/form2555Line50">
          <FactInput path="/form2555Line50" />
        </FormLine>
        <FormLine line="2d" label="Form 4563, line 15" path="/form4563Line15">
          <FactInput path="/form4563Line15" />
        </FormLine>
        <SummaryLine line="2e" label="Add lines 2a through 2d" path="/magiExclusions" />
        <SummaryLine line="3" label="Modified AGI" path="/schedule1aMagi" />
      </div>

      {/* ===== Part II — No Tax on Tips ===== */}
      <FormSection title="Part II — No Tax on Tips" id="part2" />

      <div className="space-y-0.5">
        <FormLine line="4a" label="Qualified tips (W-2, box 7)" path="/qualifiedTipsW2">
          <FactInput path="/qualifiedTipsW2" />
        </FormLine>
        <FormLine line="4b" label="Qualified tips (Form 4137)" path="/qualifiedTips4137">
          <FactInput path="/qualifiedTips4137" />
        </FormLine>
        <SummaryLine line="4c" label="Larger of 4a or 4b" path="/qualifiedTipsEmployee" />
        <FormLine line="5" label="Qualified tips (self-employment)" path="/qualifiedTipsSelfEmployed">
          <FactInput path="/qualifiedTipsSelfEmployed" />
        </FormLine>
        <SummaryLine line="6" label="Add lines 4c and 5" path="/totalQualifiedTips" />
        <SummaryLine line="7" label="Smaller of line 6 or $25,000" path="/qualifiedTipsCapped" />
      </div>

      <div className="mt-3 space-y-0.5">
        <SummaryLine line="8" label="MAGI (from line 3)" path="/schedule1aMagi" />
        <SummaryLine line="9" label="Threshold ($150k / $300k MFJ)" path="/tipDeductionThreshold" />
        <SummaryLine line="10" label="Subtract line 9 from line 8" path="/tipDeductionExcess" />
        <SummaryLine line="11–12" label="Phaseout (floor ÷ $1,000 × $100)" path="/tipDeductionPhaseout" />
        <SummaryLine line="13" label="Qualified tips deduction" path="/qualifiedTipDeduction" bold />
      </div>

      {/* ===== Part III — No Tax on Overtime ===== */}
      <FormSection title="Part III — No Tax on Overtime" id="part3" />

      <div className="space-y-0.5">
        <FormLine line="14a" label="Qualified overtime (W-2)" path="/qualifiedOvertimeW2">
          <FactInput path="/qualifiedOvertimeW2" />
        </FormLine>
        <FormLine line="14b" label="Qualified overtime (1099)" path="/qualifiedOvertime1099">
          <FactInput path="/qualifiedOvertime1099" />
        </FormLine>
        <SummaryLine line="14c" label="Add lines 14a and 14b" path="/totalQualifiedOvertime" />
        <SummaryLine line="15" label="Smaller of 14c or cap ($12.5k / $25k MFJ)" path="/qualifiedOvertimeCapped" />
      </div>

      <div className="mt-3 space-y-0.5">
        <SummaryLine line="16" label="MAGI (from line 3)" path="/schedule1aMagi" />
        <SummaryLine line="17" label="Threshold ($150k / $300k MFJ)" path="/overtimeDeductionThreshold" />
        <SummaryLine line="18" label="Subtract line 17 from line 16" path="/overtimeDeductionExcess" />
        <SummaryLine line="19–20" label="Phaseout (floor ÷ $1,000 × $100)" path="/overtimeDeductionPhaseout" />
        <SummaryLine line="21" label="Qualified overtime deduction" path="/qualifiedOvertimeDeduction" bold />
      </div>

      {/* ===== Part IV — No Tax on Car Loan Interest ===== */}
      <FormSection title="Part IV — No Tax on Car Loan Interest" id="part4" />

      <div className="space-y-0.5">
        <FormLine line="22a" label="Vehicle A interest (col. iii)" path="/vehicleLoanInterestA">
          <FactInput path="/vehicleLoanInterestA" />
        </FormLine>
        <FormLine line="22b" label="Vehicle B interest (col. iii)" path="/vehicleLoanInterestB">
          <FactInput path="/vehicleLoanInterestB" />
        </FormLine>
        <SummaryLine line="23" label="Add lines 22a and 22b" path="/totalVehicleLoanInterest" />
        <SummaryLine line="24" label="Smaller of line 23 or $10,000" path="/vehicleLoanInterestCapped" />
      </div>

      <div className="mt-3 space-y-0.5">
        <SummaryLine line="25" label="MAGI (from line 3)" path="/schedule1aMagi" />
        <SummaryLine line="26" label="Threshold ($100k / $200k MFJ)" path="/carLoanThreshold" />
        <SummaryLine line="27" label="Subtract line 26 from line 25" path="/carLoanExcess" />
        <SummaryLine line="28–29" label="Phaseout (ceil ÷ $1,000 × $200)" path="/carLoanPhaseout" />
        <SummaryLine line="30" label="Car loan interest deduction" path="/vehicleLoanInterestDeduction" bold />
      </div>

      {/* ===== Part V — Enhanced Deduction for Seniors ===== */}
      <FormSection title="Part V — Enhanced Deduction for Seniors" id="part5" />

      <div className="space-y-0.5">
        <SummaryLine line="31" label="MAGI (from line 3)" path="/schedule1aMagi" />
        <SummaryLine line="32" label="Threshold ($75k / $150k MFJ)" path="/seniorDeductionThreshold" />
        <SummaryLine line="33" label="Subtract line 32 from line 31" path="/seniorDeductionExcess" />
        <SummaryLine line="34" label="Line 33 × 6%" path="/seniorDeductionReduction" />
        <SummaryLine line="35" label="$6,000 minus line 34" path="/seniorDeductionPerPerson" />
        <SummaryLine line="36a" label="Filer (if born before Jan 2, 1961)" path="/seniorDeductionFiler" />
        <SummaryLine line="36b" label="Spouse (if MFJ, born before Jan 2, 1961)" path="/seniorDeductionSpouse" />
        <SummaryLine line="37" label="Enhanced deduction for seniors" path="/seniorDeduction" bold />
      </div>

      {/* ===== Part VI — Total Additional Deductions ===== */}
      <FormSection title="Part VI — Total Additional Deductions" id="part6" />

      <div className="mt-2">
        <SummaryLine line="38" label="TOTAL ADDITIONAL DEDUCTIONS" path="/totalAdditionalDeductions" bold />
      </div>
    </>
  );
}

export function Schedule1A() {
  return (
    <ReceiptLayout subtitle="Additional Deductions" formName="Schedule 1-A">
      <Schedule1AContent />
    </ReceiptLayout>
  );
}
