const axios = require('axios');

// Objeto para armazenar sessões em memória
const sessions = {};

// Função para gerar um ID de sessão
function generateSessionId(user_id) {
    return (user_id + '' + Math.floor(Date.now() / 1000)).toString(16).toUpperCase().slice(2);
}

// Função para enviar uma solicitação HTTP POST
async function httpPost(url, data) {
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Erro na solicitação HTTP:', error.message);
        throw error;
    }
}

// Função para criar uma nova sessão em memória
async function newSession(username, userId, mobile, clientType, locale, proxied) {
    const sessionId = generateSessionId(userId);
    const sessionData = {
        session_id: sessionId,
        username,
        user_id: userId,
        mobile,
        client_type: clientType,
        locale,
        proxied,
    };

    // Adicione a nova sessão ao objeto de sessões
    sessions[sessionId] = sessionData;

    return sessionData;
}

// Função para obter uma sessão por ID
async function getSessionById(sessionId) {
    return sessions[sessionId] || null;
}

// Função para excluir uma sessão por ID
async function dropSessionById(sessionId) {
    if (sessions[sessionId]) {
        delete sessions[sessionId];
        return true;
    } else {
        return false;
    }
}

// Função para autenticar um usuário
async function authenticateUser(username, password) {
    // Adapte esta função para autenticar usuários no seu sistema
    if (username === 'cw' && password === '12345') {
        return 1; // ID do usuário
    } else {
        return null;
    }
}

// Exemplo de uso
const userUss = 'cw'; // Usuário
const userPps = '12345'; // Senha

(async () => {
    try {
        // Link da API
        const apiUrl = 'http://172.191.238.240/on'; 

        // Verifique se o usuário e senha correspondem
        const userId = await authenticateUser(userUss, userPps);

        if (userId) {
            // Se a autenticação for bem-sucedida, crie uma nova sessão no Node.js
            const session = await newSession(userUss, userId, false, 'web', 'en', false);
            console.log('Nova sessão criada:', session);
        } else {
            console.log('Autenticação falhou.');
        }
    } catch (error) {
        console.error('Erro:', error.message);
    }
})();
