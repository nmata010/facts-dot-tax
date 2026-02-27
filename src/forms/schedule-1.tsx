import { FormSection } from "@/components/form-section";
import { FormLine } from "@/components/form-line";
import { SummaryLine } from "@/components/summary-line";
import { FactInput } from "@/components/fact-input";
import { ReceiptLayout } from "@/components/receipt-layout";

export function Schedule1() {
  return (
    <ReceiptLayout subtitle="Additional Income and Adjustments to Income" formName="Schedule 1">
      {/* ===== Part I — Additional Income ===== */}
      <FormSection title="Part I — Additional Income" id="part1" />

      <div className="space-y-0.5">
        <FormLine line="1" label="Taxable refunds of state/local taxes" path="/taxableSaltRefunds">
          <FactInput path="/taxableSaltRefunds" />
        </FormLine>
        <FormLine line="2a" label="Alimony received" path="/alimonyReceived">
          <FactInput path="/alimonyReceived" />
        </FormLine>
        <FormLine line="3" label="Business income or (loss)" path="/businessIncomeSchC">
          <FactInput path="/businessIncomeSchC" />
        </FormLine>
        <FormLine line="4" label="Other gains or (losses)" path="/otherGains">
          <FactInput path="/otherGains" />
        </FormLine>
        <FormLine line="5" label="Rental, partnership, S corp" path="/rentalIncomeSchE">
          <FactInput path="/rentalIncomeSchE" />
        </FormLine>
        <FormLine line="6" label="Farm income or (loss)" path="/farmIncome">
          <FactInput path="/farmIncome" />
        </FormLine>
        <FormLine line="7" label="Unemployment compensation" path="/unemploymentComp">
          <FactInput path="/unemploymentComp" />
        </FormLine>
      </div>

      <div className="text-[10px] text-muted-foreground mt-4 mb-2">Other Income</div>
      <div className="space-y-0.5">
        <FormLine line="8a" label="Net operating loss" path="/netOperatingLoss">
          <FactInput path="/netOperatingLoss" />
        </FormLine>
        <FormLine line="8b" label="Gambling income" path="/gamblingIncome">
          <FactInput path="/gamblingIncome" />
        </FormLine>
        <FormLine line="8c" label="Cancellation of debt" path="/cancellationOfDebt">
          <FactInput path="/cancellationOfDebt" />
        </FormLine>
        <FormLine line="8d" label="Foreign earned income exclusion" path="/foreignEarnedIncomeExcl">
          <FactInput path="/foreignEarnedIncomeExcl" />
        </FormLine>
        <FormLine line="8e" label="Income from Form 8853" path="/incomeFrom8853">
          <FactInput path="/incomeFrom8853" />
        </FormLine>
        <FormLine line="8f" label="Income from Form 8889" path="/incomeFrom8889">
          <FactInput path="/incomeFrom8889" />
        </FormLine>
        <FormLine line="8g" label="Alaska Permanent Fund dividends" path="/alaskaPFD">
          <FactInput path="/alaskaPFD" />
        </FormLine>
        <FormLine line="8h" label="Jury duty pay" path="/juryDutyPay">
          <FactInput path="/juryDutyPay" />
        </FormLine>
        <FormLine line="8i" label="Prizes and awards" path="/prizesAndAwards">
          <FactInput path="/prizesAndAwards" />
        </FormLine>
        <FormLine line="8j" label="Activity not for profit income" path="/activityNotForProfit">
          <FactInput path="/activityNotForProfit" />
        </FormLine>
        <FormLine line="8k" label="Stock options" path="/stockOptions">
          <FactInput path="/stockOptions" />
        </FormLine>
        <FormLine line="8l" label="Rental of personal property" path="/personalPropertyRental">
          <FactInput path="/personalPropertyRental" />
        </FormLine>
        <FormLine line="8m" label="Olympic/Paralympic medals" path="/olympicMedals">
          <FactInput path="/olympicMedals" />
        </FormLine>
        <FormLine line="8n" label="Section 951(a) inclusion" path="/section951a">
          <FactInput path="/section951a" />
        </FormLine>
        <FormLine line="8o" label="Section 951A(a) inclusion" path="/section951Aa">
          <FactInput path="/section951Aa" />
        </FormLine>
        <FormLine line="8p" label="Excess business loss adjustment" path="/excessBusinessLoss">
          <FactInput path="/excessBusinessLoss" />
        </FormLine>
        <FormLine line="8q" label="ABLE account distributions" path="/ableDistributions">
          <FactInput path="/ableDistributions" />
        </FormLine>
        <FormLine line="8r" label="Scholarship/fellowship grants" path="/scholarshipGrants">
          <FactInput path="/scholarshipGrants" />
        </FormLine>
        <FormLine line="8s" label="Nontaxable Medicaid waiver" path="/nontaxableMedicaid">
          <FactInput path="/nontaxableMedicaid" />
        </FormLine>
        <FormLine line="8t" label="Nonqualified deferred comp" path="/nonqualifiedDeferredComp">
          <FactInput path="/nonqualifiedDeferredComp" />
        </FormLine>
        <FormLine line="8u" label="Wages while incarcerated" path="/wagesIncarcerated">
          <FactInput path="/wagesIncarcerated" />
        </FormLine>
        <FormLine line="8v" label="Digital assets" path="/digitalAssets">
          <FactInput path="/digitalAssets" />
        </FormLine>
        <FormLine line="8z" label="Other income" path="/otherIncomeMisc">
          <FactInput path="/otherIncomeMisc" />
        </FormLine>
        <SummaryLine line="9" label="Total other income" path="/totalOtherIncome" />
      </div>

      <div className="mt-2">
        <SummaryLine line="10" label="TOTAL ADDITIONAL INCOME" path="/additionalIncome" bold />
      </div>

      {/* ===== Part II — Adjustments to Income ===== */}
      <FormSection title="Part II — Adjustments to Income" id="part2" />

      <div className="space-y-0.5">
        <FormLine line="11" label="Educator expenses" path="/educatorExpensesDeduction">
          <FactInput path="/educatorExpensesDeduction" />
        </FormLine>
        <FormLine line="12" label="Reservist business expenses" path="/reservistExpensesDeduction">
          <FactInput path="/reservistExpensesDeduction" />
        </FormLine>
        <FormLine line="13" label="HSA deduction" path="/hsaDeduction">
          <FactInput path="/hsaDeduction" />
        </FormLine>
        <FormLine line="14" label="Moving expenses (Armed Forces)" path="/movingExpensesDeduction">
          <FactInput path="/movingExpensesDeduction" />
        </FormLine>
        <FormLine line="15" label="Self-employment tax deduction" path="/selfEmploymentTaxDeduction">
          <FactInput path="/selfEmploymentTaxDeduction" />
        </FormLine>
        <FormLine line="16" label="SEP, SIMPLE, qualified plans" path="/sepSimpleDeduction">
          <FactInput path="/sepSimpleDeduction" />
        </FormLine>
        <FormLine line="17" label="Self-employed health insurance" path="/selfEmployedHealthInsDeduction">
          <FactInput path="/selfEmployedHealthInsDeduction" />
        </FormLine>
        <FormLine line="18" label="Early withdrawal penalty" path="/earlyWithdrawalPenaltyDeduction">
          <FactInput path="/earlyWithdrawalPenaltyDeduction" />
        </FormLine>
        <FormLine line="19a" label="Alimony paid" path="/alimonyPaidDeduction">
          <FactInput path="/alimonyPaidDeduction" />
        </FormLine>
        <FormLine line="20" label="IRA deduction" path="/iraDeduction">
          <FactInput path="/iraDeduction" />
        </FormLine>
        <FormLine line="21" label="Student loan interest" path="/studentLoanInterestDeduction">
          <FactInput path="/studentLoanInterestDeduction" />
        </FormLine>
        <FormLine line="23" label="Archer MSA deduction" path="/archerMSADeduction">
          <FactInput path="/archerMSADeduction" />
        </FormLine>
      </div>

      <div className="text-[10px] text-muted-foreground mt-4 mb-2">Other Adjustments</div>
      <div className="space-y-0.5">
        <FormLine line="24a" label="Jury duty pay to employer" path="/adjJuryDutyPayDeduction">
          <FactInput path="/adjJuryDutyPayDeduction" />
        </FormLine>
        <FormLine line="24b" label="Personal property rental expenses" path="/adjPersonalPropertyRentalDeduction">
          <FactInput path="/adjPersonalPropertyRentalDeduction" />
        </FormLine>
        <FormLine line="24c" label="Olympic medals nontaxable" path="/adjOlympicMedalsDeduction">
          <FactInput path="/adjOlympicMedalsDeduction" />
        </FormLine>
        <FormLine line="24d" label="Reforestation amortization" path="/adjReforestationDeduction">
          <FactInput path="/adjReforestationDeduction" />
        </FormLine>
        <FormLine line="24e" label="Trade Act repayment" path="/adjTradeActRepaymentDeduction">
          <FactInput path="/adjTradeActRepaymentDeduction" />
        </FormLine>
        <FormLine line="24f" label="501(c)(18)(D) contributions" path="/adj501c18dDeduction">
          <FactInput path="/adj501c18dDeduction" />
        </FormLine>
        <FormLine line="24g" label="Chaplain 403(b) contributions" path="/adjChaplain403bDeduction">
          <FactInput path="/adjChaplain403bDeduction" />
        </FormLine>
        <FormLine line="24h" label="Attorney fees (discrimination)" path="/adjAttorneyFeesDiscriminationDeduction">
          <FactInput path="/adjAttorneyFeesDiscriminationDeduction" />
        </FormLine>
        <FormLine line="24i" label="Attorney fees (IRS whistleblower)" path="/adjAttorneyFeesIrsDeduction">
          <FactInput path="/adjAttorneyFeesIrsDeduction" />
        </FormLine>
        <FormLine line="24j" label="Housing deduction" path="/adjHousingDeduction">
          <FactInput path="/adjHousingDeduction" />
        </FormLine>
        <FormLine line="24k" label="Excess section 67(e) deductions" path="/adjExcess67eDeduction">
          <FactInput path="/adjExcess67eDeduction" />
        </FormLine>
        <FormLine line="24z" label="Other adjustments" path="/adjOtherDeduction">
          <FactInput path="/adjOtherDeduction" />
        </FormLine>
        <SummaryLine line="25" label="Total other adjustments" path="/totalOtherAdjustments" />
      </div>

      <div className="mt-2">
        <SummaryLine line="26" label="TOTAL ADJUSTMENTS" path="/totalAdjustments" bold />
      </div>
    </ReceiptLayout>
  );
}
