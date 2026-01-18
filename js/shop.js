// shop.js - loja básica, usa config.json para itens
async function loadShop(){
  try {
    const res = await fetch('data/config.json');
    if(!res.ok) throw new Error('Erro ao carregar config');
    const cfg = await res.json();
    return cfg.shop || [];
  } catch (err){
    console.error(err);
    return [];
  }
}

function renderShop(items){
  const container = document.getElementById('shop-items');
  if(!container) return;
  container.innerHTML = '';
  items.forEach(item => {
    const div = document.createElement('div');
    div.className = 'shop-item';
    div.innerHTML = `
      <h4>${item.name}</h4>
      <p class="muted">${item.description}</p>
      <p><strong>${item.price} pts</strong></p>
      <button class="btn buy" data-id="${item.id}">Comprar</button>
    `;
    container.appendChild(div);
  });

  container.querySelectorAll('.buy').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = btn.getAttribute('data-id');
      buyItem(id);
    });
  });
}

function buyItem(id){
  // Checa pontos do usuário
  const userRaw = localStorage.getItem('pylingo_user');
  if(!userRaw){ alert('Faça login para comprar.'); return; }
  const user = JSON.parse(userRaw);
  loadShop().then(items => {
    const item = items.find(i => String(i.id) === String(id));
    if(!item) return alert('Item não encontrado');
    if((user.points || 0) < item.price) return alert('Pontos insuficientes');
    user.points -= item.price;
    localStorage.setItem('pylingo_user', JSON.stringify(user));
    alert(`Você comprou: ${item.name}`);
    // Em produção, persistir compra no backend
    // Re-render pontos
    const profilePoints = document.getElementById('profile-points');
    if(profilePoints) profilePoints.textContent = user.points;
  });
}

document.addEventListener('DOMContentLoaded', async () => {
  const items = await loadShop();
  renderShop(items);
});
