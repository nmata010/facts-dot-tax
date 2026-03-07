import { FormSection } from "@/components/form-section";
import { FormLine } from "@/components/form-line";
import { SummaryLine } from "@/components/summary-line";
import { FactIntInput } from "@/components/fact-int-input";
import { FactCheckbox } from "@/components/fact-checkbox";
import { ReceiptLayout } from "@/components/receipt-layout";
import { useFactGraphContext } from "@/App";

export function Eic() {
  const { getFact, version: _v } = useFactGraphContext();
  void _v;
  const hasQualifyingChildren = getFact("/eicHasQualifyingChildren") === "true";

  return (
    <ReceiptLayout subtitle="Earned Income Credit" formName="EIC Worksheet">
      <FormSection title="Eligibility" />

      <div className="space-y-0.5">
        <FormLine line="" label="Qualifying children with valid SSNs" path="/eicQualifyingChildren">
          <FactIntInput path="/eicQualifyingChildren" />
        </FormLine>
      </div>

      <div className="text-[10px] text-muted-foreground mt-4 mb-2">
        Check any that apply to you
      </div>

      <div className="space-y-1 ml-2">
        <FactCheckbox path="/eicFilingForm2555" label="Filing Form 2555 (foreign earned income)" />
        <FactCheckbox path="/eicNonresidentAlien" label="Nonresident alien for any part of the year" />
        <FactCheckbox path="/eicQualifyingChildOfAnother" label="Could be a qualifying child of another taxpayer" />
        {hasQualifyingChildren && (
          <FactCheckbox path="/eicMfsNotLivingApart" label="MFS and did NOT live apart from spouse for last 6 months" />
        )}
        {!hasQualifyingChildren && (
          <>
            <FactCheckbox path="/eicDoesNotMeetAgeReq" label="NOT age 25–64 at year end (or spouse if MFJ)" />
            <FactCheckbox path="/eicMainHomeNotInUs" label="Main home NOT in the US for more than half the year" />
            <FactCheckbox path="/eicCanBeClaimedAsDependent" label="Can be claimed as a dependent on another's return" />
          </>
        )}
      </div>

      <div className="mt-3 space-y-0.5">
        <SummaryLine line="" label="Investment income" path="/eicInvestmentIncome" />
        <div className="flex items-baseline gap-2 text-xs leading-7">
          <span className="w-6 shrink-0 text-muted-foreground/40"></span>
          <span className="shrink min-w-0">Eligible for EIC</span>
          <span className="flex-1 border-b border-dotted border-foreground/15 self-end mb-[5px]" />
          <span className="shrink-0 text-right text-xs tabular-nums">
            {getFact("/eicIsEligible") === "true" ? "YES" : "NO"}
          </span>
        </div>
      </div>

      <FormSection title="Worksheet A — EIC Computation" />

      <div className="space-y-0.5">
        <SummaryLine line="1" label="Earned income" path="/eicEarnedIncome" />
        <SummaryLine line="2" label="EIC from earned income (table)" path="/eicCreditFromEarnedIncome" />
        <SummaryLine line="3" label="AGI (Form 1040 line 11)" path="/agi" />
        <SummaryLine line="5" label="EIC from AGI (table)" path="/eicCreditFromAgi" />
        <SummaryLine line="6" label="Your earned income credit" path="/eicFinalCredit" bold />
      </div>
    </ReceiptLayout>
  );
}
