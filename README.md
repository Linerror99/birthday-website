# 🎂 Vesper - Birthday Surprise Application

A complete full-stack birthday surprise application with countdown, PIN lock, quiz, photo album, timeline, and wishes system.

## 🎯 Project Overview

Vesper is a birthday surprise web application deployed on Google Cloud Platform, featuring:

- 🔒 **Lock Screen** with countdown to the big day
- 🔐 **PIN Verification** to unlock access
- 📝 **Interactive Quiz** about shared memories
- 📸 **Photo Album** gallery
- ⏰ **Timeline** of important moments
- 💌 **Wishes System** where friends can submit text or video messages
- 🎨 **Admin Dashboard** to moderate wishes

## 🏗️ Architecture

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Routing**: React Router
- **Deployment**: Nginx + Cloud Run

### Backend
- **Runtime**: Node.js 20 + Express
- **Language**: TypeScript
- **Database**: Google Cloud Firestore
- **Storage**: Google Cloud Storage
- **Authentication**: Admin secret header
- **Deployment**: Cloud Run

### Infrastructure
- **Cloud Provider**: Google Cloud Platform (GCP)
- **Project ID**: reetik-project
- **Region**: europe-west1
- **IaC**: Terraform
- **Containerization**: Docker + Docker Compose
- **CI/CD**: GitHub Actions (planned)

## 📋 Prerequisites

- **Docker Desktop** - [Download here](https://www.docker.com/products/docker-desktop)
- **Google Cloud CLI** (gcloud) - For deployment only
- **GCP Service Account Key** - `credentials/backend-sa-key.json`

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd ozias-birthday
```

### 2. Add Service Account Credentials

Place your GCP service account key file here:
```
credentials/backend-sa-key.json
```

### 3. Configure Backend Environment

The backend `.env` file is already configured with default values. Update if needed:

```bash
# Edit backend/.env if needed
nano backend/.env
```

### 4. Start Development Environment

```bash
# Start all services (frontend + backend)
docker-compose up

# Or run in detached mode
docker-compose up -d

# View logs
docker-compose logs -f
```

### 5. Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/health

### 6. Stop the Environment

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (fresh start)
docker-compose down -v
```

## 📁 Project Structure

```
ozias-birthday/
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── config/            # Firebase, environment config
│   │   ├── controllers/       # Request handlers
│   │   ├── middleware/        # Auth, validation, upload
│   │   ├── routes/            # API routes
│   │   ├── services/          # Firestore, Storage services
│   │   ├── types/             # TypeScript types
│   │   ├── utils/             # Logger, helpers
│   │   ├── app.ts             # Express app
│   │   └── server.ts          # Server entry point
│   ├── Dockerfile             # Production image
│   ├── Dockerfile.dev         # Development image
│   └── package.json
├── frontend/                   # React + TypeScript SPA
│   ├── src/
│   │   ├── api/               # API client
│   │   ├── components/        # React components
│   │   ├── data/              # Static data
│   │   ├── hooks/             # Custom hooks
│   │   ├── pages/             # Page components
│   │   └── utils/             # Utilities
│   ├── Dockerfile             # Production image (Nginx)
│   ├── Dockerfile.dev         # Development image
│   └── package.json
├── terraform/                  # Infrastructure as Code
│   ├── firestore.tf           # Firestore database
│   ├── storage.tf             # Cloud Storage buckets
│   ├── secrets.tf             # Secret Manager
│   ├── iam.tf                 # Service accounts
│   └── outputs.tf
├── credentials/                # GCP service account keys
│   └── backend-sa-key.json
├── docker-compose.yml          # Development environment
├── docker-compose.prod.yml     # Production environment
├── DOCKER.md                   # Docker documentation
└── ROADMAP.md                  # Development roadmap
```

## 🔑 Environment Variables

### Backend (.env)

```env
# Server
PORT=3000
NODE_ENV=development

# GCP
GCP_PROJECT_ID=reetik-project
FIREBASE_DATABASE_ID=vesper-db
GOOGLE_APPLICATION_CREDENTIALS=../credentials/backend-sa-key.json
STORAGE_BUCKET_VIDEOS=vesper-birthday-videos-reetik-project
STORAGE_BUCKET_ASSETS=vesper-birthday-assets-reetik-project

# Security
ADMIN_SECRET=your-admin-secret-here
PIN_CODE=IAMSINNER

# CORS
CORS_ORIGIN=http://localhost:5173,http://localhost:3000
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000/api
```

## 🔒 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/wishes/submit` | Submit a new wish |
| GET | `/api/wishes/approved` | Get approved wishes |

### Admin Endpoints (require `X-Admin-Secret` header)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/wishes` | Get all wishes |
| GET | `/api/wishes/:id` | Get wish by ID |
| PATCH | `/api/wishes/:id/approve` | Approve a wish |
| PATCH | `/api/wishes/:id/reject` | Reject a wish |
| PATCH | `/api/wishes/:id/restore` | Restore to pending |
| DELETE | `/api/wishes/:id` | Delete a wish |

## 🎨 Features

### Lock Screen
- Countdown to birthday (February 20, 2026)
- Animated particle effects
- Auto-unlocks on birthday

### PIN Verification
- Secure PIN code: `IAMSINNER`
- Animated keypad
- Error handling

### Quiz
- Interactive quiz about shared memories
- Multiple choice questions
- Score tracking and results

### Photo Album
- Grid gallery view
- Lightbox modal for full-size viewing
- Swipe navigation between photos

### Timeline
- Chronological events
- Visual timeline with markers
- Detailed event descriptions

### Wishes System
- Submit text or video wishes
- Admin moderation dashboard
- Approve/Reject/Restore actions
- Video upload to Cloud Storage
- Signed URLs for secure access

## 🛠️ Development

### Hot Reload

Both frontend and backend support hot reload in development mode:

- **Frontend**: Vite dev server watches `src/` folder
- **Backend**: ts-node-dev watches `src/` folder

Changes are automatically reflected without rebuilding.

### Rebuild After Config Changes

Only rebuild if you change `package.json`, `Dockerfile`, or Docker Compose:

```bash
docker-compose up --build
```

### Run Commands Inside Containers

```bash
# Backend
docker-compose exec backend npm run lint
docker-compose exec backend sh

# Frontend
docker-compose exec frontend npm run build
docker-compose exec frontend sh
```

## 📦 Production Build

### Build Production Images

```bash
docker-compose -f docker-compose.prod.yml build
```

### Run Production Locally

```bash
# Set secrets
export ADMIN_SECRET="your-secure-secret"
export PIN_CODE="IAMSINNER"
export CORS_ORIGIN="https://yourdomain.com"

# Start production services
docker-compose -f docker-compose.prod.yml up -d
```

Access at:
- Frontend: http://localhost
- Backend: http://localhost:8080/api

## ☁️ Deployment

### Infrastructure (Terraform)

```bash
cd terraform

# Initialize
terraform init

# Plan
terraform plan

# Apply
terraform apply
```

### Container Images

```bash
# Tag for GCR
docker tag vesper-backend-prod gcr.io/reetik-project/vesper-backend:latest
docker tag vesper-frontend-prod gcr.io/reetik-project/vesper-frontend:latest

# Push to GCR
gcloud auth configure-docker
docker push gcr.io/reetik-project/vesper-backend:latest
docker push gcr.io/reetik-project/vesper-frontend:latest
```

### Cloud Run

See deployment documentation for complete Cloud Run deployment steps.

## 📝 Documentation

- [ROADMAP.md](ROADMAP.md) - Development roadmap and progress
- [DOCKER.md](DOCKER.md) - Complete Docker usage guide
- [backend/README.md](backend/README.md) - Backend API documentation
- [terraform/README.md](terraform/README.md) - Infrastructure documentation

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Windows
netstat -ano | findstr :3000
netstat -ano | findstr :5173

# Mac/Linux
lsof -i :3000
lsof -i :5173
```

Change ports in `docker-compose.yml` if needed.

### Cannot Connect to Backend

1. Check backend is running: `docker ps`
2. Check backend logs: `docker-compose logs backend`
3. Verify `.env` configuration
4. Check service account credentials exist

### Firestore Permission Denied

1. Verify service account key is valid
2. Check IAM permissions in GCP Console
3. Ensure `GOOGLE_APPLICATION_CREDENTIALS` path is correct

### Volume Issues

```bash
# Remove volumes and rebuild
docker-compose down -v
docker-compose up --build
```

## 🤝 Contributing

1. Create a feature branch from `develop`
2. Make your changes
3. Test locally with Docker
4. Submit a pull request

## 📄 License

Private project - All rights reserved

## 👨‍💻 Author

Created for Ozias's birthday surprise! 🎉

---

**Target Date**: February 20, 2026
**Status**: Development Phase
