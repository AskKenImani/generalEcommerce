
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyBmhbjDMscKzKfslmlu6zV3gF4mUPn3w3I",
  authDomain: "kess-e-comm.firebaseapp.com",
  projectId: "kess-e-comm",
  storageBucket: "kess-e-comm.firebasestorage.app",
  messagingSenderId: "697945394069",
  appId: "1:697945394069:web:99ecec05f0d3b8adff449c",
  measurementId: "G-HCHYWJWYXK"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const functions = getFunctions(app);

export default app;
