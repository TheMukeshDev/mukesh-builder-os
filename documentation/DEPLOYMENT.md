# Deployment

**Target:** AWS Amplify Hosting, static site, manual ZIP deployment  
**Region:** `ap-southeast-2`  
**AWS profile:** `portfolio`  
**Account:** `<AWS_ACCOUNT_ID>`  
**App name:** `mukesh-builder-os`  
**Branch:** `main`

Amplify is **not** connected to the GitHub repository. The site is uploaded as a prebuilt static ZIP. There is no build command, no framework preset, and no server runtime.

## Files included in the deployment

Upload only what the static site needs:

```
index.html
styles.css
script.js
favicon.ico
favicon.svg
apple-touch-icon.png
amplify.yml
assets/
```

`README.md`, `documentation/`, `.gitignore`, and `.git` are not deployed.

## Quick Automated Deploy

Run the automated deploy script from the repository root:

```powershell
.\deploy.ps1
```

Or on macOS/Linux:

```bash
chmod +x deploy.sh && ./deploy.sh
```

The script automatically verifies credentials, packages all assets ensuring POSIX forward slashes, uploads the deployment package, and monitors the job status until it succeeds.

## Deploy steps (Manual AWS CLI)

Set the CLI path for this machine and keep output UTF-8 safe:

```powershell
$env:PYTHONUTF8 = "1"
$aws = "C:\Users\ACER\AppData\Local\Programs\Amazon\AWSCLIV2\aws.exe"
```

1. Confirm identity and Region:

   ```powershell
   & $aws sts get-caller-identity --profile portfolio
   & $aws configure get region --profile portfolio
   ```

2. Create the Amplify app (only once):

   ```powershell
   & $aws amplify create-app --name mukesh-builder-os --region ap-southeast-2 --profile portfolio
   ```

3. Create the production branch:

   ```powershell
   & $aws amplify create-branch --app-id <APP_ID> --branch-name main --region ap-southeast-2 --profile portfolio
   ```

4. Build the ZIP at the site root (no top-level folder). Use `tar -a`, not `Compress-Archive`: the latter can write backslash ZIP entries:

   ```powershell
   tar -a -c -f ..\builder-os-site.zip index.html styles.css script.js assets
   ```

5. Create a deployment job and keep the returned object:

   ```powershell
   $deployment = & $aws amplify create-deployment --app-id <APP_ID> --branch-name main --region ap-southeast-2 --profile portfolio | ConvertFrom-Json
   ```

6. Upload the ZIP to that job's presigned URL:

   ```powershell
   Invoke-RestMethod -Method Put -InFile ..\builder-os-site.zip -ContentType "application/zip" -Uri $deployment.zipUploadUrl
   ```

7. Start and monitor the deployment:

   ```powershell
   & $aws amplify start-deployment --app-id <APP_ID> --branch-name main --job-id $deployment.jobId --region ap-southeast-2 --profile portfolio
   & $aws amplify get-job --app-id <APP_ID> --branch-name main --job-id $deployment.jobId --region ap-southeast-2 --profile portfolio
   ```

   Repeat `get-job` until `status` is `SUCCEED`.

8. The default URL is:

   ```
   https://main.<APP_ID>.amplifyapp.com
   ```

## Post-deploy verification

- [x] URL returns 200 over HTTPS
- [x] CSS, JavaScript, portrait, resume, and favicon load
- [x] Resume downloads as a PDF
- [x] All seven outbound links return 200
- [x] Projects, learning, community, and contact render without JavaScript errors
- [x] Builder OS opens, tabs work, console commands work, Esc closes
- [x] Mobile widths 390 px and 320 px have no horizontal overflow
- [x] `og:url` and `og:image` point at the live HTTPS URL and cover image
- [x] axe-core 4.10.2 scan: 0 WCAG 2.2 A/AA violations (Lighthouse not run)
- [x] No console errors in the live page

Recorded results:

| Item | Value |
| --- | --- |
| App ID | `d2uq7615twtp7h` |
| App ARN | `arn:aws:amplify:ap-southeast-2:<AWS_ACCOUNT_ID>:apps/d2uq7615twtp7h` |
| Default domain | `d2uq7615twtp7h.amplifyapp.com` |
| Live URL | https://main.d2uq7615twtp7h.amplifyapp.com/ |
| Branch | `main` |
| Deploy job IDs | `1` (initial), `2` (metadata), `3` (creative-feature polish) |
| Deployed at | 3 November 2026, 11:42 IST; final job `3` at 12:36 IST |
| Initial status | `SUCCEED` |
| Final status | `SUCCEED` (job `3`, about 9 seconds) |
| Verified live URL | 200 over HTTPS; S3 origin behind CloudFront |

All three deployments succeeded. Job `3` carries the visible creative-feature hint, first-person launch copy, personal console commands, and the footer note. Assets were verified individually after deployment:

| Asset | Status |
| --- | --- |
| `/index.html` | 200 |
| `/styles.css` | 200, `text/css` |
| `/script.js` | 200, `text/javascript` |
| `/assets/profile.jpeg` | 200, `image/jpeg` |
| `/assets/resume.pdf` | 200, `application/pdf` |
| `/assets/favicon.svg` | 200, `image/svg+xml` |
| `/assets/og-cover.png` | 200, `image/png` |

Live browser checks passed with no console errors. axe-core 4.10.2 reported 0 violations on the page (41 passes), 0 with the Builder OS dialog open, and 0 with the mobile menu open. `color-contrast` is marked incomplete where decorative gradients prevent automated sampling; the underlying color tokens were checked manually and pass AA.

Portfolio screenshots were captured from the final live deployment into `documentation/screenshots/`. The Amplify console screenshots are captured by the account owner; they are not fabricated.

## GitHub

The repository is the source of truth:

```powershell
git init
git add .
git commit -m "Build MUKESH'S BUILDER OS portfolio"
gh repo create TheMukeshDev/mukesh-builder-os --public --source . --remote origin --push
```

Subsequent updates are pushed to GitHub and re-zipped/re-deployed manually.

## Cost and cleanup

- One Amplify Hosting app and one branch.
- No custom domain, no backend environments, no other AWS resources.
- The account is on the FREE plan with credits active until 2027-05-03.
- To remove everything created for this task:

  ```powershell
  & $aws amplify delete-app --app-id <APP_ID> --region ap-southeast-2 --profile portfolio
  ```

Keep the app while the portfolio is meant to stay live. Deleting the app removes the hosted URL. Ask the account owner before cleanup; only the project owner can change plan/spend settings.

## Notes

- No build image or service role is needed for a manual static ZIP deployment.
- Do not connect Amplify to the GitHub repo unless the deployment method is intentionally changed; the docs and challenge notes describe manual ZIP deployment.
- Re-deploying uses a fresh `create-deployment` job; the old job ID cannot be reused.
