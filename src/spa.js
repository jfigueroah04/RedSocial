document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');

  // Alternar panel SPA
  signUpButton.addEventListener('click', () => {
    container.classList.add('right-panel-active');
  });
  signInButton.addEventListener('click', () => {
    container.classList.remove('right-panel-active');
  });

  // Mostrar/ocultar contraseña
  document.querySelectorAll('.toggle-password').forEach(icon => {
    icon.addEventListener('click', function() {
      const input = this.previousElementSibling;
      if (input.type === 'password') {
        input.type = 'text';
        this.classList.add('fa-eye-slash');
      } else {
        input.type = 'password';
        this.classList.remove('fa-eye-slash');
      }
    });
  });

  // Login
  if (loginForm) {
    loginForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const email = document.getElementById('loginEmail').value;
      const password = document.getElementById('loginPassword').value;
      const res = await fetch('/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      const msg = document.getElementById('loginMessage');
      msg.textContent = data.message || 'Error en el login';
      if (data.token) {
        localStorage.setItem('token', data.token);
        setTimeout(() => {
          window.location.href = './dashboard.html';
        }, 1200);
      }
    });
  }

  // Registro
  if (registerForm) {
    registerForm.addEventListener('submit', async function(e) {
      e.preventDefault();
      const name = document.getElementById('registerName').value;
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
      const res = await fetch('/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      const msg = document.getElementById('registerMessage');
      msg.textContent = data.message || 'Error en el registro';
      if (data.user) {
        setTimeout(() => {
          container.classList.remove('right-panel-active');
        }, 1200);
      }
    });
  }
});
