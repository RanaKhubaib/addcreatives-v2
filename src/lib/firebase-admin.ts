import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const appName = "add-creatives-contact";

export function getContactDatabase() {
  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const configuredValues = [projectId, clientEmail, privateKey].filter(Boolean);

  if (configuredValues.length === 0) return null;
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error("Firebase Admin credentials are incomplete.");
  }

  const app =
    getApps().find((firebaseApp) => firebaseApp.name === appName) ??
    initializeApp(
      {
        credential: cert({ projectId, clientEmail, privateKey }),
      },
      appName,
    );

  return getFirestore(app);
}
