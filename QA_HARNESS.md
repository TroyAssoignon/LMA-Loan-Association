# Amendment Radar: Bank-Grade Regression Harness

**Version:** 1.0 (Hackathon Release)
**QA Lead:** J. Doe (Simulated)
**Objective:** Validate that Amendment Radar correctly detects, classifies, and operationalizes material changes in syndicated loan amendments, with zero hallucination of economic terms.

---

## 1. The Validation Checklist (Assertions)

**Status:** 🔴 Critical Path (Must Pass 100% to Demo)

| ID | Assertion / Component | Pass Criteria (Exact Match) | UI Verification Location |
| :--- | :--- | :--- | :--- |
| **A-01** | **Covenant Tightening** | Detects **DSCR** change. Old: `1.20:1.00`, New: `1.30:1.00`. Score > 90. | Radar Tab -> "Covenant Tightened" Row (Red Icon) |
| **A-02** | **Ops Workload Spike** | Detects **Testing Frequency** change. Old: `Quarterly`, New: `Monthly`. Score > 80. | Radar Tab -> "Reporting Cadence Increased" Row (Red Icon) |
| **A-03** | **Deadline Compression** | Detects **Reporting Deadline** change. Old: `120 days`, New: `90 days`. | Radar Tab -> "Deadline Accelerated" Row |
| **A-04** | **Hidden Leverage** | Detects **EBITDA** definition change. Rationale mentions "15% cap" or "add-backs". | Radar Tab -> "Definition Expanded" Row |
| **A-05** | **ESG Scope Creep** | Detects **Scope 3** added to KPI. Impact: Data Feasibility risk. | Radar Tab -> "Definition Expanded" or "New Provision" |
| **A-06** | **Trading Friction (KYC)** | Detects **Sanctions/KYC** clause (2.8). Type: `TransferRestriction`. Label: "Transfer Restriction Added". | Radar Tab -> "Transfer Restriction Added" Row |
| **A-07** | **Ops Friction (Portal)** | Detects **Digital Platform** clause (2.9). Type: `OperationalMandate`. Label: "Ops Mandate: Digital Delivery". | Radar Tab -> "Ops Mandate: Digital Delivery" Row |
| **A-08** | **Trading Blocker** | Detects **Disqualified Lender** clause (2.10). Type: `TransferRestriction`. Label: "Transfer Restriction Added". | Radar Tab -> "Transfer Restriction Added" Row |
| **A-09** | **Noise Filtering** | **Consequential Updates** (2.6, 2.7) must be grouped at bottom, collapsed by default. | Radar Tab -> Bottom Section (Grey, Collapsed) |
| **A-10** | **Ledger Completeness** | Ledger must contain ≥ 8 items. Must include **Sanctions Check** (Agent) & **Digital Delivery** (Borrower). | Ledger Tab -> Table Rows |
| **A-11** | **Ledger Attribution** | Every obligation must have an **Owner** (Borrower/Agent) and **Evidence Strength**. | Ledger Tab -> "Owner" Column |
| **A-12** | **Banker Insights** | **Ops Delta** shows "+8 deliverables/yr". **Consent Map** shows "Majority Lenders". | Evidence Tab -> Insights Panel |

---

## 2. Expected Output Shape (The "Golden JSON")

Use this JSON object structure to validate the backend extraction logic.

```json
{
  "changeEvents": [
    {
      "id": "chg_dscr",
      "changeType": "ThresholdChanged",
      "materialityScore": 100,
      "beforeText": "1.20:1.00",
      "afterText": "1.30:1.00",
      "rationale": "CRITICAL: Tightening of DSCR covenant (Base 90 + 10 Tightening). Increases default risk.",
      "provenance": { "sectionRef": "Section 2.4" }
    },
    {
      "id": "chg_freq",
      "changeType": "FrequencyChanged",
      "materialityScore": 95,
      "beforeText": "Quarterly",
      "afterText": "Monthly",
      "rationale": "CRITICAL OPS: Frequency increase (Base 80 + 15 Freq Increase). Triples monitoring workload.",
      "provenance": { "sectionRef": "Section 2.5" }
    },
    {
      "id": "chg_deadline",
      "changeType": "DeadlineChanged",
      "materialityScore": 75,
      "beforeText": "120 days",
      "afterText": "90 days",
      "rationale": "Reporting window compressed by 30 days.",
      "provenance": { "sectionRef": "Section 2.3" }
    },
    {
      "id": "chg_ebitda",
      "changeType": "DefinitionChanged",
      "materialityScore": 75,
      "beforeText": "Standard EBITDA",
      "afterText": "EBITDA + 15% Add-backs",
      "rationale": "Leverage dilution via new add-backs (Restructuring/Severance).",
      "provenance": { "sectionRef": "Section 2.1" }
    },
    {
      "id": "chg_kyc",
      "changeType": "TransferRestriction",
      "materialityScore": 85,
      "beforeText": "Standard Transfer Provisions",
      "afterText": "Sanctions Condition Precedent",
      "rationale": "TRANSFER FRICTION: Agent must complete Sanctions/KYC checks prior to effectiveness.",
      "provenance": { "sectionRef": "Section 2.8" }
    },
    {
      "id": "chg_portal",
      "changeType": "OperationalMandate",
      "materialityScore": 65,
      "beforeText": "Email Delivery",
      "afterText": "Digital Platform Only",
      "rationale": "OPERATIONAL MANDATE: Documents must be posted to secure platform; email invalid.",
      "provenance": { "sectionRef": "Section 2.9" }
    },
    {
      "id": "chg_dq_lender",
      "changeType": "TransferRestriction",
      "materialityScore": 85,
      "beforeText": "Standard Transfer Provisions",
      "afterText": "Disqualified Lender Consent",
      "rationale": "LIQUIDITY RISK: New Borrower consent right for Disqualified Lenders.",
      "provenance": { "sectionRef": "Section 2.10" }
    },
    {
      "id": "chg_admin_1",
      "changeType": "ConsequentialUpdate",
      "materialityScore": 10,
      "rationale": "Administrative update to support monthly testing.",
      "provenance": { "sectionRef": "Section 2.6" }
    }
  ],
  "obligations": [
    {
      "id": "obl_sanctions",
      "category": "Transfer",
      "obligationType": "Sanctions Screening",
      "description": "Perform KYC and Sanctions check on New Lender",
      "owner": "Agent",
      "evidenceStrength": "Strong",
      "frequency": "Per Transfer",
      "provenance": { "sectionRef": "Section 2.8" }
    },
    {
      "id": "obl_portal",
      "category": "Reporting",
      "obligationType": "Portal Upload",
      "description": "Post financial statements to Digital Platform",
      "owner": "Borrower",
      "evidenceStrength": "Strong",
      "provenance": { "sectionRef": "Section 2.9" }
    }
  ],
  "derivativeAnalysis": {
    "operationalDeltaSummary": {
      "newDeliverablesPerYear": 8,
      "netNewBurden": ["Monthly Compliance Certs", "Digital Platform Uploads"]
    },
    "riskSignals": {
      "controlRisk": "High",
      "dataFeasibility": "Medium"
    }
  }
}
```

---

## 3. The 30-Second Judge Demo Script

**Actor:** Secondary Trading Desk Head / Ops Lead
**Context:** Live LMA Hackathon Demo

**(0:00 - The Setup)**
"We all know the pain. A 30-page amendment lands on the desk. Is it just a repricing? Or did they sneak in a transfer blocker?"
*(Click 'Load Demo Docs' -> 'Analyze Changes')*

**(0:05 - The Reveal)**
"Boom. In 4 seconds, Amendment Radar cuts through the noise. It found **5 Critical Changes**. Look here—it didn't just find the covenant tightening to 1.30x..."
*(Hover over Clause 2.10 Disqualified Lenders - 'Transfer Restriction Added')*
"...it found a **Liquidity Trap**. They inserted a 'Disqualified Lender' consent right. That changes my settlement timeline from T+5 to T+20."

**(0:15 - The Ops Friction)**
"Now, look at the Ops impact."
*(Click 'Ledger' tab)*
"It extracted the **Operational Delta**. We're moving from Quarterly to **Monthly** reporting. That's 8 extra compliance certificates a year. And look at Clause 2.9—**Ops Mandate: Digital Delivery**. Email delivery is now invalid. If my team misses that, we breach."

**(0:25 - The Audit Artifact)**
*(Click 'Evidence' tab)*
"Finally, the **Evidence Pack**. Here's the Conformed Copy view with 'Banker Insights'—Ops Delta calculated, Risk Signals flagged. I export this, attach it to the trade ticket, and my compliance check is done. Thank you."

---

## 4. Adversarial Test Cases (Failure Modes)

| Test ID | Input / Action | Expected System Behavior (Pass) |
| :--- | :--- | :--- |
| **Fail-01** | **The "Scope 3" Trap**: Remove Clause 2.2 from the text box but leave the header. | **Pass:** Risk Signal for "Data Feasibility" drops from 'Medium' to 'High' (or disappears). App must NOT hallucinate Scope 3 risk if text is gone. |
| **Fail-02** | **The "Fat Finger" Typo**: Change DSCR in text to "1.3x0:1.00". | **Pass:** Logic should still capture it as a Threshold Change, possibly with lower Confidence, or flag as "Review Required". |
| **Fail-03** | **The "Lazy Lawyer"**: Paste the exact same text into both Base and Amendment. | **Pass:** Screen should show "No Material Changes Detected" or "Documents Identical". Must not crash. |
| **Fail-04** | **The "Implied" Clause**: Add a clause without "Section X.Y added" intro, just the raw text. | **Pass:** Heuristic extraction should still catch the *Obligation* (e.g., "Borrower must pay...") and list it in the Ledger, even if `changeType` confidence is lower. |
| **Fail-05** | **The "Conflict"**: Base says "120 days", Amendment says "90 days" in Clause 2.3 but "100 days" in Clause 4. | **Pass:** App should flag both, or ideally highlight the ambiguity in the Ledger (e.g., "Conflicting Deadlines Detected"). |
