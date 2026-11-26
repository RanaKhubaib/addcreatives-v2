"use client";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  firebaseAuth,
  firebaseDb,
  googleProvider,
  type FirebaseUser,
} from "@/lib/firebase";

interface AuthContextValue {
  user: FirebaseUser | null;
  loading: boolean;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<FirebaseUser>;
  signUpWithEmail: (name: string, email: string, password: string) => Promise<FirebaseUser>;
  signInWithEmail: (email: string, password: string) => Promise<FirebaseUser>;
  resetPassword: (email: string) => Promise<void>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

async function ensureUserDocument(user: FirebaseUser) {
  if (!firebaseDb) return;
  const userRef = doc(firebaseDb, "users", user.uid);
  const snapshot = await getDoc(userRef);
  if (!snapshot.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      name: user.displayName ?? "",
      email: user.email ?? "",
      photo: user.photoURL ?? "",
      role: "user",
      createdAt: serverTimestamp(),
    });
  } else {
    await updateDoc(userRef, {
      name: user.displayName ?? "",
      email: user.email ?? "",
      photo: user.photoURL ?? "",
    });
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(Boolean(firebaseAuth));

  useEffect(() => {
    if (!firebaseAuth) return;
    return onAuthStateChanged(firebaseAuth, (nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (!user || !firebaseDb) return;
    ensureUserDocument(user).catch((error: unknown) => {
      console.error("Could not save the signed-in user profile:", error);
    });
  }, [user]);

  const value = useMemo<AuthContextValue>(() => {
    const adminEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);

    return {
      user,
      loading,
      isAdmin: Boolean(user?.email && adminEmails.includes(user.email.toLowerCase())),
      signInWithGoogle: async () => {
        if (!firebaseAuth) throw new Error("Authentication is not configured yet.");
        const credential = await signInWithPopup(firebaseAuth, googleProvider);
        await ensureUserDocument(credential.user);
        return credential.user;
      },
      signUpWithEmail: async (name, email, password) => {
        if (!firebaseAuth) throw new Error("Authentication is not configured yet.");
        const credential = await createUserWithEmailAndPassword(
          firebaseAuth,
          email,
          password,
        );
        await updateProfile(credential.user, { displayName: name });
        await ensureUserDocument(credential.user);
        return credential.user;
      },
      signInWithEmail: async (email, password) => {
        if (!firebaseAuth) throw new Error("Authentication is not configured yet.");
        const credential = await signInWithEmailAndPassword(
          firebaseAuth,
          email,
          password,
        );
        await ensureUserDocument(credential.user);
        return credential.user;
      },
      resetPassword: async (email) => {
        if (!firebaseAuth) throw new Error("Authentication is not configured yet.");
        await sendPasswordResetEmail(firebaseAuth, email);
      },
      logOut: async () => {
        if (!firebaseAuth) throw new Error("Authentication is not configured yet.");
        await signOut(firebaseAuth);
      },
    };
  }, [loading, user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider.");
  return context;
}
