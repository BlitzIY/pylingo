// auth.js - funções de autenticação simples (mock)
// Em produção troque por chamadas ao backend

const Auth = (function(){
  const KEY = 'pylingo_user';

  function login(email, password){
    // Mock: aceita qualquer credencial e salva usuário básico
    const user = { email, name: email.split('@')[0], points: 0, id: Date.now() };
    localStorage.setItem(KEY, JSON.stringify(user));
    return user;
  }

  function logout(){
    localStorage.removeItem(KEY);
  }

  function getUser(){
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : null;
  }

  function isLogged(){
    return !!getUser();
  }

  // Form handler (se existir página de login)
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('login-form');
    if(form){
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const user = login(email, password);
        // redireciona para dashboard ao logar
        window.location.href = 'dashboard.html';
      });
    }

    // Atualiza link de autenticação
    const authLink = document.getElementById('auth-link');
    if(authLink){
      if(isLogged()){
        authLink.textContent = 'Sair';
        authLink.href = '#';
        authLink.addEventListener('click', (e) => {
          e.preventDefault();
          logout();
          window.location.reload();
        });
      } else {
        authLink.textContent = 'Entrar';
        authLink.href = 'login.html';
      }
    }
  });

  return { login, logout, getUser, isLogged };
})();
