# Vesper Birthday Backend API

Backend API for the Vesper birthday surprise application.

## Tech Stack

- Node.js + Express
- TypeScript
- Firebase Admin SDK (Firestore + Cloud Storage)
- Google Cloud Platform
- Zod (validation)
- Multer (file uploads)

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

Required environment variables:
- `GCP_PROJECT_ID`: Your GCP project ID
- `FIREBASE_DATABASE_ID`: Firestore database ID
- `GOOGLE_APPLICATION_CREDENTIALS`: Path to service account key JSON file
- `STORAGE_BUCKET_VIDEOS`: Private bucket for video uploads
- `STORAGE_BUCKET_ASSETS`: Public bucket for assets
- `ADMIN_SECRET`: Secret key for admin authentication
- `PIN_CODE`: PIN code for app access

### 3. Service Account Credentials

Place your service account key file (e.g., `backend-sa-key.json`) in the `credentials/` directory and reference it in your `.env` file:

```
GOOGLE_APPLICATION_CREDENTIALS=../credentials/backend-sa-key.json
```

### 4. Run Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3000` by default.

## API Endpoints

### Public Endpoints

- `GET /api/health` - Health check
- `POST /api/wishes/submit` - Submit a new wish (text or video)
- `GET /api/wishes/approved` - Get all approved wishes

### Admin Endpoints

Require `X-Admin-Secret` header with the admin secret.

- `GET /api/wishes` - Get all wishes (with optional filters)
- `GET /api/wishes/:id` - Get wish by ID
- `PATCH /api/wishes/:id/approve` - Approve a wish
- `PATCH /api/wishes/:id/reject` - Reject a wish
- `PATCH /api/wishes/:id/restore` - Restore a wish to pending
- `DELETE /api/wishes/:id` - Delete a wish

## Project Structure

```
backend/
├── src/
│   ├── config/           # Configuration (Firebase, environment)
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Express middleware
│   ├── routes/           # API routes
│   ├── services/         # Business logic (Firestore, Storage)
│   ├── types/            # TypeScript types
│   ├── utils/            # Utilities (logger)
│   ├── app.ts            # Express app setup
│   └── server.ts         # Server entry point
├── .env.example
├── .gitignore
├── package.json
└── tsconfig.json
```

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Run production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## Video Upload

Video uploads are handled via multipart form data:

```bash
curl -X POST http://localhost:3000/api/wishes/submit \
  -F "name=John Doe" \
  -F "type=video" \
  -F "message=Happy Birthday!" \
  -F "video=@path/to/video.mp4"
```

Supported formats: MP4, WebM, QuickTime/MOV
Max size: 100MB (configurable)

## Rate Limiting

- General API: 10 requests per minute
- Wish submission: 3 submissions per 15 minutes per IP

## Security

- Helmet.js for security headers
- CORS configuration
- Admin authentication via secret header
- File type and size validation
- Rate limiting
- Input validation with Zod

## Deployment

See main project documentation for deployment to Google Cloud Run.
