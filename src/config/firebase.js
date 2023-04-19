import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBsT0S5F68CEsdS8Pllw2j4StDz-iQV56k",
  authDomain: "appregistro5f.firebaseapp.com",
  projectId: "appregistro5f",
  storageBucket: "appregistro5f.appspot.com",
  messagingSenderId: "1023499054233",
  appId: "1:1023499054233:web:81458117ba54a954bfdc08"
};

// Lembre-se de exportar as variáveis 
// para que possam ser usadas em outros arquivos
// Exemplo: import { auth } from './config/firebase';
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);


