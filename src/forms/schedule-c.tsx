import { FormSection } from "@/components/form-section";
import { FormLine } from "@/components/form-line";
import { SummaryLine } from "@/components/summary-line";
import { FactInput } from "@/components/fact-input";
import { FactCheckbox } from "@/components/fact-checkbox";
import { ReceiptLayout } from "@/components/receipt-layout";

function ScheduleCContent() {
  return (
    <>
      <FormSection title="Part I — Income" id="part1" />

      <div className="space-y-0.5">
        <FormLine line="1" label="Gross receipts or sales" path="/schCGrossReceipts">
          <FactInput path="/schCGrossReceipts" />
        </FormLine>
        <div className="ml-8">
          <FactCheckbox path="/schCStatutoryEmployee" label="Statutory employee (W-2 box checked)" />
        </div>
        <FormLine line="2" label="Returns and allowances" path="/schCReturnsAndAllowances">
          <FactInput path="/schCReturnsAndAllowances" />
        </FormLine>
        <SummaryLine line="3" label="Subtract line 2 from line 1" path="/schCNetReceipts" />
        <SummaryLine line="4" label="Cost of goods sold (from line 42)" path="/schCCostOfGoodsSold" link="scheduleC#part3" />
        <SummaryLine line="5" label="Gross profit (line 3 minus line 4)" path="/schCGrossProfit" />
        <FormLine line="6" label="Other income" path="/schCOtherIncome">
          <FactInput path="/schCOtherIncome" />
        </FormLine>
        <SummaryLine line="7" label="Gross income (add lines 5 and 6)" path="/schCGrossIncome" bold />
      </div>

      <FormSection title="Part II — Expenses" id="part2" />

      <div className="space-y-0.5">
        <FormLine line="8" label="Advertising" path="/schCAdvertising">
          <FactInput path="/schCAdvertising" />
        </FormLine>
        <FormLine line="9" label="Car and truck expenses" path="/schCCarAndTruckExpenses">
          <FactInput path="/schCCarAndTruckExpenses" />
        </FormLine>
        <FormLine line="10" label="Commissions and fees" path="/schCCommissionsAndFees">
          <FactInput path="/schCCommissionsAndFees" />
        </FormLine>
        <FormLine line="11" label="Contract labor" path="/schCContractLabor">
          <FactInput path="/schCContractLabor" />
        </FormLine>
        <FormLine line="12" label="Depletion" path="/schCDepletion">
          <FactInput path="/schCDepletion" />
        </FormLine>
        <FormLine line="13" label="Depreciation and section 179 expense deduction" path="/schCDepreciation">
          <FactInput path="/schCDepreciation" />
        </FormLine>
        <FormLine line="14" label="Employee benefit programs (other than line 19)" path="/schCEmployeeBenefits">
          <FactInput path="/schCEmployeeBenefits" />
        </FormLine>
        <FormLine line="15" label="Insurance (other than health)" path="/schCInsurance">
          <FactInput path="/schCInsurance" />
        </FormLine>
        <FormLine line="16a" label="Interest — mortgage (paid to banks, etc.)" path="/schCInterestMortgage">
          <FactInput path="/schCInterestMortgage" />
        </FormLine>
        <FormLine line="16b" label="Interest — other" path="/schCInterestOther">
          <FactInput path="/schCInterestOther" />
        </FormLine>
        <FormLine line="17" label="Legal and professional services" path="/schCLegalAndProfessional">
          <FactInput path="/schCLegalAndProfessional" />
        </FormLine>
        <FormLine line="18" label="Office expense" path="/schCOfficeExpense">
          <FactInput path="/schCOfficeExpense" />
        </FormLine>
        <FormLine line="19" label="Pension and profit-sharing plans" path="/schCPensionAndProfitSharing">
          <FactInput path="/schCPensionAndProfitSharing" />
        </FormLine>
        <FormLine line="20a" label="Rent — vehicles, machinery, and equipment" path="/schCRentVehicles">
          <FactInput path="/schCRentVehicles" />
        </FormLine>
        <FormLine line="20b" label="Rent — other business property" path="/schCRentOther">
          <FactInput path="/schCRentOther" />
        </FormLine>
        <FormLine line="21" label="Repairs and maintenance" path="/schCRepairs">
          <FactInput path="/schCRepairs" />
        </FormLine>
        <FormLine line="22" label="Supplies (not included in Part III)" path="/schCSupplies">
          <FactInput path="/schCSupplies" />
        </FormLine>
        <FormLine line="23" label="Taxes and licenses" path="/schCTaxesAndLicenses">
          <FactInput path="/schCTaxesAndLicenses" />
        </FormLine>
        <FormLine line="24a" label="Travel" path="/schCTravel">
          <FactInput path="/schCTravel" />
        </FormLine>
        <FormLine line="24b" label="Deductible meals" path="/schCMeals">
          <FactInput path="/schCMeals" />
        </FormLine>
        <FormLine line="25" label="Utilities" path="/schCUtilities">
          <FactInput path="/schCUtilities" />
        </FormLine>
        <FormLine line="26" label="Wages (less employment credits)" path="/schCWages">
          <FactInput path="/schCWages" />
        </FormLine>
        <FormLine line="27a" label="Energy efficient commercial bldgs deduction" path="/schCEnergyEfficient">
          <FactInput path="/schCEnergyEfficient" />
        </FormLine>
        <SummaryLine line="27b" label="Other expenses (from line 48)" path="/schCOtherExpenses" link="scheduleC#part5" />
        <SummaryLine line="28" label="Total expenses" path="/schCTotalExpenses" bold />
      </div>

      <div className="space-y-0.5 mt-2">
        <SummaryLine line="29" label="Tentative profit or (loss) (line 7 minus line 28)" path="/schCTentativeProfit" />
        <FormLine line="30" label="Expenses for business use of your home" path="/schCBusinessUseOfHome">
          <FactInput path="/schCBusinessUseOfHome" />
        </FormLine>
        <SummaryLine line="31" label="Net profit or (loss)" path="/schCNetProfitOrLoss" bold />
      </div>

      <div className="space-y-1 ml-2 mt-2">
        <FactCheckbox path="/schCAllAtRisk" label="32a. All investment is at risk" />
        <FactCheckbox path="/schCSomeNotAtRisk" label="32b. Some investment is not at risk" />
      </div>

      <FormSection title="Part III — Cost of Goods Sold" id="part3" />

      <div className="space-y-0.5">
        <FormLine line="35" label="Inventory at beginning of year" path="/schCBeginningInventory">
          <FactInput path="/schCBeginningInventory" />
        </FormLine>
        <FormLine line="36" label="Purchases less cost of items withdrawn for personal use" path="/schCPurchases">
          <FactInput path="/schCPurchases" />
        </FormLine>
        <FormLine line="37" label="Cost of labor (not amounts paid to yourself)" path="/schCCogsLabor">
          <FactInput path="/schCCogsLabor" />
        </FormLine>
        <FormLine line="38" label="Materials and supplies" path="/schCCogsMaterials">
          <FactInput path="/schCCogsMaterials" />
        </FormLine>
        <FormLine line="39" label="Other costs" path="/schCCogsOtherCosts">
          <FactInput path="/schCCogsOtherCosts" />
        </FormLine>
        <SummaryLine line="40" label="Add lines 35 through 39" path="/schCCogsSubtotal" />
        <FormLine line="41" label="Inventory at end of year" path="/schCEndingInventory">
          <FactInput path="/schCEndingInventory" />
        </FormLine>
        <SummaryLine line="42" label="Cost of goods sold (line 40 minus line 41)" path="/schCCogsTotal" bold />
      </div>

      <FormSection title="Part V — Other Expenses" id="part5" />

      <div className="space-y-0.5">
        <FormLine line="48" label="Total other expenses" path="/schCTotalOtherExpenses">
          <FactInput path="/schCTotalOtherExpenses" />
        </FormLine>
      </div>
    </>
  );
}

export function ScheduleC() {
  return (
    <ReceiptLayout subtitle="Profit or Loss From Business" formName="Schedule C">
      <ScheduleCContent />
    </ReceiptLayout>
  );
}
