# Firestore Database
resource "google_firestore_database" "database" {
  project     = var.project_id
  name        = "vesper-db"
  location_id = var.firestore_location
  type        = "FIRESTORE_NATIVE"

  # Prevent accidental deletion
  deletion_policy = "ABANDON"

  depends_on = [google_project_service.firestore]
}

# Note: Les index Firestore seront créés automatiquement par Firebase
# lors des premières requêtes, ou peuvent être ajoutés manuellement plus tard
# via la console Firebase si nécessaire pour optimiser les performances.
