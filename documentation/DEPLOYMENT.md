# Deployment

**Target:** AWS Amplify Hosting, static site, manual ZIP deployment  
**Region:** `ap-southeast-2`  
**AWS profile:** `portfolio`  
**Account:** `584998371788`  
**App name:** `mukesh-builder-os`  
**Branch:** `main`

Amplify is **not** connected to the GitHub repository. The site is uploaded as a prebuilt static ZIP. There is no build command, no framework preset, and no server runtime.

## Files included in the deployment

Upload only what the static site needs:

```
index.html
styles.css
script.js
assets/
```

`README.md`, `documentation/`, `.gitignore`, and `.git` are not deployed.

## Deploy steps (AWS CLI)

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

4. Create a deployment job and capture `jobId` and `zipUploadUrl`:

   ```powershell
   & $aws amplify create-deployment --app-id <APP_ID> --branch-name main --region ap-southeast-2 --profile portfolio
   ```

5. Build the ZIP at the site root (no top-level folder):

   ```powershell
   Compress-Archive -Path index.html,styles.css,script.js,assets -DestinationPath ..\builder-os-site.zip -Force
   ```

6. Upload the ZIP to the presigned URL returned in step 4:

   ```powershell
   $deployment = & $aws amplify create-deployment --app-id <APP_ID> --branch-name main --region ap-southeast-2 --profile portfolio | ConvertFrom-Json
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

- [ ] URL returns 200 over HTTPS
- [ ] CSS, JavaScript, portrait, resume, and favicon load
- [ ] Resume downloads as a PDF
- [ ] All seven outbound links return 200
- [ ] Projects, learning, community, and contact render without JavaScript errors
- [ ] Builder OS opens, tabs work, console commands work, Esc closes
- [ ] Mobile widths 390 px and 320 px have no horizontal overflow
- [ ] `og:url` and `og:image` point at the live HTTPS URL and cover image
- [ ] Lighthouse/axe pass (manual if no local tool available)
- [ ] No console errors in the live page

Record actual results here after the deploy:

| Item | Value |
| --- | --- |
| App ID | `PENDING` |
| Default domain | `PENDING` |
| Deploy job ID | `PENDING` |
| Deployed at | `PENDING` |
| Final status | `PENDING` |
| Verified live URL | `PENDING` |

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
