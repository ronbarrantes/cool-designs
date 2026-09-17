# Design influence library

Captured: 2026-09-17
Status: research/reference library

This file is a source-backed study guide for the Cool Designs research funnel. Use it to sharpen observation, distillation, cataloging, dashboard choices, and original recreations. Do not copy any source's visuals, brand assets, text, screenshots, code, logos, motion, or proprietary interface details. The goal is to study principles and make original work with invented data, copy, and visual systems.

## How to use this with the repository

- `websites/` and `companies/`: use these references as discovery lenses when deciding what is worth turning into a candidate.
- `flows/`: convert a reference into a flow only after inspecting a complete workflow, including at least one state change or decision point.
- `captures/`: capture dated evidence from the target product or site itself, not from this library. Mark access limits when a source cannot be inspected.
- `distillation/` and `patterns/`: promote a principle only when multiple captured records support it. Keep observation separate from interpretation.
- `catalog/design-catalog.json`: add references only after they have a stable source URL, workflow, states, pattern, capture paths, tags, and verification date.
- `dashboard/`: use the questions below to test whether the dashboard helps compare references, not just admire thumbnails.
- `recreations/`: build original exercises that borrow constraints, interaction problems, or composition questions, never source-specific art direction.

## Individual thinkers and writers

### 1. Maggie Appleton: digital garden and visual essays

- Source URL: https://maggieappleton.com/
- Category: Individual thinker/writer
- Worth studying: A personal research site organized around essays, notes, patterns, talks, podcasts, and a library. The structure makes process and knowledge accumulation visible.
- Question or exercise: In the Cool Designs dashboard, can a selected flow show "source record", "capture", "distillation", and "recreation" as an evolving research trail rather than isolated files?
- Observation vs interpretation: Observation: the site exposes multiple content types and a "Patterns" section. Interpretation: this suggests a useful model for showing design research as a living archive.

### 2. Maggie Appleton: about page as practice map

- Source URL: https://maggieappleton.com/about/
- Category: Individual thinker/writer
- Worth studying: The about page connects disciplines, roles, prototypes, design engineering, product design, visual interface design, and cultural analysis.
- Question or exercise: Add a note template prompt that asks which disciplines a flow touches: product, operations, research, writing, visual systems, motion, or engineering.
- Observation vs interpretation: Observation: the page explicitly frames the work at the intersection of design, anthropology, and web development. Interpretation: Cool Designs can benefit from naming the disciplines behind each captured pattern.

### 3. Robin Rendle: personal site as public office

- Source URL: https://robinrendle.com/about/
- Category: Individual thinker/writer
- Worth studying: The site treats notes, essays, typography, code openness, and frequent redesign as part of the work.
- Question or exercise: For a recreation, build one original note-detail view that makes provenance, uncertainty, and revision date more visible than decorative polish.
- Observation vs interpretation: Observation: the about page discusses notes, essays, the site's code, typography, and changing styles. Interpretation: the useful lesson is to expose revision and authorship instead of hiding research messiness.

### 4. Brad Frost: Atomic Design

- Source URL: https://atomicdesign.bradfrost.com/
- Category: Individual thinker/writer
- Worth studying: Atomic Design frames interfaces as thoughtful hierarchies and connects design systems, pattern libraries, and workflow.
- Question or exercise: For each recreation, label one screen-level pattern, two reusable components, and one token-level decision before writing CSS.
- Observation vs interpretation: Observation: the source presents a design-system methodology for consistent interfaces across contexts. Interpretation: the repository's recreations should record reusable patterns without pretending to be a full design system.

### 5. Brad Frost: practice, courses, and design systems

- Source URL: https://bradfrost.com/
- Category: Individual thinker/writer
- Worth studying: The site gathers courses, books, blog, speaking, community, and design-systems teaching into one personal practice.
- Question or exercise: In `index/README.md` run summaries, add a "teaching value" note: what could another builder learn from this flow or recreation?
- Observation vs interpretation: Observation: the site foregrounds design systems, courses, books, and writing. Interpretation: Cool Designs can treat each recreation as a teachable artifact, not just a visual result.

### 6. Frank Chimero: designer archive

- Source URL: https://frankchimero.com/
- Category: Individual thinker/writer
- Worth studying: A sparse personal index links design practice, book work, archive, profile, and long-running posts.
- Question or exercise: Create a compact dashboard card state that favors clear hierarchy and durable links over screenshot-heavy presentation.
- Observation vs interpretation: Observation: the page is a concise index of work and archive links. Interpretation: restraint can make a research library easier to scan when the content is strong.

### 7. Frank Chimero: The Shape of Design

- Source URL: https://shapeofdesignbook.com/
- Category: Individual thinker/writer
- Worth studying: The book site exposes a table of contents around craft, beauty, limitation, context, stories, delight, and giving.
- Question or exercise: For one existing recreation, write a short post-build note answering: what limitation improved the result?
- Observation vs interpretation: Observation: the source organizes design topics as chapters, including limitations and context. Interpretation: constraint notes can make recreation decisions more intentional.

## Studios and firms

### 8. Pentagram: browsable work archive

- Source URL: https://www.pentagram.com/work
- Category: Design studio/firm
- Worth studying: The work archive supports browsing by sector, discipline, location, and year across many kinds of design work.
- Question or exercise: Compare the existing dashboard filters with Pentagram's filter dimensions. Which one missing dimension would improve Cool Designs most: workflow, sector, interaction pattern, or state type?
- Observation vs interpretation: Observation: the work page exposes sector and discipline filters. Interpretation: Cool Designs should filter by research usefulness, not agency prestige.

### 9. Studio Dumbar: motion-heavy work list

- Source URL: https://studiodumbar.com/work
- Category: Design studio/firm
- Worth studying: The work list spans identity, motion, events, cultural organizations, sports, technology, and public institutions.
- Question or exercise: In a recreation, design one original state transition where motion clarifies status change rather than adding decoration.
- Observation vs interpretation: Observation: the work page lists many identity and motion-oriented projects. Interpretation: motion references should become interaction questions, not copied animation styles.

### 10. DIA: research, process, and searchable work

- Source URL: https://www.dia.studio/
- Category: Design studio/firm
- Worth studying: DIA presents itself as a design, research, and innovation studio with work, about, process, index, filtering, and search.
- Question or exercise: Add a dashboard comparison scenario: can Ron find a reference by process need, not just by visual category?
- Observation vs interpretation: Observation: the site includes process, index, filter, and search navigation. Interpretation: Cool Designs should support retrieval by research intent.

### 11. Instrument: brand, product, marketing, and technology

- Source URL: https://www.instrument.com/
- Category: Design studio/firm
- Worth studying: The site frames work across brand, product, marketing, campaigns, services, clients, recognition, and purpose.
- Question or exercise: For each catalog record, test whether the pattern belongs to product behavior, brand expression, marketing conversion, or operations.
- Observation vs interpretation: Observation: Instrument groups work and services across brand, marketing, and product. Interpretation: separating these modes can prevent applying marketing-page lessons to operational UI.

### 12. Work & Co: product agency and contact workflow

- Source URL: https://work.co/
- Category: Design studio/firm
- Worth studying: The homepage combines product-agency positioning, latest work, an index, newsletter signup, and a structured inbound form.
- Question or exercise: Capture one complete contact or subscription flow from a public site and compare its validation, required fields, optional fields, and recovery states.
- Observation vs interpretation: Observation: the page includes form fields, validation copy, and submit/cancel actions. Interpretation: even agency sites can provide useful workflow states for the library.

### 13. AREA 17: brand, experience, and technology

- Source URL: https://area17.com/
- Category: Design studio/firm
- Worth studying: AREA 17 ties clients, capabilities, industries, culture, newsletter signup, and contact inquiry flows together.
- Question or exercise: Build an original dashboard detail view that separates "capability", "industry", "workflow", and "evidence" as different facets.
- Observation vs interpretation: Observation: the homepage presents capabilities, industries, updates, newsletter signup, and contact form structures. Interpretation: facet clarity can help the catalog avoid vague tags.

### 14. Locomotive: agency page and capability model

- Source URL: https://locomotive.ca/en/agency
- Category: Design studio/firm
- Worth studying: The agency page states a digital-first position, lists capabilities, and breaks the team into design, development, and operations.
- Question or exercise: In the next run summary, identify whether each open action needs design, development, operations, or research work.
- Observation vs interpretation: Observation: the page names digital and branding capabilities and team areas. Interpretation: the repository can use role framing to make next actions more concrete.

### 15. Active Theory: New Frontier

- Source URL: https://activetheory.net/work/new-frontier
- Category: Design studio/firm
- Worth studying: A studio case-study URL focused on immersive interactive work. The public page may require live browser inspection for meaningful observation.
- Question or exercise: Before using this as influence, run a browser capture and record interaction, performance, loading, and fallback states. Do not infer details from reputation alone.
- Observation vs interpretation: Observation: the provided source is a specific work URL. Interpretation: it is likely useful for immersive interaction study, but Cool Designs needs its own dated capture before distillation.

### 16. Ueno: strategic design and innovation studio

- Source URL: https://www.ueno.co/
- Category: Design studio/firm
- Worth studying: The homepage states a strategic design and innovation position, lists major client categories, and notes a return as a boutique agency.
- Question or exercise: For a dashboard card, test whether client credibility can be represented without relying on borrowed logos or visual marks.
- Observation vs interpretation: Observation: the source foregrounds strategic design, innovation, client names, awards, and agency status. Interpretation: Cool Designs should abstract credibility patterns without copying client-brand presentation.

## Reference indexes and trend lenses

### 17. Awwwards: portfolio category

- Source URL: https://www.awwwards.com/websites/portfolio/
- Category: Reference gallery/trend source
- Worth studying: A portfolio-category gallery can provide a broad discovery queue for interactive and visual portfolio patterns.
- Question or exercise: Pick three portfolio candidates and convert only one into a flow record after verifying a complete workflow or state change.
- Observation vs interpretation: Observation: the source URL is a portfolio website category. Interpretation: gallery inclusion is a discovery signal, not evidence that a pattern works.

### 18. SiteInspire: searchable inspiration gallery

- Source URL: https://www.siteinspire.com/
- Category: Reference gallery/trend source
- Worth studying: SiteInspire exposes categories such as agencies, typographic, design and art direction, portfolio, web and interactive design, ecommerce, minimal, grid layout, and unusual layout.
- Question or exercise: Use category tags to generate capture hypotheses, then replace the gallery tag with repository-specific tags after inspection.
- Observation vs interpretation: Observation: the site presents category and style filters plus a gallery of entries. Interpretation: external categories are starting points; Cool Designs tags should describe observed behavior.

### 19. Typewolf: designer portfolio sites

- Source URL: https://www.typewolf.com/portfolio-sites
- Category: Reference gallery/trend source
- Worth studying: The Typewolf portfolio list emphasizes typography choices and distinguishes personal portfolios from studio sites.
- Question or exercise: In one recreation, create an original typography scale and record why each type role exists before styling colors or layout.
- Observation vs interpretation: Observation: the source lists portfolio sites and font pairings. Interpretation: typography should be studied as hierarchy and reading behavior, not copied font taste.

### 20. Brutalist Websites: anti-polish reference set

- Source URL: https://brutalistwebsites.com/
- Category: Reference gallery/trend source
- Worth studying: The archive is useful for studying intentionally raw layout, default-browser affordances, density, and resistance to polished sameness.
- Question or exercise: Build one original recreation variant that uses plain controls, sharp hierarchy, and high information density while preserving usability.
- Observation vs interpretation: Observation: the source is an archive of brutalist websites. Interpretation: brutalism is a constraint lens, not permission to make inaccessible or confusing interfaces.

### 21. Designlab: brutalism overview

- Source URL: https://designlab.com/blog/examples-brutalism-in-web-design
- Category: Reference gallery/trend source
- Worth studying: The article collects examples and best practices around brutalism in web design, useful as a vocabulary primer before inspecting primary examples.
- Question or exercise: When a candidate looks intentionally rough, write separate notes for visual style, interaction clarity, accessibility risk, and business context.
- Observation vs interpretation: Observation: the source is an article about brutalism examples and practices. Interpretation: trend language should help describe evidence, not replace direct capture.

## Use constraints

- Make original work. Study structure, interaction questions, hierarchy, and constraints; do not copy final expression.
- Keep source notes short and factual. Link to the source URL and record the date of any capture.
- Separate observation from interpretation in every flow, capture, distillation, and recreation note.
- Do not add third-party screenshots, logos, copied code, or copied text to this repository unless Ron explicitly approves a legally safe use case.
