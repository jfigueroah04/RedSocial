const API = window.API_URL || 'http://localhost:3900';

document.addEventListener('DOMContentLoaded', () => {
  const pre = document.getElementById('preloader');
  if (pre){
    const MIN_MS = 3000;
    const started = Date.now();

    setTimeout(()=>{
      try{ pre.style.display = 'none'; }catch(e){}
    }, MIN_MS);
  }
  const cardInner = document.getElementById('cardInner');
  const toCreate = document.getElementById('toCreate');
  const toLogin = document.getElementById('toLogin');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginMessage = document.getElementById('loginMessage');
  const registerMessage = document.getElementById('registerMessage');

  function safeEl(el){ return el instanceof Element ? el : null; }

  function setCreatingState(on){
    if (!safeEl(document.body)) return;
    if (on){
      document.body.style.background = 'linear-gradient(135deg,#1e6ef0,#4a8ef7)';
    } else {
      document.body.style.background = 'linear-gradient(135deg,#50a3a2,#53e3a6)';
    }
  }

  if (safeEl(toCreate) && safeEl(cardInner)){
    toCreate.addEventListener('click', ()=>{ cardInner.classList.add('rotate'); setCreatingState(true); });
  }
  if (safeEl(toLogin) && safeEl(cardInner)){
    toLogin.addEventListener('click', ()=>{ cardInner.classList.remove('rotate'); setCreatingState(false); });
  }

  const loginBtn = document.getElementById('loginBtn');
  if (safeEl(loginBtn)){
    loginBtn.addEventListener('click', async ()=>{
      const email = document.getElementById('login_email')?.value || '';
      const password = document.getElementById('login_password')?.value || '';
      if (!email || !password){ if (loginMessage){ loginMessage.style.color='crimson'; loginMessage.textContent='Completa los campos'; } return; }
      if (loginMessage) { loginMessage.textContent = 'Iniciando...'; loginMessage.style.color = ''; }
      try{
        const res = await fetch(API + '/api/user/login', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ email, password }) });
        const json = await res.json();
        if (!res.ok){ if (loginMessage){ loginMessage.style.color='crimson'; loginMessage.textContent = json.message || 'Credenciales inválidas'; } return; }
  localStorage.setItem('token', json.token);
  try{ localStorage.setItem('justLoggedUser', json.user?.name || json.user?.nick || 'Usuario'); }catch(e){}
        if (loginMessage){ loginMessage.style.color='green'; loginMessage.textContent='¡Bienvenido!'; }
        setTimeout(()=> window.location.href = '/pages/home.html', 600);
      }catch(err){ if (loginMessage){ loginMessage.style.color='crimson'; loginMessage.textContent='Error de red'; } }
    });
  }

  const registerBtn = document.getElementById('registerBtn');
  if (safeEl(registerBtn)){
    registerBtn.addEventListener('click', async ()=>{
      const name = document.getElementById('r_name')?.value.trim() || '';
      const surname = document.getElementById('r_surname')?.value.trim() || '';
      const nick = document.getElementById('r_nick')?.value.trim() || '';
      const email = document.getElementById('r_email')?.value.trim() || '';
      const password = document.getElementById('r_password')?.value || '';
      if (!name || !nick || !email || !password){ if (registerMessage){ registerMessage.style.color='crimson'; registerMessage.textContent='Completa los campos obligatorios'; } return; }
      if (registerMessage){ registerMessage.style.color=''; registerMessage.textContent='Creando cuenta...'; }
      setCreatingState(true);
      try{
        const res = await fetch(`${API}/api/user/register`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ name, surname, nick, email, password }) });
        const data = await res.json();
        if (!res.ok){ if (registerMessage){ registerMessage.style.color='crimson'; registerMessage.textContent = data.message || 'Error en el registro'; } setCreatingState(false); return; }
        if (registerMessage){ registerMessage.style.color='#16a34a'; registerMessage.textContent = data.message || 'Registrado'; }
        setTimeout(()=>{ cardInner.classList.remove('rotate'); setCreatingState(false); }, 900);
      }catch(err){ if (registerMessage){ registerMessage.style.color='crimson'; registerMessage.textContent='Error de conexión'; } setCreatingState(false); }
    });
  }

  document.querySelectorAll('.toggle-password').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const parent = btn.closest('.password-group');
      if (!parent) return;
      const input = parent.querySelector('input');
      if (!input) return;
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      const eyeOpen = btn.querySelector('.eye-open');
      const eyeClosed = btn.querySelector('.eye-closed');
      if (eyeOpen && eyeClosed){
        eyeOpen.style.display = isHidden ? 'none' : 'inline';
        eyeClosed.style.display = isHidden ? 'inline' : 'none';
      }
      btn.setAttribute('aria-pressed', String(isHidden));
      btn.setAttribute('title', isHidden ? 'Ocultar contraseña' : 'Mostrar contraseña');
    });
  });

});
