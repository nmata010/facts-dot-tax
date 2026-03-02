import { FormSection } from "@/components/form-section";
import { FormLine } from "@/components/form-line";
import { SummaryLine } from "@/components/summary-line";
import { FactInput } from "@/components/fact-input";
import { FactCheckbox } from "@/components/fact-checkbox";
import { XmlSnippet } from "@/components/xml-snippet";
import { ReceiptLayout, useView } from "@/components/receipt-layout";

function CheckboxXmlGroup({ paths }: { paths: string[] }) {
  const view = useView();
  if (view !== "xml") return null;
  return (
    <div
      className="transition-all duration-300"
      style={{ opacity: 1, maxHeight: 500, overflow: "hidden" }}
    >
      {paths.map((path) => (
        <div key={path} className="flex gap-2">
          <span className="w-6 shrink-0" />
          <XmlSnippet path={path} className="flex-1" />
        </div>
      ))}
    </div>
  );
}

function Schedule2Content() {
  const view = useView();
  const showXml = view === "xml";

  return (
    <>
      {/* ===== Part I — Tax ===== */}
      <FormSection title="Part I — Tax" id="part1" />

      <div className="text-[10px] text-muted-foreground mb-2">Additions to Tax</div>
      <div className="space-y-0.5">
        <FormLine line="1a" label="Excess advance PTC repayment" path="/excessPTCRepayment">
          <FactInput path="/excessPTCRepayment" />
        </FormLine>
        <FormLine line="1b" label="Repayment of new clean vehicle credit" path="/repaymentNewCleanVehicleCredit">
          <FactInput path="/repaymentNewCleanVehicleCredit" />
        </FormLine>
        <FormLine line="1c" label="Repayment of prev. owned clean vehicle credit" path="/repaymentPrevOwnedCleanVehicleCredit">
          <FactInput path="/repaymentPrevOwnedCleanVehicleCredit" />
        </FormLine>
        <FormLine line="1d" label="Recapture of net EPE (Form 4255)" path="/recaptureNetEPE4255">
          <FactInput path="/recaptureNetEPE4255" />
        </FormLine>

        {/* Line 1e — Excessive payments with checkboxes */}
        <FormLine line="1e" label="Excessive payments on gross EPE" path="/excessivePaymentsGrossEPE">
          <FactInput path="/excessivePaymentsGrossEPE" />
        </FormLine>
        <div
          className="transition-all duration-300"
          style={{ opacity: showXml ? 0 : 1, maxHeight: showXml ? 0 : 200, overflow: "hidden" }}
        >
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 ml-8 mb-2">
            <FactCheckbox path="/excessivePaymentsLine1a" label="(i) Line 1a" />
            <FactCheckbox path="/excessivePaymentsLine1c" label="(ii) Line 1c" />
            <FactCheckbox path="/excessivePaymentsLine1d" label="(iii) Line 1d" />
            <FactCheckbox path="/excessivePaymentsLine2a" label="(iv) Line 2a" />
          </div>
        </div>
        <CheckboxXmlGroup paths={["/excessivePaymentsLine1a", "/excessivePaymentsLine1c", "/excessivePaymentsLine1d", "/excessivePaymentsLine2a"]} />

        {/* Line 1f — 20% EP with checkboxes */}
        <FormLine line="1f" label="20% EP from Form 4255" path="/twentyPercentEP4255">
          <FactInput path="/twentyPercentEP4255" />
        </FormLine>
        <div
          className="transition-all duration-300"
          style={{ opacity: showXml ? 0 : 1, maxHeight: showXml ? 0 : 200, overflow: "hidden" }}
        >
          <div className="grid grid-cols-2 gap-x-3 gap-y-1 ml-8 mb-2">
            <FactCheckbox path="/twentyPercentEPLine1a" label="(i) Line 1a" />
            <FactCheckbox path="/twentyPercentEPLine1c" label="(ii) Line 1c" />
            <FactCheckbox path="/twentyPercentEPLine1d" label="(iii) Line 1d" />
            <FactCheckbox path="/twentyPercentEPLine2a" label="(iv) Line 2a" />
          </div>
        </div>
        <CheckboxXmlGroup paths={["/twentyPercentEPLine1a", "/twentyPercentEPLine1c", "/twentyPercentEPLine1d", "/twentyPercentEPLine2a"]} />

        <FormLine line="1y" label="Other additions to tax" path="/otherAdditionsToTax">
          <FactInput path="/otherAdditionsToTax" />
        </FormLine>
        <SummaryLine line="1z" label="Total additions to tax" path="/totalAdditionsToTax" />
      </div>

      <div className="mt-3 space-y-0.5">
        <FormLine line="2" label="Alternative minimum tax (Form 6251)" path="/alternativeMinimumTax">
          <FactInput path="/alternativeMinimumTax" />
        </FormLine>
      </div>

      <div className="mt-2">
        <SummaryLine line="3" label="TOTAL (Form 1040, line 17)" path="/totalAdditionalTaxSchedule2" bold />
      </div>

      {/* ===== Part II — Other Taxes ===== */}
      <FormSection title="Part II — Other Taxes" id="part2" />

      <div className="space-y-0.5">
        <FormLine line="4" label="Self-employment tax (Sched. SE)" path="/selfEmploymentTax">
          <FactInput path="/selfEmploymentTax" />
        </FormLine>

        {/* Line 4 exemption checkboxes */}
        <div
          className="transition-all duration-300"
          style={{ opacity: showXml ? 0 : 1, maxHeight: showXml ? 0 : 200, overflow: "hidden" }}
        >
          <div className="flex gap-2 mb-1">
            <span className="w-6 shrink-0 text-muted-foreground/60 text-[10px]"></span>
            <span className="text-[10px] text-muted-foreground/60">SE tax exemptions:</span>
          </div>
          <div className="flex flex-wrap gap-x-3 gap-y-1 ml-8 mb-2">
            <FactCheckbox path="/seExemption4361" label="Form 4361" />
            <FactCheckbox path="/seExemption4029" label="Form 4029" />
            <FactCheckbox path="/seExemptionOther" label="Other" />
          </div>
        </div>
        <CheckboxXmlGroup paths={["/seExemption4361", "/seExemption4029", "/seExemptionOther"]} />

        <FormLine line="5" label="SS/Medicare on unreported tips" path="/unreportedTipTax">
          <FactInput path="/unreportedTipTax" />
        </FormLine>
        <FormLine line="6" label="Uncollected SS/Medicare on wages" path="/uncollectedSsMedicareTaxWages">
          <FactInput path="/uncollectedSsMedicareTaxWages" />
        </FormLine>
        <SummaryLine line="7" label="Total additional SS/Medicare tax" path="/totalAdditionalSsMedicareTax" />
        <FormLine line="8" label="Additional tax on IRAs (Form 5329)" path="/additionalTaxIRA">
          <FactInput path="/additionalTaxIRA" />
        </FormLine>
        <FormLine line="9" label="Household employment taxes (Sched. H)" path="/householdEmploymentTaxes">
          <FactInput path="/householdEmploymentTaxes" />
        </FormLine>
        <FormLine line="11" label="Additional Medicare Tax (Form 8959)" path="/additionalMedicareTax">
          <FactInput path="/additionalMedicareTax" />
        </FormLine>
        <FormLine line="12" label="Net investment income tax (Form 8960)" path="/netInvestmentIncomeTax">
          <FactInput path="/netInvestmentIncomeTax" />
        </FormLine>
        <FormLine line="13" label="Uncollected SS/Medicare from W-2" path="/uncollectedSsMedicareW2">
          <FactInput path="/uncollectedSsMedicareW2" />
        </FormLine>
        <FormLine line="14" label="Interest on installment income" path="/interestInstallmentIncome">
          <FactInput path="/interestInstallmentIncome" />
        </FormLine>
        <FormLine line="15" label="Interest on deferred tax (installment)" path="/interestDeferredTaxInstallment">
          <FactInput path="/interestDeferredTaxInstallment" />
        </FormLine>
        <FormLine line="16" label="Recapture of low-income housing credit" path="/recaptureLowIncomeHousingCredit">
          <FactInput path="/recaptureLowIncomeHousingCredit" />
        </FormLine>
      </div>

      <div className="text-[10px] text-muted-foreground mt-4 mb-2">Other Additional Taxes</div>
      <div className="space-y-0.5">
        <FormLine line="17a" label="Recapture of other credits" path="/recaptureOtherCredits">
          <FactInput path="/recaptureOtherCredits" />
        </FormLine>
        <FormLine line="17b" label="Recapture of federal mortgage subsidy" path="/recaptureFederalMortgageSubsidy">
          <FactInput path="/recaptureFederalMortgageSubsidy" />
        </FormLine>
        <FormLine line="17c" label="Additional tax on HSA distributions" path="/additionalTaxHSADistributions">
          <FactInput path="/additionalTaxHSADistributions" />
        </FormLine>
        <FormLine line="17d" label="Additional tax on HSA (ineligible)" path="/additionalTaxHSAIneligible">
          <FactInput path="/additionalTaxHSAIneligible" />
        </FormLine>
        <FormLine line="17e" label="Additional tax on Archer MSA" path="/additionalTaxArcherMSA">
          <FactInput path="/additionalTaxArcherMSA" />
        </FormLine>
        <FormLine line="17f" label="Additional tax on Medicare Adv. MSA" path="/additionalTaxMedicareAdvantageMSA">
          <FactInput path="/additionalTaxMedicareAdvantageMSA" />
        </FormLine>
        <FormLine line="17g" label="Recapture charitable deduction" path="/recaptureCharitableDeduction">
          <FactInput path="/recaptureCharitableDeduction" />
        </FormLine>
        <FormLine line="17h" label="Nonqualified deferred comp (409A)" path="/nonqualifiedDeferredComp409A">
          <FactInput path="/nonqualifiedDeferredComp409A" />
        </FormLine>
        <FormLine line="17i" label="Nonqualified deferred comp (457A)" path="/nonqualifiedDeferredComp457A">
          <FactInput path="/nonqualifiedDeferredComp457A" />
        </FormLine>
        <FormLine line="17j" label="Section 72(m)(5) excess benefits" path="/excessBenefitsTax72m5">
          <FactInput path="/excessBenefitsTax72m5" />
        </FormLine>
        <FormLine line="17k" label="Golden parachute payments" path="/goldenParachutePayments">
          <FactInput path="/goldenParachutePayments" />
        </FormLine>
        <FormLine line="17l" label="Accumulation distribution of trusts" path="/trustAccumulationDistributionTax">
          <FactInput path="/trustAccumulationDistributionTax" />
        </FormLine>
        <FormLine line="17m" label="Excise tax on insider stock comp" path="/exciseTaxInsiderStockComp">
          <FactInput path="/exciseTaxInsiderStockComp" />
        </FormLine>
        <FormLine line="17n" label="Look-back interest" path="/lookBackInterest">
          <FactInput path="/lookBackInterest" />
        </FormLine>
        <FormLine line="17o" label="Non-effectively connected income tax" path="/nonEffectivelyConnectedIncomeTax">
          <FactInput path="/nonEffectivelyConnectedIncomeTax" />
        </FormLine>
        <FormLine line="17p" label="Interest from Form 8621, line 16f" path="/interestForm8621Line16f">
          <FactInput path="/interestForm8621Line16f" />
        </FormLine>
        <FormLine line="17q" label="Interest from Form 8621, line 24" path="/interestForm8621Line24">
          <FactInput path="/interestForm8621Line24" />
        </FormLine>
        <FormLine line="17z" label="Other taxes" path="/otherAdditionalTaxes">
          <FactInput path="/otherAdditionalTaxes" />
        </FormLine>
        <SummaryLine line="18" label="Total additional taxes" path="/totalOtherAdditionalTaxes" />
      </div>

      <div className="mt-3 space-y-0.5">
        <FormLine line="19" label="Recapture of net EPE (Form 4255, line 1d)" path="/recaptureNetEPE4255Line1d">
          <FactInput path="/recaptureNetEPE4255Line1d" />
        </FormLine>
        <FormLine line="20" label="Section 965 installment (Form 965-A)" path="/section965Installment">
          <FactInput path="/section965Installment" />
        </FormLine>
      </div>

      <div className="mt-2">
        <SummaryLine line="21" label="TOTAL OTHER TAXES (Form 1040, line 23)" path="/totalOtherTaxesSchedule2" bold />
      </div>
    </>
  );
}

export function Schedule2() {
  return (
    <ReceiptLayout subtitle="Additional Taxes" formName="Schedule 2">
      <Schedule2Content />
    </ReceiptLayout>
  );
}
