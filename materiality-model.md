# Amendment Radar: Materiality Scoring Model

**Purpose:** To automate the triage of legal changes, instantly flagging "Trade-Critical" and "Ops-Critical" modifications while suppressing administrative noise.

### 1. The "Urgency of Action" Score (0–100)
The AI does not just find changes; it weighs them based on their impact to the bank's bottom line and operational risk.

| Score Range | Classification | Banker Translation | Action Required |
| :--- | :--- | :--- | :--- |
| **90–100** | **CRITICAL** | "Economic / Default Trigger" | Immediate update to LoanIQ/WSO rate grids. Trade blocking. |
| **70–89** | **HIGH** | "Ops Friction / Liquidity" | New calendar alerts. Assessment of secondary trading eligibility. |
| **40–69** | **MEDIUM** | "Credit Monitoring" | Update covenant compliance spreadsheets. Analyst review. |
| **0–39** | **LOW** | "Administrative" | No immediate action. Conformed copy update only. |

### 2. Scoring Logic & Weights

#### A. Base Points (Category Impact)
*   **95 pts: Economics.** Interest Margins, Floors, OID, Maturity Date.
*   **90 pts: Financial Covenants.** DSCR, Leverage Ratio, Net Worth (The "Tripwires").
*   **85 pts: Transferability.** Consent rights, Assignment fees, Whitelists (The "Exit Strategy").
*   **80 pts: Ops Burden.** Reporting frequency (Quarterly $\to$ Monthly), new compliance certificates.
*   **75 pts: Key Definitions.** "EBITDA" or "Permitted Indebtedness" (Hidden leverage).
*   **60 pts: Deadlines.** Reporting days (120 $\to$ 90 days).
*   **50 pts: ESG / Other.** KPIs, Representations.

#### B. Adjustment Rules (Context Modifiers)
*   **+15 pts: Frequency Increase.** Changing reporting from Quarterly to Monthly triples the workload for Agency Ops.
*   **+10 pts: Tightening.** Reducing borrower headroom (e.g., DSCR 1.20x $\to$ 1.30x) increases default probability.
*   **+20 pts: Margin Link.** If an ESG KPI change is tied to a sustainability margin ratchet, it becomes an Economic change.

### 3. Demo Examples (From Prototype)

**Event 1: DSCR Covenant Tightening**
*   *Change:* Min DSCR increased from 1.20x to 1.30x.
*   *Base:* 90 (Financial Covenant)
*   *Adjustment:* +10 (Tightening/Risk Increase)
*   **Final Score: 100 (Critical)**

**Event 2: Reporting Frequency Increase**
*   *Change:* Compliance testing moves from Quarterly to Monthly.
*   *Base:* 80 (Ops Burden)
*   *Adjustment:* +15 (Workload Multiplier)
*   **Final Score: 95 (Critical - Ops Alert)**

**Event 3: EBITDA Definition Expansion**
*   *Change:* 15% Cap on "One-time restructuring charges" added back to EBITDA.
*   *Base:* 75 (Definition)
*   *Adjustment:* -5 (Loosening/Borrower Friendly)
*   **Final Score: 70 (High)**
