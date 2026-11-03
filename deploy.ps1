<#
.SYNOPSIS
    Deploys the Builder OS portfolio to AWS Amplify Hosting.
.DESCRIPTION
    Packages all required static files with normalized POSIX forward slashes
    and uploads them to AWS Amplify via the AWS CLI.
.EXAMPLE
    .\deploy.ps1
    .\deploy.ps1 -AppId "d2uq7615twtp7h" -Branch "main" -Region "ap-southeast-2" -Profile "portfolio"
#>

[CmdletBinding()]
param(
    [string]$AppId = "d2uq7615twtp7h",
    [string]$Branch = "main",
    [string]$Region = "ap-southeast-2",
    [string]$Profile = "portfolio"
)

$ErrorActionPreference = "Stop"
$zipFile = Join-Path $PSScriptRoot "builder-os-deploy.zip"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  MUKESH'S BUILDER OS - AWS Amplify Deploy" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "App ID:   $AppId"
Write-Host "Branch:   $Branch"
Write-Host "Region:   $Region"
Write-Host "Profile:  $Profile"
Write-Host ""

# 1. Verify AWS CLI
Write-Host "[1/5] Verifying AWS credentials..." -ForegroundColor Yellow
$callerRaw = & aws sts get-caller-identity --profile $Profile
if ($LASTEXITCODE -ne 0) {
    Write-Error "AWS authentication failed for profile '$Profile'."
    exit 1
}
$callerJson = ($callerRaw -join "`n") | ConvertFrom-Json
Write-Host "Authenticated as: $($callerJson.Arn)" -ForegroundColor Green

# 2. Package static assets ensuring POSIX paths
Write-Host "[2/5] Creating deployment bundle with POSIX forward slashes..." -ForegroundColor Yellow
if (Test-Path $zipFile) {
    Remove-Item $zipFile -Force
}

$pyScript = @"
import sys, os, zipfile

zip_target = sys.argv[1]
root_files = [
    'index.html',
    'styles.css',
    'script.js',
    'favicon.ico',
    'favicon.svg',
    'apple-touch-icon.png',
    'robots.txt',
    'amplify.yml'
]

with zipfile.ZipFile(zip_target, 'w', zipfile.ZIP_DEFLATED) as zf:
    for f in root_files:
        if os.path.exists(f):
            zf.write(f, arcname=f)
    if os.path.exists('assets'):
        for root, dirs, files in os.walk('assets'):
            for file in files:
                full_path = os.path.join(root, file)
                arcname = full_path.replace('\\\\', '/')
                zf.write(full_path, arcname=arcname)
"@

python -c $pyScript $zipFile
if (-not (Test-Path $zipFile)) {
    Write-Error "Failed to create deployment package: $zipFile"
    exit 1
}
$zipSize = (Get-Item $zipFile).Length
Write-Host "Bundle created: $([math]::Round($zipSize / 1KB, 2)) KB" -ForegroundColor Green

# 3. Create Amplify deployment
Write-Host "[3/5] Requesting upload URL from AWS Amplify..." -ForegroundColor Yellow
$deployJson = & aws amplify create-deployment --app-id $AppId --branch-name $Branch --region $Region --profile $Profile
$deployment = ($deployJson -join "`n") | ConvertFrom-Json
$jobId = $deployment.jobId
$uploadUrl = $deployment.zipUploadUrl
Write-Host "Job ID assigned: $jobId" -ForegroundColor Green

# 4. Upload bundle and start deployment
Write-Host "[4/5] Uploading bundle and starting deployment..." -ForegroundColor Yellow
Invoke-RestMethod -Method Put -InFile $zipFile -ContentType "application/zip" -Uri $uploadUrl
& aws amplify start-deployment --app-id $AppId --branch-name $Branch --job-id $jobId --region $Region --profile $Profile | Out-Null

# 5. Monitor deployment until finished
Write-Host "[5/5] Monitoring deployment progress..." -ForegroundColor Yellow
$timeoutSeconds = 120
$startTime = Get-Date

do {
    Start-Sleep -Seconds 3
    $jobRaw = & aws amplify get-job --app-id $AppId --branch-name $Branch --job-id $jobId --region $Region --profile $Profile
    $jobInfo = ($jobRaw -join "`n") | ConvertFrom-Json
    $status = $jobInfo.job.summary.status
    Write-Host "Current status: $status" -ForegroundColor Gray

    if ($status -eq "SUCCEED") {
        Write-Host ""
        Write-Host "========================================" -ForegroundColor Green
        Write-Host "  Deployment Successful!" -ForegroundColor Green
        Write-Host "========================================" -ForegroundColor Green
        $liveUrl = "https://${Branch}.${AppId}.amplifyapp.com"
        Write-Host "Live URL: $liveUrl" -ForegroundColor Cyan
        break
    } elseif ($status -eq "FAILED" -or $status -eq "CANCELLED") {
        Write-Error "Amplify deployment finished with status '$status'."
        break
    }
} while (((Get-Date) - $startTime).TotalSeconds -lt $timeoutSeconds)

# Cleanup
if (Test-Path $zipFile) {
    Remove-Item $zipFile -Force
}
