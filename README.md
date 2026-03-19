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

An interactive terminal for the tax engine.

```bash
npx github:nmata010/facts-dot-tax
```

**Commands:**

- `list` — show supported forms
- `schema <form>` — show writable inputs for a form
- `create` — initialize a blank return
- `set <path> <value>` — set a writable input
- `get <path>` — read a computed value
- `form <form>` — show all lines for a form
- `deps <path>` — trace writable inputs that feed a derived fact

**Example:**

```bash
  tax >> create
  Return created.
  ────────────────────────
  tax >> set /filingStatus mfj
  /filingStatus = mfj
  ────────────────────────
  tax >> set /wagesFromW2 85000
  /wagesFromW2 = 85000
  ────────────────────────
  tax >> get /totalTax
  /totalTax = 5946.00
  ────────────────────────
```

### JS Library

Use the tax engine programmatically.

```bash
npm install github:nmata010/facts-dot-tax
```

**Exports:**

- `listForms()` — list supported form IDs
- `getFormSchema(formId)` — get writable inputs for a form
- `createReturn()` — initialize a tax return (async)

**Tax return methods:**

- `setFact(path, value)` — set a writable input
- `getFact(path)` — read a computed value
- `getDollar(path)` — read a computed value as a number
- `getForm(formId)` — get all lines for a form
- `getDependencies(path)` — trace writable inputs that feed a derived fact

**Example:**

```js
import { createReturn } from "facts-dot-tax";

const taxReturn = await createReturn();

taxReturn.setFact("/filingStatus", "mfj");
taxReturn.setFact("/wagesFromW2", "85000");
taxReturn.getFact("/totalTax"); // "5946.00"
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

## Scope Limitations

- **Single instance only** — Forms that support multiple entries in real life (multiple W-2s, multiple Schedule E properties, multiple 1099s) are limited to a single instance. Totals are entered directly.
- **No dual-filer support** — Per-filer forms (Form 8889, Schedule SE) don't yet handle MFJ couples who each need their own copy.
- **No e-filing** — This computes values but does not generate or transmit a tax return.
- **Federal only** — No state tax forms.

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

## Contributors
Big thanks to Mr. Glenn Reeves and his project [excel1040.com](https://excel1040.com/) which proved a helpful testing reference for this project.

## License

[AGPL-3.0](LICENSE)
