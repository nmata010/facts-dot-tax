# `facts d●t tax`

Open-source TY2025 tax computation built on the IRS [fact-graph](https://github.com/IRS-Public/fact-graph) engine.

Tax code is transparent but difficult to consume. The IRS open-sourcing Direct File and the fact-graph engine changed that. [Facts.tax](https://facts.tax/) takes those building blocks and makes 2025 federal tax forms inspectable, computable, and programmable.

**[facts.tax](https://facts.tax/)**

## Three ways to use it

### Form Filling App

A React web app where you fill out tax forms and see computed values update live. Each form can toggle between a fillable view and the raw XML fact-graph representation for inspection.

```
https://facts.tax/app
```

### Command Line

An interactive terminal for the tax engine. Set facts, read computed values, and inspect form dependencies.

```bash
npx github:nmata010/facts-dot-tax
```

```bash
  facts d●t tax
  Open-source TY2025 tax computation
  https://facts.tax/
  Type 'help' for commands

  tax >> create
  Return created. 
  ──────────────────────────────────────
  tax >> set /filingStatus mfj
  /filingStatus = mfj
  ──────────────────────────────────────
  tax >> set /wagesFromW2 85000
  /wagesFromW2 = 85000
  ──────────────────────────────────────
  tax >> get /totalTax
  /totalTax 5946.00
  ──────────────────────────────────────
```

### JS Library

Use the tax engine programmatically

```bash
npm install github:nmata010/facts-dot-tax
```

```js
import { createReturn, listForms, getFormSchema } from "facts-dot-tax";

const ret = await createReturn();

ret.setFact("/filingStatus", "single");
ret.setFact("/totalWages", "85000");

ret.getFact("/totalTax");         // "$13,497.50"
ret.getDollar("/totalTax");       // 13497.5

ret.getForm("1040");              // [{ path, name, value, kind, line }, ...]
ret.getDependencies("/totalTax"); // writable facts that feed into totalTax
```

## Supported forms

| Form | Description |
|------|-------------|
| Form 1040 | U.S. Individual Income Tax Return |
| Schedule 1 | Additional Income and Adjustments |
| Schedule 1-A | Additional Deductions (OBBBA) |
| Schedule 2 | Additional Taxes |
| Schedule 3 | Additional Credits and Payments |
| Schedule A | Itemized Deductions |
| Schedule B | Interest and Ordinary Dividends |
| Schedule C | Profit or Loss From Business |
| Schedule E | Supplemental Income and Loss |
| Schedule SE | Self-Employment Tax |
| Schedule 8812 | Child Tax Credit |
| Form 8889 | Health Savings Accounts |
| Form 8995 | QBI Deduction (Simplified) |
| EIC Worksheet | Earned Income Credit |

## Tax Logic Files

The XML fact dictionary files live in `public/` and are the single source of truth for all tax logic. The receipts app, CLI, and JS library are all just different interfaces to the same fact graph.

```xml
<Fact path="/totalIncome">
      <Derived>
        <Add>
          <Dependency path="/totalWages"/>
          <Dependency path="/taxableInterest"/>
          <Dependency path="/ordinaryDividends"/>
          <Dependency path="/taxableIraDistributions"/>
          <Dependency path="/taxablePensionsAndAnnuities"/>
          <Dependency path="/taxableSocialSecurityBenefits"/>
          <Dependency path="/capitalGainOrLoss"/>
          <Dependency path="/otherIncome"/>
        </Add>
      </Derived>
    </Fact>
```


## Development

```bash
git clone https://github.com/nmata010/facts-dot-tax.git
cd facts-dot-tax
npm install
npm run dev       # receipts app at localhost:8080
npm test          # tax logic tests
```

## Disclaimer

This is not tax advice. facts.tax is a learning endeavor and art project. My best effort was made to accurately implement IRS forms, but it has not been audited and should not be used to prepare an actual tax return.

## License

[TODO: pick a license]
