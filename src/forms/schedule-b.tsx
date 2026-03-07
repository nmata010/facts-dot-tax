import { FormSection } from "@/components/form-section";
import { FormLine } from "@/components/form-line";
import { SummaryLine } from "@/components/summary-line";
import { FactInput } from "@/components/fact-input";
import { FactCheckbox } from "@/components/fact-checkbox";
import { ReceiptLayout } from "@/components/receipt-layout";

export function ScheduleB() {
  return (
    <ReceiptLayout subtitle="Interest and Ordinary Dividends" formName="Schedule B">
      <FormSection title="Part I — Interest" id="part1" />

      <div className="space-y-0.5">
        <FormLine line="2" label="Total interest (add line 1 amounts)" path="/totalInterestScheduleB">
          <FactInput path="/totalInterestScheduleB" />
        </FormLine>
        <FormLine line="3" label="Excludable savings bond interest (Form 8815)" path="/excludableSavingsBondInterest">
          <FactInput path="/excludableSavingsBondInterest" />
        </FormLine>
        <SummaryLine line="4" label="Taxable interest (line 2 minus line 3) → 1040 line 2b" path="/taxableInterestScheduleB" bold />
      </div>

      <FormSection title="Part II — Ordinary Dividends" id="part2" />

      <div className="space-y-0.5">
        <FormLine line="6" label="Total ordinary dividends (add line 5 amounts) → 1040 line 3b" path="/totalOrdinaryDividendsScheduleB">
          <FactInput path="/totalOrdinaryDividendsScheduleB" />
        </FormLine>
      </div>

      <FormSection title="Part III — Foreign Accounts and Trusts" id="part3" />

      <div className="space-y-1 ml-2">
        <FactCheckbox path="/hasForeignAccount" label="7a. Had interest in or authority over a foreign financial account" />
        <FactCheckbox path="/requiredToFileFbar" label="7a. Required to file FinCEN Form 114 (FBAR)" />
        <FactCheckbox path="/hasForeignTrust" label="8. Received distribution from, or was grantor/transferor to, a foreign trust" />
      </div>
    </ReceiptLayout>
  );
}
