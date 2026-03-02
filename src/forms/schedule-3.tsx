import { FormSection } from "@/components/form-section";
import { FormLine } from "@/components/form-line";
import { SummaryLine } from "@/components/summary-line";
import { FactInput } from "@/components/fact-input";
import { ReceiptLayout } from "@/components/receipt-layout";

export function Schedule3() {
  return (
    <ReceiptLayout subtitle="Additional Credits and Payments" formName="Schedule 3">
      {/* ===== Part I — Nonrefundable Credits ===== */}
      <FormSection title="Part I — Nonrefundable Credits" id="part1" />

      <div className="space-y-0.5">
        <FormLine line="1" label="Foreign tax credit" path="/foreignTaxCredit">
          <FactInput path="/foreignTaxCredit" />
        </FormLine>
        <FormLine line="2" label="Child and dependent care credit" path="/childDependentCareCredit">
          <FactInput path="/childDependentCareCredit" />
        </FormLine>
        <FormLine line="3" label="Education credits" path="/educationCredits">
          <FactInput path="/educationCredits" />
        </FormLine>
        <FormLine line="4" label="Retirement savings credit" path="/retirementSavingsCredit">
          <FactInput path="/retirementSavingsCredit" />
        </FormLine>
        <FormLine line="5a" label="Residential clean energy credit" path="/residentialCleanEnergyCredit">
          <FactInput path="/residentialCleanEnergyCredit" />
        </FormLine>
        <FormLine line="5b" label="Energy efficient home credit" path="/energyEfficientHomeCredit">
          <FactInput path="/energyEfficientHomeCredit" />
        </FormLine>
      </div>

      <div className="text-[10px] text-muted-foreground mt-4 mb-2">Other Nonrefundable Credits</div>
      <div className="space-y-0.5">
        <FormLine line="6a" label="General business credit" path="/generalBusinessCredit">
          <FactInput path="/generalBusinessCredit" />
        </FormLine>
        <FormLine line="6b" label="Prior year minimum tax credit" path="/priorYearMinTaxCredit">
          <FactInput path="/priorYearMinTaxCredit" />
        </FormLine>
        <FormLine line="6c" label="Adoption credit" path="/adoptionCredit">
          <FactInput path="/adoptionCredit" />
        </FormLine>
        <FormLine line="6d" label="Elderly or disabled credit" path="/elderlyDisabledCredit">
          <FactInput path="/elderlyDisabledCredit" />
        </FormLine>
        <FormLine line="6f" label="Clean vehicle credit" path="/cleanVehicleCredit">
          <FactInput path="/cleanVehicleCredit" />
        </FormLine>
        <FormLine line="6g" label="Mortgage interest credit" path="/mortgageInterestCredit">
          <FactInput path="/mortgageInterestCredit" />
        </FormLine>
        <FormLine line="6h" label="DC first-time homebuyer credit" path="/dcFirstTimeHomebuyerCredit">
          <FactInput path="/dcFirstTimeHomebuyerCredit" />
        </FormLine>
        <FormLine line="6i" label="Qualified electric vehicle credit" path="/qualifiedElectricVehicleCredit">
          <FactInput path="/qualifiedElectricVehicleCredit" />
        </FormLine>
        <FormLine line="6j" label="Alt fuel vehicle refueling credit" path="/altFuelVehicleCredit">
          <FactInput path="/altFuelVehicleCredit" />
        </FormLine>
        <FormLine line="6k" label="Tax credit bonds" path="/taxCreditBondsCredit">
          <FactInput path="/taxCreditBondsCredit" />
        </FormLine>
        <FormLine line="6l" label="Form 8978, line 14" path="/form8978Credit">
          <FactInput path="/form8978Credit" />
        </FormLine>
        <FormLine line="6m" label="Previously owned clean vehicle" path="/prevOwnedCleanVehicleCredit">
          <FactInput path="/prevOwnedCleanVehicleCredit" />
        </FormLine>
        <FormLine line="6z" label="Other nonrefundable credits" path="/otherNonrefundableCredits">
          <FactInput path="/otherNonrefundableCredits" />
        </FormLine>
        <SummaryLine line="7" label="Total other nonrefundable credits" path="/totalOtherNonrefundableCredits" />
      </div>

      <div className="mt-2">
        <SummaryLine line="8" label="TOTAL NONREFUNDABLE CREDITS" path="/totalNonrefundableCreditsSchedule3" bold />
      </div>

      {/* ===== Part II — Other Payments and Refundable Credits ===== */}
      <FormSection title="Part II — Other Payments and Refundable Credits" id="part2" />

      <div className="space-y-0.5">
        <FormLine line="9" label="Net premium tax credit" path="/netPremiumTaxCredit">
          <FactInput path="/netPremiumTaxCredit" />
        </FormLine>
        <FormLine line="10" label="Extension payment" path="/extensionPayment">
          <FactInput path="/extensionPayment" />
        </FormLine>
        <FormLine line="11" label="Excess SS and RRTA tax withheld" path="/excessSocialSecurityTax">
          <FactInput path="/excessSocialSecurityTax" />
        </FormLine>
        <FormLine line="12" label="Federal fuel tax credit" path="/federalFuelTaxCredit">
          <FactInput path="/federalFuelTaxCredit" />
        </FormLine>
      </div>

      <div className="text-[10px] text-muted-foreground mt-4 mb-2">Other Payments or Refundable Credits</div>
      <div className="space-y-0.5">
        <FormLine line="13a" label="Form 2439" path="/form2439Credit">
          <FactInput path="/form2439Credit" />
        </FormLine>
        <FormLine line="13b" label="Section 1341 credit" path="/section1341Credit">
          <FactInput path="/section1341Credit" />
        </FormLine>
        <FormLine line="13c" label="Elective payment election" path="/electivePaymentElection">
          <FactInput path="/electivePaymentElection" />
        </FormLine>
        <FormLine line="13d" label="Deferred net 965 tax liability" path="/deferred965TaxLiability">
          <FactInput path="/deferred965TaxLiability" />
        </FormLine>
        <FormLine line="13z" label="Other refundable credits" path="/otherRefundableCredits">
          <FactInput path="/otherRefundableCredits" />
        </FormLine>
        <SummaryLine line="14" label="Total other refundable credits" path="/totalOtherRefundableCredits" />
      </div>

      <div className="mt-2">
        <SummaryLine line="15" label="TOTAL PAYMENTS & REFUNDABLE CREDITS" path="/totalRefundableCreditsSchedule3" bold />
      </div>
    </ReceiptLayout>
  );
}
