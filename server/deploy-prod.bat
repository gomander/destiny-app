set PROJECT_ID=destiny-app-23bc8

call gcloud builds submit dist --tag gcr.io/%PROJECT_ID%/api ^
  --project %PROJECT_ID%

call gcloud run deploy api --image gcr.io/%PROJECT_ID%/api ^
  --platform managed ^
  --region us-central1 ^
  --allow-unauthenticated ^
  --set-env-vars=NODE_ENV=prod ^
  --project %PROJECT_ID%