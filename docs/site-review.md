# Site review: georgekkr.github.io

Reviewed 5 November 2026 against the live build. One question drives every finding: does this help someone who lands here decide to hire you for PA and AD department work in New York?

## What I reviewed, and what's out of date in the brief

- **What's live.** The latest `gh-pages` deploy is `0cead73` (5 Nov 2026, 07:11 UTC). Its message says "Built from claude/loving-volta-l5wkx5 at ee16f2d". A fresh `npm run build` of `ee16f2d` is byte-identical to the deployed tree once the random Next.js build ID is normalized (67 files, 0 differ). This review covers exactly what visitors get.
- **`main` is no longer behind.** The brief says `main` is seven commits behind the live branch. That was true of the clone's local `main` (`16bcf9c`), but `origin/main` has since been fast-forwarded to `ee16f2d`, the same commit as `claude/loving-volta-l5wkx5` and the deploy. Ahead/behind is 0/0. Two other branches exist: `claude/happy-curie-y8pmch`, which is old `main` plus the review prompt, and `claude/modest-ritchie-68cvru`, which is old `main` itself.
- **The three fixes from `43ed8ae` still hold** at 320–1920 px. The hero text animates in with CSS alone, credit roles stay glued to their names, and the Work title doesn't break mid-word. I don't re-report them. The first fix holds only for the home hero, though: primary content on Contact, About and Work still waits for JavaScript (MOT-01).
- **Sandbox limits, not site bugs.** This environment's network policy blocks `georgekkr.github.io`, `www.youtube.com`, `i.ytimg.com`, `api.emailjs.com`, LinkedIn and IMDb (the proxy refuses the connection, and the fetch tool can't resolve them). So:
  - I served the exact build locally with a server that behaves like GitHub Pages: gzip, `Cache-Control: max-age=600`, `404.html` with a 404 status, and a 301 to add the trailing slash.
  - YouTube thumbnails appear in my screenshots as a grey frame labeled "YouTube thumbnail (blocked in sandbox)". I couldn't check which `maxresdefault` images exist or whether each video is still public.
  - EmailJS was mocked. No request left the sandbox, and nothing was sent.
  - Only Chromium is installed, so iOS Safari points come from the code and documented WebKit behavior, labeled as such.
- **Screenshots and scripts** live outside the repo, as you asked. This report is the only file added. The key screenshots are attached in chat, and every finding below also cites a `file:line`, a measured number or a quoted string, so it can be checked without them.

---

## 1. Verdict

- The site looks more considered than most crew portfolios, and the build is clean. But it's laid out like a director's reel. The things a 2nd AD hires on are missing or buried: who you are, whether you're available, how to reach you fast, and what you actually did on set.
- **Biggest risk:** set footage and stills from *Su Mano*, a feature with no public footprint I could find, are published with no sign of the production's OK. To people who hire ADs, that reads as a discretion problem (POS-01).
- **Biggest opportunity:** you have a recent, bilingual 3rd AD credit on a feature. Put it, your name, your availability and Email / Text / Résumé buttons on the first screen, and the site starts doing its job (FIRST-01–03, CONV-01–02).

## 2. Scorecard

| # | Area | Score | Why |
|---|---|---|---|
| 1 | First impression | 5/10 | Role, city and languages are clear in five seconds. Your name, your experience level, your availability and any way to reach you are not. |
| 2 | Positioning, credibility, professionalism | 4/10 | The headline says PA/AD, but 7 of 9 films are directing, producing, editing or camera. The timeline has unexplained overlaps and gaps, and the hiring basics are absent. |
| 3 | Work selection and storytelling | 4/10 | The AD credit leads, which is good. Then come three podcast episodes, and one-line blurbs that describe the video rather than your job. |
| 4 | Copy | 5/10 | Plain, consistent US English voice. The bio opens with school, the philosophy quote is generic, and several CTAs are mislabeled. |
| 5 | Visual design | 8/10 | A distinctive system used with discipline. Weak spots: an unstyled 404, invisible form fields, the giant Gmail address, and an empty desktop hero corner. |
| 6 | Motion and interaction | 5/10 | Polished, but it costs you. Contact copy appears 2.7 s later on a phone, each navigation takes about 1.3 s, and a cursor label covers titles. |
| 7 | Accessibility | 7/10 | Strong base: skip link, native dialog, pause controls, reduced motion, text contrast. Gaps: the mobile menu isn't modal, six names miss their labels, field borders are at 1.48:1, credits read as one run-on sentence. |
| 8 | Performance | 6/10 | Desktop scores 100. Mobile LCP is 2.2–3.3 s, 627 KiB of stills load early, and the full 3–6 MB clip downloads even for visitors who never play it. |
| 9 | SEO and link sharing | 3/10 | Work and Contact reuse the home title. There's no sitemap (robots.txt points at a 404), no canonical, no structured data, the name isn't visible in the H1, and previews crop your face at the eyes. |
| 10 | Contact and conversion | 4/10 | The form works and fails gracefully. But there's no availability, no text option, no résumé and no copy button, and on a phone the email sits ~3,900 px down. |
| 11 | Code quality, maintenance, deployment | 6/10 | Tidy components and a good content file. Against that: manual deploys from any branch, dead code and stale docs, a template LICENSE, and `strict: false`. |
| 12 | Polish and trust | 4/10 | The white default 404, an emoji favicon, 0-byte icons, a manifest that locks orientation, and an unprintable About page. |

## 3. First-impression walkthroughs

**2nd AD crewing up a NYC shoot, on a phone between setups (390 px; screenshot `home-390`, sent in chat).**
- *In 5 seconds:* the line "Production assistant and filmmaker in New York. AD department, camera and edit, in English and Spanish." and a still of someone slating 12/5 in front of a cinema camera. That reads as real set work: a PA who speaks Spanish.
- *What's missing:* your name (only the 24 px logo), whether you're local and available, and any experience level beyond one caption, "3rd Assistant Director, Feature film".
- *In 30 seconds:* they scroll a list of titles from 2020–2022 with no roles beside them. Then a paragraph that opens "I studied Film Studies at Queen Mary…", a philosophy quote, stills, a credits block that ends with three schools, and finally the email address about 3,900 px down.
- *The likely verdict:* "Keen, one real AD credit, not sure he's in town." Most 2nd ADs crewing fast move on to the next résumé rather than email to ask.

**Key PA, on desktop (1440 px; screenshot `home-1440`, sent in chat).**
- *In 5 seconds:* a cinematic edit-suite hero with big titles. Only *Su Mano* shows a role.
- *In 30 seconds:* the best evidence on the site is the Su Mano job description on About: crowd control, holding and sign-in, lock-ups, walkie. It's two clicks deep (About, then Experience), and there's no PDF to forward to the 2nd AD.
- The polish signals care. The `github.io` address and `George1415352@gmail.com`, set at up to 152 px tall, signal early career.

**UPM or production coordinator.**
- They look for paperwork facts: local hire, union status, availability dates, references, and a résumé to attach to the crew list. None of these are on the site.
- The Contact page asks them to "Tell me about your project", but doesn't say what you need from them or how fast you reply.

**Music video or commercial producer looking for a bilingual PA or camera and edit help.**
- This reader is served best. There are director credits (*ZIGZAG*, *BISOUS*), a commercial you produced (*Cleaning Made Simple*) and a DP credit, all playable in place.
- After 30 seconds the doubt is the opposite one: the headline says "PA and AD department work". Do you still take camera or edit days? Nothing says so, and the Work filters ("Producer 1", "Director of Photography 1") make the range look thin.

**Working crew or student reel?** Working crew for the first five seconds, thanks to the slate still. Student reel by thirty: the dates, the bio's opening line, the quote and the education rows in "Credits" all pull it back.

## 4. Top 10 changes

Ranked by how much each would help you get hired, relative to the effort.

| Rank | Change | Findings | Effort |
|---|---|---|---|
| 1 | Add a hiring strip under the hero line with your visible name, availability, and **Email / Text / Résumé** buttons. Repeat it in the mobile menu. | FIRST-01, FIRST-02, CONV-01, CONV-03 | S |
| 2 | Make a one-page résumé PDF (public version without a personal phone number) and point every "Full CV" link at it. | CONV-02, POS-04 | S, once you've answered the questions |
| 3 | Show your role on every hero row ("3rd AD · Feature") and reorder so AD work leads. Merge the three Mission Makers episodes. | FIRST-03, WORK-01 | S |
| 4 | Rewrite the headline, bio and project lines to lead with set work and scope. | COPY-01, COPY-02, COPY-04, WORK-02 | S (copy) |
| 5 | Confirm the production's permission for the Su Mano footage and add a credit line, or pull it until release. | POS-01 | S (one email) |
| 6 | Answer the timeline questions on the page: London vs. LA in 2022–23, 2023–25, and since July 2025. | POS-03 | S |
| 7 | Make Contact readable without waiting on JavaScript, say what to send and when you reply, and add a copy-email button. | MOT-01, COPY-06, CONV-04 | S |
| 8 | Replace the white default 404, and make the mobile menu keep and return focus. | VIS-01, A11Y-01 | S |
| 9 | SEO and sharing basics: page titles, sitemap, canonical URLs, Person data, a 1200×630 preview card. | SEO-01–05 | S–M |
| 10 | Deploy only from `main` through GitHub Actions, and bump Next.js to 14.2.35. | CODE-01, CODE-08 | S |

Bigger bets after these: a custom domain with a matching email address (POS-05), per-project pages and a Su Mano case study (WORK-04, WORK-05), lighter media (PERF-02, PERF-03), and trimmed motion (MOT-02 to MOT-04).

---

## 5. Findings

Severity: **Critical** costs work or credibility now (broken, wrong, embarrassing or risky). **High** clearly weakens the first impression or a key flow. **Medium** is worth fixing, with a smaller effect. **Low** is polish. Effort: **S** under an hour, **M** under a day, **L** more.

### 5.1 First impression

**FIRST-01 · High · S. The hero never shows your name as text.**
- *Problem:* the only visible "George Kelly" on the first screen is the 24–28 px header logo. The H1 puts your name in screen-reader-only text.
- *Evidence:* `app/page.tsx:32` (`<span className="sr-only">George Kelly. </span>`); screenshots `home-390` and `home-1440`.
- *Why it matters:* people who hire crew remember names, not URLs. A forwarded link should say whose site it is. Search engines also weight visible H1 text (SEO-04).
- *Fix:* make the H1 start with your name, in first person (COPY-01): "I'm George Kelly, a bilingual production assistant in New York. Most recently 3rd AD on the feature Su Mano." Delete the `sr-only` span. Widen the H1 from `max-w-[22ch]` to `max-w-[26ch]` so the longer line holds four to five lines.

**FIRST-02 · High · S. No contact path and no availability on the first screen.**
- *Problem:* the first screen's only call to action is "All 9 films". The email sits at the bottom of a 4,470 px page (at 390 px), roughly 3,900 px down. Otherwise it's Menu, then Contact, then the address: three taps (CONV-01).
- *Evidence:* `app/page.tsx:35–42`; full-page height of 4,470 px at 390 px; the contact section at `app/page.tsx:153–175`.
- *Why it matters:* a 2nd AD decides in one screen whether to text you. Availability is the first filter.
- *Fix:* add a hiring strip under the H1, two lines on phones and one on desktop, using the existing `text-link` style:
  ```tsx
  <p className="mt-6 text-screen/85">Available from [date] · Local hire, [borough] · [Driver's license]</p>
  <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
    <li><a className="text-link" href={`mailto:${contactConfig.email}`}>Email me</a></li>
    <li><a className="text-link" href="sms:[+1XXXXXXXXXX]">Text [number]</a></li>
    <li><a className="text-link" href="/george-kelly-resume.pdf">Résumé (PDF)</a></li>
  </ul>
  ```
  At 1440 px, put it in the empty top-right area, aligned to the monitor column (`lg:col-span-5 lg:col-start-8`).

**FIRST-03 · High · S. The hero hides what you did on each film.**
- *Problem:* rows show only title and year. A role appears for one film at a time, under the monitor, and only while that film is active (hover, focus, or the 5-second reel). Seeing all six roles takes 30 seconds of watching. On touch screens, tapping a row opens the video instead of revealing the role.
- *Evidence:* `components/work/film-index.tsx:188–203` (row content) and `:128–135` (role shown only for `active`); the hover screenshot; `HOLD_MS = 5000` at `:10`.
- *Why it matters:* the role column is the information a hirer scans for. "3rd AD", "1st AD", "Director" or "Producer" next to each title is what turns a list of names into a CV.
- *Fix:* add a small role line to every row. Keep the edit-suite idea: bins show clip metadata.
  ```tsx
  <span className="title-card …">{film.title}</span>
  <span className="tabular-nums …">{film.year}</span>
  <span className="col-span-2 -mt-1 text-sm text-mute">{shortRole(film.role)} · {film.subtitle}</span>
  ```
  `shortRole` maps "3rd Assistant Director" to "3rd AD" and "1st Assistant Director" to "1st AD". Keep the reel; it becomes ambient instead of the only way to learn your roles.

**FIRST-04 · Medium · M. Working crew at five seconds, student reel at thirty.**
- *Problem:* the slate still reads as professional. Everything after it reads as early career:
  - five of the six hero titles are dated 2020–2022;
  - the bio opens with the degree;
  - a mission-statement quote follows;
  - "Credits" ends with three schools.
- *Evidence:* `lib/content.ts:181–289` (dates), `:100–101` (bio), `:105–106` (quote), `:454–457` (education merged into credits).
- *Why it matters:* the same facts, ordered around set work, read as a working PA with range.
- *Fix:* the changes in FIRST-03, COPY-02, COPY-03, VIS-05 and WORK-01 together.

**FIRST-05 · Medium · S. The caption under the monitor truncates at every desktop width.**
- *Problem:* "A feature film directed by Angela Medina, shot in the…" cuts off at 1024, 1440 and 1920 px.
- *Evidence:* `components/work/film-index.tsx:134` (`sm:line-clamp-1`); screenshots at 1024, 1440 and 1920 px.
- *Why it matters:* truncation in the most-viewed caption looks unfinished.
- *Fix:* change it to `sm:line-clamp-2`, and keep summaries to 70 characters or fewer (copy deck).

**FIRST-06 · Low · S. The desktop hero leaves the top-right third empty.**
- *Problem:* at 1440 px, the intro occupies 480 px of the 1,344 px frame. "All 9 films" floats about 840 px to its right.
- *Evidence:* `app/page.tsx:27–43`; screenshots at 1440 and 1920 px.
- *Fix:* put the hiring strip there (FIRST-02), and move "All 9 films" under the last row of the list, right-aligned with the years.

### 5.2 Positioning, credibility and professionalism

**POS-01 · Critical, pending your answer · S. Set footage from a feature that may not be released, with no sign of permission.**
- *Problem:* the home page autoplays a 21-second clip and four stills from *Su Mano*.
  - Crew faces are visible.
  - The slate is legible at 1440 px: production title, roll, scene, take, day, and the director's and camera operator's names.
  - The site's director credit was "read off the slate" (`lib/content.ts:188`) rather than confirmed.
  - I found no public footprint for the film, and nothing on the site says the footage is shared with permission.
- *Evidence:* `lib/content.ts:132–150` and `:153–178`; screenshot of the Su Mano dialog at 1440 px; web search for "George Kelly" "Su Mano" returned nothing relevant.
- *Why it matters:* many productions restrict behind-the-scenes posts until release. The people who hire ADs and PAs treat discretion as part of the job. "Posted set footage early" is the kind of thing a 2nd AD hears about.
- *Fix:*
  1. Email the producer or UPM for written OK, naming the clip and stills.
  2. If they agree, add a credit under the clip and in the dialog: "Set footage courtesy of [production company], shared with permission." Confirm the director's name with them.
  3. If they don't, or until release, replace the clip with approved stills or remove the section. The 3rd AD credit stands on its own.

**POS-02 · High · S. The credits don't yet back the headline.**
- *Problem:* the headline is "Production assistant … AD department". Of the nine films:
  - one is an AD credit on a feature (3rd AD, *Su Mano*);
  - one is a 1st AD credit on a series, illustrated by its trailer;
  - seven are Director (2), Producer (1), Producer & Editor (3) or Director of Photography (1).
  The hero alternates these with no framing.
- *Evidence:* `lib/content.ts:181–279`; the filter counts on Work ("3rd Assistant Director 1 … Producer & Editor 3").
- *Why it matters:* without framing it reads as confusion ("a director who wants PA work"). Framed, it reads as range ("a PA who can also shoot and cut"), which is a real advantage on music video and commercial sets.
- *Fix:* group the work by department, AD department first, and say it in one line on Work: "AD department work first; camera, edit and directing below." See WORK-01 and WORK-03.

**POS-03 · High · S. The timeline raises three questions a skeptical hirer will ask.**
- *Problem:*
  1. **2022–2023:** Production Manager at Spectrum Labs, "Los Angeles, US", during a BA in London (2020–2023). Remote? Summer? Part-time?
  2. **Mid-2023 to July 2025:** nothing listed.
  3. **Since July 2025:** nothing listed. Su Mano itself is dated to one month.
- *Evidence:* `lib/content.ts:301–308` (Spectrum Labs), `:342–348` (degree), `:297` (`period: 'July 2025'`).
- *Why it matters:* unexplained overlaps look like padding, and gaps look like inactivity. Neither may be true, but the page doesn't say.
- *Fix:* answer each on the page in a few words (the questions are in §7).
  - Spectrum Labs location: "Los Angeles (remote from London)" or "Los Angeles", if that's accurate.
  - A 2023–2025 line: "[Freelance edit and camera work / moved to New York / non-film work]".
  - Now: "Available in New York from [date]."

**POS-04 · High · S–M. The basics NYC crew hires check are missing.**
- *Problem:* nowhere on the site:
  - a résumé PDF;
  - availability;
  - local hire or residence;
  - driver's license;
  - union status (non-union, or interest in the DGA trainee track);
  - kit (walkie and earpiece, laptop with editing software);
  - certifications such as OSHA 10 or first aid, if you have them;
  - references.
- *Evidence:* full text of all pages; `lib/content.ts:367–384` (skills).
- *Why it matters:* PA résumés are judged on what you've worked on, how many days you logged and what you can be trusted with. Many list the director, 1st AD and 2nd AD per credit, which doubles as references. ([Anonymous Production Assistant](https://anonymousproductionassistant.com/2013/03/13/a-random-collection-of-resume-tips/), [StaffMeUp](https://blog.staffmeup.com/?p=3180))
- *Fix:* add a "Logistics" line to the hiring strip and the résumé with whichever of these are true. I've asked rather than assumed (§7).

**POS-05 · Medium · M. Trust signals: a `github.io` address and a Gmail address with seven digits.**
- *Problem:* `George1415352@gmail.com` is the site's primary call to action, set at up to `9.5rem` (152 px).
- *Evidence:* `lib/content.ts:387`; `app/page.tsx:159–166`; screenshot at 1440 px.
- *Why it matters:* a name-based domain and matching email look established and are easy to say and type ("george@[domain]").
- *Fix:* buy a domain (`[georgekelly-something].[com/nyc/film]`; I haven't checked availability) and set up a matching address. Forwarding into your existing inbox is enough.
  - On GitHub Pages:
    1. Verify the domain in your GitHub account's Pages settings.
    2. Add it in the repo's Pages settings.
    3. Point the apex A records at 185.199.108.153, .109.153, .110.153 and .111.153, and `www` CNAME at `georgekkr.github.io`.
    4. Tick "Enforce HTTPS" once the certificate is issued (up to 24 hours).
    ([GitHub docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site))
  - If you keep deploying with the `gh-pages` package, also add `public/CNAME`, or each deploy wipes the domain. With the Actions workflow in CODE-01 it isn't needed.
  - Then update `meta.siteUrl`, the sitemap, the JSON-LD and your LinkedIn and IMDb links.
  - *What it buys you:* a memorable URL and email, and the freedom to change hosts later without breaking links.

**POS-06 · Medium · S. Director-era leftovers dilute the PA/AD message.**
- *Problem:*
  - the word "filmmaker" in the H1, page title, meta description and manifest;
  - the README says "Filmmaker, Creative Director, and Producer.";
  - the "Behind the camera" heading (AD work is on set, not behind the camera);
  - the mission-statement quote;
  - Director and Producer credits rank right after Su Mano.
- *Evidence:* `lib/content.ts:77–79, 97–98, 105–106`; `public/manifest.json:2,4`; `README.md:3`; `app/page.tsx:62`; `lib/content.ts:441–459` (credits keep the films' order).
- *Fix:* keep "camera and edit" as a secondary skill and drop "filmmaker" from the title and headline. Rename "Behind the camera" to "On set: Su Mano" (if cleared). The rest is in the copy deck.

**POS-07 · Medium · S. The photos support the story, except the About pair; captions don't say what you're doing.**
- *Problem:*
  - The portrait is professional: natural light, a brownstone stoop, which is a quiet New York signal. Keep it.
  - The two About photos (`camera_work1/2.webp`) are in a fluorescent-lit classroom or office and read as student work.
  - Still captions are passive ("Waiting on the next setup", "Watching the take on the monitor").
  - Nothing says which person, if any, is you.
- *Evidence:* screenshots of About at 1440 px (photos) and home at 1440 px (stills); `lib/content.ts:113–124, 153–178`.
- *Why it matters:* on-set photos are only evidence if they show you doing AD-department work.
- *Fix:*
  - Replace the About pair with two cleared Su Mano stills, or cut them.
  - Caption with person, action and context, e.g. "[Me] holding background for 12/3, day 4".
  - Change "Waiting on the next setup" to "Between setups at video village"; "waiting" reads idle to an AD.

### 5.3 Work selection and storytelling

**WORK-01 · High · S. AD work should lead; podcasts shouldn't take three slots.**
- *Problem:*
  - The hero shows *Su Mano*, *ZIGZAG*, *Cleaning Made Simple*, *Ready Set StartUP UK*, *The Power of Purpose* and *The Necklace*. The 1st AD credit is fourth, behind a music video and a commercial.
  - Work lists three Mission Makers episodes as three films.
  - ZIGZAG and BISOUS are the same artist, role and year.
- *Evidence:* `lib/content.ts:282–289` (hero order); `:236–267` (three podcast entries).
- *Fix:*
  - Hero order: Su Mano, Ready Set StartUP UK, Cleaning Made Simple, ZIGZAG, The Necklace.
  - On Work, merge the three episodes into one card: "Mission Makers (podcast), 3 episodes · Producer & Editor".
  - Keep both music videos on Work but only ZIGZAG in the hero.
  - The count becomes "All work (7)".

**WORK-02 · High · S once you've answered. Blurbs describe the video, not your job.**
- *Problem:* examples:
  - "Official trailer for the first season of the series." (your 1st AD credit)
  - "Music video for Maximilli3n's track ZIGZAG."
  - "Mission Makers podcast episode on purpose-driven leadership."
- *Evidence:* `lib/content.ts:189, 200, 210, 220–221, 231, 242, 253, 264, 274–275`.
- *Why it matters:* hirers want three things: what you were responsible for, how big it was, and who you worked under.
- *Fix:* use one repeatable format, drafted for every project in the copy deck:
  > **[Role]** · [Production type] · [Location] · [Year]
  > [What I did, verb first, ≤ 20 words.]
  > [N] shoot days · crew of [N] · [up to N background a day / N locations] · reported to [1st AD], [2nd AD]

**WORK-03 · Medium · S. Role filters advertise thinness.**
- *Problem:* seven filter buttons, four of them with one item ("3rd Assistant Director 1", "1st Assistant Director 1", "Producer 1", "Director of Photography 1"), for nine items in total.
- *Evidence:* `app/work/page.tsx:42–68`; the filter screenshots.
- *Fix:* replace the filters with three department headings in the grid: **AD department** (Su Mano, Ready Set StartUP UK), **Producing and directing** (Cleaning Made Simple, ZIGZAG, BISOUS), **Camera and edit** (The Necklace, Mission Makers). If you keep filters, use those three plus "All".

**WORK-04 · Medium · M. You can't share a link to a single project.**
- *Problem:* films open only in a dialog, and the URL doesn't change. `/work/#zigzag` scrolls to the card (each `<li>` has an `id`, `app/work/page.tsx:73`) but doesn't open it.
- *Why it matters:* crew referrals travel as links ("here's the PA I mentioned, he was 3rd AD on this").
- *Fix:* generate static project pages, `app/work/[id]/page.tsx` with `generateStaticParams()` over `films`, each with its own title, description and `og:image` (the film still). This works with `output: 'export'`. Keep the dialog on the grid, but make each card's title a link to its page.

**WORK-05 · Medium · M. A case for a Su Mano case study (if cleared); a showreel is optional.**
- A short page, `/work/su-mano/`, would be the strongest proof of the positioning:
  - role and scale (`[N]` days, crew `[N]`, background `[N]`/day);
  - three verb-first lines of responsibilities;
  - the clip and two stills with real captions;
  - one line from the 1st or 2nd AD, if they'll give it.
- A showreel isn't how PAs and ADs are hired, so skip it for that audience. For music video and commercial producers, a 30–45 second camera and edit reel could help later (L, optional).

### 5.4 Copy

Every line is in the copy deck (§6). These are the findings behind it.

**COPY-01 · High · S. The headline: three alternatives.**
- *Current:* "Production assistant and filmmaker in New York. AD department, camera and edit, in English and Spanish." (`lib/content.ts:97–98`)
- *Role first:* "Set PA and AD department in New York. English and Spanish."
- *Proof first:* "I'm George Kelly, a bilingual production assistant in New York. Most recently 3rd AD on the feature Su Mano."
- *Availability first:* "Bilingual production assistant in New York, available for set and AD department work from [date]."
- **Pick: proof first.** It puts your name in visible text (FIRST-01, SEO-04), leads with the one credential that matters most, and keeps the first person the rest of the site uses. Availability goes in the hiring strip right below it, so it isn't lost.

**COPY-02 · High · S. The bio opens with school, not set work.**
- *Problem:* "I studied Film Studies at Queen Mary University of London and have worked on both sides of the camera since." The Su Mano credit comes in the fourth sentence.
- *Evidence:* `lib/content.ts:100–103`.
- *Fix (draft, first person):*
  - Paragraph 1: "I'm a production assistant in New York. Most recently I was 3rd AD on Su Mano, a feature shot in the Dominican Republic in July 2025, where I ran background holding and sign-in, held lock-ups on exterior locations and worked the floor on walkie with the 1st and 2nd ADs, in Spanish and English."
  - Paragraph 2: "Before that I ran shoot and edit schedules as a production manager for Spectrum Labs [in Los Angeles / remotely], led content production at Nimblebabies in London, and directed, produced and shot music videos, a commercial and short films. I studied Film Studies at Queen Mary University of London, and I grew up speaking Spanish."

**COPY-03 · Medium · S. The philosophy quote is generic and appears twice.**
- *Problem:* "I believe in the power of visual storytelling to connect, inspire, and transform. Every frame is an opportunity to capture authentic moments that resonate with audiences." It's set at 36 px on home and repeated on About.
- *Evidence:* `lib/content.ts:105–106`; `app/page.tsx:79–85`; `app/about/page.tsx:48–53`.
- *Why it matters:* any filmmaker could have written it, and it speaks to audiences, not to crews.
- *Fix:* cut it on both pages. If you want something in that slot, use a one-line reference: "“[Line from the Su Mano 1st or 2nd AD]”, [Name], [1st AD], *Su Mano*". It's worth far more than a mission statement.

**COPY-04 · Medium · S once you've answered. Experience entries are uneven.**
- *Problem:*
  - Su Mano has four specific sentences.
  - Ready Set StartUP UK (1st AD) has none.
  - Others lean on weak verbs ("Helped with…", "Assisted with…", "Supported…").
  - Results and scale are missing everywhere.
  - "conducted master interviews" is unclear.
- *Evidence:* `lib/content.ts:291–339`.
- *Fix:* same format as WORK-02; drafts for all six jobs in the copy deck.

**COPY-05 · Medium · S. CTAs promise the wrong thing.**
- "Full CV" (`app/page.tsx:138`) goes to About, not a CV.
- "All 9 films" (`:41`) counts three podcast episodes, a trailer and a commercial as films.
- "More about me" (`:76`) undersells the page with your experience.
- "Want to work together? Get in touch" (`app/about/page.tsx:115–119`) is generic.
- *Fix:* "Résumé (PDF)" (or "Full résumé" until the PDF exists), "All work (7)", "Résumé and credits", and "Crewing up? Email me or download my résumé."

**COPY-06 · Medium · S. Contact copy doesn't ask for what you need, or say when you'll reply.**
- *Problem:* the page asks "Tell me about your project: what it is, when it shoots and what you need from me." The success message, "Message sent. I'll reply by email.", gives no timeframe.
- *Evidence:* `app/contact/page.tsx:57, 157`.
- *Fix:*
  - Prompt: "Send me the dates, location and position, and say whether it's union or non-union. I reply within [one day]."
  - Success: "Thanks, it's sent. I'll reply within [one day] from [email]."

**COPY-07 · Low · S. Consistency.**
- Ampersands vs. "and": "Producer & Editor" and "Digital Filmmaking & Documentary" next to "Education and training" and "Skills and languages".
- Slash spacing: "Assistant Director / Story Producer" vs. "rigging/de-rigging".
- "Los Angeles, US": US style is "Los Angeles, CA".
- "B.A. Film Studies": US style is "BA in Film Studies".
- "Sevilla": US English is "Seville"; keep "Sevilla" if you prefer, but be consistent.
- "Intern, then Creative Director" reads oddly in the billing block.
- Date precision: years everywhere except "July 2025".
- Date ranges already use en dashes consistently. Keep that.

**COPY-08 · Low · S. Captions, alt text and accessible names.**
- Alt text is specific and good (the portrait alt is a model). Captions are passive (POS-07).
- Hero buttons are named "Play ZIGZAG, Maximilli3n", with no year and no role (A11Y-02).
- The dialog meta reads subtitle-first: "Maximilli3n, Director, 2022" (`components/ui/video-modal.tsx:52`). Make it role-first: "Director · Maximilli3n · 2022".
- The iframe title is just "ZIGZAG" (`:72`). Make it "ZIGZAG music video (YouTube)".

### 5.5 Visual design

**Does the cinematic concept serve the work?** Mostly yes. The condensed title cards, the restrained black and off-white palette and the billing-block credits give the site a voice most crew sites lack. It shows taste, which matters to music video and commercial producers. It competes with the hiring message in three places: the edit-suite bin hides roles (FIRST-03), the motion gates and slows content (MOT-01, MOT-02), and the billing block treats schools as credits (VIS-05). Fix those without changing the concept.

**VIS-01 · High · S. The 404 is Next.js's unstyled default, white in light mode.**
- *Problem:* on a light-mode device the page turns white. The header logo and "Menu" become black text on a grey gradient. The page says only "404 | This page could not be found." There's no link home.
- *Evidence:* screenshot of the 404 in light mode at 390 px (sent in chat). `out/404.html` ships `body{color:#000;background:#fff}`, dark only under `prefers-color-scheme:dark`. axe flags 6 contrast failures (footer `#9A9A9A` on white, 2.81:1).
- *Why it matters:* mistyped links from a crew list or an email land here, and it looks broken.
- *Fix:* add `app/not-found.tsx` in the site's style. I built it in a scratch copy, and it exports to `out/404.html` correctly:
  ```tsx
  export default function NotFound() {
    return (
      <div className="frame pb-24 pt-28 sm:pt-36">
        <h1 className="title-card text-[clamp(4.5rem,14vw,12rem)]">Cut</h1>
        <p className="mt-8 max-w-measure text-2xl">That page isn’t here.</p>
        <p className="mt-8 flex gap-6">
          <Link href="/" className="text-link">Back to the home page</Link>
          <a href={`mailto:${contactConfig.email}`} className="text-link">Email me</a>
        </p>
      </div>
    )
  }
  ```

**VIS-02 · Medium · S. Form fields are nearly invisible.**
- *Problem:* each field is a 1 px `#2B2B2B` underline on black, a contrast of 1.48:1.
- *Evidence:* `app/contact/page.tsx:177`; contact screenshot at 1440 px; measured border colors.
- *Fix:* `border-[#6B6B69]` (3.9:1) with `hover:border-mute`. Also raise the label from `text-mute` to `text-screen/85`. Cross-ref A11Y-03.

**VIS-03 · Medium · S. The giant email puts the seven digits center stage.**
- *Problem:* the address is set in title-card type at up to `9.5rem`.
- *Evidence:* `app/page.tsx:159–166`.
- *Fix:* if you get a custom domain (POS-05), keep this treatment; it's a strong ending. Until then, make "Email me" the giant title-card link and show the address below at body size with a Copy button (CONV-04).

**VIS-04 · Medium · S–M. The weakest screen on each page, with exact changes.**
- **Home, 1440 px:** the empty top-right of the hero and the orphaned "All 9 films" link (FIRST-06). Two changes:
  - Hiring strip in `lg:col-span-5 lg:col-start-8`, aligned to the top of the intro, at 17 px with 1.6 line height.
  - Move the link below the list.
  - Optionally drop the row titles from `xl:text-[4.25rem]` (68 px) to `xl:text-[3.75rem]` (60 px), so the 36 px H1 isn't outranked nearly 2:1.
- **Work, 1440 px:** a 192 px "WORK" title, a row of thin filters, and the first card at y = 452 px.
  - Reduce the H1 to `clamp(3.5rem,9vw,8rem)`.
  - Add a one-line intro.
  - Replace the filters with department headings (WORK-03).
  - Show images at 100% (they're `opacity-85` at `app/work/page.tsx:89`, which looks washed out).
- **About, bottom:** the two classroom photos and a small text CTA (POS-07). Replace them with cleared set stills. Make the CTA a block: email, Text, Résumé (PDF).
- **Contact, 1440 px:** about 350 px of empty left column below LinkedIn and IMDb, and invisible fields. Fill the column with:
  - availability;
  - "What to send" (dates, location, position, union or non-union, rate if known);
  - your reply time;
  - a Copy email button.
  Then apply VIS-02.
- **404:** VIS-01.

**VIS-05 · Medium · S. "Credits" includes your schools.**
- *Problem:* the billing block ends with "B.A. Film Studies Queen Mary University of London", "Television Production & Commissioning Training Channel 4" and "Digital Filmmaking & Documentary CIEE Sevilla".
- *Evidence:* `lib/content.ts:454–458` (`studyCredits` appended).
- *Why it matters:* education isn't a credit. Mixing them in reads as padding.
- *Fix:* return `[...filmCredits, ...jobCredits]` only, and keep education on About.

**VIS-06 · Low · S. Button polish.**
- *Problem:* "Send message" shows a 1 px dark seam on its right edge at 1x scale. In the failed state, the status text squeezes the button until "Send message" wraps onto two lines.
- *Evidence:* zoomed button screenshot; form-states sheet; `app/globals.css:77–80`; `app/contact/page.tsx:148–153`.
- *Fix:* add `bg-origin-border` to `.button-solid` (or use a `background-color` with a `box-shadow` hover), plus `shrink-0 whitespace-nowrap` on the button.

**VIS-07 · Low · M. What would make it look more expensive without losing its character.**
1. Replace YouTube's auto-picked thumbnails with stills you choose. Export a 16:9 frame from each film, grade it to match, and self-host it as WebP at 1280×720 (60–90 KB). This is the biggest visual upgrade available for the hero and Work grid, and it removes a third-party dependency (PERF-04).
2. A custom domain with a matching email (POS-05).
3. A branded 404 and favicon (VIS-01, POL-01).
4. Captions written like a camera report: "12/5 · Day 4 · Ext. plaza".
5. Visible field lines and a solid button state (VIS-02, VIS-06).
6. Less grain and no blur filter (MOT-04).
7. A proper 1200×630 preview card (SEO-05).

### 5.6 Motion and interaction

Each animation, judged by whether it does a job:

| Animation | Job | Cost | Verdict |
|---|---|---|---|
| Lenis smooth scroll, `duration: 1.15` (`motion-provider.tsx:32`) | Feel | Takes over wheel scrolling on desktop, and its loop runs every frame | Optional. Cut to `duration: 0.8` or remove. |
| 380 ms exit before every navigation (`transition-link.tsx:8, 38`) | Polish | URL changes 393–436 ms after the click (measured) | Remove, or cut to 150 ms. |
| 900 ms page enter with blur (`globals.css:135–137`) | Polish | New page settles 1.32–1.44 s after the click; hides the hero from LCP (MOT-03) | 300 ms, opacity only, and skip it on first load. |
| Scroll reveals (`fade`, `shutter`, `focus`, `wipe`, `letterbox`, `rise`) | Cinematic pacing | Primary content hidden until JavaScript runs (MOT-01) | Keep for below-the-fold extras; remove from primary content. |
| Auto-advancing reel, 5 s per film | Shows range unprompted | Changes content while people read; one role visible at a time | Keep, with roles in the rows (FIRST-03) and the existing pause control. |
| Cursor label, 80 px "Play" disc | Affordance | Covers the title you're pointing at, and trails the pointer | Limit it to the monitor and thumbnails. |
| Film grain (3 layers) and the blurred projector beam | Atmosphere | Expensive to composite (MOT-04) | One grain layer; drop the blur. |

**MOT-01 · High · S. Primary content on Contact, About and Work waits for JavaScript.**
- *Problem:* `data-reveal="fade"` keeps Contact's intro, email and form at `opacity: 0` until the motion script hydrates, observes them and runs a 900 ms transition with 450–600 ms delays. The About portrait (`shutter`) and the Work filters behave the same way.
- *Evidence:* `app/contact/page.tsx:52, 71`; `app/about/page.tsx:19–21`; `app/globals.css:342–353`. Measured in Chromium with Slow 4G and 4× CPU at 390 px:
  - Contact LCP **3.34 s** with motion on, **0.64 s** with reduced motion.
  - Lighthouse mobile render delay: Contact 2,405 ms, About 2,749 ms.
- *Why it matters:* Contact is the page that converts. Your email shouldn't appear 2.7 seconds late on a phone.
- *Fix:* remove `data-reveal` from everything visible on arrival on Contact and About, and from the Work filters. If you want motion there, use the CSS-only `rise-now`-style keyframe the home hero already uses, so it never waits on JavaScript.

**MOT-02 · Medium · S. Every navigation costs about 1.3–1.4 seconds.**
- *Evidence:* click to URL change 393–436 ms; click to the new heading's animations finishing 1,323–1,435 ms. With reduced motion, both take 11–22 ms (desktop, local server).
- *Fix:* drop the exit (`EXIT_MS = 0`, or remove `TransitionLink`), and shorten `page-in` to 300 ms, opacity only (blur is expensive and makes text unreadable mid-transition).

**MOT-03 · Medium · S. The first-load fade hides the hero from LCP.**
- *Problem:* the whole page starts at `opacity: 0` (`.motion .page-enter`, `app/globals.css:135–137`). Chrome doesn't count elements first painted at opacity 0 as LCP candidates. On desktop, the measured LCP became a reel cut at **5.94 s** (candidates: logo at 108 ms, then title spans at 5,848 and 5,940 ms). On mobile, it was the poster at 2.43 s.
- *Why it matters:* field data would show a poor desktop LCP for visitors who watch the hero, although real users see the content much earlier. More practically, the hero fades in instead of being there.
- *Fix:* apply `page-enter` only on client-side navigations. Set a flag after the first mount and add the class from then on. A smaller workaround is to start the keyframe at `opacity: 0.01`: Chrome's LCP ignores only fully transparent elements. Verify with a trace afterwards.

**MOT-04 · Medium · S. Grain and the blurred beam are expensive to composite.**
- *Evidence:* the projector beam is a `blur(20px)` filter on an element 140% of the hero, with a transform animation (`app/globals.css:153–172`). Grain is three layers, each 2× its container, jittering at `steps(6) 0.9s` (`:175–201`). In headless Chromium without a GPU, at 1440 px, the frame rate was:

  | As shipped | Without grain | Without beam | Without both |
  |---|---|---|---|
  | 11 fps | 12 fps | 32 fps | 54 fps |

  Real phones have GPUs, so treat this as a risk to check on a low-end Android phone, not a measured device result.
- *Fix:* remove `filter: blur(20px)` (the radial gradients are already soft), keep one grain layer over the hero only, and stop it when the reel is paused.

**MOT-05 · Low · S. The cursor label covers the title it labels.**
- *Problem:* the 80 px disc sits over the hovered row's text ("CLEANING MADE SI[disc]LE"). It eases toward the pointer at 0.18 per frame, so at low frame rates it trails badly: 300 ms after a move it was still about 400 px away (measured at about 11 fps; at 60 fps it would catch up in roughly 0.3 s).
- *Evidence:* `components/motion/cursor-label.tsx:14–58`; hover screenshot.
- *Fix:* keep `data-cursor` only on the monitor and the Work thumbnails, not on the title rows (`film-index.tsx:161`). Or offset the disc 48 px right of the pointer.

**MOT-06 · Low · S. Two animation-frame loops run forever (measured: cheap, but dead code).**
- *Evidence:* measured over 10 s idle with 4× CPU throttling, on About (no hero animations):
  - main-thread script time 395 ms with both loops, 302 ms with only `MotionProvider`'s, 130 ms with neither (reduced motion);
  - so the loops cost about **27 ms per second** at 4×, roughly 7 ms per second (about 0.1 ms a frame) unthrottled;
  - the per-frame `querySelectorAll('[data-parallax]')` costs **0.005–0.01 ms** per call, with **0** matching elements;
  - the `MutationObserver` on all of `body` fired **2 times in 10 s** on home.
- *Why it matters:* not speed. It's battery, and code that does nothing.
- *Fix:*
  - Delete the parallax block (`motion-provider.tsx:35–51`), and let Lenis run with `autoRaf: true` (or keep the loop for Lenis alone).
  - Start `CursorLabel`'s loop only while the label is visible or moving, and stop it once it has converged.
  - Observe `main` instead of `body`.

**MOT-07 · Low · S. Moving backgrounds have no in-page stop.**
- *Problem:* the reel and the clip have pause buttons, which is good for WCAG 2.2.2. The grain and the beam animate indefinitely and stop only through the OS reduced-motion setting.
- *Fix:* tie the grain and beam to the reel's pause state (MOT-04).

**MOT-08 · Low, untested on a real iPhone. Touch and iOS Safari, from the code.**
- `100svh` (iOS 15.4+) is the right unit for the hero.
- `<dialog>` with `showModal()` is supported from iOS 15.4.
- `startViewTransition` is feature-checked (`app/work/page.tsx:21–25`), and Safari 18 supports it.
- The clip is `muted` and `playsInline`, which iOS requires for autoplay. Low Power Mode blocks autoplay anyway; the code catches the rejected `play()` and shows "Play clip", which is correct.
- On touch screens, tapping a hero row opens the video at once, so roles can't be previewed (FIRST-03 fixes this).
- **Landscape phones:** at 844×390 px, the video dialog's content is 556 px tall inside a 350 px box, so the bottom of the player and YouTube's controls sit off-screen (measured). Fix: cap the dialog width with `w-[min(100vw-2rem,72rem,calc((100svh-8rem)*16/9))]`, and hide `.dialog-meta` under `@media (max-height: 500px)`.
- `body { overflow: hidden }` scroll-locking for the mobile menu (`header.tsx:40–51`) has historically been unreliable on iOS. Test on a device.

### 5.7 Accessibility (WCAG 2.2 AA)

**What passes, and should stay that way:**
- `lang="en-US"`; a working skip link (focus lands in `main`).
- Native `<dialog>` traps focus and returns it to the trigger (verified for both dialogs).
- Reduced motion is fully respected: no reel, no autoplay, no hidden states.
- Pause controls exist for the reel and the clip.
- All text contrast passes. The lowest pair is 3.91:1, for inactive hero titles at `text-screen/45`, which is large 68 px text and passes AA. Smoke on screen is 5.55:1; mute on black is 7.46:1.
- The form has labels, `aria-invalid` and `aria-describedby`, focuses the first invalid field, and has a `role="status"` live region.
- No horizontal scroll at 320 px, which is equivalent to 400% zoom on a 1280 px screen.
- axe-core shows 0 violations on Work, About and Contact. Its "video-caption" warning on the clip doesn't apply: the file has no audio track (checked with ffprobe).

**A11Y-01 · High · S. The mobile menu isn't modal.**
- *Problem:* after the four menu links, Tab moves onto "All 9 films", the monitor and "Pause reel", which are hidden under the full-screen overlay (fails 2.4.11 Focus Not Obscured). Escape closes the menu but drops focus to `<body>` (2.4.3).
- *Evidence:* measured tab stops at 390 px with the menu open; `components/layout/header.tsx:40–51, 108–136`.
- *Fix:* render the menu in a `<dialog>` opened with `showModal()`, which gives focus trapping and return for free. Or set `inert` on `main` and `footer` while it's open, and call `toggleRef.current?.focus()` on close. Also add Email and Text links to the menu (FIRST-02).

**A11Y-02 · Medium · S. Six hero buttons fail "label in name" (axe: serious).**
- *Problem:* the visible text is "ZIGZAG 2022", but the accessible name is "Play ZIGZAG, Maximilli3n", which drops the year. Voice-control users saying what they see can miss, and screen-reader users hear neither role nor year.
- *Evidence:* `components/work/film-index.tsx:165`; axe on home, 6 nodes; Lighthouse accessibility score 96 on home, 100 elsewhere.
- *Fix:* `aria-label={`${film.title}, ${film.year}, ${shortRole(film.role)}: ${getWatchCue(film).cue}`}`. That gives "ZIGZAG, 2022, Director: Play", which starts with the visible text.

**A11Y-03 · Medium · S. Field boundaries are at 1.48:1, against the 3:1 that 1.4.11 requires.** Same fix as VIS-02.

**A11Y-04 · Medium · S. "Credits" reads as one run-on sentence.**
- *Problem:* the billing block is a single `<p>`. A screen reader announces "3rd Assistant Director Su Mano Director ZIGZAG BISOUS Producer Cleaning Made Simple 1st Assistant Director…".
- *Evidence:* `components/work/billing-block.tsx:25–57`; the accessibility tree.
- *Fix:* keep the visual, change the markup. A `<ul role="list">` with one `<li>` per credit, each containing `<span>{role}</span><span className="sr-only">: </span>{names.join(', ')}<span className="sr-only">.</span>`. Or a `<dl>`.

**A11Y-05 · Medium · S. Split text is duplicated when copied.**
- *Problem:* `SplitText` renders a visually hidden copy plus the visible letters. Selecting the contact block and copying gives `George1415352@gmail.comGeorge1415352@gmail.com`, and the H1 copies twice.
- *Evidence:* measured with the selection API; `components/motion/split-text.tsx:22–23`.
- *Fix:* add `select-none` to the `sr-only` span, so copying takes the visible letters only. Don't split the email address at all (`app/page.tsx:165`); animate the whole line as one unit.

**A11Y-06 · Medium · S. The Work page has one heading, and every card is one long button.**
- *Problem:* the only heading is H1 "Work". Each card is a `<button>` whose name is the whole card, for example "On set Su Mano 2025 3rd Assistant Director, Feature film A feature film directed by…".
- *Evidence:* `app/work/page.tsx:74–104`; the accessibility tree.
- *Fix:*
  - Make each title an `<h2>` (or `<h3>` under department headings, WORK-03).
  - Put the description outside the button.
  - Give the thumbnail button a short name ("Play ZIGZAG", "Watch Su Mano set footage").

**A11Y-07 · Low · S. Focus order and smaller issues.**
- *Desktop focus order:* the hero monitor on the right is focused before the list on the left, and duplicates the active film (2 stops). Set `tabIndex={-1}` on the monitor button; the list rows already play the film.
- *After a successful send:* focus is lost to `<body>` because the submit button disables mid-submit. Move focus to the status message (`tabIndex={-1}` plus `.focus()`).
- *Dialog label:* the dialog uses `aria-label` although it contains an `<h2>`. Use `aria-labelledby`.

**A11Y-08 · Low · S. Small tap targets.**
- *Problem:* footer links are 37–61 px wide and 20 px tall; "Pause reel" and "Play clip" are 21 px tall.
- *Why it's Low:* they pass AA through the 24 px spacing exception, but sit below the 44 px touch guidance.
- *Fix:* reuse the `after:` hit-area expansion from `ProfileLinks` (`components/ui/profile-links.tsx`) on footer links and the two toggles.

### 5.8 Performance

**Core Web Vitals.** Lighthouse 12.8, against the gzip server:

| Page | Mobile score | Mobile LCP (element) | TBT | CLS | Desktop score | Desktop LCP |
|---|---|---|---|---|---|---|
| Home | 92 | 3.3 s (header logo; hero excluded, MOT-03) | 50 ms | 0 | 100 | 0.8 s |
| Work | 96 | 2.7 s (first card image, lazy-loaded) | 20 ms | 0 | 100 | 0.7 s |
| About | 92 | 3.3 s (portrait; render delay 2.7 s) | 50 ms | 0 | 100 | 0.8 s |
| Contact | 96 | 2.9 s (intro paragraph; render delay 2.4 s) | 50 ms | 0 | 100 | 0.6 s |

**PERF-01 · Medium · S–M. Mobile LCP sits around the 2.5 s "good" threshold.**
- *Evidence:* Chromium with Slow 4G and 4× CPU at 390 px, using PerformanceObserver:

  | Page | LCP | Element | Reduced motion |
  |---|---|---|---|
  | Home | 2.43 s | poster | 2.29 s |
  | Work | 2.32 s | first card, `loading="lazy"` | |
  | About | 2.19 s | portrait | 2.02 s |
  | Contact | 3.34 s | | 0.64 s |

  FCP is 0.69–0.84 s everywhere. CLS is 0, except About at 0.03: the giant name reflows on font swap.
- *Fix:* MOT-01 (Contact, About), MOT-03 (Home), and `priority` on the first Work card's image (`app/work/page.tsx:84`, flagged by Lighthouse's `lcp-lazy-loaded`).

**PERF-02 · Medium · S–M. Images ship at full size, and the home stills load early.**
- *Problem:* on desktop, the four set stills (627 KiB) load with the page, 2,000 px below the fold, because they fall inside Chrome's lazy-load distance. Images are also oversized for their slots:

  | Page | Lighthouse estimated savings |
  |---|---|
  | Home | 606 KiB (mobile), 721 KiB (desktop) |
  | About | 440 KiB (desktop) |

- *Evidence:* "Properly size images" audit; measured bytes on home desktop: 1,158 KiB at load, of which 899 KiB is images. That includes five 23 KB stand-ins for the blocked YouTube thumbnails; the real thumbnails are larger, so the true figure is higher.
- *Fix:* `images.unoptimized` means no automatic resizing, so pre-size the files. I re-encoded them in the scratchpad:

  | File | Now | Pre-sized |
  |---|---|---|
  | Set stills, 640 px tall | 78–208 KB each | 30–74 KB each |
  | `camera_work1/2` | 147 + 216 KB | 33 + 61 KB |
  | Portrait, 800 px wide | 117 KB | 67 KB |
  | Su Mano poster, 1280×720 | 156 KB | 87 KB |

  For phones with 3× screens, add a second width and a plain `<img srcSet="… 540w, … 900w" sizes="…">`. With `unoptimized`, next/image won't generate a srcset for you.

**PERF-03 · Medium · S. The Su Mano clip downloads in full, even when nobody plays it.**
- *Problem:* once the band is within 150 px of the viewport, the code sets `src` and `preload = 'auto'` (`components/work/set-clip.tsx:47–56`). Measured after 12 s in view:

  | Visitor | Downloaded |
  |---|---|
  | Mobile | 3.0 MB (the whole 720p file) |
  | Desktop | 6.3 MB (the whole 1080p file) |
  | Mobile, reduced motion | 3.0 MB, though the clip never plays |

- *Fix:*
  - With reduced motion, don't set `src` until "Play clip" is pressed.
  - Otherwise use `preload="metadata"` and let `play()` pull the data.
  - Re-encode. Measured sizes from the scratchpad, with the same 21 s duration:

    | Cut | Size |
    |---|---|
    | 960×540, CRF 27 (phones) | 1.54 MB |
    | 1600×670, CRF 25 (desktop, 2.39:1 crop baked in) | 3.31 MB |
    | 1280×720, CRF 26 | 2.71 MB |

    That roughly halves both. Check quality by eye before shipping. The files already have `moov` at the front (fast start), which is right.

**PERF-04 · Low · M. The hero loads all six monitor images at once and relies on `maxresdefault`.**
- *Problem:* the six images are stacked, and five sit at opacity 0, so all six load at page load: five 1280×720 YouTube JPEGs plus the poster. YouTube serves `maxresdefault` only for some uploads. I couldn't check which exist from here.
- *Evidence:* `components/work/film-index.tsx:99–114`; `lib/content.ts:201–276`.
- *Fix:* self-host chosen 16:9 stills (VIS-07). Render only the active and next images, and preload the next one on each cut. That also removes the only third-party request on first load.

**PERF-05 · Info. JavaScript, fonts and third parties are fine.**
- *JavaScript:* First Load JS is 102–120 kB gzipped (Next build output). React DOM is 53.6 kB. Contact carries +24 kB for react-hook-form, zod and resolvers; native validation would do for three fields (Low).
- *Fonts:* two variable WOFF2 files, Latin subset, preloaded, 39.6 and 39.8 KB. Good.
- *YouTube:* the iframe loads only when a dialog opens, which is good. Use `https://www.youtube-nocookie.com/embed/` (`lib/utils.ts:83`) so visitors aren't cookied.
- *EmailJS:* imported only on submit (`app/contact/page.tsx:98`). Good.

**PERF-06 · Low. What GitHub Pages' caching allows.**
- Every response gets `Cache-Control: max-age=600`, including content-hashed `/_next/static` files that could be cached for a year. Lighthouse estimates 912 KiB of repeat-visit savings on home.
- Pages doesn't allow custom headers. To get `immutable` caching you'd need a host that does (Cloudflare Pages, Netlify), or Cloudflare in front of Pages with a cache rule.
- *What it buys:* faster repeat visits only. It isn't worth a migration for a portfolio.

### 5.9 SEO and link sharing

**Realistic goals.** "George Kelly" alone is crowded. In my search results, the playwright George Kelly (1887–1974) dominates. Aim to:
- own your name plus role: "George Kelly production assistant", "George Kelly 3rd AD", "George Kelly New York PA";
- be indexed correctly;
- make every shared link look right.

I found no results for the site in the search tool I had, which isn't Google, so treat that as weak evidence.

**SEO-01 · Medium · S. Work and Contact reuse the home title and description; there are no canonical URLs.**
- *Problem:*
  - Both client pages ship "George Kelly \| Production Assistant & Filmmaker, New York" and the home description.
  - `og:url` is `https://georgekkr.github.io/` on every page.
  - No page has a canonical link.
- *Evidence:* `app/work/page.tsx:1` and `app/contact/page.tsx:1` (`'use client'`, so they can't export `metadata`); `app/layout.tsx:45–53`; built HTML of every page.
- *Fix:* move each page's client code into a component (`components/work/work-grid.tsx`, `components/contact/contact-form.tsx`), and make `page.tsx` a server file that exports `metadata`. I built the Work version in a scratch copy, and it exports `<title>Work | George Kelly</title>`, a page description and `<link rel="canonical" href="https://georgekkr.github.io/work/">`. Add `alternates: { canonical: '/…/' }` and `openGraph: { url: '/…/' }` to every page. Titles and descriptions are in the copy deck.

**SEO-02 · Medium · S. robots.txt points to a sitemap that returns 404.**
- *Problem:* `/sitemap.xml` returns 404 on the deployed tree. The `Host:` line is a nonstandard, Yandex-only directive.
- *Evidence:* `public/robots.txt:5–9`; local server, 404 for `/sitemap.xml`; the `gh-pages` file list has no sitemap.
- *Fix:* delete `public/robots.txt`, then add `app/robots.ts` and `app/sitemap.ts`, each with `export const dynamic = 'force-static'`. I built both in a scratch copy: they produce `out/robots.txt` (no Host line) and an `out/sitemap.xml` listing the four pages.

**SEO-03 · Medium · S. No structured data.**
- *Fix:* add a `Person` JSON-LD script in `app/layout.tsx`. This is also verified in the scratch build.
  ```json
  {"@context":"https://schema.org","@type":"Person","name":"George Kelly","jobTitle":"Production Assistant",
   "url":"https://georgekkr.github.io/","image":"https://georgekkr.github.io/og/george-kelly-1200x630.jpg",
   "address":{"@type":"PostalAddress","addressLocality":"New York","addressRegion":"NY","addressCountry":"US"},
   "knowsLanguage":["en","es"],"alumniOf":{"@type":"CollegeOrUniversity","name":"Queen Mary University of London"},
   "sameAs":["https://www.linkedin.com/in/georgekelly2","https://www.imdb.com/name/nm15190358/"]}
  ```
  Marking up projects as `CreativeWork` or `VideoObject` is optional, and worth it only once project pages exist (WORK-04).

**SEO-04 · Medium · S. The name isn't in the home H1's visible text.** Same issue and fix as FIRST-01. An `sr-only` span is a weak signal compared with visible text.

**SEO-05 · Medium · S. Link previews crop your face at the eyes.**
- *Problem:* `og:image` is the 1122×1402 portrait. A 1.91:1 card (LinkedIn, Facebook, WhatsApp large, X `summary_large_image`) center-crops it to a band from the eyes to the chest, cutting off the top of your head. Square thumbnails (Slack, small WhatsApp and iMessage cards) are fine. Platforms differ, and sources disagree on iMessage, so treat this as an approximation. ([1](https://www.krumzi.com/blog/og-image-size-cheat-sheet-1200x630), [2](https://dev.to/grabbit/open-graph-image-sizes-and-dimensions-the-complete-2026-guide-1k16))
- *Evidence:* the crop sheet, sent in chat; `lib/content.ts:94`; `app/layout.tsx:52, 57`.
- *Fix:* a dedicated 1200×630 card. A mock built with the site's own fonts is attached in chat.
  - Left 696 px: black, with "GEORGE KELLY" in Sofia Sans Extra Condensed 800 at 150 px and 0.86 line height, in `#EDEDE9`; "Production assistant, / AD department" at 34 px; "New York · English and Spanish" at 24 px in `#9A9A9A`; 72 px left padding.
  - Right 504 px: the portrait cropped 4:5, with your face in the upper third.
  - Export a JPEG of 150 KB or less as `public/og/george-kelly-1200x630.jpg`.
  - Set `images: [{ url, width: 1200, height: 630, alt: 'George Kelly, production assistant in New York' }]`.
  - Check it with LinkedIn's Post Inspector after deploying.

**SEO-06 · Medium · M. No URL per project.** Same issue and fix as WORK-04. Project pages give you something to rank for "Su Mano 3rd AD" and something to share.

**SEO-07 · Low · S. 404 metadata.**
- *Problem:* the default 404 ships two `<title>` tags and conflicting robots meta tags (`noindex` and `index, follow`). `/404/` returns 200, because the export also writes `out/404/index.html`.
- *Fix:* VIS-01 removes most of it. Add `rm -rf out/404` to the deploy step.

**SEO-08 · Low · S. Off-site setup.**
- Add a Google Search Console URL-prefix property for `https://georgekkr.github.io/`. Verify with `metadata.verification.google` in `app/layout.tsx`, or an HTML file in `public/`. A Domain property needs DNS, so it waits for POS-05.
- Submit the sitemap and request indexing for the four pages.
- Match your name, role line and links everywhere:
  - LinkedIn headline: "Production Assistant · AD Department · New York · English/Spanish", with the site under Contact info, then Website.
  - IMDb: check what nm15190358 shows (question in §7).

### 5.10 Contact and conversion

**CONV-01 · High · S. On a phone, contacting you is slow.**
- *Problem:* from the first screen, you can:
  - scroll about 3,900 px (4.6 screens) and tap the email; or
  - tap Menu, then Contact (about 1.3 s of transition), wait for the copy to fade in (3.34 s LCP on a mid-range phone), then tap the email; or
  - scroll to the footer's "Email".
  Nothing offers a phone number or text.
- *Fix:* FIRST-02 (the hiring strip), MOT-01, and Email and Text links in the mobile menu.

**CONV-02 · High · S once you've answered. There's no résumé PDF; "Full CV" goes to About.**
- *Evidence:* `app/page.tsx:137–139`; About prints as five Letter pages with no contact details (POL-04).
- *Fix:* a one-page PDF, `public/george-kelly-production-assistant-resume.pdf`.
  - Name, "Production Assistant · New York · English/Spanish", email, site URL.
  - Credits in reverse order, each with role, production, type, dates, and `[days]`, `[1st AD]` and `[2nd AD]` where you can.
  - Skills, logistics (POS-04) and education.
  - For the phone line, either "Phone on request" or a separate public number (CONV-03). Send a private version with your personal number when asked.
  - Link it from the hiring strip, the Credits header, About and Contact.
  - Don't gate it behind the form.

**CONV-03 · Medium · S. No phone or text option.**
- Much crew hiring happens by text. If you don't want your personal number public, a separate free number that forwards to your phone, such as Google Voice in the US, can go on the site and résumé and be retired later.
- Use `sms:` and `tel:` links.

**CONV-04 · Medium · S. No copy-email button.**
- *Problem:* selecting the address copies it twice (A11Y-05).
- *Fix:* a static, client-side button next to the address.
  ```tsx
  <button type="button" onClick={async () => { await navigator.clipboard.writeText(contactConfig.email); setCopied(true) }}
    className="text-link text-sm">{copied ? 'Copied' : 'Copy email'}</button>
  ```
  Announce the change in a `role="status"` region.

**CONV-05 · Medium · S. The EmailJS form works and fails gracefully, but has no spam protection.**
- *Verified with mocks:*
  - empty and invalid states: clear messages; focus goes to the first invalid field;
  - sending: "Sending…", with the button disabled;
  - sent: status message, and the fields reset;
  - failed: the message is kept, and your email is offered.
- *Payload:* `from_name`, `from_email`, `subject: 'New message from georgekkr.github.io'`, `message`, `to_name` (`app/contact/page.tsx:99–110`). No honeypot, no CAPTCHA.
- *Free plan:* about 200 requests a month and 2 templates, per third-party summaries ([1](https://agentdeals.dev/vendor/emailjs), [2](https://splitforms.com/reviews/emailjs)). Confirm on emailjs.com/pricing. Sources disagree on whether the domain allowlist is free.
- *Fix:*
  - Add a hidden honeypot field (`name="company"`, off-screen, `tabIndex={-1}`, `autoComplete="off"`). If it's filled, show success without sending.
  - Work through the dashboard checklist in Appendix B.

**CONV-06 · Low · S. After sending, the form clears and focus is lost, and there's no reply time.** See COPY-06 and A11Y-07.

### 5.11 Code quality, maintenance and deployment

**CODE-01 · High · S. Manual deploys from any branch are how live got ahead of `main`.**
- *Evidence:* `package.json:13–14` (`predeploy`, `deploy: gh-pages -d out -t true`); the `gh-pages` history shows deploys from a feature branch.
- *Fix:* deploy with GitHub Actions on pushes to `main`, after lint, type-check and build pass.
  1. Workflow: Appendix A.
  2. Switch Settings → Pages → Source to "GitHub Actions".
  3. Remove the `deploy` and `predeploy` scripts and the `gh-pages` dependency.
  Once the source is Actions, pushing to `gh-pages` no longer publishes anything. That's the safety you want.

**CODE-02 · Medium · S. Work and Contact are client pages.**
- *Problem:* they can't export metadata (SEO-01).
- *Why the fix is metadata, not bundle size:* the grid and the form must stay client components anyway, so moving to server pages with client islands saves almost no JavaScript (measured: Work stays at 2.65 kB of route JS).
- *Fix:* the split shown in SEO-01, already verified in a scratch build.

**CODE-03 · Medium · S. LICENSE is MIT, "Copyright (c) 2021 Ubai Mutl".**
- *Problem:* it's inherited from a template.
  - It names someone else as copyright holder of the repository.
  - It grants anyone the right to reuse "this software and associated documentation files". Read broadly, that could include your photos, the Su Mano footage (which may not be yours to license) and your copy.
- *Evidence:* `LICENSE:1–21`.
- *Fix:* none of the template's code appears to remain. I found no trace of it in the current source, but check. Replace the file with:
  - an MIT license for the code under your name (or none);
  - a plain notice: "Photographs, video and written content © George Kelly or their respective owners. Not licensed for reuse."

  If the Su Mano footage belongs to the production, say so in that notice. This isn't legal advice.

**CODE-04 · Low · S. Dead code and no-op configuration.**
- *Unused helpers:* 16 of the 19 exports in `lib/utils.ts`. Only `cn` and `getYouTubeEmbedUrl` (with the `getYouTubeVideoId` it calls) are used.
- *Unused CSS:* `.button-ghost` (`app/globals.css:88`).
- *Dead loop code:* the parallax block in `components/motion/motion-provider.tsx:35–51` (MOT-06).
- *No-op configuration:*
  - `swcMinify` (`next.config.js:15`; default in Next 14, deprecated after);
  - `images.remotePatterns` (`:6–11`; irrelevant with `unoptimized`);
  - `.env` (Create React App flags `GENERATE_SOURCEMAP` and `DISABLE_ESLINT_PLUGIN`, which Next ignores);
  - `.env.local.example`, which documents five `NEXT_PUBLIC_*` variables nothing reads.
- *Fix:* delete them.

**CODE-05 · Low · S. Stale docs describe other versions of the site.**
- `README.md` says "Filmmaker, Creative Director, and Producer" and lists Framer Motion, which isn't a dependency.
- `ARCHITECTURE.md` lists components that don't exist (`button.tsx`, `card.tsx`, `page-transition.tsx`, `smooth-scroll-provider.tsx`, `lib/animations.ts`, `hooks/`) and claims "TypeScript strict mode".
- `REFACTORING_SUMMARY.md` and `REFACTORING_COMPLETE.md` describe Framer Motion and hooks.
- `CONSOLE_NOTES.md` mentions Vercel Analytics.
- `DEPLOYMENT_CHECKLIST.md` recommends Vercel and says Vercel Analytics is "Already Integrated".
- `docs/PERFORMANCE.md` describes scroll hooks that don't exist.
- `IMPROVEMENTS_SUMMARY.md` describes "6 professional testimonials" and "Award-Winning" and "100% Satisfaction" badges from an old version. In a public repo, that's a document describing invented praise.
- *Fix:* delete all of them, and write a 15-line README: what the site is, how to run it, how it deploys.

**CODE-06 · Low · S. `.env` and `.cursor/` are tracked despite `.gitignore`.**
- *Evidence:* `git ls-files`; `.gitignore:23, 46`. There are no secrets in them.
- *Fix:* `git rm --cached .env .cursor/rules/nextjsreacttype.mdc`.

**CODE-07 · Low · S. TypeScript `strict: false`.**
- *Evidence:* `tsconfig.json:7`. `tsc --strict` reports **0 errors** today.
- *Fix:* turn it on; it's free.

**CODE-08 · Medium · S now, M later. Dependencies and `npm audit`.**
- *Checks:* build, lint and type-check pass with no warnings. Build notices: Browserslist data is 12 months old, the baseline-browser-mapping data is more than two months old, and Next loads the no-op `.env`.
- *`npm audit --omit=dev`:* 5 findings (1 critical in `next`; high in `postcss` (bundled with `next`), `nanoid`, `source-map-js` and `zod`). The full `npm audit`, dev tools included, reports 16.
  - Almost every `next` advisory targets server features: Server Actions and Components, the Image Optimization API, middleware, rewrites and self-hosting. None of these run when GitHub Pages serves a static export.
  - `postcss`, `nanoid` and `source-map-js` are build-time.
  - The `zod` advisory concerns huge collections; the form validates three capped strings.
  - So the practical exposure on the live site is close to none.
- *Recommended now:*
  - `next` and `eslint-config-next` 14.2.33 → 14.2.35 (patch);
  - `lenis` 1.3.14 → 1.3.27 and `react-hook-form` 7.66 → 7.91 (minor);
  - `npm audit fix`, without `--force`, which would jump to Next 16;
  - `npx update-browserslist-db@latest`.
- *Later (M):*
  - Next 15/16 with React 19 needs ESLint flat config, because `next lint` is removed in 16, and Node 20.9+.
  - Tailwind 4, zod 4 with resolvers 5, TypeScript 7 and ESLint 10 are major migrations with no user-facing gain now.
  - Do them only if a host change makes the server advisories relevant.

**CODE-09 · Low · S. The content model can't hold the facts hirers need.**
- *Problem:* `Film` has a single `role` and one `description`. Su Mano and Ready Set StartUP UK live in both `films` and `jobs`, deduplicated by a `role|name` key (`lib/content.ts:441–453`), which is fragile.
- *Fix:* add `department`, `summary`, `scale: { days?, crew?, background?, locations? }`, `reportedTo?: { name, role }[]`, `responsibilities?: string[]` and `permission?: string`. Derive the credits block from one list.

**CODE-10 · Low. Effects and cleanup: no leaks found.** Every listener and observer is removed on unmount. Small items:
- `VideoModal` calls `window.__lenis?.start()` on mount because `film` is null (`components/ui/video-modal.tsx:33`).
- `TransitionLink`'s `setTimeout` isn't cleared.
- `CursorLabel` runs `elementFromPoint` on every pointer move.

### 5.12 Polish and trust

**POL-01 · Medium · S. The favicon is a generic movie-camera emoji.**
- *Problem:* it's dark grey (`#31373D`) on transparent, so it nearly disappears on dark browser tabs. It's off-brand next to the condensed "GEORGE KELLY" wordmark.
- *Evidence:* `app/favicon.ico`, `app/icon.png`, `app/apple-icon.png`, `public/android-chrome-*`, all the same glyph.
- *Hunch:* it looks like the Twemoji glyph that favicon.io's emoji generator uses, which the old checklist recommends. If so, it's CC-BY 4.0 and needs attribution.
- *Fix:* a "GK" monogram in Sofia Sans Extra Condensed 800, white on black, exported at 32, 180 and 512 px.

**POL-02 · Low · S. Two 0-byte icons are served.**
- *Evidence:* `public/apple-touch-icon.png` and `public/favicon-16x16.png` are 0 bytes and return 200 with an empty body. Some link-preview crawlers request `/apple-touch-icon.png` directly.
- *Fix:* delete them, or copy `app/apple-icon.png` to `public/apple-touch-icon.png`.

**POL-03 · Low · S. The manifest isn't needed, and one field is wrong.**
- *Problem:* there's no offline support or install prompt, so a manifest adds nothing. `"orientation": "portrait-primary"` (`public/manifest.json:9`) would lock anyone who installs it to portrait, and `"purpose": "any maskable"` on a transparent emoji crops badly.
- *Fix:* delete `public/manifest.json`, the `manifest` field in `app/layout.tsx:60` and the two `android-chrome` icons. Or, if you keep it, remove `orientation` and set `purpose: "any"`.

**POL-04 · Medium · S. The About page doesn't print as a CV.**
- *Problem:* Chromium's "Save as PDF" produces five Letter pages. The fixed header and the "Skip to content" link repeat on every page (the skip link prints over the bio on page 1), the photos take a page, and no email address or phone appears.
- *Evidence:* the PDF render of About.
- *Fix:* a print stylesheet in `app/globals.css`:
  ```css
  @media print {
    header, footer, .skip-link, figure, blockquote, [data-cursor] { display: none !important; }
    body { background: #fff; color: #000; font-size: 11pt; }
    .title-card { font-size: 20pt !important; }
    main a[href^="mailto:"]::after { content: " (" attr(href) ")"; }
  }
  ```
  Plus a print-only contact line under the H1. The PDF résumé (CONV-02) is still the real answer.

**POL-05 · Low · S. The copyright year freezes at build time.**
- *Problem:* `© {new Date().getFullYear()}` runs at build (`components/layout/footer.tsx:9`). If you don't deploy in 2027, the site says 2026 all year.
- *Fix:* drop the year ("© George Kelly"), or set it in a tiny client component.

**POL-06 · Info. The console is clean.** There are no errors or warnings on any page at any width, apart from the expected 404 on the made-up URL. Keep it that way.

---

## 6. Copy deck

`[placeholders]` need facts from you (§7). Locations refer to the current files.

### Headline, page titles and metadata

| Where | Current | Proposed | Why |
|---|---|---|---|
| H1, `lib/content.ts:97–98` | Production assistant and filmmaker in New York. AD department, camera and edit, in English and Spanish. | I'm George Kelly, a bilingual production assistant in New York. Most recently 3rd AD on the feature Su Mano. | Visible name, strongest credential first, first person (COPY-01) |
| New, under the H1 | (none) | Available from [date] · Local hire, [borough] · [NY driver's license] | The first filter a 2nd AD applies (FIRST-02) |
| New, under the H1 | (none) | Email me · Text [number] · Résumé (PDF) | Contact in one tap |
| Home title, `lib/content.ts:77` | George Kelly \| Production Assistant & Filmmaker, New York | George Kelly \| Bilingual Production Assistant, New York | Name + role + city; "bilingual" differentiates; drops "filmmaker" |
| Home description, `:79` | George Kelly is a production assistant and filmmaker in New York, working in the AD department, camera and edit, in English and Spanish. | Bilingual production assistant in New York. Most recently 3rd AD on the feature Su Mano. Available for set PA and AD department work from [date]. | Proof and availability in the search snippet |
| Work title (new) | (inherits the home title) | Work \| George Kelly | Unique per page (SEO-01) |
| Work description (new) | (inherits the home description) | Credits from George Kelly, a New York production assistant: 3rd AD on the feature Su Mano, 1st AD on Ready Set StartUP UK, plus music videos, a commercial and short films. | Unique per page |
| About title, `app/about/page.tsx:9` | About \| George Kelly | Résumé and Credits \| George Kelly | Says what the page is |
| About description (new) | (inherits the home description) | Experience, training and skills: 3rd AD on Su Mano (2025), production manager at Spectrum Labs, set work in London and Los Angeles. English and Spanish. | Unique per page |
| Contact title (new) | (inherits the home title) | Contact \| George Kelly | Unique per page |
| Contact description (new) | (inherits the home description) | Crewing up in New York? Email or text George Kelly, a bilingual production assistant available for set PA and AD department work. | Unique per page |
| `og:image:alt`, `app/layout.tsx:52` | George Kelly | George Kelly, production assistant in New York | Describes the card |
| Manifest name, `public/manifest.json:2` | George Kelly - Production Assistant & Filmmaker | (delete manifest) or George Kelly, Production Assistant | POL-03; hyphen used as a dash |

### Home

| Where | Current | Proposed | Why |
|---|---|---|---|
| `app/page.tsx:41` | All 9 films | All work (7) | Not all are films; 7 after merging podcasts |
| Hero rows (new) | (none) | 3rd AD · Feature / 1st AD · TV series / Producer · Commercial / Director · Music video / DP · Short film | Roles at a glance (FIRST-03) |
| Monitor caption, Su Mano, `lib/content.ts:189` (becomes a short `summary` field, CODE-09) | A feature film directed by Angela Medina, shot in the Dominican Republic. | 3rd AD on a feature shot in the Dominican Republic. Background, lock-ups and walkie, in Spanish and English. | Says what you did; fits two lines. Confirm the director's name before reusing it. |
| `app/page.tsx:62` | Behind the camera | On set: Su Mano | AD work is on set; names the production (only if cleared, POS-01) |
| Clip caption, `set-clip.tsx` | Su Mano, scene 12/5, take 1 | Su Mano · 12/5, take 1 · [Day 4, Ext. plaza] | Camera-report style; adds context |
| New, under the clip | (none) | Set footage courtesy of [production company], shared with permission. | Discretion (POS-01) |
| Bio, `lib/content.ts:101` | I studied Film Studies at Queen Mary University of London and have worked on both sides of the camera since. I have run shoot and edit schedules in Los Angeles, led creative for a consumer brand in London, and directed, produced and shot music videos, podcasts and short films. Most recently, I was 3rd AD on Su Mano, a feature film shot in the Dominican Republic in 2025. | I'm a production assistant in New York. Most recently I was 3rd AD on Su Mano, a feature shot in the Dominican Republic in July 2025, where I ran background holding and sign-in, held lock-ups on exterior locations and worked the floor on walkie with the 1st and 2nd ADs, in Spanish and English. | Leads with set work and specifics (COPY-02) |
| Bio, `:102` | I grew up speaking Spanish and did a documentary program in Sevilla, so I am comfortable working with crews and contributors in either language. | Before that I ran shoot and edit schedules as a production manager for Spectrum Labs [in Los Angeles / remotely], led content production at Nimblebabies in London, and directed, produced and shot music videos, a commercial and short films. I studied Film Studies at Queen Mary University of London, and I grew up speaking Spanish. | Range, in one paragraph, after the AD work |
| `app/page.tsx:76` | More about me | Résumé and credits | Says what's there |
| Philosophy quote, `lib/content.ts:105–106` | I believe in the power of visual storytelling to connect, inspire, and transform. Every frame is an opportunity to capture authentic moments that resonate with audiences. | (cut) — optional: “[One line from the Su Mano 1st or 2nd AD]” — [Name], [1st AD], Su Mano | Generic; a reference persuades (COPY-03) |
| Still caption, `lib/content.ts:158` | Watching the take on the monitor | [Me / Role] at the monitor during [scene] | Says who and what |
| Still caption, `:176` | Waiting on the next setup | Between setups at video village | "Waiting" reads idle to an AD |
| `app/page.tsx:138` | Full CV | Résumé (PDF) | It isn't a CV today (COPY-05) |
| `app/page.tsx:157` | Crewing up in New York? I’m looking for PA and AD department work. | Crewing up in New York? I’m looking for PA and AD department work, from [date]. | Keep; add availability |
| `app/page.tsx:165` (giant) | George1415352@gmail.com | Email me (giant) + the address at body size + Copy email | Until there's a custom domain (VIS-03) |
| Footer, `footer.tsx:9` | © 2026 George Kelly, New York | © George Kelly · Production assistant, New York | Year can't go stale; role on every page |

### Work

| Where | Current | Proposed | Why |
|---|---|---|---|
| New intro under H1 | (none) | Credits, newest first: AD department work, then producing, directing, camera and edit. | Frames range (POS-02) |
| Filters, `app/work/page.tsx:42–68` | All 9 · 3rd Assistant Director 1 · Director 2 · Producer 1 · 1st Assistant Director 1 · Producer & Editor 3 · Director of Photography 1 | Headings: AD department · Producing and directing · Camera and edit | No "…1" counts (WORK-03) |
| Su Mano, `lib/content.ts:189` | A feature film directed by Angela Medina, shot in the Dominican Republic. | **3rd Assistant Director** · Feature · Dominican Republic · 2025. Ran background holding and sign-in, held lock-ups on exteriors and worked the floor on walkie with the 1st and 2nd ADs, in Spanish and English. [N] shoot days · crew of [N] · up to [N] background a day · reported to [1st AD], [2nd AD]. | WORK-02 format |
| Ready Set StartUP UK, `:231` | Official trailer for the first season of the series. | **1st Assistant Director** · TV series, season 1 · [City], UK · 2021. [Built and ran the shooting schedule / called the floor] for [N] episodes over [N] days, crew of [N]. Video: the season trailer. | Your job, not the video's |
| Cleaning Made Simple, `:220–221` | Commercial for Nimble showing products designed to make cleaning easier for parents. | **Producer** · Commercial for Nimble · London · 2022. Took it from brief and storyboard to delivery: [budget/crew/days], [locations], [result: where it ran]. | Scope and result |
| ZIGZAG, `:200` | Music video for Maximilli3n's track ZIGZAG. | **Director** · Music video for Maximilli3n · [City] · 2022. [N]-day shoot, crew of [N]. [Result: views / premiere]. | Same format |
| BISOUS, `:210` | Music video for Maximilli3n's track BISOUS. | **Director** · Music video for Maximilli3n · [City] · 2022. [Scope / result]. | Same format |
| Mission Makers (3 entries), `:236–267` | How to Deliver a TED Talk / The Power of Purpose / How to Produce a Podcast — "Mission Makers podcast episode on…" | One card: **Producer & Editor** · Mission Makers (podcast) · 2021 · 3 episodes. Produced and edited [multi-camera?] episodes including "How to Deliver a TED Talk". | Merge (WORK-01) |
| The Necklace, `:274–275` | A short film about value and perception, told through a seemingly simple piece of jewelry. | **Director of Photography** · Short film · [City] · 2020. Shot on [camera] over [N] days. [Festival / screening]. | Your craft, not the plot |
| Dialog meta, `video-modal.tsx:52` | Maximilli3n, Director, 2022 | Director · Maximilli3n · 2022 | Role first |
| Dialog, Su Mano, `:54` | Footage from set | Footage from set, shared with permission of [production] | POS-01 |
| iframe title, `:72` | ZIGZAG | ZIGZAG music video (YouTube) | Screen-reader context |

### About (experience and skills)

| Where | Current | Proposed | Why |
|---|---|---|---|
| Su Mano, `lib/content.ts:299` | Managed crowd control, background-artist logistics, holding and sign-in, and set discipline. Worked on walkie with the AD department; held lock-ups on exterior locations. Supported the 1st and 2nd ADs running the floor and keeping production on schedule. Communicated with cast, background and local crew in Spanish and English. | [N] shoot days, crew of [N], up to [N] background a day. Ran holding and sign-in for background and moved them to set on cue. Held lock-ups on exterior locations. Worked the floor on walkie with the 1st and 2nd ADs to keep the day on schedule. Worked with cast, background and local crew in Spanish and English. Reported to [1st AD], [2nd AD]. | Already the strongest entry; add scope and names |
| Spectrum Labs location, `:304` | Los Angeles, US | Los Angeles, CA [or: Los Angeles (remote from London)] | US style; answers POS-03 |
| Spectrum Labs, `:307` | Ran filming and editing schedules so projects finished on time. Managed equipment checks and contributor attendance. | Ran filming and edit schedules for [N] projects [a month]; [all delivered on time / result]. Checked equipment out and back, and confirmed contributor call times. | Numbers and a result |
| Nimblebabies role, `:310` | Intern, then Creative Director | Creative Director (joined as an intern) | Reads cleanly in the billing block |
| Nimblebabies, `:315` | Led content production from brief to delivery, including writing content briefs and drawing storyboards. | Took content from brief to delivery: wrote briefs, drew storyboards and produced [the Cleaning Made Simple commercial / N pieces a month]. | Links to the Work credit |
| Ready Set StartUP UK, `:317–323` | (no description) | [N] episodes, [N] shoot days, crew of [N]. [Built and ran the schedule / ran the floor / managed contributors]. | The only 1st AD credit has no detail |
| Pictures in Motion role, `:325` | Assistant Director / Story Producer | Assistant Director and Story Producer | Slash style |
| Pictures in Motion, `:329` | Helped with camera setup and rigging, and conducted master interviews on set. | Set up and rigged camera for [N] interview shoots and led the [main] interviews on set. | Stronger verb; clarifies "master interviews" |
| Chocolate Films role, `:332` | Film Production Intern / Runner | Production Intern and Runner | Slash style |
| Chocolate Films, `:336–337` | Assisted with camera operation and rigging/de-rigging on shoots. Supported short-film workshops and filming. | Rigged and de-rigged camera kit on shoots and assisted camera operators. Supported short-film workshops for [who]. | Verbs first |
| Degree, `:343` | B.A. Film Studies | BA in Film Studies | US style |
| CIEE, `:362` | Sevilla, Spain | Seville, Spain (or keep Sevilla everywhere) | Consistency |
| Skills, `:367–384` | Set operations … Native English and Spanish | Add if true: [NY driver's license], [OSHA 10], [First aid/CPR], [own walkie and surveillance kit], [Premiere Pro / DaVinci Resolve], [scheduling software] | What PAs get asked about |
| About photos, `:117, 122` | Setting up a Canon rig for an interview shoot / Pulling focus on a Sony FS-series camera | Replace with cleared Su Mano stills and real captions | POS-07 |
| About CTA, `app/about/page.tsx:115–119` | Want to work together? Get in touch | Crewing up? Email me, text [number] or download my résumé (PDF). | Direct and specific |

### Contact, form and 404

| Where | Current | Proposed | Why |
|---|---|---|---|
| `app/contact/page.tsx:57` | Tell me about your project: what it is, when it shoots and what you need from me. | Send me the dates, location and position, and say whether it's union or non-union. I reply within [one day]. | What an AD would send; sets expectations |
| `:59` | Email me directly | Email | Shorter label |
| New, beside the email | (none) | Copy email | CONV-04 |
| New | (none) | Text [number] | CONV-03 |
| `:66` | Based in New York | Based in [borough], New York · Local hire · Available from [date] | POS-04 |
| New, under the Message field | (none) | Dates, location, position and rate, if you have them. | Hint text |
| `:157` | Message sent. I’ll reply by email. | Thanks, it's sent. I'll reply within [one day] from [email]. | Timeframe |
| `:160–164` | The message didn’t send. Email me at [address] instead. | The message didn’t send, but it’s still here to copy. Email me at [address] instead. | Reassures; keep the link |
| Validation messages | Enter your name / Enter your email address / Enter an email address like name@example.com / Tell me a little more (at least 10 characters) | (keep) | Clear and friendly |
| 404 (Next default) | 404 · This page could not be found. | Cut. That page isn’t here. · Back to the home page · Email me | On-brand; offers a way out |

---

## 7. Questions for me

1. **Su Mano permission.** Do you have the production's OK to post the clip and stills? Is the film released or announced? Who should be credited, and is "Angela Medina" right as director? *Decides POS-01: keep, credit or pull.*
2. **Are you in the clip or stills?** Is the person slating 12/5 you, or the person at the monitor? *Captions should say "Me, …" where it's you; otherwise visitors guess.*
3. **Su Mano scale.** Shoot days, crew size, background per day, and the 1st and 2nd ADs' names (and whether you can list them as references). *Turns the best credit into hard evidence (WORK-02).*
4. **Spectrum Labs, 2022–2023.** Were you in Los Angeles, or remote from London while studying? What did the role cover? *Answers the overlap a hirer will spot (POS-03).*
5. **Mid-2023 to July 2025, and since July 2025.** What were you doing (set days, day-playing, edit work, a move, other work)? *Gaps read as inactivity unless you name them.*
6. **New York.** When did you move? Are you a NYC resident for local hire, and which borough, if you're happy to say? *Local hire is a cost question for productions.*
7. **Availability.** Available now? From when? Day-playing? *The first filter (FIRST-02).*
8. **Union status.** Non-union? Interested in the DGA trainee track? *UPMs ask before hiring, and it decides which jobs you're eligible for.*
9. **Driving.** A US or NY driver's license? A car? *Many PA calls include runs and van driving.*
10. **Kit.** Your own walkie and earpiece, set bag, camera, laptop with editing software? *Kit can win a day-play.*
11. **Certifications.** OSHA 10, first aid or CPR, others? *Easy credibility, but only if true.*
12. **References and testimonials.** Who would vouch for you (1st AD, 2nd AD, UPM, producer)? Could one give a one-line quote? *Replaces the philosophy quote (COPY-03).*
13. **Résumé.** Do you have one? Should the public PDF include a phone number? *Shapes CONV-02.*
14. **Phone or text.** Will you publish a number for texts, or prefer a separate forwarding number? *Crew hiring runs on text (CONV-03).*
15. **Rate.** State a day rate, or "rates on request"? *Some producers filter on it; many PAs don't publish one.*
16. **Domain and email.** Willing to spend about $10–20 a year on a domain, plus mailbox or forwarding costs? Preferred name? *POS-05.*
17. **Ready Set StartUP UK.** Were you 1st AD on the series, or on the trailer shoot? Episodes and days? *Your only 1st AD credit currently has no detail.*
18. **Mission Makers.** Keep it? How many episodes, and what did "Producer & Editor" involve (multi-camera, remote recording)? *WORK-01 merges it; keep or cut.*
19. **Nimble and Nimblebabies.** Same company? Was *Cleaning Made Simple* produced while you were Creative Director? Where did it run? *Links two entries and adds a result.*
20. **ZIGZAG, BISOUS and The Necklace.** Crew size, days, locations, cameras, results (views, premieres, festivals)? *Fills the WORK-02 format.*
21. **Pictures in Motion.** What does "master interviews" mean here? *The phrase is unclear to US readers.*
22. **IMDb and LinkedIn.** What does nm15190358 list? Is Su Mano on it? What's your LinkedIn headline now? *The site links to both prominently; they should match.*
23. **Camera and edit.** Do you still want camera and edit work (for music video and commercial producers), or should the site be AD-only? *Decides how far to demote the director credits.*
24. **YouTube.** Are all eight videos public and on channels you're happy to send people to? Do you have the original files to export better stills? *I couldn't reach YouTube from here (PERF-04, VIS-07).*
25. **Spanish.** Would a short line in Spanish on Contact help, for example "También trabajo en español"? *A bilingual signal, but only in your own words.*
26. **"Sevilla" or "Seville"; "BA" or "B.A."?** *Consistency (COPY-07).*

## 8. Roadmap

**Quick wins (today, mostly S, no new facts needed):**
- Copy that doesn't need answers: headline, CTAs, cut the quote, remove education from credits (COPY-01, COPY-03, COPY-05, VIS-05).
- Role labels in the hero rows, the new order, and merged podcast episodes (FIRST-03, WORK-01).
- Content visible without JavaScript on Contact and About, plus `priority` on the first Work image (MOT-01, PERF-01).
- A branded 404 (VIS-01, SEO-07).
- Per-page metadata and canonicals, the sitemap and robots files, Person data (SEO-01 to SEO-03, CODE-02).
- Mobile menu focus, label-in-name, field contrast, copy-safe split text, credits markup (A11Y-01 to A11Y-05, VIS-02).
- Copy-email button and honeypot (CONV-04, CONV-05).
- Clip preload fix (PERF-03).
- Clean-up: dead code, stale docs, tracked `.env`, strict mode, LICENSE, patch upgrades (CODE-03 to CODE-08).
- Icons and manifest (POL-02, POL-03, POL-05).

**This week (M, needs your answers):**
- The hiring strip with real availability, the résumé PDF and a text number (FIRST-02, CONV-01 to CONV-03).
- Answer the timeline on the page (POS-03).
- Project and experience copy in the new format (WORK-02, COPY-04).
- Su Mano clearance and credit line (POS-01).
- The 1200×630 card (SEO-05).
- GitHub Actions deploy (CODE-01).
- Re-encoded clip, pre-sized images, self-hosted film stills (PERF-02, PERF-04, VIS-07).
- Swap the About photos and rewrite captions (POS-07).
- Print stylesheet (POL-04).
- Motion trims (MOT-02 to MOT-06).
- Favicon monogram (POL-01).

**Bigger bets (L, or costs money):**
- Custom domain and matching email (POS-05).
- Per-project pages and a Su Mano case study (WORK-04, WORK-05, SEO-06).
- Next 15/16 with React 19 and ESLint flat config (CODE-08).
- A short camera and edit reel for music video and commercial producers (WORK-05, optional).
- Search Console and LinkedIn/IMDb alignment once the above ship (SEO-08).

## 9. Keep

- **The visual system:** black, Sofia Sans with Extra Condensed title cards, the token palette with documented contrast, the billing-block idea (for real credits only).
- **The portrait:** natural, professional, and the brownstone quietly says New York.
- **The Su Mano stills and the slate-in-frame clip,** once cleared. Real set evidence beats any claim.
- **The contact line** "Crewing up in New York? I’m looking for PA and AD department work." Direct and in your voice.
- **The Su Mano job description:** the most persuasive paragraph on the site.
- **Accessibility groundwork:** skip link, native `<dialog>` with focus return, pause controls, full reduced-motion support, a live status region, helpful validation messages, and an email fallback when sending fails.
- **Engineering hygiene:** a clean console, CLS 0, desktop Lighthouse 100, a small DOM, content in one file (`lib/content.ts`), well-commented components.

---

## Appendix A. Deploy `main` with GitHub Actions

Save as `.github/workflows/deploy.yml`. Then set Settings → Pages → Source to **GitHub Actions** and remove the `deploy` and `predeploy` scripts and the `gh-pages` dependency. Check for newer major versions of these actions when you add it.

```yaml
name: Deploy site
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: pages
  cancel-in-progress: false
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - run: npm run lint
      - run: npm run type-check
      - run: npm run build
      - run: rm -rf out/404   # avoid a 200-status duplicate of the 404 page
      - uses: actions/upload-pages-artifact@v3
        with:
          path: out
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Appendix B. EmailJS dashboard checklist

The public key, service ID and template ID in `lib/content.ts:386–391` are meant to be public. Protect the account instead:

1. **Security:** restrict requests to your domains (`georgekkr.github.io`, plus a custom domain later) if your plan includes it. Set a per-IP rate limit if one is offered. Consider the reCAPTCHA v2 option.
2. **Template `template_paft5r8`:** set **Reply-To** to `{{from_email}}` and **From name** to `{{from_name}}`, so replying in Gmail goes to the sender. The site doesn't send a `reply_to` parameter. Make sure `{{message}}` and `{{from_email}}` are in the body.
3. **Service `service_wnxzyoi`:** send a test from the dashboard to confirm the Gmail connection is still authorized. Revoked tokens fail silently until someone tries.
4. **Quota:** confirm the free plan's monthly limit (about 200 requests per third-party summaries; check emailjs.com/pricing) and turn on usage alerts.
5. **History:** check recent sends arrived, including in spam.
6. **Optional auto-reply:** a short confirmation to the sender with your résumé link.

## Appendix C. How this was measured

- **Builds:** `npm ci` (Node 22.23, npm 10.9), `npm run build` (Next 14.2.33), `npm run lint` and `npm run type-check` (both clean), `npm audit --omit=dev`, `npm outdated`. The `gh-pages` tree matched a fresh build of `ee16f2d`.
- **Serving:** a local server mimicking GitHub Pages (gzip, `max-age=600`, `404.html` with 404, trailing-slash 301, byte ranges), serving both the fresh `out/` and a `gh-pages` worktree.
- **Browser:** Playwright 1.63 with Chromium, at 320×568, 390×844, 768×1024 (touch), 1024×768, 1440×900 and 1920×1080, above the fold and full page after scrolling through the reveals. States captured: mobile menu, reel playing and paused, hover and keyboard focus, both dialogs, every Work filter, all five form states (EmailJS mocked), reduced motion, the 404 in light and dark mode, print-to-PDF, a landscape phone.
- **Metrics:**
  - Lighthouse 12.8 (mobile and desktop presets).
  - PerformanceObserver for LCP, CLS and long tasks under Slow 4G (1.6 Mbps, 150 ms) and 4× CPU.
  - CDP for bytes per resource type and main-thread time.
  - axe-core 4.14 (WCAG 2.0–2.2 A/AA plus best practices) after reveals, on every page at 1440 and 390 px.
  - A computed contrast pass over every visible text node, including opacity.
  - The accessibility tree for screen-reader names.
- **Prototypes:** sitemap, robots, Work metadata, `not-found` and JSON-LD were built in a throwaway copy outside the repo to confirm they work with `output: 'export'`. Nothing in the repo changed except this report.
- **Not possible here:** live headers and status codes from GitHub, YouTube thumbnails, oEmbed and embeds, EmailJS, LinkedIn and IMDb (network policy); real iOS Safari or WebKit (not installed).
