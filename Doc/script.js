document.addEventListener('DOMContentLoaded', function () {
    function filterPerfumes(filter) {
        const perfumes = document.querySelectorAll('.perfume-item');
        perfumes.forEach(perfume => {
            const genero = perfume.getAttribute('data-genero');
            const familia = perfume.getAttribute('data-familia');
            if (genero === filter || familia === filter || filter === 'todos') {
                perfume.style.display = 'block';
            } else {
                perfume.style.display = 'none';
            }
        });
    }

    function showAll() {
        const perfumes = document.querySelectorAll('.perfume-item');
        perfumes.forEach(perfume => {
            perfume.style.display = 'block';
        });
    }

    // Attach event listeners to filter buttons
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            if (filter === 'todos') {
                showAll();
            } else {
                filterPerfumes(filter);
            }
            // Close the dropdown menu after selecting a filter
            document.querySelector('.dropdown-content').style.display = 'none';
        });
    });

    // Open the dropdown menu on hover
    document.querySelector('.filter-dropdown').addEventListener('mouseover', () => {
        document.querySelector('.dropdown-content').style.display = 'block';
    });

    // Close the dropdown menu when the mouse leaves the dropdown
    document.querySelector('.filter-dropdown').addEventListener('mouseout', () => {
        document.querySelector('.dropdown-content').style.display = 'none';
    });
});



document.addEventListener('DOMContentLoaded', function() {
    const openModalButtons = document.querySelectorAll('.open-modal');
    const modalContainers = document.querySelectorAll('.modal-container');

    const openModal = (modalId) => {
        document.getElementById(modalId).style.display = 'flex';
    };

    const closeModal = () => {
        modalContainers.forEach(container => {
            container.style.display = 'none';
        });
    };

    openModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    document.querySelectorAll('.modal-close').forEach(closeButton => {
        closeButton.addEventListener('click', closeModal);
    });

    modalContainers.forEach(container => {
        container.addEventListener('click', (event) => {
            if (event.target === container) {
                closeModal();
            }
        });
    });
});

// Selecionar elementos
const loginModal = document.getElementById('loginModal');
const loginIcon = document.getElementById('login-icon');
const closeModal = document.querySelector('.modaluser .closeuser');

// Abrir modal ao clicar no ícone de login/cadastro
loginIcon.onclick = function() {
    loginModal.style.display = 'block';
}

// Fechar modal ao clicar no "X"
closeModal.onclick = function() {
    loginModal.style.display = 'none';
}

// Fechar modal se o usuário clicar fora da caixa
window.onclick = function(event) {
    if (event.target == loginModal) {
        loginModal.style.display = 'none';
    }
}

// Controlar modal de login
document.getElementById('login-icon').onclick = function() {
    document.getElementById('loginModal').style.display = 'flex';
};

document.querySelector('.closeuser').onclick = function() {
    document.getElementById('loginModal').style.display = 'none';
};

// Controlar modal do carrinho
document.getElementById('cart-icon').onclick = function() {
    document.getElementById('cartModal').style.display = 'flex';
};

document.querySelector('.cart-close').onclick = function() {
    document.getElementById('cartModal').style.display = 'none';
};

// Adicionar item ao carrinho
document.querySelectorAll('.buy-button').forEach(button => {
    button.onclick = function() {
        const perfumeName = this.closest('.modal').querySelector('img').alt;
        addToCart(perfumeName);
        document.getElementById('loginModal').style.display = 'none'; // Fechar modal de login
    };
});

function addToCart(itemName) {
    const cartItems = document.getElementById('cart-items');
    const newItem = document.createElement('p');
    newItem.textContent = itemName;
    
    if (cartItems.textContent === 'Seu carrinho está vazio.') {
        cartItems.textContent = ''; // Limpar mensagem de carrinho vazio
    }

    cartItems.appendChild(newItem);
}

