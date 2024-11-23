---

# 🧴 Catálogo de Perfumes - Painel Administrativo 🛠️

Este é um sistema CRUD (Create, Read, Update, Delete) desenvolvido para gerenciar o **Catálogo de Perfumes Gio Fragrâncias**. A aplicação permite adicionar, editar, excluir e pesquisar perfumes, além de salvar todos os dados no **Firebase Realtime Database**.

---

## 🚀 **Funcionalidades**
- **Adição de perfumes** 🆕  
  Cadastre novos perfumes com informações detalhadas, como nome, gênero, tipo, ocasião, descrição e valor.
- **Edição de perfumes** ✏️  
  Atualize os dados de perfumes existentes diretamente na interface.
- **Exclusão de perfumes** 🗑️  
  Remova perfumes do catálogo com facilidade (com uma confirmação).
- **Filtro de pesquisa** 🔍  
  Pesquise perfumes por nome, gênero ou tipo em tempo real.
- **Integração com Firebase** 🔗  
  Todos os dados são armazenados de forma segura no **Firebase Realtime Database**.
- **Feedback visual ao usuário** 🎨  
  Modais informam o status das ações, como sucesso ou erro.

---

## 🛠️ **Tecnologias Utilizadas**
- **HTML5**  
- **CSS3**  
- **JavaScript (ES6)**  
- **Firebase (Realtime Database)**  
- **Biblioteca de Ícones**: Boxicons  

---

## 🖥️ **Pré-requisitos**
Antes de começar, você precisará ter instalado em sua máquina:
- **Navegador Web** (Google Chrome, Firefox, Edge, etc.)
- **Editor de Código** (VSCode, Sublime, etc.)
- **Conta no Firebase** (para configurar o banco de dados)

---

## 📂 **Estrutura do Projeto**
```bash
📁 projeto-catalogo
├── 📁 docs
│   ├── 📁 imgs      # Imagens utilizadas no projeto
│   ├── 📁 styles    # Arquivos CSS
│   ├── 📁 scripts   # Scripts JavaScript
├── 📁 config
│   ├── autentication.js  # Script de autenticação
├── index.html       # Página inicial do catálogo
├── admin.html       # Painel administrativo
├── README.md        # Documentação do projeto
```

---

## ⚙️ **Configuração Inicial**

1. **Clone este repositório** 🖥️  
   ```bash
   git clone https://github.com/Davio27/Projeto_Dev_Web.git
   cd projeto-catalogo
   ```

2. **Configure o Firebase** 🔧  
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com/).  
   - Habilite o **Realtime Database**.  
   - Substitua as credenciais no arquivo `scriptcrud.js` com as informações do seu projeto Firebase.

3. **Abra o projeto** 🖥️  
   Utilize um servidor local ou abra o arquivo `crud.html` diretamente no navegador.

---

## 🖱️ **Como Usar**
1. **Tela Inicial:**  
   Acesse a página do painel administrativo (ex: `crud.html`).
2. **Adicionar Perfume:**  
   - Clique no botão `+` para abrir o modal de cadastro.  
   - Preencha os campos e clique em **Salvar**.  
3. **Editar Perfume:**  
   - Clique no ícone ✏️ para editar um perfume existente.  
   - Atualize as informações no modal e clique em **Salvar**.  
4. **Excluir Perfume:**  
   - Clique no ícone 🗑️ para excluir um perfume.  
   - Confirme a exclusão na janela de diálogo.  
5. **Pesquisar Perfume:**  
   - Use o campo de busca 🔍 para filtrar perfumes por nome, gênero ou tipo.

---

## 🎨 **Capturas de Tela**
### Tela Principal  
![Tela Principal]()  

### Modal de Cadastro  
![Modal de Cadastro]()

---

## 🛡️ **Segurança**
- **Autenticação:**  
  O acesso ao painel administrativo é protegido por autenticação básica.  
- **Validação de Dados:**  
  Todos os campos do formulário são validados antes do envio.

---

## 🚧 **Melhorias Futuras**
- 📸 **Upload de Imagens Personalizadas:** Integração com o Firebase Storage para armazenar fotos dos perfumes.  
- 📄 **Paginação:** Adicionar suporte a tabelas paginadas para facilitar a navegação em grandes catálogos.  
- 📱 **Responsividade:** Ajustes no design para melhor usabilidade em dispositivos móveis.

---

## 🤝 **Contribuição**
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar PRs.  

---

## 📝 **Licença**
Este projeto é licenciado sob a **MIT License**.  

---

💡 *Desenvolvido com dedicação e atenção aos detalhes. Aproveite!* 😊
