PROJECT_ID=darci-gg

gcloud builds submit dist --tag gcr.io/$PROJECT_ID/api \
  --project $PROJECT_ID

gcloud run deploy api --image gcr.io/$PROJECT_ID/api \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars=NODE_ENV=prod \
  --project $PROJECT_ID
