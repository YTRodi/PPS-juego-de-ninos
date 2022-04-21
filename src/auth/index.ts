import { initializeApp } from 'firebase/app';
import {
  AuthError,
  AuthErrorCodes,
  User as firebaseUser,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

interface User extends firebaseUser {}
interface AuthProps {
  email: string;
  password: string;
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDx308CoHAHelF5J6hL3nf0jEmwj7CWCEc',
  authDomain: 'pps-app-2.firebaseapp.com',
  projectId: 'pps-app-2',
  storageBucket: 'pps-app-2.appspot.com',
  messagingSenderId: '301523712337',
  appId: '1:301523712337:web:a9ec266b165d7d0968bb70',
  measurementId: 'G-KBWRWW3Y7E',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function getCurrentUser() {
  return new Promise<User | null>((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      user => {
        unsubscribe();
        resolve(user);
      },
      reject
    );
  });
}

function login({ email, password }: AuthProps) {
  return signInWithEmailAndPassword(auth, email, password);
}

function register({ email, password }: AuthProps) {
  return createUserWithEmailAndPassword(auth, email, password);
}

function logout() {
  return signOut(auth);
}

export {
  AuthError,
  AuthErrorCodes,
  User,
  AuthProps,
  getCurrentUser,
  login,
  register,
  logout,
};
