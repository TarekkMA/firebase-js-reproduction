import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";

import {
  getFirestore,
  collection,
  getDoc,
  doc,
  onSnapshot,
  setDoc,
  persistentLocalCache,
} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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


const app = initializeApp(firebaseConfig, {localCache: persistentLocalCache(/*settings*/{})});
const db = getFirestore(app);

console.log(db);


document.getElementById("value").innerText = "Loading...";

getDoc(doc(db, "test_10153", "counter")).then((docSnap) => {
    document.getElementById("value").innerText = docSnap.exists()
        ? docSnap.data().value
        : "No such document!";
});

onSnapshot(doc(db, "test_10153", "counter"), (doc) => {
  document.getElementById("value").innerText = doc.exists()
    ? doc.data()["value"]
    : "No such document!";
});

document.getElementById("increment").addEventListener("click", async () => {
  const docSnap = await getDoc(doc(db, "test_10153", "counter"));
  let value = (docSnap.exists() ? docSnap.data().value : 0) + 1;
  console.log(value);
  await setDoc(doc(db, "test_10153", "counter"), {
    value: value,
  });
});

document.getElementById("decrement").addEventListener("click", async () => {
  const docSnap = await getDoc(doc(db, "test_10153", "counter"));
  let value = (docSnap.exists() ? docSnap.data().value : 0) - 1;
  console.log(value);
  await setDoc(doc(db, "test_10153", "counter"), {
    value: value,
  });
});
