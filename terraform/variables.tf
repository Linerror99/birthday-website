variable "project_id" {
  description = "The GCP project ID"
  type        = string
  default     = "reetik-project"
}

variable "region" {
  description = "The GCP region for resources"
  type        = string
  default     = "europe-west1"
}

variable "credentials_file" {
  description = "Path to the service account credentials JSON file"
  type        = string
  default     = "../credentials/terraform-sa-key.json"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "prod"
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "vesper"
}

variable "storage_location" {
  description = "Location for Cloud Storage buckets"
  type        = string
  default     = "EU"
}

variable "firestore_location" {
  description = "Location for Firestore database"
  type        = string
  default     = "eur3"
}
