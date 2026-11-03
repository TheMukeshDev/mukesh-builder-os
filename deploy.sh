#!/usr/bin/env bash
# Deploys Builder OS portfolio to AWS Amplify Hosting on macOS/Linux.
set -euo pipefail

APP_ID="${1:-d2uq7615twtp7h}"
BRANCH="${2:-main}"
REGION="${3:-ap-southeast-2}"
PROFILE="${4:-portfolio}"

ZIP_FILE="builder-os-deploy.zip"

echo "========================================"
echo "  MUKESH'S BUILDER OS - AWS Amplify Deploy"
echo "========================================"
echo "App ID:   $APP_ID"
echo "Branch:   $BRANCH"
echo "Region:   $REGION"
echo "Profile:  $PROFILE"
echo ""

echo "[1/5] Verifying AWS credentials..."
aws sts get-caller-identity --profile "$PROFILE" >/dev/null

echo "[2/5] Creating deployment bundle..."
rm -f "$ZIP_FILE"
zip -r "$ZIP_FILE" index.html styles.css script.js favicon.ico favicon.svg apple-touch-icon.png robots.txt amplify.yml assets/ >/dev/null

echo "[3/5] Requesting upload URL from AWS Amplify..."
DEPLOY_JSON=$(aws amplify create-deployment --app-id "$APP_ID" --branch-name "$BRANCH" --region "$REGION" --profile "$PROFILE")
JOB_ID=$(echo "$DEPLOY_JSON" | grep -o '"jobId": "[^"]*' | cut -d'"' -f4)
UPLOAD_URL=$(echo "$DEPLOY_JSON" | grep -o '"zipUploadUrl": "[^"]*' | cut -d'"' -f4)

echo "[4/5] Uploading bundle and starting deployment..."
curl -s -X PUT -T "$ZIP_FILE" -H "Content-Type: application/zip" "$UPLOAD_URL"
aws amplify start-deployment --app-id "$APP_ID" --branch-name "$BRANCH" --job-id "$JOB_ID" --region "$REGION" --profile "$PROFILE" >/dev/null

echo "[5/5] Monitoring deployment..."
while true; do
  sleep 3
  STATUS=$(aws amplify get-job --app-id "$APP_ID" --branch-name "$BRANCH" --job-id "$JOB_ID" --region "$REGION" --profile "$PROFILE" | grep -o '"status": "[^"]*' | head -1 | cut -d'"' -f4)
  echo "Status: $STATUS"
  if [ "$STATUS" = "SUCCEED" ]; then
    echo "Deployment Successful!"
    echo "Live URL: https://${BRANCH}.${APP_ID}.amplifyapp.com"
    break
  elif [ "$STATUS" = "FAILED" ] || [ "$STATUS" = "CANCELLED" ]; then
    echo "Deployment ended with status $STATUS"
    exit 1
  fi
done

rm -f "$ZIP_FILE"

