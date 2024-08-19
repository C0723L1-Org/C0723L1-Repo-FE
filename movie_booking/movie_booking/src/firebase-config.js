import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA8CKFfVxJyto2PDzibbSnXgDCCxRMXVeA",
  authDomain: "cenima-2300.firebaseapp.com",
  projectId: "cenima-2300",
  storageBucket: "cenima-2300.appspot.com",
  messagingSenderId: "804992089940",
  appId: "1:804992089940:web:bf76dcc2bf5b72831c92c1",
  measurementId: "G-G9QXD9H6ZF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage, app, analytics, ref, uploadBytes, getDownloadURL };
