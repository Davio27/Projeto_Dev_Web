// config/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBKy_3sfoPtuhYWgmUgLepmdQtYNn272NY",
  authDomain: "devweb-a7e5a.firebaseapp.com",
  projectId: "devweb-a7e5a",
  storageBucket: "devweb-a7e5a.appspot.com",
  messagingSenderId: "883683114423",
  appId: "1:883683114423:web:3ed65501cdb1434cda3c32",
  measurementId: "G-QP88L0EGMW",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Função para buscar dados do banco
export const getData = async (path) => {
  try {
    const referencia = ref(db, path);
    const snapshot = await get(referencia);
    if (snapshot.exists()) {
      return snapshot.val(); // Retorna os dados encontrados
    } else {
      console.warn("Nenhum dado encontrado em:", path);
      return null;
    }
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
};

// Função para salvar ou atualizar dados no banco
export const saveData = async (path, data) => {
  try {
    const referencia = ref(db, path);
    await set(referencia, data);
    console.log("Dados salvos em:", path);
  } catch (error) {
    console.error("Erro ao salvar dados:", error);
    throw error;
  }
};

export { db };
