import { initializeApp, getApps, getApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  indexedDBLocalPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  browserPopupRedirectResolver,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User as FirebaseUser,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from 'firebase/auth';
import {
  getFirestore,
  initializeFirestore,
  Firestore,
  doc,
  getDocFromServer,
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase safely (reuse existing instance if already initialized)
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const firestoreDatabaseId: string | undefined =
  (firebaseConfig as { firestoreDatabaseId?: string }).firestoreDatabaseId || undefined;

// CRITICAL: Use experimentalForceLongPolling in browser environments so proxies,
// mobile carriers, and iframe sandboxes never buffer WebChannel streams for 10s.
function createFirestoreInstance(): Firestore {
  const settings =
    typeof window !== 'undefined'
      ? {
          experimentalForceLongPolling: true,
          experimentalLongPollingOptions: { timeoutSeconds: 15 },
        }
      : {};

  try {
    return firestoreDatabaseId
      ? initializeFirestore(app, settings, firestoreDatabaseId)
      : initializeFirestore(app, settings);
  } catch {
    return firestoreDatabaseId
      ? getFirestore(app, firestoreDatabaseId)
      : getFirestore(app);
  }
}

export const db: Firestore = createFirestoreInstance();

function createAuthInstance() {
  try {
    return initializeAuth(app, {
      persistence: [
        indexedDBLocalPersistence,
        browserLocalPersistence,
        browserSessionPersistence,
      ],
    });
  } catch {
    return getAuth(app);
  }
}

export const auth = createAuthInstance();

// Clean Google Auth Provider for standard app sign-in (NO sensitive Drive scopes)
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: 'select_account',
});

// Dedicated Google Drive Auth Provider with Drive file scope used ONLY for Drive integration
export const googleDriveProvider = new GoogleAuthProvider();
googleDriveProvider.addScope('https://www.googleapis.com/auth/drive.file');
googleDriveProvider.setCustomParameters({
  prompt: 'select_account',
});

// Cache OAuth access token in memory (never localStorage)
let cachedDriveAccessToken: string | null = null;

export const setCachedDriveAccessToken = (token: string | null) => {
  cachedDriveAccessToken = token;
};

export const getCachedDriveAccessToken = (): string | null => {
  return cachedDriveAccessToken;
};

// Startup Firestore connection check
export async function testConnection() {
  if (typeof navigator !== 'undefined' && navigator.onLine === false) {
    return;
  }

  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      // Retry once after a brief delay in case browser network stack was still warming up
      await new Promise((resolve) => setTimeout(resolve, 1500));
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (retryError) {
        if (
          retryError instanceof Error &&
          retryError.message.includes('the client is offline')
        ) {
          console.error('Please check your Firebase configuration.');
        }
      }
    }
  }
}

if (typeof window !== 'undefined') {
  void testConnection();
}

// Structured Firestore error handling conforming to FirestoreErrorInfo
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(
  error: unknown,
  operationType: OperationType,
  path: string | null
): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo:
        auth.currentUser?.providerData?.map((provider) => ({
          providerId: provider.providerId,
          email: provider.email,
        })) || [],
    },
    operationType,
    path,
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Sign-In with Google Popup (Clean standard sign-in for users)
export async function signInWithGoogle(): Promise<{
  user: FirebaseUser;
  accessToken: string | null;
} | null> {
  try {
    const result = await signInWithPopup(auth, googleProvider, browserPopupRedirectResolver);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken || null;
    return { user: result.user, accessToken };
  } catch (error: any) {
    const errorCode = error?.code || '';
    // Gracefully handle user closing popup, request cancellation, or iframe blocker
    if (
      errorCode === 'auth/popup-closed-by-user' ||
      errorCode === 'auth/cancelled-popup-request' ||
      errorCode === 'auth/popup-blocked' ||
      (typeof error?.message === 'string' && error.message.includes('popup-closed-by-user'))
    ) {
      return null;
    }
    console.warn('Google sign-in notice:', error?.message || error);
    throw error;
  }
}

// Sign-In with Google for Drive (Specifically requests drive.file scope when syncing to Google Drive)
export async function signInWithGoogleForDrive(): Promise<{
  user: FirebaseUser;
  accessToken: string | null;
} | null> {
  try {
    const result = await signInWithPopup(auth, googleDriveProvider, browserPopupRedirectResolver);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const accessToken = credential?.accessToken || null;
    if (accessToken) {
      setCachedDriveAccessToken(accessToken);
    }
    return { user: result.user, accessToken };
  } catch (error: any) {
    const errorCode = error?.code || '';
    if (
      errorCode === 'auth/popup-closed-by-user' ||
      errorCode === 'auth/cancelled-popup-request' ||
      errorCode === 'auth/popup-blocked' ||
      (typeof error?.message === 'string' && error.message.includes('popup-closed-by-user'))
    ) {
      return null;
    }
    console.warn('Google Drive sign-in notice:', error?.message || error);
    throw error;
  }
}

// Sign-Out
export async function logOut(): Promise<void> {
  setCachedDriveAccessToken(null);
  await signOut(auth);
}
