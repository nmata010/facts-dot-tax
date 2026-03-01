import { FormSection } from "@/components/form-section";
import { FormLine } from "@/components/form-line";
import { SummaryLine } from "@/components/summary-line";
import { FactInput } from "@/components/fact-input";
import { FactCheckbox } from "@/components/fact-checkbox";
import { ReceiptLayout } from "@/components/receipt-layout";

export function ScheduleA() {
  return (
    <ReceiptLayout subtitle="Itemized Deductions" formName="Schedule A">
      {/* ===== Medical and Dental Expenses ===== */}
      <FormSection title="Medical and Dental Expenses" />

      <div className="space-y-0.5">
        <FormLine line="1" label="Medical and dental expenses" path="/medicalAndDentalExpenses">
          <FactInput path="/medicalAndDentalExpenses" />
        </FormLine>
        <SummaryLine line="2" label="AGI (Form 1040, line 11)" path="/agi" link="form1040" />
        <SummaryLine line="3" label="Multiply line 2 by 7.5% (0.075)" path="/medicalExpensesThreshold" />
      </div>
      <div className="mt-2">
        <SummaryLine line="4" label="Medical expenses deduction" path="/medicalExpensesDeduction" bold />
      </div>

      {/* ===== Taxes You Paid ===== */}
      <FormSection title="Taxes You Paid" />

      <div className="space-y-0.5">
        <FormLine line="5a" label="State/local income or sales taxes" path="/saltIncomeTaxOrSalesTax">
          <FactInput path="/saltIncomeTaxOrSalesTax" />
        </FormLine>
        <FormLine line="5b" label="State/local real estate taxes" path="/saltRealEstateTax">
          <FactInput path="/saltRealEstateTax" />
        </FormLine>
        <FormLine line="5c" label="State/local personal property taxes" path="/saltPersonalPropertyTax">
          <FactInput path="/saltPersonalPropertyTax" />
        </FormLine>
        <SummaryLine line="5d" label="Add lines 5a through 5c" path="/saltTotal" />
        <SummaryLine line="5e" label="SALT deduction (capped)" path="/saltDeduction" />
        <FormLine line="6" label="Other taxes" path="/otherDeductibleTaxes">
          <FactInput path="/otherDeductibleTaxes" />
        </FormLine>
      </div>
      <div className="mt-2">
        <SummaryLine line="7" label="Total taxes paid" path="/totalTaxesPaid" bold />
      </div>

      {/* ===== Interest You Paid ===== */}
      <FormSection title="Interest You Paid" />

      <div className="space-y-0.5">
        <FormLine line="8a" label="Home mortgage interest (Form 1098)" path="/homeMortgageInterest1098">
          <FactInput path="/homeMortgageInterest1098" />
        </FormLine>
        <FormLine line="8b" label="Home mortgage interest (not 1098)" path="/homeMortgageInterestNot1098">
          <FactInput path="/homeMortgageInterestNot1098" />
        </FormLine>
        <FormLine line="8c" label="Points not on Form 1098" path="/mortgagePoints">
          <FactInput path="/mortgagePoints" />
        </FormLine>
        <SummaryLine line="8e" label="Add lines 8a through 8c" path="/totalHomeMortgageInterest" />
        <FormLine line="9" label="Investment interest" path="/investmentInterest">
          <FactInput path="/investmentInterest" />
        </FormLine>
      </div>
      <div className="mt-2">
        <SummaryLine line="10" label="Total interest paid" path="/totalInterestPaid" bold />
      </div>

      {/* ===== Gifts to Charity ===== */}
      <FormSection title="Gifts to Charity" />

      <div className="space-y-0.5">
        <FormLine line="11" label="Gifts by cash or check" path="/charityCash">
          <FactInput path="/charityCash" />
        </FormLine>
        <FormLine line="12" label="Other than cash or check" path="/charityNonCash">
          <FactInput path="/charityNonCash" />
        </FormLine>
        <FormLine line="13" label="Carryover from prior year" path="/charityCarryover">
          <FactInput path="/charityCarryover" />
        </FormLine>
      </div>
      <div className="mt-2">
        <SummaryLine line="14" label="Total gifts to charity" path="/totalCharityGifts" bold />
      </div>

      {/* ===== Casualty and Theft Losses ===== */}
      <FormSection title="Casualty and Theft Losses" />

      <div className="space-y-0.5">
        <FormLine line="15" label="Casualty and theft losses" path="/casualtyAndTheftLosses">
          <FactInput path="/casualtyAndTheftLosses" />
        </FormLine>
      </div>

      {/* ===== Other Itemized Deductions ===== */}
      <FormSection title="Other Itemized Deductions" />

      <div className="space-y-0.5">
        <FormLine line="16" label="Other (from list in instructions)" path="/otherItemizedDeductions">
          <FactInput path="/otherItemizedDeductions" />
        </FormLine>
      </div>

      {/* ===== Total ===== */}
      <FormSection title="Total Itemized Deductions" />

      <div className="mt-2">
        <SummaryLine line="17" label="TOTAL ITEMIZED DEDUCTIONS" path="/totalItemizedDeductions" bold />
      </div>

      <div className="mt-3">
        <FormLine line="18" label="Elect to itemize" path="/electToItemize">
          <FactCheckbox path="/electToItemize" label="Check box" />
        </FormLine>
      </div>
    </ReceiptLayout>
  );
}
