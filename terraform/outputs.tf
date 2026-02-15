output "project_id" {
  description = "GCP Project ID"
  value       = var.project_id
}

output "region" {
  description = "GCP Region"
  value       = var.region
}

output "firestore_database" {
  description = "Firestore database name"
  value       = google_firestore_database.database.name
}

output "videos_bucket_name" {
  description = "Videos storage bucket name"
  value       = google_storage_bucket.videos.name
}

output "videos_bucket_url" {
  description = "Videos storage bucket URL"
  value       = google_storage_bucket.videos.url
}

output "assets_bucket_name" {
  description = "Assets storage bucket name"
  value       = google_storage_bucket.assets.name
}

output "backend_service_account_email" {
  description = "Backend service account email"
  value       = google_service_account.backend_sa.email
}

output "admin_secret_id" {
  description = "Admin secret ID in Secret Manager"
  value       = google_secret_manager_secret.admin_secret.secret_id
}

output "pin_code_secret_id" {
  description = "PIN code secret ID in Secret Manager"
  value       = google_secret_manager_secret.pin_code.secret_id
}
