Aqui está o README para o **backend** do seu projeto, agora com emojis para torná-lo mais atraente e organizado:  

---

# 🚀 Backend - Catálogo de Perfumes Gio Fragrância  

Este é o backend do projeto **Catálogo de Perfumes Gio Fragrância**, implementado com Firebase Realtime Database e JavaScript. Ele fornece funcionalidades essenciais como login, cadastro de usuários, validação de dados e operações no carrinho de compras.  

---

## 📋 Funcionalidades Principais  

1. 🔒 **Autenticação de Usuários**  
   - Login e cadastro com validação de e-mail e senha.  
   - Senhas devem conter pelo menos 8 caracteres, incluindo letra maiúscula, minúscula e número.  
   - Exibição de ícone para usuário autenticado.  

2. 🛍️ **Gerenciamento do Carrinho de Compras**  
   - Adicionar itens ao carrinho.  
   - Remover itens com um clique.  
   - Exibição detalhada de informações do perfume no carrinho.  

3. 🛠️ **Validações e Utilitários**  
   - Validação de e-mails e senhas.  
   - Formatação automática de números de telefone.  
   - Função para mostrar ou ocultar senhas.  

4. 🎨 **Exibição Dinâmica**  
   - Filtros por gênero e família olfativa de perfumes.  
   - Modal para carrinho, login e cadastro com estilos responsivos.  

---

## 🛠️ Tecnologias Utilizadas  

- **Firebase**  
  - 🔥 Realtime Database  
  - 📊 Analytics  
- **JavaScript ES6+**  
- **HTML5 & CSS3**  

---

## 📂 Estrutura de Código  

```javascript  
import { initializeApp } from "firebase-app"; // 🔧 Inicialização do Firebase  
import { getDatabase, ref, set, get, child } from "firebase-database"; // 📂 Operações no banco de dados  
import { getAnalytics } from "firebase-analytics"; // 📊 Monitoramento de uso  
```  

### ⚙️ Configuração do Firebase  

```javascript  
const firebaseConfig = {  
  apiKey: "SEU_API_KEY",  
  authDomain: "SEU_AUTH_DOMAIN",  
  projectId: "SEU_PROJECT_ID",  
  storageBucket: "SEU_STORAGE_BUCKET",  
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",  
  appId: "SEU_APP_ID",  
  measurementId: "SEU_MEASUREMENT_ID",  
};  

const app = initializeApp(firebaseConfig);  
const db = getDatabase(app);  
```  

---

## 🚦 Fluxo de Funcionalidades  

1. **Login e Registro:**  
   - O usuário insere suas credenciais.  
   - Validação de dados.  
   - Se aprovado, os dados são armazenados no Firebase.  

2. **Gerenciamento do Carrinho:**  
   - Os usuários podem adicionar itens com informações detalhadas como nome, tipo, valor e gênero.  
   - Itens podem ser removidos individualmente.  

3. **Filtros:**  
   - O usuário pode filtrar perfumes por gênero ou família olfativa para facilitar a navegação.  

4. **Feedback Visual:**  
   - Modais exibem mensagens de sucesso ou erro.  
   - O carrinho mostra itens adicionados dinamicamente.  

---

## 🚀 Como Usar  

1. **Clone o repositório:**  
   ```bash  
   git clone https://github.com/davio27/Projeto_Dev_Web.git  
   ```  

2. **Configuração do Firebase:**  
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/).  
   - Configure o Firebase Realtime Database e substitua as chaves em `firebaseConfig`.  

3. **Abra o projeto no navegador:**  
   - Certifique-se de que o backend está configurado.  
   - Teste as funcionalidades acessando [Catálogo de Perfumes Gio Fragrância](https://davio27.github.io/Projeto_Dev_Web/).  

---

## 🔧 Recursos Futuramente Adicionados  

- 📬 Integração com envio de e-mails para recuperação de senha.  
- 📊 Relatórios sobre os itens mais populares no carrinho.  
- 🌐 Suporte para múltiplos idiomas.
- 🪪 Adicionar autenticação OAuth: Permitir login com Google e Facebook.

---

