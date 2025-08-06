import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig={
    apiKey: "AIzaSyABI5cbhjXd6TU0sMBNvXmlEPrS0FluIOw",
    authDomain: "expense-tracker-178f5.firebaseapp.com",
    projectId: "expense-tracker-178f5",
    storageBucket: "expense-tracker-178f5.firebasestorage.app",
    messagingSenderId: "700621768371",
    appId: "1:700621768371:web:951542866b85574d0012c6",
    measurementId: "G-5JVFSRMLPS"
}

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);