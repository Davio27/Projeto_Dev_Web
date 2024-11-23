import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-database.js";
import { validateLogin } from "./autentication.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKy_3sfoPtuhYWgmUgLepmdQtYNn272NY",
  authDomain: "devweb-a7e5a.firebaseapp.com",
  projectId: "devweb-a7e5a",
  storageBucket: "devweb-a7e5a.appspot.com",
  messagingSenderId: "883683114423",
  appId: "1:883683114423:web:3ed65501cdb1434cda3c32",
  measurementId: "G-QP88L0EGMW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function toggleProfileMenu() {
  const profileMenu = document.getElementById("profileMenu");
  const overlay = document.getElementById("profileMenuOverlay");

  if (profileMenu.style.display === "none") {
    profileMenu.style.display = "block";
    overlay.style.display = "block";
  } else {
    profileMenu.style.display = "none";
    overlay.style.display = "none";
  }
}
window.toggleProfileMenu = toggleProfileMenu;

// Função para validar e-mail
function validarEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
window.validarEmail = validarEmail;

// Função para validar a senha (Maiúscula, Minúscula, Número e Tamanho)
function validarSenha(password) {
  const senhaRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return senhaRegex.test(password);
}
window.validarSenha = validarSenha;

// Função para validar se as senhas coincidem
function validarConfirmacaoSenha(password, confirmPassword) {
  return password === confirmPassword;
}
window.validarConfirmacaoSenha = validarConfirmacaoSenha;

// Função para formatar o número de telefone enquanto o usuário digita
function formatarTelefone(telefone) {
  telefone = telefone.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  telefone = telefone.replace(/^(\d{2})(\d)/g, "($1) $2"); // Coloca parênteses em torno dos dois primeiros dígitos
  telefone = telefone.replace(/(\d{5})(\d{4})$/, "$1-$2"); // Coloca um hífen entre o 5º e o 6º dígito
  return telefone;
}
window.formatarTelefone = formatarTelefone;

document.getElementById("telefone").addEventListener("input", function () {
  this.value = formatarTelefone(this.value);
});

document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Evita o recarregamento da página

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  // Valida as credenciais com a função importada
  if (validateLogin(email, password)) {
    window.location.href = "../Crud/crud.html";
  } else {
    // Verifica se o usuário está cadastrado
    const usersRef = ref(db, "users/");
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          let userFound = false;
          snapshot.forEach((childSnapshot) => {
            const userData = childSnapshot.val();
            if (userData.email === email && userData.password === password) {
              userFound = true;
              alert("Login realizado com sucesso!");
              document.getElementById("loginModal").style.display = "none";

              // Correção na troca de ícones
              document.getElementById("perfilnoicon").style.display = "none";
              document.getElementById("perfilicon").style.display = "flex";
              // Aqui você pode redirecionar o usuário ou salvar a sessão
            }
          });
          if (!userFound) {
            alert("Credenciais incorretas. Verifique o e-mail e a senha.");
          }
        } else {
          alert("Nenhum usuário encontrado.");
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar dados do usuário: ", error);
        alert("Erro ao realizar login. Tente novamente.");
      });
  }
});

document.getElementById("btnregister").addEventListener("click", function (e) {
  e.preventDefault(); // Evita o recarregamento da página

  // Coleta os dados do formulário
  const username = document.getElementById("name").value;
  const email = document.getElementById("useemail").value;
  const password = document.getElementById("ppassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const cidade = document.getElementById("cidade").value;
  const telefone = document.getElementById("telefone").value;

  // Verifica se o e-mail é válido
  if (!validarEmail(email)) {
    alert("Por favor, insira um e-mail válido.");
    return;
  }

  // Validação da senha
  if (!validarSenha(password)) {
    alert(
      "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um número."
    );
    return;
  }

  // Verificação se as senhas coincidem
  if (!validarConfirmacaoSenha(password, confirmPassword)) {
    alert("As senhas não coincidem.");
    return;
  }

  // Define o caminho e os dados a serem armazenados
  set(ref(db, "users/" + username), {
    username: username,
    email: email,
    password: password,
    cidade: cidade,
    telefone: telefone,
  })
    .then(() => {
      alert("Cadastro realizado com sucesso!");

      // Verifica se o elemento do formulário existe antes de redefini-lo
      const formElement = document.getElementById("registerForm");
      if (formElement) {
        formElement.reset();
      } else {
        console.error("Elemento de formulário não encontrado!");
      }

      document.getElementById("registerModal").style.display = "none";
    })
    .catch((error) => {
      console.error("Erro ao adicionar documento: ", error);
      alert("Erro ao cadastrar. Tente novamente.");
    });
});

document.addEventListener("DOMContentLoaded", function () {
  function filterPerfumes(filter) {
    const perfumes = document.querySelectorAll(".perfume-item");
    perfumes.forEach((perfume) => {
      const genero = perfume.getAttribute("data-genero");
      const familia = perfume.getAttribute("data-familia");
      if (genero === filter || familia === filter || filter === "todos") {
        perfume.style.display = "block";
      } else {
        perfume.style.display = "none";
      }
    });
  }
  window.filterPerfumes = filterPerfumes

  function showAll() {
    const perfumes = document.querySelectorAll(".perfume-item");
    perfumes.forEach((perfume) => {
      perfume.style.display = "block";
    });
  }

  // Função para mostrar/ocultar a senha da modal login
  document
    .getElementById("showPasswordCheckbox")
    .addEventListener("change", function () {
      const passwordInput = document.getElementById("loginPassword");
      if (this.checked) {
        passwordInput.type = "text"; // Mostra a senha
      } else {
        passwordInput.type = "password"; // Esconde a senha
      }
    });

  // Função para mostrar/ocultar a senha da modal registro
  document
    .getElementById("PasswordCheckbox")
    .addEventListener("change", function () {
      const ppasswordInput = document.querySelectorAll(
        "#ppassword, #confirmPassword"
      );
      ppasswordInput.forEach((input) => {
        if (this.checked) {
          input.type = "text"; // Mostra as senhas
        } else {
          input.type = "password"; // Esconde as senhas
        }
      });
    });

  // Attach event listeners to filter buttons
  document.querySelectorAll(".filter-button").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");
      if (filter === "todos") {
        showAll();
      } else {
        filterPerfumes(filter);
      }
      // Close the dropdown menu after selecting a filter
      document.querySelector(".dropdown-content").style.display = "none";
    });
  });

  // Open the dropdown menu on hover
  document
    .querySelector(".filter-dropdown")
    .addEventListener("mouseover", () => {
      document.querySelector(".dropdown-content").style.display = "block";
    });

  // Close the dropdown menu when the mouse leaves the dropdown
  document
    .querySelector(".filter-dropdown")
    .addEventListener("mouseout", () => {
      document.querySelector(".dropdown-content").style.display = "none";
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const openModalButtons = document.querySelectorAll(".open-modal");
  const modalContainers = document.querySelectorAll(".modal-container");

  const openModal = (modalId) => {
    document.getElementById(modalId).style.display = "flex";
  };

  const closeModal = () => {
    modalContainers.forEach((container) => {
      container.style.display = "none";
    });
  };

  openModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const modalId = button.getAttribute("data-modal");
      openModal(modalId);
    });
  });

  document.querySelectorAll(".modal-close").forEach((closeButton) => {
    closeButton.addEventListener("click", closeModal);
  });

  modalContainers.forEach((container) => {
    container.addEventListener("click", (event) => {
      if (event.target === container) {
        closeModal();
      }
    });
  });
});

/// Obtém elementos das modais
var loginModal = document.getElementById("loginModal");
var registerModal = document.getElementById("registerModal");
var loginCloseBtn = document.getElementsByClassName("closelogin")[0];
var registerCloseBtn = document.getElementsByClassName("closelogin")[1];
var openModalBtn = document.getElementById("openModalBtn");
var registerBtn = document.getElementsByClassName("register-btn")[0]; // Botão de cadastro da modal de login

// Abre a modal de login
openModalBtn.onclick = function () {
  loginModal.style.display = "block";
};

// Fecha a modal de login
loginCloseBtn.onclick = function () {
  loginModal.style.display = "none";
};

// Fecha a modal de cadastro
registerCloseBtn.onclick = function () {
  registerModal.style.display = "none";
};

// Troca para a modal de cadastro quando o botão de cadastro for clicado
registerBtn.onclick = function () {
  loginModal.style.display = "none"; // Fecha a modal de login
  registerModal.style.display = "block"; // Abre a modal de cadastro
};

// Fecha a modal se o usuário clicar fora dela
window.onclick = function (event) {
  if (event.target == loginModal) {
    loginModal.style.display = "none";
  } else if (event.target == registerModal) {
    registerModal.style.display = "none";
  }
};

// Função para abrir o menu de perfil
document.getElementById("btnperfil").addEventListener("click", function () {
  const overlay = document.getElementById("profileMenuOverlay");
  const profileMenu = document.getElementById("profileMenu");

  // Exibe a modal de perfil
  overlay.style.display = "block";
  profileMenu.style.display = "block";
});

// Função para fechar o menu ao clicar fora dele
document.addEventListener("click", function (event) {
  const overlay = document.getElementById("profileMenuOverlay");
  const profileMenu = document.getElementById("profileMenu");
  const btnPerfil = document.getElementById("btnperfil");

  // Verifica se o clique foi fora do menu de perfil
  if (
    !profileMenu.contains(event.target) &&
    !btnPerfil.contains(event.target)
  ) {
    overlay.style.display = "none";
    profileMenu.style.display = "none";
  }
});

// Função para abrir o modal do carrinho
document.getElementById("cart-icon").addEventListener("click", function () {
  document.getElementById("cartModal").style.display = "block";
});
document.getElementById("cart-icons").addEventListener("click", function () {
  document.getElementById("cartModal").style.display = "block";
});

// Função para fechar o modal do carrinho
document
  .getElementById("closeCartModal")
  .addEventListener("click", function () {
    document.getElementById("cartModal").style.display = "none";
  });

document.addEventListener("DOMContentLoaded", function () {
  const cartItemsList = document.getElementById("cartItemsList");
  const cartModalopen = document.getElementById("cartModal");

  // Função para abrir a modal do carrinho
  function openCartModal() {
    cartModalopen.style.display = "block";
  }

  // Função para remover o item do carrinho
  function removeFromCart(listItem) {
    cartItemsList.removeChild(listItem);
  }

  // Função para adicionar ao carrinho
  function addToCart(perfumeId) {
    const perfumeItem = document.querySelector(
      `.perfume-item[data-perfume="${perfumeId}"]`
    );
    const perfumeImgSrc = perfumeItem.querySelector("img").getAttribute("src");
    const perfumeName = perfumeItem.querySelector("h3").innerText;
    const perfumeValue = perfumeItem.querySelector(
      'span[id^="valorperf"]'
    ).innerText;
    const perfumeType = perfumeItem.querySelector(
      'span[id^="tipoperf"]'
    ).innerText;
    const perfumeGenero = perfumeItem.querySelector(
      'span[id^="generoperf"]'
    ).innerText;

    // Extrai o valor do perfume e converte para número

    // Criar um item de lista para o perfume
    const listItem = document.createElement("li");
    listItem.innerHTML = `
            <img src="${perfumeImgSrc}" alt="${perfumeName}" style="width: 50px; height: 50px;"><br>
            <strong>${perfumeName}</strong><br>
            Valor: ${perfumeValue} <br>
            Tipo: ${perfumeType} <br>
            Gênero: ${perfumeGenero}
        `;

    // Criar o botão de remover com ícone de lixeira
    const removeButton = document.createElement("button");
    removeButton.innerHTML = '<i class="fa fa-trash" style="color: red;"></i>'; // Ícone de lixeira (você pode usar FontAwesome ou outro)
    removeButton.classList.add("remove-item"); // Adiciona uma classe para estilo
    removeButton.style.cursor = "pointer"; // Adiciona o cursor pointer

    // Adiciona evento ao botão para remover o item do carrinho
    removeButton.addEventListener("click", function () {
      removeFromCart(listItem);
    });

    // Adicionar o botão ao item da lista
    listItem.appendChild(removeButton);

    // Adicionar o item ao carrinho
    cartItemsList.appendChild(listItem);

    // Abrir automaticamente a modal do carrinho
    openCartModal();
  }

  // Adiciona evento aos botões "Adicionar ao carrinho"
  document.querySelectorAll(".adicionarcarrinho").forEach((button) => {
    button.addEventListener("click", function () {
      const perfumeId = this.getAttribute("data-id");
      addToCart(perfumeId);
    });
  });

  // Código para abrir/fechar o modal do carrinho
  const cartIcon = document.getElementById("cart-icon");
  const closeCartModal = document.getElementById("closeCartModal");
  const cartModal = document.getElementById("cartModal");

  cartIcon.addEventListener("click", function () {
    cartModal.style.display = "block";
  });

  closeCartModal.addEventListener("click", function () {
    cartModal.style.display = "none";
  });
});

document
  .getElementById("checkoutButton")
  .addEventListener("click", function () {
    const cartItems = cartItemsList.querySelectorAll("li");
    let message =
      "Olá, gi. Eu estou vindo através do seu catálogo e gostaria de fazer um pedido de perfume:\n\n";

    cartItems.forEach((item) => {
      const perfumeName = item.querySelector("strong").innerText;
      message += `${perfumeName},\n`;
    });

    const whatsappUrl = `https://wa.me/5519995874113/?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  });

document.getElementById("logoutBtn").addEventListener("click", function () {
  logout();
});

function logout() {
  // Teste para ver se a função é chamada
  console.log("Logout iniciado");

  // Limpar informações de autenticação
  localStorage.removeItem("userToken");

  // Redirecionar para a página de login
  window.location.href = "https://davio27.github.io/Projeto_Dev_Web/";
}
