
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

  function showAll() {
    const perfumes = document.querySelectorAll(".perfume-item");
    perfumes.forEach((perfume) => {
      perfume.style.display = "block";
    });
  }

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
document.getElementById('btnperfil').addEventListener('click', function() {
  const overlay = document.getElementById('profileMenuOverlay');
  const profileMenu = document.getElementById('profileMenu');

  // Exibe a modal de perfil
  overlay.style.display = 'block';
  profileMenu.style.display = 'block';
});

// Função para fechar o menu ao clicar fora dele
document.addEventListener('click', function(event) {
  const overlay = document.getElementById('profileMenuOverlay');
  const profileMenu = document.getElementById('profileMenu');
  const btnPerfil = document.getElementById('btnperfil');

  // Verifica se o clique foi fora do menu de perfil
  if (!profileMenu.contains(event.target) && !btnPerfil.contains(event.target)) {
      overlay.style.display = 'none';
      profileMenu.style.display = 'none';
  }
});

