# Service Account for Backend application
resource "google_service_account" "backend_sa" {
  account_id   = "vesper-birthday-backend-sa"
  display_name = "Vesper Birthday Backend Service Account"
  description  = "Service account for Vesper birthday backend to access Firestore and Storage"
}

# Grant Firestore User role to backend SA
resource "google_project_iam_member" "backend_firestore" {
  project = var.project_id
  role    = "roles/datastore.user"
  member  = "serviceAccount:${google_service_account.backend_sa.email}"
}

# Grant Storage Object Admin role to backend SA (for uploading videos)
resource "google_storage_bucket_iam_member" "backend_storage_videos" {
  bucket = google_storage_bucket.videos.name
  role   = "roles/storage.objectAdmin"
  member = "serviceAccount:${google_service_account.backend_sa.email}"
}

# Grant Storage Object Viewer role for assets bucket
resource "google_storage_bucket_iam_member" "backend_storage_assets" {
  bucket = google_storage_bucket.assets.name
  role   = "roles/storage.objectViewer"
  member = "serviceAccount:${google_service_account.backend_sa.email}"
}

# Grant Secret Manager Secret Accessor role to backend SA
resource "google_secret_manager_secret_iam_member" "backend_admin_secret_access" {
  secret_id = google_secret_manager_secret.admin_secret.secret_id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.backend_sa.email}"
}

resource "google_secret_manager_secret_iam_member" "backend_pin_code_access" {
  secret_id = google_secret_manager_secret.pin_code.secret_id
  role      = "roles/secretmanager.secretAccessor"
  member    = "serviceAccount:${google_service_account.backend_sa.email}"
}

# Service Account key for local development
resource "google_service_account_key" "backend_sa_key" {
  service_account_id = google_service_account.backend_sa.name
}

# Output the key (base64 encoded) - À décoder et sauvegarder localement
output "backend_sa_key_base64" {
  description = "Backend service account key (base64 encoded) - SENSITIVE"
  value       = google_service_account_key.backend_sa_key.private_key
  sensitive   = true
}
