# Build Journal

**Project:** MUKESH'S BUILDER OS  
**Author:** Mukesh Kumar  
**Context:** AWS Builder Center Portfolio Challenge 2026  
**Build date:** 3 November 2026  
**Region:** ap-southeast-2

This journal records the actual build and test process, including the decisions that changed along the way. It is written after the work, from the session log — not as a prediction.

## 1. Starting point

The existing portfolio lived at the repository root (`index.html`, `styles.css`, `script.js`). The brief required a distinct site, so the new build was placed in `builder-os/` and the original files were left untouched. Assets were copied, not moved:

- `profile.jpeg` — 400 × 400 portrait, supplied by Mukesh
- `resume.pdf` — 72,396-byte PDF, verified readable
- `favicon.svg` — new mark for this site

`plan.md` was not present, so content decisions came from the supplied profile material and the challenge constraints. Nothing was invented to fill a gap.

## 2. Tooling check

- Node.js 24.22.1 (used only for local browser testing)
- Git 2.56.0
- GitHub CLI was missing; installed `GitHub.cli` 2.103.3 with winget, then authenticated as `TheMukeshDev` through the browser device flow.
- AWS CLI 2.39.3, profile `portfolio`, account `584998371788`, region `ap-southeast-2`
- `aws amplify list-apps` returned no existing apps
- Plan: FREE Tier, $120 credits, active until 2027-05-03

## 3. Design direction

The design is a dark "operating system" workspace rather than a generic card portfolio:

- A persistent menu bar with a custom window mark.
- Sections presented as windows with path labels (`~/about`, `~/tech-arsenal`, `~/project-lab`, and so on).
- Blue and violet accents on a near-black navy background, with a subtle grid.
- A portrait framed as a file window (`builder.jpg`) plus a compact `sys.info` panel.
- A one-line launch strip for the optional Builder OS.

The goal was a recognisable identity without trading away reading comfort. Body copy stays in a normal sans-serif; monospace is reserved for paths, labels, and console text.

## 4. Content decisions

- **Project stacks:** the source material did not document the stack for CodePath AI, Festivo AI, or NAWI TestFlow. The user chose to mark each as **"Not specified in source material"** instead of inferring from Streamlit or Vercel hosting.
- **Documentation links:** three URLs returned 404, so they are omitted: `festivo-ai-sigma.vercel.app/docs`, `nawi-testflow.vercel.app/documentation`, and the root of `nawi-testflow.vercel.app`.
- **PharmaGuard:** referenced only as hackathon work inside the RIFT Series achievement; not featured as a project.
- **Learning:** six areas marked "in progress" — C++ & DSA, React, MERN, Core CS, backend system design, AI agents. No percentage bars.
- **Links:** the seven outbound URLs used by the site were rechecked with a browser user agent on 3 November 2026 and all returned 200. LinkedIn's earlier HEAD request returned 403 to a bot-style request, but a GET with a browser user agent returned 200.
- **Screenshots:** AWS console screenshots are captured by the account owner, not fabricated or substituted with stock images.

## 5. Implementation

### Page

One HTML file with: skip link, sticky menu bar, hero, About, Tech Arsenal, Project Laboratory, Community & Achievements, Learning Journey, Contact, footer, and a native `<dialog>` for Builder OS. Each project uses a native `<details>` for the technical brief so the content is available without animation and works without JavaScript.

### Builder OS

- Four tabs with `role="tablist"`, `aria-selected`, roving `tabindex`, and Arrow/Home/End keys.
- Project Lab renders mission briefs from a small data object; all copy matches the static page.
- Tech Arsenal filters six categories.
- Community Hub is static, verified content.
- Secret Console supports `help`, `about`, `projects`, `skills`, `community`, `achievements`, `learning`, `reset`; ↑/↓ history; Enter to run; visible reset button; no fake system operations.
- Esc and the close button close the dialog. Focus returns to the opening button.
- Opening the OS does not remove the static page; the OS is optional and clearly explained.

### CSS and JS

- No frameworks or dependencies.
- Mobile menu below 900 px; dialog tabs switch to a horizontal strip below 900 px.
- Scroll spy, reveal-on-scroll, and console logic are small, dependency-free modules in one script.
- `prefers-reduced-motion` disables reveal hiding and shortens animations.
- A `.js` class is set in the head so content is never hidden if scripts fail.

## 6. Testing

Testing used headless Chrome over the DevTools Protocol at 1440, 1024, 768, 390, and 320 px.

Verified:

- No console errors or uncaught exceptions.
- No horizontal overflow at any tested width; 320 px confirmed.
- Hero stacks correctly below 1000 px; no text/visual overlap at 1440 or 1024 px after spacing fix.
- All internal anchors resolve; all local assets exist; image natural size 400 × 400.
- All seven external links return 200.
- Dialog opens/closes, locks body scroll, restores focus, and closes with Esc.
- Tab keyboard navigation wraps correctly and only one panel is visible.
- Mission switching, Arsenal filtering, console commands, history, reset, and reset-by-command work.
- Reveals complete after scrolling; reduced-motion mode shows all content immediately.
- Tap targets for nav toggle, close, missions, tabs, console Run, and Reset were checked; small controls are at least 28 px high.
- Button contrast meets AA after changing the primary gradient's bottom stop.

Issues found and fixed during the pass:

1. **Double scroll offset:** `scroll-padding-top` on `html` and `scroll-margin-top` on sections stacked, putting sections 172 px down and making the scroll spy one section behind. Removed the section margin; anchor targets now land 88 px below the top and the active link matches.
2. **Primary button contrast:** the dark label on `#2f6fed` measured 4.20:1. The gradient's bottom stop moved to `#3a7bf0`; measured contrast is 4.80:1.
3. **Heading crowding:** the display heading's 0.92 line-height let the descender touch the role line. Role top margin increased to 2rem.
4. **Small controls:** minimum heights added to mission/category buttons and console Run/Reset to keep targets usable on touch screens.

## 7. Build assets

- `assets/og-cover.svg` is the 1200 × 630 social card source.
- `assets/og-cover.png` is a real 1200 × 630 raster capture of that card, generated in headless Chrome (367,208 bytes), not a stock image.
- No AI-generated images are used. The portrait is the supplied photograph.

## 8. Deployment

Deployment is a manual ZIP upload to AWS Amplify Hosting in `ap-southeast-2`, deliberately not connected to the GitHub build pipeline. The exact app ID, URL, deployment job, and verification results are recorded in `DEPLOYMENT.md` after the deploy completes. GitHub remains the source of truth.

## 9. What was left out

- No fabricated statistics, testimonials, years of experience, client work, or AWS architecture.
- No fake terminal operations, no forced game, no achievement popups.
- No analytics, tracking, cookies, API calls, or third-party scripts.
- No custom domain changes; the default Amplify domain is used.
