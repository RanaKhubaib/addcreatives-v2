import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore, type Firestore } from 'firebase-admin/firestore';

/** Firestore collection names used across the site. */
export const COLLECTIONS = {
  contactSubmissions: 'contact_submissions',
  newsletterSubscribers: 'newsletter_subscribers',
  auditRequests: 'audit_requests',
} as const;

/** True only when the Admin SDK service-account keys are present. Never crashes without keys. */
export const adminReady = Boolean(
  process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY,
);

let db: Firestore | null = null;

function initAdmin(): Firestore | null {
  if (db) return db;
  if (!adminReady) return null;
  try {
    if (getApps().length === 0) {
      initializeApp({
        credential: cert({
          projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
          // Private keys in env vars are usually stored with escaped newlines.
          privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        }),
      });
    }
    db = getFirestore();
    return db;
  } catch (error) {
    console.warn('[firebase-admin] Failed to initialise Firebase Admin:', error);
    return null;
  }
}

/**
 * Returns the Admin Firestore instance, or null (with a warning) when the
 * service-account keys are missing. Lazy init — safe to import anywhere.
 */
export function getAdminDb(): Firestore | null {
  const instance = initAdmin();
  if (!instance) {
    console.warn(
      '[firebase-admin] Firebase Admin is not configured — set FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY.',
    );
    return null;
  }
  return instance;
}
