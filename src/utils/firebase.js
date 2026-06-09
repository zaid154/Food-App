import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAcCN5aR95keJSdbzNLeG7qMsZ_Ua34PAs",
  authDomain: "yumrun-2e144.firebaseapp.com",
  projectId: "yumrun-2e144",
  storageBucket: "yumrun-2e144.firebasestorage.app",
  messagingSenderId: "1063645733088",
  appId: "1:1063645733088:web:a9e56fb9fd6dd094f03085",
  measurementId: "G-8G1LLG6QGH"
};

export const app = initializeApp(firebaseConfig);

export let analytics = null;
isSupported().then((supported) => {
  if (supported) {
    analytics = getAnalytics(app);
  }
});
