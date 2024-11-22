// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDLas1vJi4T4z8YsDt33ZUwaw1yh8hUo_4",
  authDomain: "dadosperfumes.firebaseapp.com",
  databaseURL: "https://dadosperfumes-default-rtdb.firebaseio.com",
  projectId: "dadosperfumes",
  storageBucket: "dadosperfumes.firebasestorage.app",
  messagingSenderId: "387371464319",
  appId: "1:387371464319:web:198e570bed6703b651b14a"
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Função para buscar itens do banco
export const getItensBD = async () => {
  const referencia = ref(db, "Perfumes/");
  try {
    const snapshot = await get(referencia);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return [];
    }
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    return [];
  }
};

// Função para salvar itens no banco
export const setItensBD = (itens) => {
  const referencia = ref(db, "Perfumes/");
  set(referencia, itens)
    .then(() => {
      console.log("Dados salvos com sucesso!");
    })
    .catch((error) => {
      console.error("Erro ao salvar dados:", error);
    });
};
