import { FormSection } from "@/components/form-section";
import { FormLine } from "@/components/form-line";
import { SummaryLine } from "@/components/summary-line";
import { FactInput } from "@/components/fact-input";
import { FactCheckbox } from "@/components/fact-checkbox";
import { FactSelect } from "@/components/fact-select";
import { ReceiptLayout } from "@/components/receipt-layout";

const PROPERTY_TYPE_OPTIONS = [
  { value: "singleFamilyResidence", label: "1 — Single Family Residence" },
  { value: "multiFamilyResidence", label: "2 — Multi-Family Residence" },
  { value: "vacationShortTermRental", label: "3 — Vacation/Short-Term Rental" },
  { value: "commercial", label: "4 — Commercial" },
  { value: "land", label: "5 — Land" },
  { value: "royalties", label: "6 — Royalties" },
  { value: "selfRental", label: "7 — Self-Rental" },
  { value: "other", label: "8 — Other" },
];

function ScheduleEContent() {
  return (
    <>
      <FormSection title="Part I — Income or Loss From Rental Real Estate and Royalties" id="part1" />

      <div className="space-y-1 ml-2">
        <FactCheckbox path="/schERequired1099" label="A. Made payments requiring Form(s) 1099" />
        <FactCheckbox path="/schEFiled1099" label="B. Filed all required Form(s) 1099" />
      </div>

      <div className="space-y-0.5 mt-2">
        <FormLine line="1b" label="Type of property" path="/schEPropertyType">
          <FactSelect path="/schEPropertyType" options={PROPERTY_TYPE_OPTIONS} defaultValue="singleFamilyResidence" />
        </FormLine>
      </div>

      <div className="mt-1 mb-1 text-[10px] uppercase tracking-wider text-muted-foreground ml-2">Income</div>

      <div className="space-y-0.5">
        <FormLine line="3" label="Rents received" path="/schERentsReceived">
          <FactInput path="/schERentsReceived" />
        </FormLine>
        <FormLine line="4" label="Royalties received" path="/schERoyaltiesReceived">
          <FactInput path="/schERoyaltiesReceived" />
        </FormLine>
      </div>

      <div className="mt-1 mb-1 text-[10px] uppercase tracking-wider text-muted-foreground ml-2">Expenses</div>

      <div className="space-y-0.5">
        <FormLine line="5" label="Advertising" path="/schEAdvertising">
          <FactInput path="/schEAdvertising" />
        </FormLine>
        <FormLine line="6" label="Auto and travel" path="/schEAutoAndTravel">
          <FactInput path="/schEAutoAndTravel" />
        </FormLine>
        <FormLine line="7" label="Cleaning and maintenance" path="/schECleaningAndMaintenance">
          <FactInput path="/schECleaningAndMaintenance" />
        </FormLine>
        <FormLine line="8" label="Commissions" path="/schECommissions">
          <FactInput path="/schECommissions" />
        </FormLine>
        <FormLine line="9" label="Insurance" path="/schEInsurance">
          <FactInput path="/schEInsurance" />
        </FormLine>
        <FormLine line="10" label="Legal and other professional fees" path="/schELegalAndProfessionalFees">
          <FactInput path="/schELegalAndProfessionalFees" />
        </FormLine>
        <FormLine line="11" label="Management fees" path="/schEManagementFees">
          <FactInput path="/schEManagementFees" />
        </FormLine>
        <FormLine line="12" label="Mortgage interest paid to banks, etc." path="/schEMortgageInterest">
          <FactInput path="/schEMortgageInterest" />
        </FormLine>
        <FormLine line="13" label="Other interest" path="/schEOtherInterest">
          <FactInput path="/schEOtherInterest" />
        </FormLine>
        <FormLine line="14" label="Repairs" path="/schERepairs">
          <FactInput path="/schERepairs" />
        </FormLine>
        <FormLine line="15" label="Supplies" path="/schESupplies">
          <FactInput path="/schESupplies" />
        </FormLine>
        <FormLine line="16" label="Taxes" path="/schETaxes">
          <FactInput path="/schETaxes" />
        </FormLine>
        <FormLine line="17" label="Utilities" path="/schEUtilities">
          <FactInput path="/schEUtilities" />
        </FormLine>
        <FormLine line="18" label="Depreciation expense or depletion" path="/schEDepreciation">
          <FactInput path="/schEDepreciation" />
        </FormLine>
        <FormLine line="19" label="Other (list)" path="/schEOtherExpenses">
          <FactInput path="/schEOtherExpenses" />
        </FormLine>
        <SummaryLine line="20" label="Total expenses (add lines 5 through 19)" path="/schETotalExpenses" bold />
      </div>

      <div className="space-y-0.5 mt-2">
        <SummaryLine line="21" label="Net income or (loss)" path="/schENetIncomeOrLoss" />
        <FormLine line="22" label="Deductible rental real estate loss (Form 8582)" path="/schEDeductibleLoss">
          <FactInput path="/schEDeductibleLoss" />
        </FormLine>
      </div>

      <div className="space-y-0.5 mt-2">
        <SummaryLine line="23a" label="Total rents — all rental properties" path="/schETotalRents" />
        <SummaryLine line="23b" label="Total royalties — all royalty properties" path="/schETotalRoyalties" />
        <SummaryLine line="23c" label="Total mortgage interest — all properties" path="/schETotalMortgageInterest" />
        <SummaryLine line="23d" label="Total depreciation — all properties" path="/schETotalDepreciation" />
        <SummaryLine line="23e" label="Total expenses — all properties" path="/schETotalAllExpenses" />
      </div>

      <div className="space-y-0.5 mt-2">
        <SummaryLine line="24" label="Income (positive amounts from line 21)" path="/schEIncome" />
        <SummaryLine line="25" label="Losses (royalty from line 21, rental RE from line 22)" path="/schELosses" />
        <SummaryLine line="26" label="Total rental real estate and royalty income or (loss)" path="/schETotalRentalAndRoyalty" bold />
      </div>

      <FormSection title="Part II — Income or Loss From Partnerships and S Corporations" id="part2" />

      <div className="space-y-0.5">
        <div className="space-y-1 ml-2 mb-2">
          <FactCheckbox path="/schEPriorYearLoss" label="27. Reporting prior year unallowed loss" />
        </div>
        <FormLine line="32" label="Total partnership and S corporation income or (loss)" path="/schEPartnershipIncome">
          <FactInput path="/schEPartnershipIncome" />
        </FormLine>
      </div>

      <FormSection title="Part III — Income or Loss From Estates and Trusts" id="part3" />

      <div className="space-y-0.5">
        <FormLine line="37" label="Total estate and trust income or (loss)" path="/schEEstateIncome">
          <FactInput path="/schEEstateIncome" />
        </FormLine>
      </div>

      <FormSection title="Part IV — Income or Loss From REMICs — Residual Holder" id="part4" />

      <div className="space-y-0.5">
        <FormLine line="39" label="REMIC taxable income and other income" path="/schERemicIncome">
          <FactInput path="/schERemicIncome" />
        </FormLine>
      </div>

      <FormSection title="Part V — Summary" id="part5" />

      <div className="space-y-0.5">
        <FormLine line="40" label="Net farm rental income or (loss) from Form 4835" path="/schEFarmRentalIncome">
          <FactInput path="/schEFarmRentalIncome" />
        </FormLine>
        <SummaryLine line="41" label="Total income or (loss) (lines 26+32+37+39+40)" path="/schETotalIncome" bold link="schedule1#line5" />
        <FormLine line="42" label="Reconciliation of farming and fishing income" path="/schEReconciliationFarming">
          <FactInput path="/schEReconciliationFarming" />
        </FormLine>
        <FormLine line="43" label="Reconciliation for real estate professionals" path="/schEReconciliationRePro">
          <FactInput path="/schEReconciliationRePro" />
        </FormLine>
      </div>
    </>
  );
}

export function ScheduleE() {
  return (
    <ReceiptLayout subtitle="Supplemental Income and Loss" formName="Schedule E">
      <ScheduleEContent />
    </ReceiptLayout>
  );
}
