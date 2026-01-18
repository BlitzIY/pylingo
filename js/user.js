// user.js - gestão do usuário na UI
document.addEventListener('DOMContentLoaded', () => {
  const user = (window.Auth && Auth.getUser) ? Auth.getUser() : null;

  if(!user) return;

  // Preenche perfil
  const profileInfo = document.getElementById('profile-info');
  if(profileInfo){
    profileInfo.innerHTML = `
      <p><strong>Nome:</strong> ${user.name}</p>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>ID:</strong> ${user.id}</p>
    `;
  }

  const profilePoints = document.getElementById('profile-points');
  if(profilePoints){
    profilePoints.textContent = user.points || 0;
  }

  // Dashboard: próximo exercício e resumo simples
  const nextLessonEl = document.getElementById('next-lesson');
  if(nextLessonEl){
    // Busca lição mais próxima via progresso (mock)
    const progress = JSON.parse(localStorage.getItem('pylingo_progress') || '{}');
    const nextId = progress.nextLessonId || null;
    if(nextId){
      nextLessonEl.textContent = `Próxima lição: #${nextId}`;
    } else {
      nextLessonEl.textContent = 'Nenhuma lição marcada. Vá para Cursos para começar.';
    }
  }
});
