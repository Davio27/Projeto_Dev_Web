// Função para validar o login
export function validateLogin(email, password) {
    const correctEmail = 'daviccarvalho11@hotmail.com';
    const correctPassword = '12345abcd';

    if (email === correctEmail && password === correctPassword) {
        return true; // Login bem-sucedido
    } else {
        return false; // Credenciais incorretas
    }
}

// // Função para configurar o comportamento da modal
// export function setupModal() {
//     const loginModal = document.getElementById('loginModal');
//     const closeLogin = document.querySelector('.closelogin');

//     closeLogin.addEventListener('click', () => {
//         loginModal.style.display = 'none'; // Fecha a modal
//     });

//     const showPasswordCheckbox = document.getElementById('showPasswordCheckbox');
//     const passwordInput = document.getElementById('loginPassword');
    
//     showPasswordCheckbox.addEventListener('change', function () {
//         if (this.checked) {
//             passwordInput.type = 'text';
//         } else {
//             passwordInput.type = 'password';
//         }
//     });
// }