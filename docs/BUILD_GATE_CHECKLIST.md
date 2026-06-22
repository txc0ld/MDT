# Mini Dream Time Phase 0 / MVP Build Gate Checklist

Reviewed against `doc_e9fe15020fa9_Mini-Dream-Time-PRD-v1.md` plus Apple App Review Kids Category guidance and Google Play Families policy.

## Executive risk read

Mini Dream Time is directionally strong because it avoids the riskiest children’s-app patterns: no runtime AI generation, no child profiles, no voice/photo/name collection, no ads, fixed human-reviewed catalog, and parent-paced read-together UX.

The main build risks are implementation drift:

1. Adding SDKs that silently collect persistent identifiers or device data.
2. Treating “parent account only” as if the app is not child-directed.
3. Letting account, analytics, purchase, sharing, or support flows expose child-facing screens to outbound links, purchases, prompts, or tracking.
4. Shipping AI-assisted content without provenance, commercial rights, and human safety review records.
5. Trying to enter Apple Kids Category / Google Families while using third-party analytics, ads, links, or ambiguous age targeting.

The build gate below should be used as a release blocker list, not a nice-to-have checklist.

---

## Phase 0 gates: do not start MVP build until these are true

### 1. Legal/privacy model locked

- [ ] Decide the product classification: assume child-directed / family app for store and privacy purposes even though account ownership is parent-only.
- [ ] Engage children’s privacy counsel before launch architecture is finalized.
- [ ] Create a one-page data inventory covering every field, SDK event, log, cookie, local storage key, push token, crash report, and payment/entitlement field.
- [ ] Approve a data-minimization rule: no child name, birthday, photo, voice, school, location, free-text prompt, interests, behavioral profile, or personalization attributes.
- [ ] Define parent account fields only: ideally email, auth provider ID, subscription entitlement, optional adult display name, coarse app settings, favorites/continue state.
- [ ] Write retention rules now: delete parent account and associated household state on request; set retention windows for logs/crash data; no indefinite retention.
- [ ] Define a deletion SLA and support process before launch.
- [ ] Draft plain-language privacy notice: “We collect nothing from your child” must be true under all SDK/logging behavior, not just product UI.
- [ ] Define verifiable parental consent/payment boundary: account creation, subscription/lifetime purchase, restore purchase, and sync are parent-gated.
- [ ] Decide whether to opt into Apple Kids Category and Google Families. If yes, design to their stricter constraints from day one.

### 2. SDK/vendor allowlist locked

- [ ] Create an explicit vendor allowlist before engineering starts.
- [ ] Ban ad SDKs, attribution SDKs, social SDKs, behavioral analytics SDKs, heatmaps/session replay, cross-app tracking, fingerprinting, IDFA/AAID collection, and data broker integrations.
- [ ] Prefer first-party server-side events over client analytics.
- [ ] If analytics are used, allow only minimal, non-child behavioral, non-identifying operational events at household/account level.
- [ ] Verify crash reporting does not capture page text, screenshots, child-facing content interactions tied to persistent identifiers, IP beyond operational necessity, or device identifiers beyond what is strictly required.
- [ ] Disable collection of advertising identifiers at build level.
- [ ] Document each vendor’s child/family-app policy and data processing terms.
- [ ] Confirm no SDK transmits device information to third parties in a way that violates Apple Kids Category constraints.

### 3. IP clearance before brand/content spend

- [ ] Run trademark clearance for “Mini Dream Time” in Class 9, 16, 28, and 41 across USPTO, EUIPO, IP Australia, UK if launching there.
- [ ] Check App Store / Google Play name collisions and `.com` / `.app` domains.
- [ ] Clear every core character name: Daisy, Dino, Pip, Itsy, plus category names if heavily branded.
- [ ] Write a “no famous-property resemblance” content rule into the production prompt templates and art direction docs.
- [ ] Create dated character bibles with original visual specs, palettes, personality notes, and “not inspired by / not similar to” negative references.
- [ ] Save dated generation prompts, drafts, edits, selected images, rejected images, and human edit notes for provenance.
- [ ] Verify commercial-use and ownership terms for every AI text/image tool used.
- [ ] Confirm generated assets can be used in mobile apps, paid subscriptions, marketing, print, and later licensing if needed.
- [ ] Ban using Disney, Bluey, Pixar, DreamWorks, Studio Ghibli, Dr. Seuss, or any living artist / protected property names in prompts.
- [ ] Do not make “Itsy” a direct “Incy Wincy Spider” identity. If retained, make the character original and avoid nursery-rhyme dependence.

### 4. Content safety review rubric created

- [ ] Define age-tier content rules for Drift 1–3, Wonder 3–6, Explore 6–10.
- [ ] Create banned content list: violence, peril without immediate safety, body horror, abandonment, death/grief unless deliberately age-reviewed, shame, bullying as entertainment, scary imagery, manipulative moralizing, medical/mental health claims, occult/horror intensity, adult jokes, romance, stereotypes, unsafe sleep/physical behavior, risky dares, weapons.
- [ ] Create required bedtime arc: low-stakes opening, gentle curiosity/conflict, emotional resolution, quiet ending, no cliffhanger.
- [ ] Require human editor approval for every story and every illustration set.
- [ ] Require visual consistency check: no character drift, no uncanny features, no accidental IP similarity, no hidden artifacts/text, no scary expressions, no high-arousal palettes.
- [ ] Require “read-aloud” test with an adult: length, rhythm, pronunciation, no tongue-twisters unless intentional, no awkward AI phrasing.
- [ ] Require a sleep-design pass: luminance, contrast, no flashing/motion, no blue-white backgrounds, no celebratory animations at story end.
- [ ] Store safety approval metadata in CMS before a story can be published.

### 5. Product scope frozen

- [ ] MVP is fixed catalog only.
- [ ] No runtime AI generation.
- [ ] No child prompts or free-text input.
- [ ] No read-to-me narration in MVP unless explicitly moved from Phase 2 with separate voice/audio compliance review.
- [ ] No voice cloning ever for MVP/Phase 0.
- [ ] No social features, sharing from child-facing screens, comments, UGC, public profiles, leaderboards, rewards, streaks, or challenges.
- [ ] No ads or data monetization.
- [ ] No in-story purchases or child-facing upsells.

---

## MVP release gates: do not submit to stores until these pass

### A. Child privacy and data collection

- [ ] App can be fully used in Story Mode without collecting any child personal information.
- [ ] Parent account creation does not ask for child name, child age/date of birth, photo, voice, school, location, or interests.
- [ ] Age tier is stored as a coarse content preference only; label it “story age range,” not “child profile.”
- [ ] Favorites/continue/offline state is household-level, not child-profile-level.
- [ ] No persistent advertising identifier access in iOS or Android builds.
- [ ] No ATT prompt unless there is a compelling parent-only reason; ideally no ATT prompt at all.
- [ ] Analytics events are reviewed against data inventory and are strictly necessary: app_open, story_started, story_completed, download_success/failure, entitlement_status, crash/error. Avoid page-by-page behavioral profiling where possible.
- [ ] IP addresses in server logs have documented retention and access controls.
- [ ] Push notifications, if included, are parent-facing only and off by default or clearly consented. No child-targeted re-engagement prompts.
- [ ] Account deletion works in-app and deletes/suppresses all associated household state within stated SLA.
- [ ] Privacy policy, terms, and parental notice match actual implementation.
- [ ] Privacy nutrition labels / Play Data Safety forms are filled from the actual data inventory, not marketing assumptions.

### B. App-store family/kids readiness

- [ ] Apple: if using Kids Category, all external links, purchases, account management, support, marketing site links, privacy policy links, and restore purchases are behind a parental gate.
- [ ] Apple: no third-party advertising; no third-party analytics unless counsel confirms it fits Apple’s limited Kids Category exception.
- [ ] Apple: no personally identifiable information or device information sent to third parties from child-facing flows.
- [ ] Google Play: Target Audience and Content declaration matches the actual design. Do not claim “parents only” if imagery and content target children.
- [ ] Google Play: only select age groups the app is actually designed for. Because the PRD spans ages 1–10, the store declaration and content ratings must cover the whole range or launch narrower.
- [ ] Google Play: Families policy review covers ads, analytics, in-app purchases, data collection, and content appropriateness.
- [ ] Store screenshots and descriptions do not imply personalization, child profiles, runtime AI, Disney/Bluey-like characters, or medical/sleep guarantees.
- [ ] In-app purchases use Apple/Google IAP, with restore purchases implemented.
- [ ] Subscription terms are clear: price, renewal, cancellation, lifetime option scope, free tier limits.
- [ ] App rating questionnaire completed conservatively.
- [ ] Support URL, privacy URL, deletion instructions, and contact email are live before submission.

### C. UX anti-patterns and child-facing gates

- [ ] Parent Mode and Story Mode are visibly distinct.
- [ ] Child-facing Story Mode has no external links, purchases, account prompts, ratings prompts, popups, share sheets, or marketing modals.
- [ ] No autoplay to next story.
- [ ] No infinite scroll or “one more” engagement traps in Story Mode.
- [ ] No streaks, points, badges, daily rewards, countdown timers, loot, surprise mechanics, or scarcity prompts.
- [ ] Story ending offers a calm close, not a conversion/up-sell moment.
- [ ] Any paywall appears only in Parent Mode and behind parent context/gate.
- [ ] Rating/review prompts appear only outside bedtime/story flow and never child-facing.
- [ ] “Tonight’s pick” is a simple editorial/content suggestion, not behavioral profiling of a child.
- [ ] Bedtime UI passes low-arousal checks: warm palette, dim default, large text, no flashing/motion, parent-paced page turns.
- [ ] Accessibility pass: text scalable, contrast sufficient despite dim palette, voiceover labels parent-appropriate, touch targets large, offline errors understandable.

### D. Content/IP safety gates

- [ ] Every story has: title, tier, read time, category, theme, text, illustration refs, safety approval, editor approval, IP/provenance record.
- [ ] Every story is checked against age-tier rubric.
- [ ] Every illustration set is checked for character consistency and accidental resemblance to known properties.
- [ ] No prompt, file name, internal note, or art board uses protected brands as style references.
- [ ] All fonts, music/sfx if any, images, icons, and illustration outputs have commercial rights recorded.
- [ ] Marketing copy avoids “inspired by Frozen/Bluey” or any comparative implication likely to create association/confusion.
- [ ] If “professional narration” remains in positioning, remove it for MVP or mark clearly as Phase 2. The PRD currently says narration is deferred but also says “professional narration” under curated quality; resolve before marketing.
- [ ] Any nursery rhyme/public-domain nod is legally reviewed before becoming a recurring character identity.

### E. Security and operational readiness

- [ ] Auth uses mature provider/passwordless or OAuth; no custom weak auth.
- [ ] Parent email verification or equivalent account integrity is implemented.
- [ ] Entitlements cannot be spoofed client-side.
- [ ] Offline story downloads are scoped to entitled content and fail gracefully.
- [ ] CMS publishing requires role-based access and audit trail.
- [ ] CMS cannot publish a story without safety/IP approval fields complete.
- [ ] CDN/object storage prevents listing private buckets; assets are cacheable but not writable by clients.
- [ ] Admin tools are not bundled into the mobile app.
- [ ] Logs exclude story draft prompts, user tokens, purchase receipts, and personal data beyond operational need.
- [ ] Incident response owner and support process are defined.

---

## Must-not-do list

- Do not collect child names, birthdays, photos, voices, locations, schools, interests, or free-text prompts.
- Do not add runtime AI generation, story personalization, or “child as hero” in MVP.
- Do not use child data for AI training, model improvement, personalization, or profiling.
- Do not add voice cloning.
- Do not use ad SDKs, attribution SDKs, social SDKs, session replay, heatmaps, fingerprinting, or behavioral analytics.
- Do not send device identifiers or child-flow data to third parties if pursuing Kids/Families placement.
- Do not put links, purchases, paywalls, review prompts, sharing, or support chat in Story Mode.
- Do not use autoplay, streaks, badges, points, rewards, countdowns, pushy notifications, or “keep reading” loops.
- Do not advertise or prompt with “Frozen-like,” “Bluey-like,” “Disney-style,” “Pixar-style,” etc.
- Do not use protected characters, character silhouettes, palettes, names, catchphrases, or distinctive family dynamics in a way that suggests association.
- Do not ship AI-generated text/images without human review and provenance records.
- Do not claim “we collect nothing from your child” unless logs, SDKs, analytics, crash reports, and support flows also satisfy it.
- Do not select broad app-store target ages unless all content and UX are appropriate for every selected age group.
- Do not make sleep/health/therapeutic claims unless legally substantiated.
- Do not defer privacy policy, deletion flow, data inventory, or store data-safety forms until submission week.

---

## PRD amendments recommended before implementation

1. Resolve the narration inconsistency: §3.2 says “professional narration,” while multiple later sections defer narration to Phase 2. MVP should say “human-reviewed read-aloud text,” not narration.
2. Add a formal data inventory as a Phase 0 deliverable.
3. Add SDK/vendor allowlist and banned SDK list to §8/§9.
4. Add CMS publish gate fields: editor approval, content safety approval, IP/provenance approval, age-tier approval.
5. Clarify store strategy: Apple Kids Category / Google Families opt-in or not. The implementation should still meet the stricter standard, but submission metadata depends on this decision.
6. Consider narrowing launch age range if execution quality suffers. Ages 1–10 is manageable only if content, store declarations, and UX genuinely support all tiers.
7. Add a “no outbound links/purchases in Story Mode” explicit requirement.
8. Add retention/deletion SLA language to the PRD, not just “deletion-on-request.”

---

## Practical release decision

Green-light Phase 0 only if the team treats privacy/IP/content review as part of the product architecture, not as legal paperwork after build. Green-light MVP submission only when the app can truthfully say:

> A parent account unlocks a fixed, human-reviewed bedtime catalog. Children do not enter data. There are no ads, no runtime AI, no tracking-based personalization, no child-facing purchases, and no engagement traps.

That statement is the product moat and should be the release test.
