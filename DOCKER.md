# Vesper Birthday - Docker Guide

This guide explains how to run the Vesper Birthday application using Docker for both local development and production.

## Prerequisites

- Docker Desktop installed (https://www.docker.com/products/docker-desktop)
- Docker Compose included with Docker Desktop
- Service account key file in `credentials/backend-sa-key.json`

## Development Mode

### Start Development Environment

```bash
# Start all services with hot reload
docker-compose up

# Or run in detached mode (background)
docker-compose up -d

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Access Services

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000/api
- **Health Check**: http://localhost:3000/api/health

### Stop Development Environment

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (fresh start)
docker-compose down -v
```

### Rebuild After Code Changes

For configuration changes (package.json, Dockerfile, etc.):

```bash
# Rebuild specific service
docker-compose build backend
docker-compose build frontend

# Rebuild all services
docker-compose build

# Rebuild and restart
docker-compose up --build
```

For code changes in `src/` folders, hot reload will work automatically (no rebuild needed).

## Production Mode

### Build Production Images

```bash
# Build production images
docker-compose -f docker-compose.prod.yml build

# Build specific service
docker-compose -f docker-compose.prod.yml build backend
```

### Run Production Containers

```bash
# Set environment variables
export ADMIN_SECRET="your-admin-secret"
export PIN_CODE="IAMSINNER"
export CORS_ORIGIN="https://yourdomain.com"
export API_URL="https://api.yourdomain.com/api"

# Start production services
docker-compose -f docker-compose.prod.yml up -d

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

### Access Production Services

- **Frontend**: http://localhost
- **Backend API**: http://localhost:8080/api

### Stop Production Environment

```bash
docker-compose -f docker-compose.prod.yml down
```

## Useful Commands

### View Running Containers

```bash
docker ps
```

### Execute Commands in Containers

```bash
# Backend container
docker-compose exec backend sh
docker-compose exec backend npm run lint

# Frontend container
docker-compose exec frontend sh
docker-compose exec frontend npm run build
```

### View Container Logs

```bash
# All logs
docker-compose logs

# Follow logs
docker-compose logs -f

# Specific service
docker-compose logs backend
docker-compose logs frontend

# Last 100 lines
docker-compose logs --tail=100
```

### Clean Up

```bash
# Remove stopped containers
docker-compose down

# Remove containers and volumes
docker-compose down -v

# Remove containers, volumes, and images
docker-compose down -v --rmi all

# Remove all unused Docker data
docker system prune -a
```

## Troubleshooting

### Port Already in Use

If you get a port conflict error:

```bash
# Find process using port 3000
netstat -ano | findstr :3000  # Windows
lsof -i :3000                 # Mac/Linux

# Kill the process or change port in docker-compose.yml
```

### Container Won't Start

```bash
# Check container logs
docker-compose logs backend

# Check container status
docker ps -a

# Inspect container
docker inspect vesper-backend-dev
```

### Volume Permission Issues

```bash
# Remove volumes and recreate
docker-compose down -v
docker-compose up --build
```

### Rebuild from Scratch

```bash
# Complete cleanup and rebuild
docker-compose down -v
docker system prune -f
docker-compose build --no-cache
docker-compose up
```

## Environment Variables

### Development (.env files)

Backend environment variables are loaded from `backend/.env`.

Frontend environment variables can be set in `frontend/.env`:
```
VITE_API_URL=http://localhost:3000/api
```

### Production (Environment Variables)

Set these before running production compose:

```bash
# Required
export ADMIN_SECRET="your-secure-admin-secret"
export PIN_CODE="IAMSINNER"

# Optional
export CORS_ORIGIN="https://yourdomain.com,https://www.yourdomain.com"
export API_URL="https://api.yourdomain.com/api"
```

## Docker Images

### Tag Images for Cloud Run

```bash
# Backend
docker tag vesper-backend-prod gcr.io/reetik-project/vesper-backend:latest
docker tag vesper-backend-prod gcr.io/reetik-project/vesper-backend:v1.0.0

# Frontend
docker tag vesper-frontend-prod gcr.io/reetik-project/vesper-frontend:latest
docker tag vesper-frontend-prod gcr.io/reetik-project/vesper-frontend:v1.0.0
```

### Push to Google Container Registry

```bash
# Authenticate
gcloud auth configure-docker

# Push images
docker push gcr.io/reetik-project/vesper-backend:latest
docker push gcr.io/reetik-project/vesper-backend:v1.0.0
docker push gcr.io/reetik-project/vesper-frontend:latest
docker push gcr.io/reetik-project/vesper-frontend:v1.0.0
```

## Performance Optimization

### Multi-stage Builds

Both Dockerfiles use multi-stage builds to:
- Reduce final image size
- Separate build and runtime dependencies
- Improve security (production images don't have dev tools)

### Layer Caching

- `package.json` is copied before source code
- Dependencies are installed in a separate layer
- Source code changes don't invalidate dependency cache

### Named Volumes

- `node_modules` are stored in named volumes
- Prevents overwriting with local `node_modules`
- Faster container startup

## Next Steps

- Deploy to Google Cloud Run (see deployment documentation)
- Set up CI/CD pipeline with GitHub Actions
- Configure SSL certificates for production
- Set up monitoring and logging
