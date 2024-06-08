import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const fireBaseConfig = {
  apiKey: "AIzaSyALIggC2qzMSbwc8oGeJpoFXmcJnH6Xq6c",
  authDomain: "fir-6ea1c.firebaseapp.com",
  projectId: "fir-6ea1c",
  storageBucket: "fir-6ea1c.appspot.com",
  messagingSenderId: "360451442352",
  appId: "1:360451442352:web:9a9a71e7ab4688f3ea5d75",
  measurementId: "G-GLQ59EM21R",
};
const app = initializeApp(fireBaseConfig);
export const store = getStorage(app);
