import firebaseConfig from "./firebase.config";
import { initializeApp } from "firebase/app";

const firebaseInit = () => {
    initializeApp(firebaseConfig);
}

export default firebaseInit;