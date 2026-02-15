# Secret Manager - Admin Secret for API authentication
resource "google_secret_manager_secret" "admin_secret" {
  secret_id = "${var.app_name}-birthday-admin-secret"
  
  replication {
    auto {}
  }

  depends_on = [google_project_service.secretmanager]
}

# Admin secret version (à définir manuellement après)
# Ne pas mettre de valeur sensible dans le code Terraform
# Utiliser: gcloud secrets versions add vesper-admin-secret --data-file=-

# Secret Manager - PIN Code
resource "google_secret_manager_secret" "pin_code" {
  secret_id = "${var.app_name}-birthday-pin-code"
  
  replication {
    auto {}
  }

  depends_on = [google_project_service.secretmanager]
}

# PIN code version (à définir manuellement)
# Utiliser: echo -n "TONI" | gcloud secrets versions add vesper-pin-code --data-file=-

# Secret Manager - Firebase Service Account (si besoin)
resource "google_secret_manager_secret" "firebase_sa" {
  secret_id = "${var.app_name}-birthday-firebase-sa"
  
  replication {
    auto {}
  }

  depends_on = [google_project_service.secretmanager]
}
