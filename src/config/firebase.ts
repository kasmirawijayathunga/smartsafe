import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCxavivUao6vNxNBhyrLOVMpfN61-8fO48",
    authDomain: "smartsafe-sltc.firebaseapp.com",
    projectId: "smartsafe-sltc",
    storageBucket: "smartsafe-sltc.appspot.com",
    messagingSenderId: "169903258210",
    appId: "1:169903258210:web:5e6de95d7f5cdb53d2af3b"
  };

// Initialize Firebase
const App = initializeApp(firebaseConfig);
const db = getFirestore(App);

export default App;
export { db };