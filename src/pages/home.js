export function renderHome(user) {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="dashboard-layout">
      <div class="dashboard-header">
        <span class="dashboard-user">${user?.name || 'Usuario'}</span>
      </div>
      <div class="dashboard-content">
        <h1>Bienvenido a la página principal</h1>
  // preloader/imagen removida
      </div>
      <button class="dashboard-logout" id="logoutBtn">Cerrar sesión</button>
    </div>
  `;
  document.getElementById('logoutBtn').onclick = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
}
