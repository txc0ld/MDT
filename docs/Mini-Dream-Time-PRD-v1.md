# Mini Dream Time — Product Requirements Document (v1, High-Level)

**Working title:** Mini Dream Time
**Category:** Curated digital bedtime-story library for children (ages 1–10) — illustrated stories a parent reads aloud to their child (AI-produced, parent-facing)
**Owner:** Fantom Labs
**Status:** Draft for build decision
**Date:** 22 June 2026

> This PRD makes decisions rather than listing options. §1 records the three decisions that shape everything else — read those first, because the rest of the document is built on them.

---

## 1. Decisions that override the brief

These three decisions are not stylistic. Each changes the product's legal exposure, defensibility, or core UX. They are resolved here and treated as settled for the remainder of the document.

### 1.1 Character likeness — "semi-resemble Frozen/Bluey" is rejected

**Verdict: Bad approach. Do not deliberately evoke any known property.**

**Why:** Character protection runs on two tracks simultaneously. Copyright protects the *specific visual expression* of a character (general traits like "round-headed cartoon animal" are free; a specific delineated design is not). Trademark adds *likelihood of confusion* — if a parent could believe your character is associated with, sponsored by, or approved by the rights-holder, that is actionable **even without copying any single element**. Courts apply a sliding scale: the more you resemble visually, the less behavioral similarity is needed, and vice versa. Crucially, **demonstrable intent to trade on another brand's goodwill is the single most damning fact** in these cases. A written instruction to "semi-resemble famous cartoons" is, quite literally, that intent in writing.

The two properties named are the worst possible choices: Disney (Frozen) and BBC Studios / Ludo (Bluey) are the most litigious children's-IP holders on earth, with standing legal teams and a documented history of pursuing derivatives aggressively. Penalty exposure aside, a cease-and-desist after launch destroys the catalog, the brand, and any acquisition value.

**The deeper point (holds even though you're *not* chasing a franchise):** derivative characters create legal risk and can never be licensed, extended, or sold — and you'd carry that risk for zero upside. Original characters cost exactly the same to produce. Owning (not borrowing) your characters is cheap insurance that keeps every future option open; it's required regardless of ambition. See §11.

**Better approach — borrow the *vibe*, own the *characters*.** The "familiarity" parents respond to is not visual likeness; it is *archetype and emotional register*:
- **Bluey's actual edge** is gentle emotional intelligence, real family dynamics, and respect for the child's inner world — not its blue-heeler design.
- **Frozen's actual edge** is musical wonder, sisterly warmth, and "it's okay to be different."

Reproduce those *qualities* with wholly original characters and you get the recognition benefit with none of the liability — and you build an asset you can actually sell. (Your uploaded examples already do this well: Daisy the ladybug, Dino, the tiger cub, and the Incy-Wincy spider are original and ownable. Keep going in that direction. The one watch-item: "Incy Wincy Spider" is a public-domain nursery rhyme reference and fine as a *nod*, but do not build a recurring named character whose identity *is* the rhyme.)

### 1.2 Read-together first — the screen is a shared book, not a screen to hide

**Verdict: The core experience is a parent reading aloud to their child. Narration comes later.**

The primary mode is the oldest, highest-value bedtime ritual: a parent reading an illustrated story aloud while the child looks at the pictures. That is exactly what your examples are — illustrated pages with read-aloud text — and it is the developmental gold standard (shared reading, bonding, language exposure). It is also the *less* contested lane: the audio incumbents (Sleepytale, Bedtime Stories) already own voice cloning and large pro-voice libraries, so competing audio-first means fighting them on their strength. Don't.

The screen-at-bedtime concern is real but specific — it's about *bright, interactive, autoplay* content consumed solo. A parent reading from a warm, dim, static illustrated page is the opposite of that: a digital picture book. So the discipline holds (warm/dim palette, no blue-white, zero interactivity or gamification, no autoplay, no engagement traps, a calm wind-down arc), but the conclusion is "a calm shared-reading surface," **not** "audio-first / hide the screen."

**Decision:** launch as a **read-together illustrated storybook**. Optional **"read-to-me" narration** is a deliberate *later* add-on (Phase 2) for the nights a parent can't be there — valuable, but never the default and not required for v1.

### 1.3 Catalog model — keep the fixed catalog; it is the moat, not the weakness

**Verdict: Correct instinct, for a reason stronger than you stated.**

The dominant competitor model is runtime personalization ("your child is the hero"). It is a red ocean (dozens of near-identical tools), it commoditizes fast, and it carries the heaviest possible COPPA burden: it must collect the child's name/interests and feed them to an LLM *at runtime*, and the April 2026 COPPA rules state that AI processing of a child's data is **never** part of "providing the service" — it requires separate, explicit, repeated parental consent. (See §9.)

A **pre-produced fixed catalog** inverts every one of those problems:
- It collects **nothing from the child** → dramatically lighter compliance surface (a genuine, durable advantage; see §9.4).
- Stories are **quality-controlled, illustration-consistent, and safe before they ship** — competitors' #1 quality complaint is character drift and AI-slop in runtime generation.
- It lets you reuse a small set of **familiar characters** the child gets to know — warmer than the generation crowd's ephemeral per-session characters, and cheaper to keep consistent.

The honest weakness: a 30-story launch catalog (6×5) is thin against "infinite" libraries. This is solved by content velocity and replayability, not by abandoning the model (§7, §8.3).

---

## 2. Market research summary

### 2.1 Size and trajectory
- The children's audiobook / story-app market is ~**$1.79B in 2026**, projected to ~**$4B by the mid-2030s** at roughly **9.4% CAGR**. Growing, not winner-take-all, and adjacent to the much larger kids' edtech and screen-free-audio (Toniebox/Yoto) categories.
- The space added a wave of AI entrants in 2024–2026. Industry reviewers openly note "many won't last six months" — saturation at the *generic-generator* layer, not at the *branded-IP* layer.

### 2.2 Competitive landscape (representative, not exhaustive)

| Player | Model | Pricing signal | Core strength | Exploitable gap |
|---|---|---|---|---|
| Bedtimestory.ai | AI generation, deep personalization | Subscription | Customization depth | Character drift; safety/quality variance |
| Sleepytale | AI generation + **voice cloning** | $6–12/mo; $17/mo Pro Plus | Parent-voice cloning, 74+ languages | Shallower plot personalization; biometric-voice compliance load |
| Oscar Stories | AI generation, child as hero | Subscription | Established (2023), parent-driven UI | Generic worlds |
| Story Spark / StoryWizard.ai | AI generation | Free tier + ~$8/mo | Illustration consistency, free tier | Personalization stops at name/trait |
| "Bedtime Stories" (bedtime-stories.fun) | **Pay-per-story**, 100+ pro voices, no sub | **$2/story; $8/5; $15/10** | Full-cast pro audio, no subscription, offline | Web-only, no app, no recurring characters |
| Gemini Storybook (Google) | Free AI storybook | Free | Polished, instant, free | Character drift, generic house style — **and it's free, so do not compete on generation** |
| Toniebox / Yoto | **Screen-free hardware** + content cards | Device + cards (one-time) | Beloved, screen-free, durable | Hardware cost; closed ecosystem; **proven willingness to license third-party catalogs** |
| Moshi / Calm Kids / CalmTales | Curated audio, sleep/anxiety | Subscription | Clinical validation, retention | Not story-franchise-driven |

### 2.3 What the reviews reveal about demand (the real signal)
Two themes dominate every 2026 parent comparison: **data privacy** and **subscription fatigue**. Secondary recurring complaints: character/illustration inconsistency, AI-slop prose, and bright-screen-at-bedtime guilt. The apps parents keep are the ones a child "wants to come back to" — i.e., emotional attachment beats novelty. Novelty (infinite new stories) is abundant and free (Gemini). Attachment is scarce.

### 2.4 Strategic read
Do not enter the *generation* race — it's commoditized and Google gives it away free. Enter the **curated, sleep-optimized, privacy-clean library** lane: a small set of lovable original characters in calm, well-made standalone stories — the opposite of "another generator." Cross-platform extension (audio cards, print) exists as a free option for later but is *not* the thesis. The thesis is a library parents trust and keep paying for, produced cheaply by a solo founder with AI-accelerated, human-reviewed production.

---

## 3. Product strategy & positioning

### 3.1 One-line positioning
*The bedtime library parents trust: original, lovable characters in calm, gently-clever illustrated stories — for a parent to read aloud at bedtime, with zero data collected from your child.*

### 3.2 The four pillars of the edge
1. **A small, familiar cast** reused across stories — warmer for the child and cheaper to produce than inventing new characters each time.
2. **Read-together, sleep-first design** (the shared-reading ritual done beautifully — warm, calm, parent-paced, no engagement traps).
3. **Privacy as a feature** ("we collect nothing from your child" — a marketable, defensible claim under §9).
4. **Curated quality** (every story human-reviewed; no slop, no drift, professional narration).

### 3.3 Who it is *not* for
Not for parents seeking infinite hyper-personalized novelty (cede that to Gemini/Bedtimestory.ai). Not for classroom literacy (different compliance + product). Holding this line keeps the product coherent.

### 3.4 Naming (action required before spend)
Before any major brand spend, clear Mini Dream Time and each character name against trademark registers in the relevant classes and app-store name collisions.

---

## 4. Audience & age model

Target buyer: the **parent** (purchaser, navigator, often co-reader). Target experiencer: the **child**, 1–10. The 1–10 span is too wide for one tone, so the catalog is tiered, and the tier — not a single global setting — drives vocabulary, length, stimulation, and the educational layer.

| Tier | Age | Length | Tone & stimulation | Educational edge |
|---|---|---|---|---|
| **Drift** | 1–3 | 2–4 min | Lowest stimulation; repetition, rhythm, soft resolution | None (or pure sensory/naming) |
| **Wonder** | 3–6 | 4–7 min | Gentle arc, feelings, light humor | **Light touch begins here** — one woven concept per story |
| **Explore** | 6–10 | 7–12 min | Richer plots, mild stakes, character growth | Slightly more substantive but still *invisible* |

**Educational philosophy (per the brief: present but not the point).** Learning is **woven, never taught**. No quizzes, no "lesson of the day" framing, no didactic narrator. A story about Daisy and Dino sharing the last sweet leaf *is* the lesson on fairness; a trip past a glowing tide pool *is* the introduction to bioluminescence. The rule: **if you removed the educational element, the story should still be a good story.** That keeps it entertainment-first, which is what the brief and the market both demand.

---

## 5. Content scope (launch: 6 categories × 5 stories = 30)

### 5.1 The cast — one small set, reused across every adventure
Same handful of friendly characters across all six categories. **Stories are standalone** — no required continuity, each works on its own — but the characters are familiar from story to story. This is both warmer for the child and *cheaper* to produce: character consistency is the hard, error-prone part of AI illustration, so you solve it once for ~4 characters and amortize it across the whole catalog (inventing fresh characters every story is the most expensive, most drift-prone path). Lock a character bible (visual spec, palette, personality) so production never drifts.

- **Daisy** — ladybug; warm, expressive, the heart of the group.
- **Dino** — small green dinosaur; gentle giant, curious, brave-but-soft.
- **Pip** — tiger cub; shy newcomer who grows in confidence (your "shy cub" arc).
- **Itsy** — small spider; comic relief, turns scary into silly (the cave/echo beat). *Use as an original character; do not anchor identity to the nursery rhyme.*
- (Optional 5th character for variety later — hold for Phase 2.)

Reusing the cast is deliberate, but it is **not a franchise play** — just the efficient, warmer default. It makes each new story feel like visiting friends rather than meeting strangers, and keeps production fast and consistent. (New side characters can still appear *within* a story — like the tiger cub or spider arriving as new friends in your examples — without expanding the core cast.)

### 5.2 The six launch categories

| # | Category | Tier emphasis | Purpose | Example seed (from your art) |
|---|---|---|---|---|
| 1 | **Sleepy Meadow** (wind-down) | Drift | Pure sleep-onset; lowest stimulation; ends in calm/quiet | A slow, sung "good night" round through the meadow |
| 2 | **Friends & Feelings** | Wonder | Social-emotional; the Bluey lane done with our cast | "New Friends, Big Adventures" — welcoming the shy cub |
| 3 | **Brave Little Adventures** | Wonder/Explore | Courage, small stakes, safe resolution | The cave, the roar, the tiny spider — fear turned to laughter |
| 4 | **Curious World** | Wonder/Explore | The educational edge: nature/STEM woven invisibly | "Leaf Feast" → why leaves grow high, how plants reach light |
| 5 | **Silly & Giggly** | all | Lightness, wordplay, joy | "LADYbug, not DINObug!" — gentle humor |
| 6 | **Dream Big** | Explore | Imagination, aspiration, wonder | A starlit "what could we be?" journey |

Each story ships with: title, tiered **read-aloud text**, a full illustration set with **consistent characters**, and a 1-line parent-facing "about this story" (theme + approx. read time + age tier). Optional **narration + a soft ambient bed** are a later add-on (Phase 2), not part of the launch package.

### 5.3 Replayability (how 30 stories feels like more)
Children re-read favorites relentlessly — this is a feature, not a gap. Support it explicitly: favorites, "play again," a short rotating "tonight's pick," seasonal re-skins of existing stories (a "Sleepy Meadow in the Snow" variant is cheap content), and an audio-only mode that survives lights-out. The metric to watch is **repeat-plays per story**, not catalog size.

---

## 6. UX & UI requirements

### 6.1 Governing principle — a calm, read-together storybook
The core experience is a *parent reading aloud to their child* from a warm, dim, beautifully-illustrated page — the classic bedtime ritual, done well. The screen is the shared picture book, not a video and not something to hide. **Two modes, one app:** **Parent Mode** (browse/select, fast, gets out of the way) flows in one tap into **Story Mode** (the warm, dim, read-together page the parent and child share).

### 6.2 Parent navigation (must be effortless at 8pm with a tired adult)
- Home: **"Tonight's pick"** (one recommended story, age-appropriate) + **Continue/Favorites** + 6 category tiles.
- Max **2 taps from open → first page**. No account wall to *browse*; gate only at purchase/sync.
- Age-tier filter persistent and obvious; default to the child's set tier.
- Search is secondary; curation/browse is primary (parents at bedtime decide, they don't search).
- Clear **runtime + age badge** on every story card (directly answers the two things a tired parent needs).

### 6.3 Story Mode (the read-together experience)
- Warm, low-luminance illustrated pages (amber/dark, no blue-white). Large, easily-readable **read-aloud text** for the parent; rich illustrations for the child to look at.
- **Parent-paced page turns** (tap/swipe). No timers rushing the read, no autoplay into the next story (anti-binge, pro-sleep). The parent controls the pace and decides when it ends.
- Stories resolve **softly into quiet** — a calm wind-down arc, not cliffhangers.
- Zero ads, pop-ups, gamification, or "keep going" mechanics. (Also a compliance requirement, §9.)
- **Optional "read-to-me" narration is a later add-on (Phase 2)** — for nights a parent can't read. When it ships: one warm narrator, sleep timer, gentle fade-out, lock-screen/background audio. Off by default; the default is always the parent reading.

### 6.4 Visual design direction — explicitly NOT Kinetic Topology
Your house aesthetic (electric lime `#ccff00`, near-black, glassmorphism, JetBrains Mono) is a *founder/dev-tool* language and is **wrong for this product**. A child's bedtime app must be warm, soft, low-arousal, rounded, and reassuring. Decision:
- **Child-facing:** warm dark palette (deep indigo/plum night, amber/soft-gold accents, candle-warm not screen-cold), rounded forms, generous negative space, friendly humanist rounded type (not a monospace, not a hard geometric).
- **Parent-facing shell:** can carry a *subtle*, premium Fantom-quality polish (clean, trustworthy, calm) but still in the warm family — it must signal "safe, gentle, premium," not "developer tool."
- Keep the illustration style of your examples (soft 3D-ish, expressive, warm) as the **locked house style** — consistency here is brand equity.

---

## 7. Content production pipeline (AI-accelerated, human-controlled)

This is where AI earns its place — in *production*, not at runtime. The pipeline is the actual operational engine of the business; treat it as a product in itself.

1. **Story bible & character spec (once, then maintained):** locked visual sheets, palettes, personalities, relationships, do/don't lists. Non-negotiable reference for every asset.
2. **Drafting (AI-assisted):** generate per category/tier against tight prompts that enforce length, vocabulary band, woven-concept rule, and tone. **Every draft is human-edited** — this is the anti-slop control and the quality moat. (You, or a contract children's editor.)
3. **Illustration (AI-assisted, consistency-enforced):** the hard problem competitors fail at is **character consistency across pages**. Solve it deliberately — reference-locked generation, a curated character-sheet/seed approach, and human selection/retouch. Budget time here; inconsistency is the #1 visible quality tell.
4. **Narration & audio bed (Phase 2 — not at launch):** when you add the optional "read-to-me" mode later, use licensed pro VO or a clearly-licensed synthetic voice with commercial rights (**avoid voice-cloning of real people** — biometric trigger under COPPA's expanded definitions), one warm narrator, plus a low, calming ambient bed (royalty-cleared or original). The launch product is parent-read, so this is deferred — but lock commercial + any later cross-platform licensing terms up front so you're not re-clearing assets later.
5. **Review gate:** safety + age-fit + consistency checklist before any story is published. Nothing ships unreviewed.

**Output target:** the launch 30, then a sustainable cadence (e.g., 4–8 new stories/month) to keep retention and the library fresh. Content velocity is the growth lever that compensates for the fixed-catalog model.

**IP hygiene in the pipeline:** keep records that your characters were independently created (the bible, drafts, dated assets). Confirm the commercial-use and IP-ownership terms of every AI tool you use for text, image, and audio — some tools' terms complicate ownership or licensing, which matters enormously at the acquisition stage.

---

## 8. Technical architecture (high level)

### 8.1 Shape
A **content-delivery app over a curated CMS**, not a runtime-generation service. This is simpler, cheaper, faster, and more compliant than the competitor norm.

- **Clients:** iOS + Android (the bedtime use case is overwhelmingly mobile/tablet; a parent isn't at a laptop at bedtime). A lightweight web presence for marketing/SEO and account management. Given the stack you already run, React Native (or Expo) is the pragmatic single-codebase path; native is justified only if the read-together render (or, later, audio playback) proves limiting.
- **Backend:** your existing comfort zone — Bun/TypeScript/Hono API, Postgres (via Kysely) for catalog/metadata/entitlements, object storage/CDN for images (and audio later). Supabase or Fly.io both fit; pick one and don't over-engineer.
- **Content as data:** stories are structured records (text tiers, asset refs, audio refs, age tier, category, theme tags). A simple internal CMS/admin lets you publish without deploys — this *is* your content velocity enabler.

### 8.2 The features that matter most technically
- **The read-together render is the #1 quality bar:** warm/dim, true low-luminance pages (not just a dark theme), crisp illustrations, large readable read-aloud text, and smooth, parent-paced page turns. Get this perfect — it *is* the product.
- **Offline download** of stories (images + text). Bedtime happens on planes, in cars, in dead-zone bedrooms. Competitors flag offline as a differentiator; treat it as table stakes.
- **Entitlement/sync** so a household's purchases/favorites follow them across devices.
- *(Phase 2, when narration ships):* reliable background audio + lock-screen controls + sleep timer with a clean fade-out.

### 8.3 Deliberately deferred (do not build at launch)
Optional **"read-to-me" narration** (planned for Phase 2 — valuable, just not launch-critical), runtime AI generation, voice cloning (stays off entirely — biometric load), branching/interactive stories, child-driven UI, multi-language. Each adds cost, compliance load, or scope creep against a thin team. Revisit only once the core read-together product retains.

---

## 9. Safety, privacy & compliance — the moat, treated seriously

This is not a back-office checkbox. For a children's product in 2026 it is existential, and for *this* product it is a marketable advantage.

### 9.1 The regime you are in (current as of 2026)
- **COPPA (US):** amended rules with a **compliance deadline of 22 April 2026** (already in force). Expanded "personal information" now includes **biometric data (incl. voiceprints)** and persistent identifiers. **Separate** parental consent required before any third-party sharing. **Indefinite data retention banned.** Penalties up to **~$53k per violation**, and the FTC has named children's-privacy enforcement a 2026 priority (recent actions in the hundreds of millions).
- **Critical AI clause:** using a child's data for **AI training is explicitly *never*** "providing the service" → always needs separate consent. (Directly punishes the runtime-personalization competitors; rewards your model.)
- **State design codes:** California (CAADC, many provisions enforceable April 2026), Maryland, Vermont, Nebraska — **age-appropriate-design + high-privacy-by-default**, applying up to **under-18**.
- **COPPA 2.0 (S.836):** passed the **US Senate unanimously, 5 March 2026** — would extend protections to **teens under 17**. Not yet law, but signals direction; build for it.
- **International:** UK Age Appropriate Design Code (Children's Code), EU GDPR-K (Article 8), and Australia's tightening regime (Privacy Act reforms + Online Safety obligations) — relevant for your AU base and any global launch. If multi-jurisdiction, **build to the strictest standard** and apply it globally; it's cheaper than per-region logic.

### 9.2 Design consequences (build these in)
- **Collect nothing from the child.** No child name, no photo, no voice, no behavioral profiling. The *parent* holds the (minimal) account.
- **No third-party ad SDKs, no behavioral analytics on children, no data sale.** Privacy-by-default, high-privacy-by-default.
- **Data minimization + retention policy + deletion-on-request**, documented and provable.
- **Verifiable parental consent** at the account/purchase boundary; clear plain-language parental notice ("do what you say, say what you do" — the FTC's stated test).
- **No engagement/retention dark patterns**, no autoplay-binge — aligns with both sleep-first UX and design-code expectations.
- If you ever add synthetic voices: license commercial rights and **do not clone real people's voices** (biometric trigger).

### 9.3 Content safety
Because the catalog is pre-produced and human-reviewed, content safety is solved at the source — no runtime moderation gaps, no "what happens when a child types something weird" failure mode that reviewers stress-test competitors on. Maintain a written content-safety checklist as part of the review gate (§7.6).

### 9.4 Why this is a moat, not a cost
"**We collect nothing from your child. No data, ever.**" is a clean, true, *marketable* claim that the entire personalization-based competitor set cannot honestly make. Privacy and subscription-fatigue are the two themes dominating parent reviews — you can own one of them outright. Get a children's-privacy specialist lawyer to review before launch; this is the one line item not to cheap out on.

---

## 10. Monetization

### 10.1 Read on the market
Two parent pain points are **subscription fatigue** and surprise pricing. Competitor models span subscription ($6–17/mo), pay-per-story ($2), and lifetime ($159–199). The willingness to pay exists; the resentment is at *recurring* fees for *commodity* content.

### 10.2 Recommended model — freemium → low-friction subscription, with an anti-fatigue option
- **Free tier:** a few full stories (e.g., one per category, or the whole "Sleepy Meadow" set). Genuinely usable — reviewers punish crippled free tiers and reward generous ones. This is also your COPPA-light top-of-funnel.
- **Subscription:** the full library + new monthly stories + offline + all tiers. Price in the **~$5–8/mo** band (or discounted annual). Justified by *fresh recurring content*, which is the only honest justification for a recurring fee.
- **Lifetime / family one-time option:** offered deliberately as the **anti-subscription-fatigue** play (a meaningful one-time price). Converts the resentful segment competitors are leaving on the table.

Decision: **lead with freemium→subscription** (best LTV and funds content velocity), but *carry the lifetime option visibly* as differentiation. Avoid pure pay-per-story — it caps LTV and fights the "library you live in" positioning.

### 10.3 What not to do
No ads (compliance + brand + trust). No data monetization (illegal here and brand-suicidal). When the optional narration ships later, don't lock it punitively behind a separate wall — competitors are routinely criticized for paywalling audio.

---

## 11. The End Game

Per your direction: **not chasing IP or a character franchise right now.** So the end game is deliberately modest, and the structural door to more is left open at zero extra cost.

### 11.1 The plan — a profitable, clean, privacy-first subscription library
The realistic and worthwhile outcome is a focused, beautifully-produced bedtime library that parents pay for and keep paying for, sustained by a steady trickle of new stories. Low overhead (solo founder + AI-accelerated, human-reviewed production), no privacy debt, no ad dependency. This alone is a durable, ownable product and is sufficient as the objective. Treat it as the destination, not a stepping stone.

### 11.2 Upside that comes for free (do not spend or design toward it now)
Two doors stay open by default — neither requires building toward them:
- **Acquisition.** A clean, COPPA-compliant catalog with loyal retention and zero privacy debt is precisely what strategic buyers in this space acquire (screen-free audio like tonies/Yoto; kids' media roll-ups; sleep/audio platforms). What makes you acquirable is what you're already doing — original (not derivative) characters, clean compliance, consistent quality, a pipeline that scales without headcount.
- **Cross-platform extension.** Because you reuse a small cast, the *option* to extend later into audio cards (Yoto/tonies license third-party catalogs), print books, or short-form exists automatically. Deferred, not designed-for.

### 11.3 The only "IP discipline" required now
You're not building a franchise — but §1.1 still holds for a simpler reason: borrowed or derivative characters create legal risk and are unsellable, while original ones cost the same to make. So the single rule is: **own your characters, don't build on anyone else's.** That's cheap insurance that keeps §11.2 available for free. Nothing more is required.

### 11.4 The decision
**Build a profitable, privacy-clean library and treat that as the finish line.** Make only the cheap structural choices (own your characters, no privacy debt, scalable pipeline) that keep acquisition and extension available later — but do not spend a dollar, a story, or a design decision chasing them until retention earns it.

---

## 12. Roadmap (phased)

**Phase 0 — Foundations (pre-build):**
Name + trademark + domain clearance (§3.4). Lock character bible + house illustration style. Stand up the production pipeline and produce **2–3 finished reference stories** end-to-end to validate quality, consistency, and per-story production cost/time. Children's-privacy legal review of the data model.

**Phase 1 — MVP launch:**
The 30-story catalog (6×5), read-together. iOS + Android. Parent Mode + Story Mode. Offline. Freemium + subscription + lifetime option. Full COPPA/AADC compliance live. Marketing site for SEO + parent education (lean into "the read-aloud bedtime ritual" and "we collect nothing").

**Phase 2 — Retain & deepen:**
Content cadence live (4–8 stories/month). Seasonal re-skins. Favorites/continue/"tonight's pick" recommendation. Measure retention and repeat-reads. **Optional "read-to-me" narration** (one warm narrator) for nights a parent can't read. Optional: a 5th cast member.

**Phase 3 — Optional extension (only if Phase-2 retention is strong):**
A first non-app channel *if it makes sense* — audio cards (Yoto/tonies licensing) or a print picture book. Not a goal; an option kept open for free by reusing the cast. Skip entirely if the core product is doing its job.

**Phase 4 — Optional liquidity (only if warranted):**
If catalog + retention + clean compliance make it attractive, run a strategic-acquisition process. Otherwise, keep running it profitably. There is no obligation to exit.

---

## 13. Success metrics

| Layer | Primary metric | Why |
|---|---|---|
| Acquisition | Free→paid conversion; CAC by channel | Funds content velocity |
| **Core (governs everything)** | **Repeat-plays per story; return-rate per household** | Detects attachment — the thing parents keep paying for |
| Retention | Weekly active households; subscription month-2/month-6 retention | The only honest justification for a recurring fee |
| Ritual fit | Stories finished in one sitting; weekly co-read frequency per household | Validates it fits the read-aloud bedtime ritual |
| Catalog health | Stories shipped/month; consistency-defect rate at review gate | Pipeline is the engine |
| Compliance | Zero child-data collected; consent + deletion SLAs met | Existential + marketable |

Vanity metrics to ignore: raw catalog size, total downloads, session length (longer is *worse* for a bedtime product).

---

## 14. Open decisions & assumptions

- **Assumed:** revenue market is US/UK/global English first (largest WTP, but strictest privacy regime → build to it). AU is home base and a valid secondary launch. *Confirm before localization spend.*
- **Assumed:** RN/Expo single codebase acceptable; revisit if the read-together render (or, later, audio) proves insufficient.
- **Assumed:** human-edited AI production is acceptable for quality and IP ownership *provided* tool terms are cleared. *This must be verified per tool — it's an acquisition-diligence item.*
- **Open:** lifetime price point (test). Free-tier generosity (test — but err generous).
- **Open:** whether a 5th anchor character launches in Phase 1 or 2 (recommend 2, to keep launch scope tight).
- **Hard dependency:** children's-privacy legal review before launch. Non-negotiable.

---

### Bottom line
The market is crowded only at the layer Google now gives away free (runtime generation). The defensible product is the one you reached for instinctively — a curated, privacy-clean, sleep-first library of original, lovable characters — provided you drop the "resemble Frozen/Bluey" idea entirely, because that one instruction would have created real legal risk for no benefit. Keep it simple: a small reused cast across standalone adventures, produced cheaply with AI under human review, sold as a library parents trust. Own your characters (cheap insurance, not ambition), collect nothing from kids (your clean differentiator), and design every night to help a child fall asleep. That's the whole product. Anything bigger is optional and can wait until retention earns it.
