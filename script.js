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
          const perfumeItem = document.querySelector(`.perfume-item[data-perfume="${perfumeId}"]`);
          const perfumeImgSrc = perfumeItem.querySelector('img').getAttribute('src');
          const perfumeName = perfumeItem.querySelector('h3').innerText;
          const perfumeValue = perfumeItem.querySelector('span[id^="valorperf"]').innerText;
          const perfumeType = perfumeItem.querySelector('span[id^="tipoperf"]').innerText;
          const perfumeGenero = perfumeItem.querySelector('span[id^="generoperf"]').innerText;

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
          removeButton.style.cursor = 'pointer'; // Adiciona o cursor pointer
  
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
      document.querySelectorAll(".adicionarcarrinho").forEach(button => {
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

  document.getElementById("checkoutButton").addEventListener("click", function () {
    const cartItems = cartItemsList.querySelectorAll("li");
    let message = "Olá, gi. Eu estou vindo através do seu catálogo e gostaria de fazer um pedido de perfume:\n\n";

    cartItems.forEach(item => {
        const perfumeName = item.querySelector("strong").innerText;
        message += `${perfumeName},\n`;
    });

    const whatsappUrl = `https://wa.me/5519995874113/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
});


function logout() {
  // Limpar informações de autenticação
  // Isso pode incluir remover tokens do localStorage ou cookies, por exemplo
  localStorage.removeItem("userToken"); // Exemplo, ajuste conforme sua implementação

  // Redirecionar para a página de login ou atualizar a interface
  window.location.href = "https://pt.pornhub.com/"; // Ajuste o caminho conforme necessário
}

  
