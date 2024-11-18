# Backend README: Catálogo de Perfumes Gio Fragrância

Este documento detalha a implementação do backend do projeto **Catálogo de Perfumes Gio Fragrância**, incluindo funcionalidades, integrações, e como o sistema interage com o Firebase Realtime Database.

## Tecnologias Utilizadas

- **JavaScript (ES6)** para lógica de aplicação.
- **Firebase Realtime Database** para armazenamento de dados.
- **Firebase Analytics** para monitoramento de eventos.
- **HTML/CSS** para a interface com o usuário.

---

## Estrutura do Backend

### 1. **Configuração do Firebase**
O projeto utiliza o Firebase para autenticação, banco de dados e analytics. A configuração básica está no arquivo principal, e inclui:

- `apiKey`
- `authDomain`
- `databaseURL`
- Outros parâmetros específicos para conexão com o projeto Firebase.

#### Exemplo de Inicialização
```javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "SUACHAVEAPI",
  authDomain: "SEU-DOMINIO.firebaseapp.com",
  projectId: "SEU-PROJETO",
  storageBucket: "SEU-BUCKET",
  messagingSenderId: "SEU-ID",
  appId: "SEU-APPID",
  measurementId: "SEU-MEASUREMENTID",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
```

---

### 2. **Funcionalidades do Backend**

#### a) **Cadastro de Usuários**
Permite que os usuários criem contas com validação de dados como:

- **E-mail:** Verifica o formato.
- **Senha:** Exige no mínimo 8 caracteres, incluindo maiúsculas, minúsculas e números.
- **Telefone:** Formatação automática no estilo brasileiro (ex.: `(11) 91234-5678`).

**Exemplo de Criação de Usuário no Firebase:**
```javascript
set(ref(db, "users/" + username), {
  username: username,
  email: email,
  password: password,
  cidade: cidade,
  telefone: telefone,
})
  .then(() => alert("Cadastro realizado com sucesso!"))
  .catch((error) => console.error("Erro ao adicionar documento: ", error));
```

---

#### b) **Login de Usuários**
Valida as credenciais dos usuários e altera a interface após o login.

**Lógica de Verificação:**
```javascript
get(ref(db, "users/"))
  .then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      if (childSnapshot.val().email === email && childSnapshot.val().password === password) {
        alert("Login realizado com sucesso!");
      }
    });
  })
  .catch((error) => console.error("Erro ao buscar dados: ", error));
```

---

#### c) **Carrinho de Compras**
- **Adicionar itens:** Permite que usuários adicionem perfumes ao carrinho.
- **Remover itens:** Inclui um botão com ícone de lixeira para exclusão.
- **Modal:** Um modal exibe os itens do carrinho.

**Exemplo de Adicionar ao Carrinho:**
```javascript
function addToCart(perfumeId) {
  const perfumeItem = document.querySelector(`.perfume-item[data-perfume="${perfumeId}"]`);
  const perfumeName = perfumeItem.querySelector("h3").innerText;
  // Lógica para exibir o item no modal
}
```

---

#### d) **Filtros de Perfumes**
Filtra perfumes por gênero, família olfativa ou exibe todos.

**Exemplo de Filtro:**
```javascript
function filterPerfumes(filter) {
  const perfumes = document.querySelectorAll(".perfume-item");
  perfumes.forEach((perfume) => {
    const genero = perfume.getAttribute("data-genero");
    if (genero === filter || filter === "todos") {
      perfume.style.display = "block";
    } else {
      perfume.style.display = "none";
    }
  });
}
```

---

### 3. **Interação com o Frontend**
O backend é integrado diretamente com o frontend por meio de eventos, como:

- **Botões de abrir/fechar modais.**
- **Submissão de formulários para cadastro e login.**
- **Ações no carrinho de compras.**

---

### 4. **Boas Práticas de Segurança**
- **Esconda as chaves do Firebase:** Nunca exponha as chaves no frontend em produção.
- **Use HTTPS:** Certifique-se de que o site é acessado via HTTPS para proteger os dados transmitidos.

---

## Como Rodar o Backend Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. Configure seu Firebase no arquivo `firebase-config.js`.

3. Hospede o projeto localmente usando uma extensão como **Live Server** no VS Code.

---

## Atualizações Futuras

- **Adicionar autenticação OAuth:** Permitir login com Google e Facebook.
- **Implementar métricas analíticas detalhadas.**
- **Persistir o carrinho de compras no Firebase.**

---

Se tiver dúvidas, sinta-se à vontade para abrir uma issue no repositório! 🎉
