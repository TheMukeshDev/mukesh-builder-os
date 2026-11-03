# MUKESH'S BUILDER OS

A personal developer portfolio for **Mukesh Kumar**, built for the AWS Builder Center Portfolio Challenge 2026.

The site combines a straightforward, readable portfolio with an optional desktop-style **Builder OS** layer: four small apps (Project Lab, Tech Arsenal, Community Hub, Secret Console) that let visitors explore the same verified content in a different way. The OS is a bonus, never a gate — every project, link, and contact detail is available on the page without opening it.

- **Live site:** https://main.d2uq7615twtp7h.amplifyapp.com/
- **Repository:** https://github.com/TheMukeshDev/mukesh-builder-os
- **Author:** Mukesh Kumar — [GitHub](https://github.com/TheMukeshDev) · [LinkedIn](https://linkedin.com/in/themukeshdev) · [Email](mailto:itzcodermukesh@gmail.com)
- **Region:** `ap-southeast-2` (AWS Amplify Hosting, manual ZIP deployment)

## What is inside

- Hero with the real profile photo, resume download, and verified profile links.
- About with quick facts and no fabricated history.
- Tech Arsenal: six skill categories with explicit **learning** labels instead of made-up percentages.
- Project Laboratory: three builds — CodePath AI, Festivo AI, NAWI TestFlow — each with problem, solution, contribution, stack status, and verified links.
- Community & Achievements: SyntaxClash 2026, RIFT Series, shipped AI applications, and leadership roles at Tech Hub BBS, NEXORA E-Cell, GDG Prayagraj, AWS SBCL, and GeeksforGeeks.
- Learning Journey: current goals marked in progress.
- Contact: email, LinkedIn, GitHub, resume, location.
- Builder OS dialog: a visible “Creative feature · optional” launch strip, keyboard-accessible tabs and apps, plus a console with `help`, `about`, `whoami`, `motto`, `now`, `projects`, `skills`, `community`, `achievements`, `learning`, `reset`, command history, and a visible reset button.

## Technology

- Plain HTML, CSS, and JavaScript. No frameworks, package manager, build step, API calls, or web fonts.
- No external dependencies at runtime.
- Hosted on AWS Amplify Hosting using a manual ZIP deployment (GitHub is the source of truth, but is not connected to Amplify's build pipeline).
- Assets: one JPEG portrait, one PDF resume, one SVG favicon, one SVG Open Graph source, one PNG Open Graph image.

## Structure

```
builder-os/
├── index.html
├── styles.css
├── script.js
├── favicon.ico
├── favicon.svg
├── apple-touch-icon.png
├── amplify.yml
├── deploy.ps1
├── deploy.sh
├── assets/
│   ├── favicon.svg
│   ├── favicon.ico
│   ├── favicon.png
│   ├── apple-touch-icon.png
│   ├── og-cover.svg
│   ├── og-cover.png
│   ├── profile.jpeg
│   └── resume.pdf
├── documentation/
│   ├── BUILD_JOURNAL.md
│   ├── CONTENT_VERIFICATION.md
│   ├── DEPLOYMENT.md
│   ├── REFLECTION.md
│   ├── SUBMISSION.md
│   └── screenshots/
│       ├── portfolio-builder-os.png
│       ├── portfolio-desktop.png
│       ├── portfolio-mobile.png
│       └── portfolio-projects.png
├── .gitignore
└── README.md
```

## Run locally

No install required.

1. Open `index.html` directly in a browser, or serve the folder:
   ```powershell
   py -m http.server 8080
   ```
2. Visit `http://localhost:8080`.

The dialog and console work from `file://` as well; serving the folder is closer to production.

## Deployment

The production site can be deployed to AWS Amplify Hosting via the automated deploy script or via Git-connected hosting using `amplify.yml`:

```powershell
.\deploy.ps1
```

Or on macOS/Linux:

```bash
chmod +x deploy.sh && ./deploy.sh
```

See [documentation/DEPLOYMENT.md](documentation/DEPLOYMENT.md) for the manual commands, app identifiers, verification steps, and cleanup notes.

- `amplify.yml` is included for direct Git-connected CI/CD deployments.
- No build command, framework, or server runtime is required.
- The deploy scripts package `index.html`, `styles.css`, `script.js`, favicon files, and `assets/` with POSIX forward slashes.

## Content and verification

Every outbound link was checked before publishing. The project stacks are shown as **"Not specified in source material"** because the supplied profile material did not document them; nothing was inferred from a hosting URL. Documentation links that returned 404 were omitted rather than published broken.

Details: [documentation/CONTENT_VERIFICATION.md](documentation/CONTENT_VERIFICATION.md). The Builder Center submission draft, AWS-service notes, screenshot map, and challenge checklist are in [documentation/SUBMISSION.md](documentation/SUBMISSION.md).

## Accessibility

- Semantic landmarks, one `h1`, ordered headings, skip link.
- Keyboard support for navigation, tabs (arrow keys, Home/End), project briefs, console history, reset, and Esc to close.
- Native `<dialog>` modal with focus return to the trigger.
- Visible focus states, labelled controls, and `aria-live` for console and mission output.
- Responsive at 320 px and up; no horizontal overflow in tested viewports.
- `prefers-reduced-motion` respected: reveals appear immediately and animations are effectively disabled.
- Color contrast checked against WCAG AA for body text, muted text, labels, buttons, and console states.
- axe-core 4.10.2 on the live page: 0 WCAG 2.2 A/AA violations (41 passes); 0 violations with the Builder OS dialog and mobile menu open.

## Project notes

- **Stacks:** not specified by the source material; the UI says so per project.
- **Docs links:** two documentation URLs returned 404 and are deliberately not linked.
- **PharmaGuard:** not included as a featured project, per direction.
- **AWS:** one Amplify app in the project's assigned Region; Amplify serves the static site through its managed S3 origin and CloudFront. No other AWS resources are required.
- **Submission:** four live-site screenshots are included; the Amplify console screenshots must be captured by the account owner before the Builder Center project is published.

## Ownership

Personal portfolio content and design by Mukesh Kumar. Not published under an open-source license; please ask before reusing the design or personal content.
