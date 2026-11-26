import { initializeApp, type FirebaseApp } from 'firebase/app';
import { getFirestore, type Firestore } from 'firebase/firestore';

/** Firestore collection names used across the site. */
export const COLLECTIONS = {
  contactSubmissions: 'contact_submissions',
  newsletterSubscribers: 'newsletter_subscribers',
  auditRequests: 'audit_requests',
} as const;

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

/** True only when every client Firebase key is present. Never crashes without keys. */
export const firebaseReady = Object.values(firebaseConfig).every(Boolean);

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

if (firebaseReady) {
  try {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  } catch (error) {
    console.warn('[firebase] Failed to initialise Firebase:', error);
    app = null;
    db = null;
  }
}

/** Returns the Firestore instance, or null (with a warning) when Firebase is not configured. */
export function getDb(): Firestore | null {
  if (!firebaseReady || !db) {
    console.warn(
      '[firebase] Firebase is not configured — set the NEXT_PUBLIC_FIREBASE_* env vars.',
    );
    return null;
  }
  return db;
}

export { app };
