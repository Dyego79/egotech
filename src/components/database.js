// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7EMaKOIt4zQvx-ypBzwoLYekC02TMQA4",
  authDomain: "e-gotech.firebaseapp.com",
  projectId: "e-gotech",
  storageBucket: "e-gotech.appspot.com",
  messagingSenderId: "485367291422",
  appId: "1:485367291422:web:ed65ca2e9cb88ffdfb180f",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
