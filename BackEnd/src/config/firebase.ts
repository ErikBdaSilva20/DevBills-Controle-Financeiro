import admin from 'firebase-admin';
import { env } from './env.js';
import fs from 'node:fs';
import path from 'node:path';

const initializeFirebaseAdmin = (): void => {
  if (admin.apps.length > 0) return;

  const serviceAccountPath = path.resolve(process.cwd(), 'fireBaseServiceAccount.json');

  try {
    if (fs.existsSync(serviceAccountPath)) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath),
      });
    } else {
      const { FIREBASE_CLIENT_EMAIL, FIREBASE_PROJECT_ID, FIREBASE_PRIVATE_KEY } = env;

      if (!FIREBASE_PROJECT_ID || !FIREBASE_PRIVATE_KEY || !FIREBASE_CLIENT_EMAIL) {
        throw new Error('Firebase Service Account file or environment variables (FIREBASE_PROJECT_ID, etc.) are required');
      }

      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: FIREBASE_PROJECT_ID,
          clientEmail: FIREBASE_CLIENT_EMAIL,
          privateKey: FIREBASE_PRIVATE_KEY,
        }),
      });
    }
  } catch (error) {
    console.error('❌ Failed to initialize Firebase:', error);
    process.exit(1);
  }
};

export default initializeFirebaseAdmin;
