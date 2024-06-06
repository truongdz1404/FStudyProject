import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyALIggC2qzMSbwc8oGeJpoFXmcJnH6Xq6c",
  authDomain: "fir-6ea1c.firebaseapp.com",
  projectId: "fir-6ea1c",
  storageBucket: "fir-6ea1c.appspot.com",
  messagingSenderId: "360451442352",
  appId: "1:360451442352:web:9a9a71e7ab4688f3ea5d75",
  measurementId: "G-GLQ59EM21R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const store = getStorage(app);