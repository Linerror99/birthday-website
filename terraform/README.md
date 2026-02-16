# Terraform Infrastructure - Vesper Birthday App

## 🎯 Infrastructure déployée

### Projet GCP
- **Project ID**: `reetik-project`
- **Region**: `europe-west1`

### Ressources créées

#### 1. Firestore Database
- **Name**: `vesper-db`
- **Location**: `eur3` (Europe multi-region)
- **Type**: Native mode
- **Console**: https://console.firebase.google.com/project/reetik-project/firestore

#### 2. Cloud Storage Buckets

**Videos Bucket** (vœux vidéo uploadés)
- **Name**: `vesper-birthday-videos-reetik-project`
- **Location**: EU
- **CORS**: Configuré pour uploads depuis navigateur
- **Access**: Signed URLs seulement (privé)

**Assets Bucket** (photos, timeline, assets statiques)
- **Name**: `vesper-birthday-assets-reetik-project`
- **Location**: EU
- **Access**: Public read (pour servir les images)

#### 3. Secret Manager

| Secret ID | Description | Valeur actuelle |
|-----------|-------------|-----------------|
| `vesper-birthday-admin-secret` | Clé API pour dashboard admin | Générée aléatoirement |
| `vesper-birthday-pin-code` | Code PIN pour déverrouiller app | `IAMSINNER` |
| `vesper-birthday-firebase-sa` | Service account Firebase (à remplir si besoin) | Vide |

#### 4. Service Accounts

**Backend Service Account**
- **Email**: `vesper-birthday-backend-sa@reetik-project.iam.gserviceaccount.com`
- **Permissions**:
  - Firestore: `roles/datastore.user`
  - Cloud Storage Videos: `roles/storage.objectAdmin`
  - Cloud Storage Assets: `roles/storage.objectViewer`
  - Secret Manager: `roles/secretmanager.secretAccessor`
- **Key**: Sauvegardée dans `credentials/backend-sa-key.json`

**Terraform Service Account**
- **Email**: `terraform-sa@reetik-project.iam.gserviceaccount.com`
- **Key**: Sauvegardée dans `credentials/terraform-sa-key.json`

## 📁 Fichiers générés

```
credentials/
├── terraform-sa-key.json      # Service account Terraform
└── backend-sa-key.json         # Service account Backend (pour dev local)

terraform/
├── main.tf                     # Provider configuration
├── variables.tf                # Variables
├── outputs.tf                  # Outputs
├── firestore.tf                # Firestore database
├── storage.tf                  # Cloud Storage buckets
├── secrets.tf                  # Secret Manager
├── iam.tf                      # Service accounts & permissions
├── terraform.tfvars            # Values (gitignored)
└── .terraform/                 # Terraform state
```

## 🔧 Commandes utiles

### Vérifier l'infrastructure
```bash
cd terraform/
terraform show
terraform output
```

### Voir les outputs
```bash
terraform output project_id
terraform output firestore_database
terraform output videos_bucket_name
```

### Mettre à jour l'infrastructure
```bash
terraform plan   # Voir les changements
terraform apply  # Appliquer les changements
```

### Détruire l'infrastructure (⚠️ ATTENTION)
```bash
terraform destroy  # Supprimer toutes les ressources
```

## 🔐 Secrets

### Lire un secret
```bash
gcloud secrets versions access latest --secret="vesper-birthday-admin-secret"
gcloud secrets versions access latest --secret="vesper-birthday-pin-code"
```

### Mettre à jour un secret
```bash
echo -n "NOUVELLE_VALEUR" | gcloud secrets versions add vesper-birthday-pin-code --data-file=-
```

### Lister les secrets
```bash
gcloud secrets list
```

## 🗄️ Firestore

### Accéder à Firestore
- Console: https://console.firebase.google.com/project/reetik-project/firestore
- Database name: `vesper-db`

### Collections prévues
```
vesper-db/
├── wishes/              # Vœux soumis par les contributeurs
│   └── {wishId}
│       ├── id: string
│       ├── name: string
│       ├── type: 'text' | 'video'
│       ├── message: string
│       ├── videoStoragePath?: string
│       ├── videoUrl?: string
│       ├── approved: boolean
│       ├── rejected: boolean
│       └── createdAt: timestamp
│
└── config/              # Configuration app (optionnel)
    └── settings
        ├── targetDate: timestamp
        ├── totalContributions: number
        └── ...
```

## 📦 Cloud Storage

### Upload fichier vers assets bucket
```bash
gsutil cp photo.jpg gs://vesper-birthday-assets-reetik-project/photos/
```

### Lister fichiers
```bash
gsutil ls gs://vesper-birthday-videos-reetik-project/
gsutil ls gs://vesper-birthday-assets-reetik-project/
```

### URL publique pour assets
```
https://storage.googleapis.com/vesper-birthday-assets-reetik-project/photos/photo.jpg
```

## 🚀 Prochaines étapes

1. ✅ Infrastructure GCP déployée
2. **→ Développer le backend API** (Phase 2)
   - Initialiser projet Node.js
   - Connecter à Firestore avec `backend-sa-key.json`
   - Implémenter endpoints REST
3. Connecter frontend au backend
4. Conteneuriser (Docker)
5. Déployer sur Cloud Run
6. Setup CI/CD

## ⚠️ Important

- **Ne pas commit** les fichiers dans `credentials/`
- **Ne pas commit** `terraform.tfvars`
- Les credentials sont dans `.gitignore`
- La clé du service account backend est sensible !

## 📞 Troubleshooting

### Erreur de permissions
```bash
# Vérifier les permissions du service account
gcloud projects get-iam-policy reetik-project \
  --flatten="bindings[].members" \
  --filter="bindings.members:serviceAccount:vesper-birthday-backend-sa@reetik-project.iam.gserviceaccount.com"
```

### Réinitialiser Terraform state
```bash
rm -rf .terraform/
rm terraform.tfstate*
terraform init
```

---

**Infrastructure créée le**: 15 février 2026
**Projet**: Vesper Birthday App
**Environment**: Production
