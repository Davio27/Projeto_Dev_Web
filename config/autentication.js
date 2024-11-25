// Função para validar o login
export function validateLogin(email, password) {
    const correctEmail = 'daviccarvalho11@hotmail.com';
    const correctPassword = '12345abcd';

    if (email.toLowerCase() === correctEmail && password === correctPassword) {
        return true; // Login bem-sucedido
    } else {
        return false; // Credenciais incorretas
    }
}
