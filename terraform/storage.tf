# Cloud Storage bucket for videos
resource "google_storage_bucket" "videos" {
  name          = "${var.app_name}-birthday-videos-${var.project_id}"
  location      = var.storage_location
  force_destroy = false
  
  uniform_bucket_level_access = true
  
  cors {
    origin          = ["*"]  # À restreindre en production avec votre domaine
    method          = ["GET", "HEAD", "PUT", "POST", "DELETE"]
    response_header = ["*"]
    max_age_seconds = 3600
  }

  lifecycle_rule {
    condition {
      age = 365  # Supprimer après 1 an (optionnel)
    }
    action {
      type = "Delete"
    }
  }

  depends_on = [google_project_service.storage]
}

# Cloud Storage bucket for static assets (photos, timeline images, etc.)
resource "google_storage_bucket" "assets" {
  name          = "${var.app_name}-birthday-assets-${var.project_id}"
  location      = var.storage_location
  force_destroy = false
  
  uniform_bucket_level_access = true
  
  cors {
    origin          = ["*"]  # À restreindre en production
    method          = ["GET", "HEAD"]
    response_header = ["*"]
    max_age_seconds = 3600
  }

  depends_on = [google_project_service.storage]
}

# IAM binding to allow public read access to assets (photos, etc.)
resource "google_storage_bucket_iam_member" "assets_public_read" {
  bucket = google_storage_bucket.assets.name
  role   = "roles/storage.objectViewer"
  member = "allUsers"
}

# Note: Videos bucket will use signed URLs, so no public access
