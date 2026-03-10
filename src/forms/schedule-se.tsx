import { FormSection } from "@/components/form-section";
import { FormLine } from "@/components/form-line";
import { SummaryLine } from "@/components/summary-line";
import { FactInput } from "@/components/fact-input";
import { FactCheckbox } from "@/components/fact-checkbox";
import { ReceiptLayout } from "@/components/receipt-layout";

function ScheduleSEContent() {
  return (
    <>
      <FormSection title="Part I — Self-Employment Tax" id="part1" />

      <div className="space-y-1 ml-2">
        <FactCheckbox path="/seMinisterCheckbox" label="A. Filed Form 4361 with $400+ of other net SE earnings" />
      </div>

      <div className="space-y-0.5">
        <FormLine line="1a" label="Net farm profit or (loss) from Schedule F" path="/netFarmProfit">
          <FactInput path="/netFarmProfit" />
        </FormLine>
        <FormLine line="1b" label="Conservation Reserve Program payments" path="/conservationReservePayments">
          <FactInput path="/conservationReservePayments" />
        </FormLine>
        <FormLine line="2" label="Net profit or (loss) from Schedule C" path="/netNonfarmProfit">
          <FactInput path="/netNonfarmProfit" />
        </FormLine>
        <SummaryLine line="3" label="Combine lines 1a, 1b, and 2" path="/seCombinedIncome" />
        <SummaryLine line="4a" label="Line 3 × 92.35% (if positive), otherwise line 3" path="/seAdjustedIncome" />
        <SummaryLine line="4b" label="Optional methods total (lines 15 and 17)" path="/seOptionalMethodTotal" />
        <SummaryLine line="4c" label="Combine lines 4a and 4b (if less than $400, enter -0-)" path="/seCombinedAdjusted" />
      </div>

      <div className="space-y-0.5 mt-2">
        <FormLine line="5a" label="Church employee income from Form W-2" path="/churchEmployeeIncome">
          <FactInput path="/churchEmployeeIncome" />
        </FormLine>
        <SummaryLine line="5b" label="Line 5a × 92.35% (if less than $100, enter -0-)" path="/churchEmployeeAdjusted" />
        <SummaryLine line="6" label="Add lines 4c and 5b" path="/seNetEarnings" />
        <SummaryLine line="7" label="Maximum combined wages and SE earnings subject to SS tax" path="/seMaxSocialSecurity" />
      </div>

      <div className="space-y-0.5 mt-2">
        <FormLine line="8a" label="Total social security wages and tips (W-2 boxes 3 and 7)" path="/seSocialSecurityWages">
          <FactInput path="/seSocialSecurityWages" />
        </FormLine>
        <FormLine line="8b" label="Unreported tips from Form 4137, line 10" path="/seUnreportedTips">
          <FactInput path="/seUnreportedTips" />
        </FormLine>
        <FormLine line="8c" label="Wages from Form 8919, line 10" path="/seWagesForm8919">
          <FactInput path="/seWagesForm8919" />
        </FormLine>
        <SummaryLine line="8d" label="Add lines 8a, 8b, and 8c" path="/seTotalSocialSecurityWages" />
        <SummaryLine line="9" label="Subtract line 8d from line 7 (if zero or less, enter -0-)" path="/seRemainingAllowance" />
        <SummaryLine line="10" label="Smaller of line 6 or line 9 × 12.4%" path="/seSocialSecurityTax" />
        <SummaryLine line="11" label="Line 6 × 2.9%" path="/seMedicareTax" />
        <SummaryLine line="12" label="Self-employment tax (add lines 10 and 11) → Schedule 2, line 4" path="/seTotalTax" bold />
        <SummaryLine line="13" label="Deduction for one-half of SE tax (line 12 × 50%) → Schedule 1, line 15" path="/seDeduction" bold />
      </div>

      <FormSection title="Part II — Optional Methods To Figure Net Earnings" id="part2" />

      <div className="space-y-1 ml-2">
        <FactCheckbox path="/useFarmOptionalMethod" label="Use farm optional method" />
        <FactCheckbox path="/useNonfarmOptionalMethod" label="Use nonfarm optional method" />
      </div>

      <div className="space-y-0.5">
        <SummaryLine line="14" label="Maximum income for optional methods" path="/seOptionalMethodMax" />
        <FormLine line="15" label="Smaller of: ⅔ of gross farm income or $7,240" path="/farmOptionalMethodIncome">
          <FactInput path="/farmOptionalMethodIncome" />
        </FormLine>
        <SummaryLine line="16" label="Subtract line 15 from line 14" path="/nonfarmOptionalMethodRemaining" />
        <FormLine line="17" label="Smaller of: ⅔ of gross nonfarm income or line 16" path="/nonfarmOptionalMethodIncome">
          <FactInput path="/nonfarmOptionalMethodIncome" />
        </FormLine>
      </div>
    </>
  );
}

export function ScheduleSE() {
  return (
    <ReceiptLayout subtitle="Self-Employment Tax" formName="Schedule SE">
      <ScheduleSEContent />
    </ReceiptLayout>
  );
}
