// gamification.js - conquista simples
async function loadAchievements(){
  try {
    const res = await fetch('data/achievements.json');
    if(!res.ok) throw new Error('Falha ao carregar conquistas');
    const list = await res.json();
    return list;
  } catch (err){
    console.error(err);
    return [];
  }
}

function renderAchievements(list, targetId){
  const target = document.getElementById(targetId);
  if(!target) return;
  target.innerHTML = '';
  list.forEach(a => {
    const div = document.createElement('div');
    div.className = 'panel';
    div.innerHTML = `<strong>${a.name}</strong><div class="muted">${a.description}</div>`;
    target.appendChild(div);
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const list = await loadAchievements();
  // mostra em dashboard e perfil quando existirem
  renderAchievements(list, 'achievements');
  renderAchievements(list, 'profile-achievements');
});
