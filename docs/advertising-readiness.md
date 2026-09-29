# Advertising launch checklist — 30 September 2026

Current state: no advertising or analytics scripts, no CMP deployed; AdSlot remains hidden.
The public notices describe this state and clearly identify advertising as planned.
Scope is /edugames/ only; the main domain and other projects are outside this change.

Before treating the legal notices as complete:
- Confirm the legal operator/controller identity and appropriate contact/address details with the owner. VinMat is a brand, not a verified legal entity. Add the confirmed information in both languages; do not guess it from account metadata.
- Confirm the stated email retention criteria and Gmail service arrangement with the owner.

Before enabling advertising:
- Confirm the AdSense account/site approval and ownership of the existing domain-level publisher ID.
- Select and configure a Google-certified CMP for personalised advertising in the EEA/UK/Switzerland. Handle other consent requirements for the actual ad mode; non-personalised ads do not automatically mean no consent is required.
- Assess the audience and applicable child-directed treatment. A parent-facing description alone does not determine classification.
- Update both privacy pages for the actual providers, purposes, legal bases, storage, recipients and transfer arrangements.
- Expose working consent choices, refusal and withdrawal/reopening controls. Do not publish a dummy cookie-settings button.
- Verify no consent-dependent requests are sent before the required consent; test refusal and withdrawal.
- Keep advertising distinct from download controls; exclude error pages and any screens without substantive content.
- Keep the ads.txt entry at the root domain and verify it belongs to the correct account. Its existence does not prove approval.

References:
- https://support.google.com/publisherpolicies/answer/10437794
- https://support.google.com/adsense/answer/13554116
- https://support.google.com/publisherpolicies/answer/10436800
- https://support.google.com/publisherpolicies/answer/11112688
