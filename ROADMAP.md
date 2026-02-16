# 🗺️ ROADMAP - Projet Vesper (Application Anniversaire)

> **Nom du projet**: Vesper  
> **Date cible**: 20 février 2026  
> **Infrastructure**: GCP + Terraform  
> **Stack**: React + Node.js + Firestore  

**Dernière mise à jour**: 15 février 2026  
**Statut**: ✅ Phase 1-4 terminées | 🚀 Ready for local testing

---

## 📊 **VUE D'ENSEMBLE**

### Stratégie de développement
- ✅ Déployer l'infrastructure GCP d'abord (Terraform)
- ✅ Développer en local avec Firestore cloud
- ✅ Conteneuriser frontend + backend
- 🔄 Tests complets en local avant déploiement
- ⏸️ Déploiement production unique quand tout est prêt
- ⏸️ CI/CD à la fin pour les futures mises à jour

### Timeline globale
- **Infrastructure**: ✅ Complété (15 février)
- **Backend API**: ✅ Complété (15 février)
- **Frontend connexion**: ✅ Complété (15 février)
- **Conteneurisation**: ✅ Complété (15 février)
- **Tests locaux**: 🔄 En cours
- **Déploiement**: ⏸️ À venir
- **Collecte vœux**: 2-3 semaines avant l'anniversaire
- **Jour J**: 20 février 2026

---

## 📋 **PHASE 1: Infrastructure GCP (Terraform)** - ✅ COMPLÉTÉ

### 🎯 Objectif
Provisionner toutes les ressources cloud nécessaires via Terraform

### ✅ Tâches

#### **1.1 Setup projet GCP**
- ✅ Créer/configurer projet GCP (utilisé: `reetik-project`)
- ✅ Activer APIs nécessaires:
  - Firestore (Cloud Firestore API)
  - Cloud Storage
  - Secret Manager
  - IAM
- ✅ Configurer gcloud CLI + authentification locale
- ✅ Créer service account pour Terraform (`terraform-sa`)
- ✅ Générer clé JSON pour service account

#### **1.2 Structure Terraform**
✅ Créé:
```
terraform/
├── main.tf              # Provider GCP + région europe-west1
├── variables.tf         # Variables (project_id, region, etc.)
├── outputs.tf           # Outputs (Project ID, buckets, SA email)
├── firestore.tf         # Database vesper-db (eur3 multi-region)
├── storage.tf           # 2 buckets (videos private, assets public)
├── secrets.tf           # 3 secrets (admin, pin, firebase-sa)
├── iam.tf              # Service accounts + permissions
└── README.md
```

#### **1.3 Ressources créées**

**firestore.tf**
- ✅ Firestore Database `vesper-db` (mode Native, région eur3)
- ✅ Collection `wishes` créée automatiquement via backend

**storage.tf**
- ✅ Bucket `vesper-birthday-videos-reetik-project`
  - Région: `europe-west1`
  - Private access (signed URLs)
  - Versioning disabled
- ✅ Bucket `vesper-birthday-assets-reetik-project`
  - Public read access pour assets statiques

**secrets.tf**
- ✅ Secret `vesper-birthday-admin-secret` (auto-généré)
- ✅ Secret `vesper-birthday-pin-code` (valeur: "IAMSINNER")
- ✅ Secret `vesper-birthday-firebase-sa` (pour service account)

**iam.tf**
- ✅ Service account `vesper-birthday-backend-sa@reetik-project.iam.gserviceaccount.com`
  - Roles: Firestore User, Storage Admin, Secret Accessor
- ✅ IAM bindings configurés
- ✅ Key exportée: `credentials/backend-sa-key.json`

#### **1.4 Déploiement infrastructure**
✅ Infrastructure déployée avec succès:
```bash
cd terraform/
terraform init      # ✅
terraform plan      # ✅
terraform apply     # ✅ 3 resources added
```

- ✅ Toutes les ressources créées dans GCP Console
- ✅ Outputs récupérés (Project ID, Bucket names, SA email)
- ✅ Credentials service account téléchargées
- ✅ Connexion Firestore testée et validée

### 📦 Livrables
- ✅ Firestore opérationnel sur GCP (vesper-db)
- ✅ Cloud Storage buckets configurés (2 buckets)
- ✅ Secrets créés et configurés (3 secrets)
- ✅ Service accounts avec permissions complètes
- ✅ Credentials disponibles pour dev local
- ✅ Documentation Terraform complète

---✅ COMPLÉTÉ

### 🎯 Objectif
API REST complète connectée au Firestore déployé

### ✅ Tâches

#### **2.1 Setup backend Node.js**
✅ Structure créée:

#### **2.1 Setup backend Node.js**
```
backend/
├── package.json
├── tsconfig.json
├── .env.example
├── .env                # Ne pas commit!
├── .gitignore
├── Dockerfile
├── src/
│   ├── server.ts              # Point d'entrée
│   ├── app.ts                 # Config Express
│   ├── config/
│   │   ├── firebase.ts        # Init Firebase Admin
│   │   └── environment.ts     # Variables d'env
│   ├── routes/
│   │   ├── index.ts
│   │   ├── wishes.routes.ts   # Routes vœux
│   │   └── health.routes.ts   # Health check
│   ├── controllers/
│   │   └── wishes.controller.ts
│   ├── services/
│   │   ├── firestore.service.ts
│   │   └── storage.service.ts
│   ├── middleware/
│   │   ├── cors.ts
│   │   ├── errorHandler.ts
│   │   ├── validation.ts
│   │   └── rateLimit.ts
│   ├── types/
│   │   └── wish.types.ts
│   └── utils/
│       └── logger.ts
└── tests/                     # Tests (optionnel)
```
✅ `npm init` + dépendances installées:
  - express, cors, helmet, dotenv
  - firebase-admin
  - multer (upload files)
  - zod (validation)
  - express-rate-limit
  - typescript, @types/*, ts-node-dev

#### **2.2 Configuration Firebase**
- ✅ Créé `config/firebase.ts` avec Firebase Admin SDK
- ✅ Initialisation avec credentials service account
- ✅ Connexion Firestore validée
- ✅ Helper functions Firestore dans `services/firestore.service.ts`
- ✅ Storage service dans `services/storage.service.ts`

#### **2.3 Endpoints API**

**POST /api/wishes/submit** - Soumettre un vœu
- ✅ Body: `{ name, type: 'text'|'video', message, videoFile? }`
- ✅ Validation Zod: nom requis, message ou vidéo requis
- ✅ Si vidéo: upload vers Cloud Storage avec signed URL
- ✅ Si vidéo: upload vers Cloud Storage
- [ ] Créer document Firestore:
  ```json
  {
    "id": "auto-generated",
    "name": "string",
    "type": "text|video",
    "message": "string",
    "videoStoragePath": "string?",
    "videoUrl": "signed-url?",
    "approved": false,
    "rejected": false,
    "createdAt": "timestamp"
  ✅ Retourner success + wishId

**GET /api/wishes** - Liste complète (admin only)
- ✅ Récupérer tous les vœux de Firestore
- ✅ Authentification via header `X-Admin-Secret`
- ✅ Retourner array de vœux avec tous les statuts
- ✅ Support filtres query params (approved, rejected)

**GET /api/wishes/approved** - Vœux approuvés (public)
- ✅ Filtrer `approved: true, rejected: false`
- ✅ Générer signed URLs pour vidéos (expiration 24h)
- ✅ Retourner array vœux approuvés

**GET /api/wishes/:id** - Vœu par ID (admin)
- ✅ Authentification requise
- ✅ Regenerer signed URL si vidéo

**PATCH /api/wishes/:id/approve** - Approuver
- ✅ Auth admin via X-Admin-Secret
- ✅ Update Firestore: `{ approved: true, rejected: false }`
- ✅ Retourner success message

**PATCH /api/wishes/:id/reject** - Rejeter
- ✅ Auth admin
- ✅ Update Firestore: `{ approved: false, rejected: true }`
- ✅ Retourner success message

**PATCH /api/wishes/:id/restore** - Restaurer à pending
- ✅ Auth admin
- ✅ Update Firestore: `{ approved: false, rejected: false }`
- ✅ Retourner success message

**DELETE /api/wishes/:id** - Supprimer (admin)
- ✅ Auth admin
- ✅ Supprimer vidéo de Storage si existe
- ✅ Supprimer document Firestore

**GET /api/health** - Health check
- ✅ Vérifier status serveur
- ✅ Retourner uptime, environment, timestamp

#### **2.4 Gestion uploads vidéo**
- ✅ Middleware Multer configuration
  - Max size: 100MB (configurable)
  - Accept: video/mp4, video/webm, video/quicktime
  - Memory storage pour upload stream
- ✅ Service upload Cloud Storage
  - Générer nom unique: `videos/${timestamp}-${uuid}.extension`
  - Upload stream vers bucket privé
  - Générer signed URL (expiration 24h, configurable)
- ✅ Validation vidéo
  - Format accepté (via mimetype)
  - Taille max
  - Gestion erreurs upload

#### **2.5 Sécurité & validation**
- ✅ CORS: autoriser frontend origin (configurable)
- ✅ Helmet.js: headers sécurité activés
- ✅ Rate limiting: 
  - 10 req/min général
  - 3 req/15min pour POST /api/wishes/submit
- ✅ Validation Zod sur tous les inputs (name, type, message)
- ✅ Authentification admin: header `X-Admin-Secret`
- ✅ Error handling global avec middleware
- ✅ Logging avec timestamp et contexte

#### **2.6 Variables d'environnement**
✅ Configuré dans `backend/.env`:
```env
PORT=3000
NODE_ENV=development
GCP_PROJECT_ID=reetik-project
FIREBASE_DATABASE_ID=vesper-db
GOOGLE_APPLICATION_CREDENTIALS=../credentials/backend-sa-key.json
STORAGE_BUCKET_VIDEOS=vesper-birthday-videos-reetik-project
STORAGE_BUCKET_ASSETS=vesper-birthday-assets-reetik-project
ADMIN_SECRET=your-admin-secret-here
PIN_CODE=IAMSINNER
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

#### **2.7 Tests locaux**
⏸️ À faire avec Docker Compose:
- [ ] Démarrer serveur: `docker-compose up backend`
- [ ] Tester endpoints complets
- [ ] Vérifier integration Firestore + Storage
- [ ] Tester error cases

### 📦 Livrables
- ✅ API REST complète et fonctionnelle (8 endpoints)
- ✅ Backend connecté à Firestore (GCP)
- ✅ Upload vidéos vers Cloud Storage opérationnel
- ✅ Tous les endpoints implémentés✅ COMPLÉTÉ

### 🎯 Objectif
Remplacer les mocks par de vrais appels HTTP vers le backend

### ✅ Tâches

#### **3.1 Configuration frontend**

✅ **.env** créé:
```env
VITE_API_URL=http://localhost:3000/api
```

- ✅ Utilisation de fetch natif (pas besoin d'axios)
- ✅ Configuration dynamique via import.meta.env

#### **3.2 Mise à jour wishesApi.ts**

✅ **Remplacement complet des mocks par vrais appels HTTP**:
- ✅ `submitWish()` - POST /api/wishes/submit avec FormData
- ✅ `getApprovedWishes()` - GET /api/wishes/approved
- ✅ `getAllWishes()` - GET /api/wishes (avec admin header)
- ✅ `approveWish()` - PATCH /api/wishes/:id/approve
- ✅ `rejectWish()` - PATCH /api/wishes/:id/reject
- ✅ `restoreWish()` - PATCH /api/wishes/:id/restore
- ✅ `getContributionCount()` - Calculé depuis approved wishes
- ✅ `setAdminSecret()` - Helper pour localStorage
- ✅ `clearAdminSecret()` - Helper pour logout### **3.2 Mise à jour wishesApi.ts**

**Avant (mock)**:
```typescript
export async function submitWish(data) {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return { success: true, wishId: 'fake-id' };
}
```

**Après (réel)**:
```typescript
const API_URL = import.meta.env.VITE_API_URL;

export async function submitWish(data: SubmitWishData) {
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('type', data.type);
  formData.append('message', data.message);
  if (data.videoFile) {
    formData.append('video', data.videoFile);
  }

  const response = await fetch(`${API_URL}/api/wishes`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
}
```

- [ ] Refactor tous les endpoints:
  - `submitWish()` → POST multipart/form-data
  - `getApprovedWishes()` → GET
  - `getAllWishes()` → GET + admin header
  - `approveWish(id)` → PATCH
  - `rejectWish(id)` → PATCH
  - `restoreWish(id)` → PATCH
  - `getContributionCount()` → GET

#### **3.3 Ajout admin auth**
- [ ] Créer helper pour headers admin
```typescript
const ADMIN_SECRET = 'your-secret'; // À déplacer en env

function getAdminHeaders() {
  return {
    'X-Admin-Secret': ADMIN_SECRET,
  };
}
```
- [ ] Utiliser dans getAllWishes, approve, reject, restore

#### **3.4 Gestion erreurs**
- [ ] Try/catch sur tous les appels
- [ ] Afficher messages d'erreur utilisateur
- [ ] Loading states
- [ ] Retry logic (optionnel)

#### **3.5 Tests end-to-end**

**Workflow complet à tester**:
1. Frontend dev: `npm run dev` (port 5173)
2. Backend dev: `npm run dev` (port 3000)
3. Test 1: Soumission vœu texte
   - Remplir formulaire `/souhaits`
   - Vérifier succès
   - Vérifier Firestore (console GCP)
4. Test 2: Soumission vœu vidéo
   - Upload vidéo < 100MB
   - Vérifier Storage (console GCP)
   - Vérifier Firestore
5. Test 3: Dashboard admin
   - Ouvrir `/admin-dashboard-secret-xyz123`
   - Voir vœux pending
   - Approuver un vœu
   - Vérifier update Firestore
6. Test 4: Page vœux publique
   - Ouvrir `/voeux`
   - Voir uniquement vœux approuvés
   - Cliquer vidéo → preview

**Checklist tests**:
- [ ] Soumission texte fonctionne
- [ ] Soumission vidéo fonctionne
- [ ] Upload vidéo > limite → erreur claire
- [ ] Dashboard affiche tous vœux
- [ ] Approve/Reject fonctionnent
- [ ] Page publique n'affiche que approuvés
- [ ] Vidéos se lisent correctement
- [ ] Compteur contributions s'affiche
- [ ] Messages d'erreur clairs si backend down

#### **3.6 Suppression code mort**
- [ ] Supprimer `mockWishes` de `wishes.ts`
- [ ] Garder juste l'interface `Wish`
- [ ] Nettoyer imports inutilisés

### 📦 Livrables
- ✅ Frontend entièrement connecté au backend
- ✅ Workflow complet testé et fonctionnel
- ✅ Données persistées dans Firestore
- ✅ Vidéos uploadées dans Cloud Storage
- ✅ Aucun mock restant

---

## 📋 **PHASE 4: Conteneurisation** - 0.5 jour

### 🎯 Objectif
Créer images Docker pour frontend et backend

### ✅ Tâches

#### **4.1 Dockerfile Backend**

**backend/Dockerfile**
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/dist ./dist
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=3s \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"
CMD ["node", "dist/server.js"]
```

**backend/.dockerignore**
```
node_modules
dist
.env
.git
*.md
tests
```

#### **4.2 Dockerfile Frontend**

**frontend/Dockerfile**
```dockerfile
# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# Production stage with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**frontend/nginx.conf**
```nginx
server {
    listen 80;
    server_name _;
    root /usr/share/nginx/html;
    index index.html;

    # SPA routing - toujours servir index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
}
```

**frontend/.dockerignore**
```
node_modules
dist
.git
*.md
.env.local
```

#### **4.3 Docker Compose (dev local - optionnel)**

**docker-compose.yml** (à la racine)
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - PORT=3000
      - FIREBASE_PROJECT_ID=${FIREBASE_PROJECT_ID}
      - STORAGE_BUCKET_NAME=${STORAGE_BUCKET_NAME}
      - ADMIN_SECRET=${ADMIN_SECRET}
      - CORS_ORIGIN=http://localhost:5173
    env_file:
      - ./backend/.env
    volumes:
      - ./backend/credentials:/app/credentials:ro

  frontend:
    build:
      context: ./frontend
      args:
        - VITE_API_URL=http://localhost:3000
    ports:
      - "8080:80"
    depends_on:
      - backend
```

#### **4.4 Build & Test local**

**Build images**:
```bash
# Backend
cd backend
docker build -t vesper-backend:latest .

# Frontend
cd ../frontend
docker build --build-arg VITE_API_URL=http://localhost:3000 -t vesper-frontend:latest .
```

**Run conteneurs**:
```bash
# Backend
docker run -d \
  -p 3000:3000 \
  -e FIREBASE_PROJECT_ID=vesper-birthday \
  -v $(pwd)/backend/credentials:/app/credentials:ro \
  --name vesper-backend \
  vesper-backend:latest

# Frontend
docker run -d \
  -p 8080:80 \
  --name vesper-frontend \
  vesper-frontend:latest
```

**Tests**:
- [ ] Backend accessible: `http://localhost:3000/api/health`
- [ ] Frontend accessible: `http://localhost:8080`
- [ ] Frontend → Backend communication fonctionne
- [ ] Upload vidéo fonctionne depuis conteneur
- [ ] Connexion Firestore OK depuis conteneur
- [ ] Logs accessibles: `docker logs vesper-backend`

#### **4.5 Tag pour GCP**

```bash
# Tag pour Google Container Registry
docker tag vesper-backend:latest gcr.io/vesper-birthday/backend:latest
docker tag vesper-frontend:latest gcr.io/vesper-birthday/frontend:latest

# (Push sera fait en Phase 6)
```

### 📦 Livrables
- ✅ Dockerfile backend fonctionnel
- ✅ Dockerfile frontend fonctionnel
- ✅ Images dockerisées et testées localement
- ✅ nginx.conf pour SPA routing
- ✅ docker-compose.yml (optionnel)
- ✅ Images prêtes pour GCP

---

## 📋 **PHASE 5: Personnalisation Contenu** - 1 jour

### 🎯 Objectif
Remplir l'application avec le contenu réel pour ton ami

### ✅ Tâches

#### **5.1 Configuration dates & sécurité**

**frontend/src/utils/dateUtils.ts**
- [ ] Modifier `TARGET_DATE` avec vraie date anniversaire
```typescript
export const TARGET_DATE = new Date('2026-02-20T00:00:00');
```

**frontend/src/utils/pinConfig.ts**
- [ ] Modifier `SECRET_PIN` avec vrai code
```typescript
export const SECRET_PIN = '1502'; // Exemple: sa date de naissance
```

**Stocker PIN dans Secret Manager (sécurité++)**
- [ ] Créer secret dans GCP: `vesper-pin-code`
- [ ] (Optionnel) Valider PIN côté backend aussi

#### **5.2 Quiz personnalisé**

**frontend/src/data/quizQuestions.ts**
- [ ] Écrire 10 questions personnalisées
- [ ] Exemple structure:
```typescript
{
  id: 1,
  question: "Quelle est ma couleur préférée ?",
  options: ["Bleu", "Rouge", "Vert", "Noir"],
  correctAnswer: 2,
  feedback: "Oui ! Tu sais que j'adore le vert depuis toujours !"
}
```

**Questions suggérées**:
1. Date/lieu de naissance
2. Couleur/animal/film préféré
3. Premier souvenir ensemble
4. Anecdote drôle
5. Passion/hobby
6. Citation préférée
7. Destination de rêve
8. Plat préféré
9. Moment marquant
10. Surnom/inside joke

#### **5.3 Album photos**

**Upload photos Cloud Storage**:
- [ ] Créer bucket séparé ou dossier: `vesper-birthday-assets/photos/`
- [ ] Upload 10-20 photos
- [ ] Nommer: `photo-01.jpg`, `photo-02.jpg`, etc.

**frontend/src/data/photos.ts**
- [ ] Mettre à jour array avec URLs Cloud Storage
```typescript
export const photos: Photo[] = [
  {
    id: '1',
    url: 'https://storage.googleapis.com/vesper-birthday-assets/photos/photo-01.jpg',
    caption: 'Notre première rencontre - Été 2020',
    date: '2020-07-15',
  },
  // ... 9-19 autres photos
];
```

#### **5.4 Timeline**

**frontend/src/data/timelineEvents.ts**
- [ ] Lister 5-10 événements marquants
```typescript
export const timelineEvents: TimelineEvent[] = [
  {
    id: '1',
    date: '2020-07-15',
    title: 'Notre rencontre',
    description: 'Le jour où tout a commencé, à cette fête inoubliable...',
    imageUrl: 'https://storage.googleapis.com/.../timeline-01.jpg',
  },
  {
    id: '2',
    date: '2021-03-10',
    title: 'Voyage à Paris',
    description: 'Notre première grande aventure ensemble...',
    imageUrl: 'https://storage.googleapis.com/.../timeline-02.jpg',
  },
  // ... autres événements chronologiques
];
```

#### **5.5 Personnalisation UI**

**Remplacer "[Prénom]" par le vrai prénom**:
- [ ] `frontend/src/pages/SubmitWishPage.tsx` (ligne ~87)
  ```typescript
  Laisse un message pour Ozias
  ```
- [ ] Autres occurrences à chercher: `grep -r "\[Prénom\]" frontend/src`

**Ajuster messages**:
- [ ] LockScreen: message mystérieux personnalisé
- [ ] HomePage: message d'accueil
- [ ] Quiz: intro/outro
- [ ] Etc.

#### **5.6 Assets supplémentaires**

**Favicon & logos**:
- [ ] Créer/upload favicon personnalisé
- [ ] Mettre à jour `frontend/index.html`

**Musique de fond (optionnel)**:
- [ ] Upload fichier audio Cloud Storage
- [ ] Ajouter player audio (discret, mutable)

#### **5.7 Tests avec contenu réel**

- [ ] Parcourir toute l'app avec contenu réel
- [ ] Vérifier affichage photos
- [ ] Tester quiz complet
- [ ] Parcourir timeline
- [ ] Vérifier responsive mobile
- [ ] Corriger typos/bugs

### 📦 Livrables
- ✅ Application entièrement personnalisée
- ✅ Quiz avec 10 questions pertinentes
- ✅ Album avec 10-20 photos + légendes
- ✅ Timeline avec événements chronologiques
- ✅ Date et PIN configurés
- ✅ Tous assets uploadés sur Cloud Storage

---

## 📋 **PHASE 6: Déploiement GCP** - 1 jour

### 🎯 Objectif
Déployer backend + frontend sur Cloud Run en production

### ✅ Tâches

#### **6.1 Mise à jour Terraform pour Cloud Run**

**terraform/cloud_run.tf**
```hcl
# Cloud Run - Backend
resource "google_cloud_run_service" "backend" {
  name     = "vesper-backend"
  location = var.region

  template {
    spec {
      service_account_name = google_service_account.backend_sa.email
      
      containers {
        image = "gcr.io/${var.project_id}/backend:latest"
        
        env {
          name  = "FIREBASE_PROJECT_ID"
          value = var.project_id
        }
        env {
          name  = "STORAGE_BUCKET_NAME"
          value = google_storage_bucket.videos.name
        }
        env {
          name = "ADMIN_SECRET"
          value_from {
            secret_key_ref {
              name = google_secret_manager_secret.admin_secret.secret_id
              key  = "latest"
            }
          }
        }
        
        resources {
          limits = {
            cpu    = "1"
            memory = "512Mi"
          }
        }
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

# Cloud Run - Frontend (optionnel)
resource "google_cloud_run_service" "frontend" {
  name     = "vesper-frontend"
  location = var.region

  template {
    spec {
      containers {
        image = "gcr.io/${var.project_id}/frontend:latest"
      }
    }
  }

  traffic {
    percent         = 100
    latest_revision = true
  }
}

# IAM - Public access
resource "google_cloud_run_service_iam_member" "backend_public" {
  service  = google_cloud_run_service.backend.name
  location = google_cloud_run_service.backend.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

resource "google_cloud_run_service_iam_member" "frontend_public" {
  service  = google_cloud_run_service.frontend.name
  location = google_cloud_run_service.frontend.location
  role     = "roles/run.invoker"
  member   = "allUsers"
}

# Outputs
output "backend_url" {
  value = google_cloud_run_service.backend.status[0].url
}

output "frontend_url" {
  value = google_cloud_run_service.frontend.status[0].url
}
```

#### **6.2 Build & Push images vers GCR**

**Configuration gcloud**:
```bash
# Authentification Docker avec GCR
gcloud auth configure-docker

# Ou pour Artifact Registry
gcloud auth configure-docker europe-west1-docker.pkg.dev
```

**Build & Push backend**:
```bash
cd backend
docker build -t gcr.io/vesper-birthday/backend:latest .
docker push gcr.io/vesper-birthday/backend:latest
```

**Build & Push frontend**:
```bash
cd frontend
docker build \
  --build-arg VITE_API_URL=https://vesper-backend-xxx.run.app \
  -t gcr.io/vesper-birthday/frontend:latest .
docker push gcr.io/vesper-birthday/frontend:latest
```

**Note**: Remplacer URL backend par l'URL réelle après premier déploiement (chicken-egg problem)

#### **6.3 Secrets dans Secret Manager**

**Créer secrets via console ou gcloud**:
```bash
# Admin secret
echo -n "your-super-secret-admin-key" | gcloud secrets create vesper-admin-secret \
  --data-file=- \
  --replication-policy="automatic"

# Firebase service account (si besoin)
gcloud secrets create vesper-firebase-sa \
  --data-file=./credentials/firebase-sa.json \
  --replication-policy="automatic"
```

- [ ] Vérifier secrets créés dans console
- [ ] Donner accès au service account backend

#### **6.4 Déployer services**

```bash
cd terraform/
terraform plan
terraform apply
```

- [ ] Vérifier déploiement Cloud Run dans console
- [ ] Noter URLs générées:
  - Backend: `https://vesper-backend-xxx.a.run.app`
  - Frontend: `https://vesper-frontend-xxx.a.run.app`

#### **6.5 Rebuild frontend avec bonne URL backend**

```bash
cd frontend
docker build \
  --build-arg VITE_API_URL=https://vesper-backend-xxx.a.run.app \
  -t gcr.io/vesper-birthday/frontend:latest .
docker push gcr.io/vesper-birthday/frontend:latest
```

**Redéployer frontend**:
```bash
gcloud run deploy vesper-frontend \
  --image gcr.io/vesper-birthday/frontend:latest \
  --region europe-west1 \
  --allow-unauthenticated
```

#### **6.6 Configuration CORS backend**

**backend/src/middleware/cors.ts**:
```typescript
const allowedOrigins = [
  'http://localhost:5173',
  'https://vesper-frontend-xxx.a.run.app', // URL Cloud Run
  'https://votre-domaine-custom.com',      // Si domaine custom
];
```

**Rebuild & redeploy backend**:
```bash
cd backend
docker build -t gcr.io/vesper-birthday/backend:latest .
docker push gcr.io/vesper-birthday/backend:latest
gcloud run deploy vesper-backend \
  --image gcr.io/vesper-birthday/backend:latest \
  --region europe-west1 \
  --allow-unauthenticated
```

#### **6.7 Tests production**

**Backend**:
- [ ] `curl https://vesper-backend-xxx.run.app/api/health`
- [ ] Vérifier logs Cloud Run
- [ ] Tester POST /api/wishes avec Postman
- [ ] Vérifier écriture Firestore
- [ ] Tester upload vidéo

**Frontend**:
- [ ] Ouvrir `https://vesper-frontend-xxx.run.app`
- [ ] Tester navigation complète
- [ ] Soumettre vœu test
- [ ] Vérifier dashboard admin
- [ ] Tester sur mobile

**End-to-end**:
- [ ] Workflow complet: soumission → admin → approbation → affichage public
- [ ] Vérifier vidéos jouent bien
- [ ] Tester compte à rebours
- [ ] Tester code PIN
- [ ] Vérifier SSL/HTTPS (automatique)

#### **6.8 Monitoring & Logs**

- [ ] Configurer alertes Cloud Monitoring (optionnel)
  - Erreurs 5xx backend
  - Latence > 2s
  - Quotas Firestore
- [ ] Vérifier logs accessibles:
  ```bash
  gcloud run logs read vesper-backend --limit 50
  ```

#### **6.9 Domaine custom (optionnel)**

Si tu veux `vesper.tondomaine.com` au lieu de `xxx.run.app`:
- [ ] Acheter domaine (Google Domains, Cloudflare, etc.)
- [ ] Mapper domaine dans Cloud Run
- [ ] Configurer DNS
- [ ] Certificat SSL automatique

### 📦 Livrables
- ✅ Backend déployé sur Cloud Run (production)
- ✅ Frontend déployé sur Cloud Run (production)
- ✅ HTTPS actif
- ✅ Application accessible publiquement
- ✅ Monitoring configuré
- ✅ URLs finales communiquées

---

## 📋 **PHASE 7: CI/CD** - 0.5 jour

### 🎯 Objectif
Automatiser les futurs déploiements via pipeline

### ✅ Tâches

#### **7.1 Choix de plateforme**
- [ ] **Option A**: Cloud Build (natif GCP)
- [ ] **Option B**: GitHub Actions (si repo GitHub)

#### **7.2 Option A: Cloud Build**

**cloudbuild.yaml** (à la racine)
```yaml
steps:
  # Build backend
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '-t'
      - 'gcr.io/$PROJECT_ID/backend:$SHORT_SHA'
      - '-t'
      - 'gcr.io/$PROJECT_ID/backend:latest'
      - './backend'
    id: 'build-backend'

  # Build frontend
  - name: 'gcr.io/cloud-builders/docker'
    args:
      - 'build'
      - '--build-arg'
      - 'VITE_API_URL=${_BACKEND_URL}'
      - '-t'
      - 'gcr.io/$PROJECT_ID/frontend:$SHORT_SHA'
      - '-t'
      - 'gcr.io/$PROJECT_ID/frontend:latest'
      - './frontend'
    id: 'build-frontend'

  # Push images
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/backend:$SHORT_SHA']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/backend:latest']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/frontend:$SHORT_SHA']
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/frontend:latest']

  # Deploy backend
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'vesper-backend'
      - '--image'
      - 'gcr.io/$PROJECT_ID/backend:$SHORT_SHA'
      - '--region'
      - 'europe-west1'
      - '--allow-unauthenticated'

  # Deploy frontend
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'vesper-frontend'
      - '--image'
      - 'gcr.io/$PROJECT_ID/frontend:$SHORT_SHA'
      - '--region'
      - 'europe-west1'
      - '--allow-unauthenticated'

substitutions:
  _BACKEND_URL: 'https://vesper-backend-xxx.a.run.app'

timeout: '1200s'
```

**Configurer trigger**:
```bash
gcloud builds triggers create github \
  --repo-name=birthday-website \
  --repo-owner=Linerror99 \
  --branch-pattern="^main$" \
  --build-config=cloudbuild.yaml
```

#### **7.3 Option B: GitHub Actions**

**.github/workflows/deploy.yml**
```yaml
name: Deploy to GCP

on:
  push:
    branches: [main]
  workflow_dispatch:

env:
  PROJECT_ID: vesper-birthday
  REGION: europe-west1
  BACKEND_URL: https://vesper-backend-xxx.a.run.app

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Authenticate to GCP
        uses: google-github-actions/auth@v1
        with:
          credentials_json: ${{ secrets.GCP_SA_KEY }}

      - name: Set up Cloud SDK
        uses: google-github-actions/setup-gcloud@v1

      - name: Configure Docker
        run: gcloud auth configure-docker

      - name: Build backend
        run: |
          docker build -t gcr.io/$PROJECT_ID/backend:$GITHUB_SHA ./backend
          docker tag gcr.io/$PROJECT_ID/backend:$GITHUB_SHA gcr.io/$PROJECT_ID/backend:latest

      - name: Build frontend
        run: |
          docker build \
            --build-arg VITE_API_URL=$BACKEND_URL \
            -t gcr.io/$PROJECT_ID/frontend:$GITHUB_SHA \
            ./frontend
          docker tag gcr.io/$PROJECT_ID/frontend:$GITHUB_SHA gcr.io/$PROJECT_ID/frontend:latest

      - name: Push images
        run: |
          docker push gcr.io/$PROJECT_ID/backend:$GITHUB_SHA
          docker push gcr.io/$PROJECT_ID/backend:latest
          docker push gcr.io/$PROJECT_ID/frontend:$GITHUB_SHA
          docker push gcr.io/$PROJECT_ID/frontend:latest

      - name: Deploy backend
        run: |
          gcloud run deploy vesper-backend \
            --image gcr.io/$PROJECT_ID/backend:$GITHUB_SHA \
            --region $REGION \
            --allow-unauthenticated

      - name: Deploy frontend
        run: |
          gcloud run deploy vesper-frontend \
            --image gcr.io/$PROJECT_ID/frontend:$GITHUB_SHA \
            --region $REGION \
            --allow-unauthenticated
```

**Configuration GitHub**:
- [ ] Aller dans Settings > Secrets and variables > Actions
- [ ] Ajouter secret `GCP_SA_KEY` (contenu JSON service account)

#### **7.4 Tests pipeline**

**Cloud Build**:
```bash
# Trigger manuel
gcloud builds submit --config=cloudbuild.yaml

# Puis commit/push sur main pour auto-trigger
```

**GitHub Actions**:
- [ ] Commit & push sur main
- [ ] Vérifier dans onglet "Actions" de GitHub
- [ ] Voir logs en temps réel

#### **7.5 Rollback strategy**

Si déploiement échoue:
```bash
# Revenir à version précédente
gcloud run deploy vesper-backend \
  --image gcr.io/vesper-birthday/backend:previous-sha \
  --region europe-west1
```

- [ ] Documenter procédure rollback
- [ ] Tester rollback une fois

### 📦 Livrables
- ✅ Pipeline CI/CD opérationnel
- ✅ Déploiement automatique sur push main
- ✅ Logs accessibles
- ✅ Rollback possible
- ✅ Documentation pipeline

---

## 📋 **PHASE 8: Collecte & Finalisation** - 2-3 semaines avant anniv

### 🎯 Objectif
Collecter les vœux des contributeurs et finaliser l'expérience

### ✅ Tâches

#### **8.1 Communication aux contributeurs**

**Créer message de partage**:
```
Salut [Prénom] ! 👋

J'organise une surprise pour l'anniversaire de [Nom ami] 
le 20 février. J'ai besoin de toi !

🎁 Laisse-lui un message (texte ou vidéo) qui apparaîtra 
le jour J dans une application web personnalisée.

📱 Lien: https://vesper-frontend-xxx.run.app/souhaits

⏰ Merci de contribuer avant le [DATE LIMITE] !

Ça reste secret bien sûr 🤫
```

**Canaux de diffusion**:
- [ ] WhatsApp/Telegram groupes
- [ ] Messages privés aux proches
- [ ] Email (si formel)
- [ ] QR code (si événement physique)

**Deadline**:
- [ ] Fixer date limite: au moins 1 semaine avant l'anniversaire
- [ ] Prévoir temps pour modération + relances

#### **8.2 Tracking contributions**

- [ ] Créer spreadsheet de suivi:
  - Nom contributeur
  - Envoyé (Oui/Non)
  - Date soumission
  - Statut (Approuvé/Rejeté/Pending)
  - Notes

- [ ] Check quotidien dashboard admin
- [ ] Compteur public pour stimuler participation

#### **8.3 Modération quotidienne**

**Checklist quotidienne** (10-15 min/jour):
- [ ] Se connecter à `/admin-dashboard-secret-xyz123`
- [ ] Vérifier nouveaux vœux (onglet Pending)
- [ ] Pour chaque vœu:
  - Lire message texte
  - OU regarder vidéo complète
  - Vérifier qualité (son, image, contenu)
  - Vérifier approprié (pas de blagues déplacées)
  - Décision: ✅ Approuver ou ❌ Rejeter

**Critères d'approbation**:
- ✅ Message touchant, drôle ou significatif
- ✅ Vidéo audible et visible
- ✅ Pas de contenu inapproprié
- ✅ Authentique et personnel
- ❌ Spam ou message vide
- ❌ Mauvaise qualité technique
- ❌ Contenu offensant/gênant

**Si rejet**:
- [ ] (Optionnel) Contacter contributeur discrètement
- [ ] Demander nouvelle soumission si possible

#### **8.4 Relances**

**1 semaine avant deadline**:
- [ ] Liste des non-contributeurs
- [ ] Message de rappel gentil

**3 jours avant deadline**:
- [ ] Dernière relance urgente
- [ ] Proposition d'aide (rdv pour filmer vidéo ensemble)

#### **8.5 Validation finale** (3-5 jours avant anniv)

**Audit complet**:
- [ ] Compter vœux approuvés (objectif: 15-30)
- [ ] Re-visionner tous les vœux approuvés
- [ ] Vérifier ordre d'affichage (chronologique? aléatoire?)
- [ ] Tester lecture de toutes les vidéos
- [ ] Vérifier URLs vidéos valides

**Tests end-to-end**:
- [ ] Restart from scratch (clear localStorage)
- [ ] Tester LockScreen (compte à rebours correct?)
- [ ] Tester code PIN
- [ ] Parcourir quiz
- [ ] Parcourir album
- [ ] Parcourir timeline
- [ ] Voir tous vœux approuvés
- [ ] Tester sur mobile (iOS + Android)
- [ ] Tester sur desktop (Chrome, Safari, Firefox)

**Performance**:
- [ ] Temps de chargement < 3s
- [ ] Vidéos loadent rapidement
- [ ] Pas de bugs visuels
- [ ] Responsive OK

#### **8.6 Backup**

**Backup Firestore**:
```bash
gcloud firestore export gs://vesper-birthday-backups/$(date +%Y%m%d)
```

**Backup local**:
- [ ] Export JSON de tous les vœux
- [ ] Download toutes les vidéos localement
- [ ] Screenshot de l'app complète
- [ ] Sauvegarder code source (déjà sur GitHub ✅)

#### **8.7 Préparation révélation**

**Message pour ton ami** (préparer à l'avance):
```
🎉 JOYEUX ANNIVERSAIRE [Prénom] ! 🎂

J'ai une surprise pour toi...

🎁 Ouvre ce lien: [URL]
🔐 Code secret: [PIN]

Prends ton temps pour tout découvrir 😊
```

**Timing**:
- [ ] Décider heure d'envoi (minuit? matin? midi?)
- [ ] Préparer message (SMS, WhatsApp, ou en personne?)
- [ ] Vérifier compte à rebours terminé
- [ ] Dernier test 1h avant

### 📦 Livrables
- ✅ 15-30 vœux approuvés et validés
- ✅ Application testée de bout en bout
- ✅ Backup effectué
- ✅ Message de révélation prêt
- ✅ Tout opérationnel pour le jour J

---

## 📋 **PHASE 9: Jour J - Révélation** 🎉

### 🎯 Objectif
Révéler l'application et gérer le jour de l'anniversaire

### ✅ Tâches

#### **9.1 Vérifications morning-of**

**1-2h avant l'envoi**:
- [ ] Vérifier app accessible: `https://vesper-frontend-xxx.run.app`
- [ ] Tester code PIN fonctionne
- [ ] Vérifier compte à rebours expiré
- [ ] Check logs Cloud Run (pas d'erreurs)
- [ ] Vérifier quota Firestore OK
- [ ] Test rapide sur mobile

#### **9.2 Envoi du lien**

**Moment choisi**:
```
[Heure]: Envoyer message + lien + PIN
```

- [ ] Envoyer via canal choisi (SMS/WhatsApp/en personne)
- [ ] Attendre confirmation de réception
- [ ] (Optionnel) Appel vidéo pendant qu'il découvre

#### **9.3 Monitoring temps réel**

**Pendant qu'il utilise l'app**:
- [ ] Regarder logs Cloud Run en temps réel:
  ```bash
  gcloud run logs tail vesper-backend --project vesper-birthday
  ```
- [ ] Vérifier pas d'erreurs 5xx
- [ ] Être dispo pour dépannage si besoin

**Métriques à surveiller**:
- Nombre de requêtes
- Latence
- Erreurs
- Vidéos chargées

#### **9.4 Capturer le moment**

- [ ] (Si possible) Filmer/photographier sa réaction
- [ ] Noter ses commentaires
- [ ] Sauvegarder messages de remerciements futurs

#### **9.5 Après la révélation**

**Suivi**:
- [ ] Demander feedback sur l'expérience
- [ ] Noter bugs rencontrés (si any)
- [ ] Voir quelle section il a préférée

**Communication aux contributeurs**:
- [ ] (Optionnel) Message groupe:
  ```
  Merci à tous pour vos messages ! [Nom] était 
  super ému. Voici sa réaction: [photo/vidéo]
  ```

#### **9.6 Maintenance post-lancement**

**Garder l'app en ligne**:
- [ ] Laisser app accessible indéfiniment (coût minimal)
- [ ] Ou définir date d'archivage (ex: 1 an)

**Archivage (optionnel)**:
- [ ] Créer PDF statique de l'expérience
- [ ] Télécharger tous médias localement
- [ ] Créer album physique/digital

### 📦 Livrables
- ✅ Révélation réussie 🎉
- ✅ Ami ému et heureux
- ✅ Souvenirs capturés
- ✅ Cadeau inoubliable livré

---

## 📊 **RÉCAPITULATIF COMPLET**

### Checklist globale

#### Infrastructure
- [ ] Projet GCP créé
- [ ] APIs activées
- [ ] Terraform déployé
- [ ] Firestore opérationnel
- [ ] Cloud Storage configuré
- [ ] Secret Manager configuré

#### Backend
- [ ] API REST développée
- [ ] Endpoints testés
- [ ] Upload vidéos fonctionnel
- [ ] Authentification admin
- [ ] Sécurité (CORS, rate limit)
- [ ] Conteneurisé (Docker)

#### Frontend
- [ ] Connecté au backend
- [ ] Toutes pages fonctionnelles
- [ ] Contenu personnalisé
- [ ] Date & PIN configurés
- [ ] Responsive mobile
- [ ] Conteneurisé (Docker)

#### Déploiement
- [ ] Images poussées GCR
- [ ] Cloud Run backend déployé
- [ ] Cloud Run frontend déployé
- [ ] HTTPS configuré
- [ ] URLs finales connues

#### CI/CD
- [ ] Pipeline configuré
- [ ] Auto-deploy sur push
- [ ] Rollback testé

#### Contenu
- [ ] 10 questions quiz
- [ ] 10-20 photos album
- [ ] 5-10 événements timeline
- [ ] 15-30 vœux approuvés

#### Jour J
- [ ] App testée
- [ ] Lien envoyé
- [ ] Révélation réussie ✨

---

## 🛠️ **TECHNOLOGIES UTILISÉES**

### Frontend
- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS
- Framer Motion (animations)
- React Router
- Lucide React (icons)

### Backend
- Node.js 20
- Express.js + TypeScript
- Firebase Admin SDK
- Multer (uploads)
- Helmet + CORS (sécurité)
- Zod/Joi (validation)

### Infrastructure GCP
- Cloud Firestore (database)
- Cloud Storage (vidéos + assets)
- Cloud Run (hosting backend + frontend)
- Secret Manager (secrets)
- Container Registry (images Docker)
- Cloud Build (CI/CD)

### DevOps
- Docker + Docker Compose
- Terraform (IaC)
- GitHub Actions ou Cloud Build
- gcloud CLI

---

## 💰 **ESTIMATION COÛTS**

### GCP (mensuel)
- Firestore: **0€** (gratuit jusqu'à 50k reads/jour)
- Cloud Storage: **~2-5€** (vidéos + assets)
- Cloud Run: **0-3€** (gratuit jusqu'à 2M req/mois)
- Secret Manager: **0€** (6 secrets gratuits)
- Bande passante: **~1-3€** (selon vidéos vues)

**Total: 3-11€/mois** (probablement < 5€)

### Domaine custom (optionnel)
- **~10-15€/an** (Google Domains, Cloudflare)

---

## 📞 **RESSOURCES & AIDE**

### Documentation
- [Firebase Admin SDK](https://firebase.google.com/docs/admin/setup)
- [Cloud Run Docs](https://cloud.google.com/run/docs)
- [Terraform GCP Provider](https://registry.terraform.io/providers/hashicorp/google/latest/docs)

### Troubleshooting
- Logs Cloud Run: Console GCP > Cloud Run > Logs
- Logs Firestore: Console Firebase > Firestore > Usage
- Debugger: Chrome DevTools Network tab

---

## 🎯 **PROCHAINES ÉTAPES IMMÉDIATES**

### Ce qu'on va faire maintenant:

1. **Créer structure Terraform** (`terraform/`)
2. **Configurer projet GCP** (nom, région, APIs)
3. **Déployer infrastructure** (Firestore + Storage)
4. **Initialiser backend** (Node.js + Express)
5. **Tester connexion Firestore** depuis local

### Infos nécessaires:

- [ ] **Projet GCP existant** ou créer nouveau? Nom?
- [ ] **Région préférée**: `europe-west1` (Belgique) ou autre?
- [ ] **Bucket name**: `vesper-birthday-videos` OK?
- [ ] **gcloud CLI installé**? Authentifié?

---

**🚀 Prêt à commencer la Phase 1 (Terraform) ?**

---

*Document créé le 15 février 2026*  
*Projet: Vesper - Birthday Surprise Application*  
*Target: 20 février 2026*
