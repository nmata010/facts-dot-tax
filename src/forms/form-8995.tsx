import { FormLine } from "@/components/form-line";
import { SummaryLine } from "@/components/summary-line";
import { FactInput } from "@/components/fact-input";
import { ReceiptLayout } from "@/components/receipt-layout";

export function Form8995() {
  return (
    <ReceiptLayout subtitle="Qualified Business Income Deduction — Simplified Computation" formName="Form 8995">
      <div className="space-y-0.5">
        <FormLine line="1i" label="Business i — QBI" path="/qbiIncome1">
          <FactInput path="/qbiIncome1" />
        </FormLine>
        <FormLine line="1ii" label="Business ii — QBI" path="/qbiIncome2">
          <FactInput path="/qbiIncome2" />
        </FormLine>
        <FormLine line="1iii" label="Business iii — QBI" path="/qbiIncome3">
          <FactInput path="/qbiIncome3" />
        </FormLine>
        <FormLine line="1iv" label="Business iv — QBI" path="/qbiIncome4">
          <FactInput path="/qbiIncome4" />
        </FormLine>
        <FormLine line="1v" label="Business v — QBI" path="/qbiIncome5">
          <FactInput path="/qbiIncome5" />
        </FormLine>
        <SummaryLine line="2" label="Total qualified business income or (loss)" path="/totalQbi" />
        <FormLine line="3" label="QBI net (loss) carryforward from prior year" path="/qbiLossCarryforward">
          <FactInput path="/qbiLossCarryforward" />
        </FormLine>
        <SummaryLine line="4" label="Total qualified business income" path="/totalQualifiedBusinessIncome" />
        <SummaryLine line="5" label="QBI component (line 4 × 20%)" path="/qbiComponent" />
      </div>

      <div className="mt-3 space-y-0.5">
        <FormLine line="6" label="Qualified REIT dividends and PTP income or (loss)" path="/reitAndPtpIncome">
          <FactInput path="/reitAndPtpIncome" />
        </FormLine>
        <FormLine line="7" label="REIT/PTP (loss) carryforward from prior year" path="/reitPtpLossCarryforward">
          <FactInput path="/reitPtpLossCarryforward" />
        </FormLine>
        <SummaryLine line="8" label="Total REIT dividends and PTP income" path="/totalReitAndPtpIncome" />
        <SummaryLine line="9" label="REIT and PTP component (line 8 × 20%)" path="/reitPtpComponent" />
      </div>

      <div className="mt-3 space-y-0.5">
        <SummaryLine line="10" label="QBI deduction before income limitation" path="/qbiDeductionBeforeLimit" />
        <SummaryLine line="11" label="Taxable income before QBI deduction" path="/taxableIncomeBeforeQbi" />
        <SummaryLine line="12" label="Net capital gain + qualified dividends" path="/netCapitalGainPlusQualifiedDividends" />
        <SummaryLine line="13" label="Subtract line 12 from line 11" path="/incomeMinusCapitalGains" />
        <SummaryLine line="14" label="Income limitation (line 13 × 20%)" path="/incomeLimitation" />
        <SummaryLine line="15" label="Qualified business income deduction" path="/qualifiedBusinessIncomeDeduction" bold />
      </div>

      <div className="mt-3 space-y-0.5">
        <SummaryLine line="16" label="QBI (loss) carryforward" path="/qbiLossCarryforwardOut" />
        <SummaryLine line="17" label="REIT/PTP (loss) carryforward" path="/reitPtpLossCarryforwardOut" />
      </div>
    </ReceiptLayout>
  );
}
