import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

import {
  getAuth,
  linkWithPopup,
  signInWithPopup,
  OAuthProvider,
  signInAnonymously,
  signInWithCredential,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyB7wZb2tO1-Fs6GbDADUSTs2Qs3w08Hovw",
  authDomain: "flutterfire-e2e-tests.firebaseapp.com",
  databaseURL:
    "https://flutterfire-e2e-tests-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "flutterfire-e2e-tests",
  storageBucket: "flutterfire-e2e-tests.appspot.com",
  messagingSenderId: "406099696497",
  appId: "1:406099696497:web:87e25e51afe982cd3574d0",
  measurementId: "G-JN95N1JV2E",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth();


await signInAnonymously(auth);
console.log("Signed in anonymously");


const provider = new OAuthProvider('apple.com');
provider.addScope('email');
provider.addScope('name');

// get button with id link, and sign in with apple when clicked
document.getElementById("link").addEventListener("click", async () => {
  try {
    await linkWithPopup(auth.currentUser, provider);
    console.log("Linked with Apple successfully");
  } catch (error) {
    console.error(error);
    //  check if the credential-already-in-use sign in with creds in error
    if (error.code === "auth/credential-already-in-use") {
      const credential = OAuthProvider.credentialFromError(error);
      await signInWithCredential(auth, credential);
      console.log("Signed in with Apple successfully");
    }
  }
});