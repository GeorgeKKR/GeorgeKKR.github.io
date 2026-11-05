# Deep review: georgekkr.github.io

I want a deep, honest review of my portfolio site. Look at it the way five people would: a creative director, a senior front-end engineer, an SEO specialist, a copy editor, and the New York 2nd AD deciding whether to hire me. Every finding should answer one question: does this help someone who lands here decide to hire me? Take your time; I want thorough over fast. Review first, and don't change the site until I've picked what to do.

## About me (edit before sending, or keep the defaults)

- **Goal right now:** get booked for PA and AD department work in New York.
- **Who I most need to impress:** 2nd ADs, key PAs, UPMs and production coordinators crewing up NYC shoots, plus music video and commercial producers who need a bilingual PA or camera and edit help.
- **New since the site was last updated** (credits, a showreel, a résumé PDF, testimonials): nothing.
- **Off-limits:** nothing.

If this section contradicts the site, trust this section and tell me what's out of date. If anything else in this prompt turns out to be wrong about the site, tell me that too.

## Context

- **Stack:** Next.js 14 (App Router, `output: 'export'`), Tailwind, TypeScript, Lenis smooth scrolling and a hand-built motion system (`components/motion/`, `app/globals.css`). The contact form sends through EmailJS from the browser. Project data and most copy live in `lib/content.ts`; the rest is hard-coded in pages and components.
- **Hosting:** GitHub Pages, so static files only: no server, no API routes, no custom headers, and no image optimization (`images.unoptimized`). Deploys are manual: `npm run deploy` builds and pushes `out/` to the `gh-pages` branch from whichever branch is checked out.
- **What's live is not `main`.** As of 5 Nov 2026, the live build came from `claude/loving-volta-l5wkx5`, seven commits ahead of `main` (New York PA/AD positioning, Su Mano, the edit-suite hero, a new portrait). Confirm this before you start.
- **It's been critiqued once.** Commit `43ed8ae` fixed three critical issues from an earlier design critique: hero text no longer waits on JavaScript, credit roles stay with their names, and the Work title no longer breaks mid-word. Check those still hold, don't re-report them, and go further.

## Ground rules

- **Review only.** Don't edit site files until I choose what to implement. Keep scratch scripts and screenshots outside the repo; the report is the only file you add.
- **Never deploy.** Don't run `npm run deploy` or push to `gh-pages`. That publishes the live site.
- **Don't send real messages** through the contact form. Mock EmailJS to test its states.
- **Back every finding with evidence:** a `file:line`, a screenshot, a measured number or a quoted string. If you can't, label it a hunch or leave it out.
- **Be blunt and specific.** No flattery, no generic advice. "Tighten the copy" isn't a finding. "Change X to Y, because Z" is.
- **Don't invent facts about me:** no made-up credits, clients, dates, numbers, testimonials or awards. Use `[placeholders]` and add the question to "Questions for me".
- **Respect the current direction** (cinematic, black, condensed title-card type, the edit-suite hero) unless you can show it hurts the goal. If it does, say so plainly and show what you'd do instead. Don't propose a redesign for novelty.
- **Stay within static hosting.** Every fix must work as a static export on GitHub Pages, or you must say it needs a hosting change and what that change buys me.
- **Separate sandbox limits from site bugs.** If YouTube thumbnails, embeds or the live URL don't load because your environment can't reach them, say so instead of reporting them as broken.
- **Copy:** US English, first person, plain and specific, in the site's current voice.
- **Use relevant skills** if you have them (design critique, accessibility audit, UX writing, UX/UI audit).

## Method

1. **Find what's live.** Fetch the `gh-pages` branch and read its latest commits (each deploy commit says what it shipped), then work out which source branch matches. Review that branch, and tell me how far `main` is behind it.
2. **Build and check:** `npm ci`, `npm run build`, `npm run lint`, `npm run type-check`, `npm audit --omit=dev`, `npm outdated`. Note every warning.
3. **Serve it.** Serve `out/` locally (e.g. `npx serve out`). To see the exact deployed build, check out `gh-pages` into a separate worktree and serve that as well. If you can reach https://georgekkr.github.io, check it directly too: status codes, the 404 page, `robots.txt`, `sitemap.xml` and meta tags.
4. **Look at every page in a real browser** (Playwright): `/`, `/work/`, `/about/`, `/contact/`, and a made-up URL for the 404. Widths: 320, 390, 768, 1024, 1440 and 1920 px, above the fold and full page. Also capture the mobile menu open; the hero reel playing and paused; a film title hovered and keyboard-focused; the video dialog for a YouTube film and for the Su Mano set footage; each Work filter; every contact form state (empty, invalid, sending, sent, failed); a keyboard-only pass; and `prefers-reduced-motion: reduce`.
   Scroll reveals stay hidden until they come into view, so scroll through each page before a full-page shot (or emulate reduced motion), or you'll capture blank sections. Look at the screenshots yourself and judge the visuals by what you see, not by what the code implies.
5. **Measure.** Lighthouse, mobile and desktop, for each page if you can run it; otherwise LCP and CLS through PerformanceObserver, bytes per page by type (images, video, JS, fonts), and long tasks under 4× CPU throttling. Run axe-core on every page. Check contrast for every text and background pair in use, including reduced-opacity text such as `text-screen/45`. Record the heading outline of each page, test every internal and external link, and collect console errors and warnings.
6. **Read everything:** `app/`, `components/`, `lib/`, `public/`, the config files, `README.md`, the markdown docs at the root and in `docs/`, and the file list on `gh-pages`.
7. **Optional:** if you can browse the web, look at a few well-regarded portfolio sites of New York crew and filmmakers, and name specific things they do that mine should (ideas, not their look).

## What to review

The specific checks below are things I've noticed. Verify each one (some may be wrong or already fixed), and don't stop at them.

### 1. First impression

- For each reader in "About me", at 390 px and 1440 px: what do they understand after 5 seconds, and after 30? Who I am, what I do, where I am, how experienced I am, how to reach me. What's missing, and what slows them down?
- Does the first screen read as a working crew member, or as a student reel?

### 2. Positioning, credibility and professionalism

- Is "PA and AD department, New York, bilingual" clear and consistent everywhere: hero, page titles, meta description, footer, contact page, manifest? Flag leftovers from the London producer and director version that send a mixed message.
- Does the work back up the positioning? Most credits are directing, producing and podcast editing, while the headline says PA and AD. Does that read as range or as confusion? What would a 2nd AD want to see first?
- Read the timeline as a skeptical hirer would: the degree (2020–2023) overlapping jobs in London and Los Angeles, the gap from 2023 to July 2025, and nothing after July 2025. What raises questions, and how can the page answer them honestly?
- What does a New York crew hire expect that's missing? A résumé PDF, availability, references, local hire, driver's license, union status, own kit. Ask me; don't assume.
- Trust signals: the `github.io` address and an email address with digits in it. Is a custom domain with a matching email worth it, and what does setting one up on GitHub Pages involve?
- The Su Mano footage and stills come from a feature that may not be released yet. Many productions restrict behind-the-scenes posts until release, and the people who hire ADs and PAs pay attention to discretion. Ask me whether I have permission, and suggest how to show that on the page.
- Do the portrait and on-set photos look professional, and do they support the story?

### 3. Work selection and storytelling

- Is the strongest, most relevant work first? What would you cut, merge or move down (three Mission Makers podcast episodes, for example)?
- Each project gets one line of description. What would make each one credible: my specific responsibilities, scale (crew size, shoot days, locations), collaborators, results? Propose a short format I can repeat, and draft it for every project with `[placeholders]`.
- Is there a case for a showreel, individual project pages, or a short on-set case study for Su Mano?

### 4. Copy: every word

- Go through every string: `lib/content.ts`, text hard-coded in pages and components, alt text, aria-labels, page titles and meta, form labels and messages, the 404.
- Headline: three alternatives with different angles, and the one you'd pick.
- Bio: does it open with what matters to the people hiring me?
- The philosophy quote: does it earn its space, or is it generic?
- Experience entries: strong verbs, specifics, results, and a consistent format (some have descriptions and some don't).
- Links and calls to action: "All N films", "More about me", "Full CV" (which goes to the About page, not a CV), the contact prompts, and the form's success and error messages.
- Consistency: US spelling, role capitalization, date ranges and dashes, abbreviations.

### 5. Visual design

- Hierarchy, type scale, line lengths, weights, spacing rhythm, grid alignment, color, image treatment, and how consistent components are across pages, at every width.
- Does the cinematic concept (edit-suite hero, title cards, billing-block credits, grain, letterboxing) serve the work and these readers, or compete with them?
- The weakest screen on each page, and exactly what you'd change, with sizes, spacing and values.
- What would make it look more polished and more expensive without losing its character?

### 6. Motion and interaction

- Is each animation doing a job? Flag anything that delays content, feels gimmicky or fights the visitor: Lenis smooth scrolling, the 380 ms exit before every navigation, the cursor label, the staggered reveals, the auto-advancing reel.
- Touch devices and iOS Safari: `100svh`, `<dialog>`, view transitions, muted autoplay video.
- Cost: when motion is on, two `requestAnimationFrame` loops run every frame for as long as the page is open: `MotionProvider`'s and, on mouse devices, `CursorLabel`'s. The first calls `querySelectorAll('[data-parallax]')` every frame although nothing uses `data-parallax` any more, and a `MutationObserver` watches all of `body`. Measure them under CPU throttling.

### 7. Accessibility (WCAG 2.2 AA)

- axe-core results plus a manual pass: the keyboard path through the hero index, the reel's pause control, the video dialog, the filters, the mobile menu and the form; visible focus and a sensible order; focus returning when the dialog closes.
- What a screen reader announces for the split-text headings and the billing-block credits; landmarks, headings and alt text quality.
- Contrast (including reduced-opacity text), target sizes, reflow at 320 px and 400% zoom, pause controls for moving content (2.2.2), and the `lang` attribute.

### 8. Performance

- Core Web Vitals on mobile, and the LCP element on each page.
- Images ship as they are, since optimization is off. Are dimensions and formats right? Are YouTube `maxresdefault` thumbnails (full 1280×720 JPEGs, and not every video has one) the right source?
- The Su Mano clip (6.3 MB at 1080p, 3.0 MB at 720p): when it loads, and whether it should be smaller.
- Font subsets and weights, JS bundle size, third parties (the YouTube iframe, EmailJS), and what GitHub Pages' fixed caching allows.

### 9. SEO and link sharing

- Set realistic goals for a personal site. "George Kelly" alone is a crowded name, so aim to own my name plus my role ("George Kelly production assistant", "George Kelly 3rd AD", "George Kelly New York"), get indexed correctly, and make every shared link look good.
- A unique title and description on every page. `/work/` and `/contact/` are client components, so they can't export `metadata`: check what they actually ship.
- `robots.txt` points to `/sitemap.xml`: does it exist? Also check canonical URLs, trailing-slash consistency, the 404 page, and the nonstandard `Host:` line.
- Structured data: a `Person` (name, job title, New York, `sameAs` links to LinkedIn and IMDb), and whether projects should be marked up too.
- Is my name in a visible `<h1>` on the home page? Can anyone share a link to a single project, when films only open in a dialog?
- Link previews: the `og:image` is a portrait photo (1122×1402). Show how it crops in LinkedIn, iMessage, WhatsApp, Slack and X cards, and spec a 1200×630 card.
- Off-site setup: Google Search Console, and consistent name, role and links on LinkedIn and IMDb.

### 10. Contact and conversion

- On a phone, how many taps does it take from landing to contacting me? Is the contact information where an AD needs it?
- Email link vs. form vs. copy-to-clipboard; phone or text (a lot of crew hiring happens by text); stating my availability; telling people what to include.
- The EmailJS form: every state works, failures are handled, there's spam protection, and the free plan's limits are acceptable. Its public key sits in client code by design, so list what I should check in the EmailJS dashboard (allowed domains, rate limits).
- Résumé: "Full CV" goes to the About page and there's no PDF yet. Recommend how to offer one while keeping my phone number off the public copy.

### 11. Code quality, maintenance and deployment

- Structure, naming, component boundaries, client vs. server components (could Work and Contact be server pages with small client islands, so they get metadata and ship less JS?), effects, listeners and cleanup, the content model in `lib/content.ts`, TypeScript strictness.
- Dead code and clutter: unused helpers in `lib/utils.ts`; stale docs at the root (`IMPROVEMENTS_SUMMARY.md`, `REFACTORING_*.md`, `CONSOLE_NOTES.md`, `DEPLOYMENT_CHECKLIST.md` and others) that describe older versions; a README listing Framer Motion, which isn't a dependency; `.env` committed despite `.gitignore`; 0-byte icon files in `public/`; config that does nothing (`swcMinify`, and `images.remotePatterns` with optimization off).
- Dependencies: what's worth upgrading from Next 14 and the rest, and at what risk.
- Deployment: manual deploys from any branch are how the live site got ahead of `main`. Recommend a safer flow, such as a GitHub Actions workflow that deploys `main` only after build, lint and type-check pass.
- `LICENSE` is MIT, "Copyright (c) 2021 Ubai Mutl", probably inherited from a template. What does that mean for my photos, footage and copy, and what should I do about it?

### 12. Polish and trust

- Favicons and app icons (some are 0 bytes), the web manifest (`orientation: portrait-primary`, and whether a manifest is useful here at all), a branded 404, the copyright year (set when the site is built, not when it's viewed), print styles for the About page, console errors.

## Deliverable

Write the full report to `docs/site-review.md`, and give me a short summary in chat with the most important screenshots.

1. **Verdict:** five lines at most: overall impression, biggest risk, biggest opportunity.
2. **Scorecard:** each of the 12 areas scored 1–10, with a one-line reason.
3. **First-impression walkthroughs:** a short paragraph for each reader in "About me", with the screen they'd see.
4. **Top 10 changes,** ranked by how much they'd help me get hired relative to the effort.
5. **All findings,** grouped by area. Each gets an ID (e.g. `COPY-03`), a severity, the problem, the evidence, why it matters for my goal, the exact fix (code, values or replacement copy) and the effort (S: under an hour, M: under a day, L: more).
   - **Critical:** costs me work or credibility now: broken, wrong, embarrassing or risky.
   - **High:** clearly weakens the first impression or a key flow.
   - **Medium:** worth fixing, with a smaller effect.
   - **Low:** polish.
6. **Copy deck:** a table of current text, proposed text and the reason, for every line you'd change, with `[placeholders]` where you need facts from me.
7. **Questions for me:** everything you need to know to finish the recommendations, and why each one matters.
8. **Roadmap:** quick wins (today), this week, and bigger bets, each pointing to finding IDs.
9. **Keep:** a short list of what's working, so I know what not to touch.

Then stop and ask which items I want implemented. When I choose, base the work on the branch that matches what's live, make small commits, re-run build, lint and type-check, and show me before-and-after screenshots of every page you changed.
