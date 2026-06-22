# Mini Dream Time SEO/AEO Architecture

Status: launch strategy for `minidreamtime.com`.

## Brand decision

Use **Mini Dream Time** as the customer-facing brand.

Why this spelling:

- It matches the purchased domain `minidreamtime.com` while remaining easy to read in logos, page titles, and search results.
- “Dream Time” is immediately understandable as bedtime routine language.
- It is softer and more parent-friendly than an overtly AI-flavored name.
- It allows multiple story collections under one brand.

Use **Mini Dreamtime** only as a compact lockup/domain variant where spacing is visually constrained. Use **Mini Dream** only as a short nickname in casual copy, not the primary SEO brand.

Recommended hierarchy:

- Product/domain brand: **Mini Dream Time**
- Domain: `minidreamtime.com`

## One-sentence positioning

Mini Dream Time is a calm read-aloud bedtime story library for parents and children, with age-friendly illustrated stories, simple page turns, and gentle endings designed for bedtime routines.

## Primary SEO/AEO cluster

The site should own the topic cluster around:

- bedtime stories for kids
- read-aloud bedtime stories
- calm bedtime stories
- illustrated bedtime stories
- bedtime stories for toddlers
- bedtime stories for 3 year olds
- bedtime stories for 5 year olds
- bedtime stories for 6 year olds
- gentle superhero bedtime stories
- superhero stories for kids without fighting
- short bedtime stories for children
- parent-read bedtime stories
- bedtime routine stories

## Site architecture

```text
/                                  Mini Dream Time home
├── /bedtime-stories-for-kids      Pillar page: category definition + benefits
├── /read-aloud-bedtime-stories    Pillar page: parent-read routine
├── /calm-bedtime-stories          Pillar page: sleep-friendly story principles
├── /stories/1-3-years             Age-band story shelf
├── /stories/3-5-years             Age-band story shelf
├── /stories/5-7-years             Age-band story shelf
├── /stories/6-8-years             Older-kid gentle hero shelf
├── /pricing.md                    AI-agent-readable pricing/status
├── /llms.txt                      AI-agent-readable product summary
├── /robots.txt                    Crawler access
└── /sitemap.xml                   Search discovery
```

## Homepage SEO package

Title:

> Mini Dream Time — Calm Bedtime Stories for Kids

Meta description:

> Gentle illustrated bedtime stories for parents to read aloud. Choose age-friendly stories, turn pages at your own pace, and make bedtime feel calm and special.

H1:

> Calm bedtime stories for little dreamers.

Hero support:

> Mini Dream Time gives parents a beautiful shelf of gentle read-aloud stories, one cozy page at a time.

Primary CTA:

> Choose Tonight’s Story

Secondary CTA:

> Explore Stories

## Extractable answer blocks for AI search

Use these blocks on public pages.

### What is Mini Dream Time?

Mini Dream Time is a read-aloud bedtime story library for parents and children. It offers calm illustrated stories organized by age range, mood, and story world, so parents can choose a bedtime story quickly and read it one page at a time.

### What makes Mini Dream Time different?

Mini Dream Time is designed around the parent-led bedtime ritual instead of autoplay, games, or video-style engagement. Stories have gentle beginnings, calm middles, and predictable resolutions, with text kept separate from artwork for readable parent-paced story time.

### Who is Mini Dream Time for?

Mini Dream Time is for parents and caregivers reading to young children at bedtime. The first story bands cover toddlers and early readers, including 1-3 yrs, 3-5 yrs, and 5-7 yrs.

## Content expansion plan

Phase 1 pages:

1. `/bedtime-stories-for-kids`
   - define the category
   - explain bedtime story length by age
   - compare short stories vs longer read-aloud routines
   - link to age shelves

2. `/read-aloud-bedtime-stories`
   - explain parent-read benefits
   - target “read aloud bedtime stories” and “stories parents read to kids”
   - include a 3-step bedtime routine

3. `/calm-bedtime-stories`
   - explain calm story structure
   - target sleep-friendly stories
   - mention no cliffhangers/scary endings/high-stimulation action

4. `/stories/{age-range}`
   - age-specific intro
   - story length guidance
   - story cards
   - FAQ section

## Schema plan

Already added to `index.html`:

- `Organization`
- `WebSite`
- `SoftwareApplication`

Add later when public landing pages exist:

- `FAQPage` for pillar FAQs
- `BreadcrumbList` for age/category pages
- `ItemList` for story shelves
- `CreativeWork` or `Book` for individual stories if published as indexable pages

## AI-agent files

Created:

- `/llms.txt`
- `/pricing.md`
- `/robots.txt`
- `/sitemap.xml`

These help non-Google AI systems and autonomous agents parse the product without JavaScript rendering.

## Copy rules

- Say “read aloud” and “bedtime stories for kids” explicitly on landing pages.
- Avoid making AI the front-facing promise.
- Lead with bedtime calm, parent choice, and beautiful illustrated stories.
- Keep privacy/compliance language in parent notes and policy pages, not the hero.
- Use “age-friendly stories” rather than implying child profiling.
