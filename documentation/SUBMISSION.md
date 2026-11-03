# Builder Center submission draft

Paste-ready project copy for the **AWS Student Builder Challenge: Build Your Tech Superpower**. Submission deadline: **November 6, 2026, 11:59 p.m. PT**.

## Project title

**MUKESH'S BUILDER OS — a portfolio you can boot**

## Short description

A personal portfolio for Mukesh Kumar that starts as a clean, readable page and then opens into a small desktop-style OS. The OS is optional: About, Skills, and Projects are fully available without it. It exists to show how I think about interfaces, state, and detail while keeping the portfolio useful for internships.

## Links

- **Live portfolio:** https://main.d2uq7615twtp7h.amplifyapp.com/
- **GitHub repository:** https://github.com/TheMukeshDev/mukesh-builder-os

## The three core sections

| Requirement | Where it lives |
| --- | --- |
| About Me / personal story | `#about` — second-year CSE student at BBSCET Prayagraj, backend and AI focus, community work |
| Skills or Tech Superpowers | `#skills` — six honest categories; learning items are labelled instead of given invented percentages |
| Projects or Achievements | `#projects` and `#community` — CodePath AI, Festivo AI, NAWI TestFlow, SyntaxClash 2026, RIFT Series, leadership work |

Navigation is a normal sticky menu on desktop and a proper mobile menu on small screens. The page also has a Contact section, resume download, and verified GitHub/LinkedIn links.

## Creative feature: Builder OS

**Visible hint:** a dashed launch strip directly under the hero says **“Creative feature · optional”** and explains that the portfolio has a tiny OS inside. Desktop visitors also see an **Open Builder OS** button in the top bar.

**What happens:** the visitor boots a desktop-style dialog with four working apps:

1. **Project Lab** — switch between the three project briefs.
2. **Tech Arsenal** — filter the same skills into categories.
3. **Community Hub** — the communities and roles behind the portfolio.
4. **Secret Console** — a real command parser with history, reset, links, and personal commands.

The console is the part that makes it feel like mine. `whoami`, `motto`, and `now` answer in my voice. `projects`, `skills`, `community`, `achievements`, and `learning` return the same verified content as the page. `sudo` is a small joke. `help` lists the real commands, and the visible reset button really resets the session.

**Why it does not get in the way:** the dialog never opens automatically, every core section is available without JavaScript or the OS, Esc and the close button both work, focus returns to the trigger, and the background page is not replaced or disabled after closing.

## AWS implementation

- **Service:** AWS Amplify Hosting
- **App:** `mukesh-builder-os`
- **App ID:** `d2uq7615twtp7h`
- **Region:** `ap-southeast-2`
- **Branch:** `main`
- **Live domain:** https://main.d2uq7615twtp7h.amplifyapp.com/
- **Deployment:** manual static ZIP upload, no connected build pipeline, no server runtime
- **Managed underneath:** Amplify serves the static files through its managed hosting, S3 origin, and CloudFront distribution
- **Other AWS services:** none required; no database, Lambda, API, or custom domain

The deployed ZIP contains only `index.html`, `styles.css`, `script.js`, and `assets/`. Final deployment job `3` is `SUCCEED`; its log ends with `Deployment complete`.

## Screenshots for the submission

Save the AWS screenshots yourself from the Amplify console; do not use mocked console images.

| File | What it should show | Source |
| --- | --- | --- |
| `portfolio-desktop.png` | Desktop portfolio at the live URL, including the creative-feature hint | Captured from job `3` |
| `portfolio-projects.png` | Project Laboratory with the three builds and verified links | Captured from job `3` |
| `portfolio-mobile.png` | Mobile layout, 390 px wide, no overflow | Captured from job `3` |
| `portfolio-builder-os.png` | Builder OS dialog open on the Secret Console, with personal commands | Captured from job `3` |
| `amplify-deployment.png` | Amplify app **Deployment 3 — Deployed**, domain, history, and deployment-complete log | Account owner: Amplify console |
| `amplify-app.png` | Amplify app overview with name, app ID, region, and branch | Account owner: Amplify console |

The portfolio screenshots live in `documentation/screenshots/`. The two Amplify screenshots must be added by the account owner before publishing the Builder Center project.

## What I learned

- How Amplify Hosting maps a static ZIP to a public HTTPS URL, and why the ZIP's internal paths matter.
- How to build tabs, a modal, filters, and a command parser without a framework while keeping keyboard and screen-reader behavior correct.
- How much of accessibility is invisible until tested: focus return, roving tab focus, live regions, reduced motion, and contrast on small labels.
- How to keep a portfolio honest when the source material is incomplete: say “not specified” instead of inventing a stack or metric.

## Challenges I hit

- **Packaging:** `Compress-Archive` wrote backslash-separated entries. Rebuilding with `tar -a` produced the forward-slash paths Amplify expected.
- **Scroll offset:** section scroll margins caused anchor links to land twice as far down as intended. Removing the duplicate offset fixed it.
- **Contrast:** the primary button's gradient needed a lighter bottom stop to clear AA.
- **False-positive accessibility run:** with the mobile menu open, axe could not determine some backgrounds because the menu overlays the hero. Re-running with computed styles and manual contrast checks showed the colors pass; the final scans report 0 violations.

## Qualification checklist

- [x] Public portfolio hosted on AWS and live over HTTPS
- [x] GitHub repository linked
- [x] About Me, Skills, and Projects/Achievements present and navigable
- [x] One working creative feature with a visible hint
- [x] Creative feature does not impair navigation
- [x] AWS service usage documented
- [x] Portfolio screenshots captured from the live site
- [ ] AWS console screenshots added by the account owner
- [ ] Project published under “your project” in Builder Center
- [ ] Builder Center student verification and 18+ eligibility confirmed
