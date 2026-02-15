import admin from 'firebase-admin';
import { env } from './environment';
import { logger } from '../utils/logger';

// Initialize Firebase Admin SDK
let firebaseApp: admin.app.App;

export function initializeFirebase(): admin.app.App {
  if (firebaseApp) {
    return firebaseApp;
  }

  try {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: env.gcpProjectId,
      storageBucket: env.storageBucketVideos,
    });

    logger.info('Firebase Admin SDK initialized successfully');
    return firebaseApp;
  } catch (error) {
    logger.error('Failed to initialize Firebase Admin SDK:', error);
    throw error;
  }
}

// Get Firestore instance
export function getFirestore(): admin.firestore.Firestore {
  const app = firebaseApp || initializeFirebase();
  const db = admin.firestore(app);
  db.settings({ databaseId: env.firebaseDatabaseId });
  return db;
}

// Get Storage instance
export function getStorage(): admin.storage.Storage {
  const app = firebaseApp || initializeFirebase();
  return admin.storage(app);
}

export { admin };
