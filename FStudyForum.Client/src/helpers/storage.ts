import { initializeApp } from "firebase/app";
import { deleteObject, getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyALIggC2qzMSbwc8oGeJpoFXmcJnH6Xq6c",
  authDomain: "fir-6ea1c.firebaseapp.com",
  projectId: "fir-6ea1c",
  storageBucket: "fir-6ea1c.appspot.com",
  messagingSenderId: "360451442352",
  appId: "1:360451442352:web:9a9a71e7ab4688f3ea5d75",
  measurementId: "G-GLQ59EM21R"
};
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const deleteFile = async (url: string) => {
  const storageRef = ref(storage, url);
  await deleteObject(storageRef);
};

export const deleteFiles = async (urls: string[]) => {
  const detelePromises = urls.map(url => deleteFile(url));
  await Promise.allSettled(detelePromises);
};
