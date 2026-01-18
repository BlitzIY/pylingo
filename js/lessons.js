// lessons.js - carrega lições de data/python_lessons.json e renderiza
async function fetchLessons(){
  try {
    const res = await fetch('data/python_lessons.json');
    if(!res.ok) throw new Error('Falha ao carregar lições');
    return await res.json();
  } catch (err){
    console.error(err);
    return [];
  }
}

function renderLessonList(lessons){
  const ul = document.getElementById('lesson-list');
  if(!ul) return;
  ul.innerHTML = '';
  lessons.forEach(lesson => {
    const li = document.createElement('li');
    li.innerHTML = `
      <div>
        <strong>${lesson.id}. ${lesson.title}</strong>
        <div class="muted">${lesson.difficulty} • ${lesson.duration || '—'}</div>
      </div>
      <div>
        <a class="btn" href="lesson.html?lesson=${lesson.id}">Abrir</a>
      </div>
    `;
    ul.appendChild(li);
  });
}

function getQueryParam(name){
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

async function renderLessonPage(){
  const id = getQueryParam('lesson');
  if(!id) return;
  const lessons = await fetchLessons();
  const lesson = lessons.find(l => String(l.id) === String(id));
  if(!lesson) return;

  const title = document.getElementById('lesson-title');
  const body = document.getElementById('lesson-body');
  const exerciseDesc = document.getElementById('exercise-desc');
  const codeEditor = document.getElementById('code-editor');
  const output = document.getElementById('output');

  if(title) title.textContent = `${lesson.id}. ${lesson.title}`;
  if(body) body.innerHTML = `<p>${lesson.content}</p>`;
  if(exerciseDesc) exerciseDesc.textContent = lesson.exercise || 'Sem exercício definido';
  if(codeEditor) codeEditor.value = lesson.starter_code || '# Escreva seu código aqui';

  // Run / submit handlers (execução mock apenas)
  document.getElementById('run-code')?.addEventListener('click', () => {
    const code = codeEditor.value;
    // Em ambiente real, usar um sandbox/ backend para executar código seguro
    output.textContent = 'Execução simulada:\n' + code.slice(0, 1000);
  });

  document.getElementById('submit-code')?.addEventListener('click', () => {
    // Marca progresso
    const progress = JSON.parse(localStorage.getItem('pylingo_progress') || '{}');
    progress.completed = progress.completed || [];
    if(!progress.completed.includes(lesson.id)){
      progress.completed.push(lesson.id);
    }
    localStorage.setItem('pylingo_progress', JSON.stringify(progress));
    output.textContent = 'Resposta enviada. Parabéns!';
    // Ganhar pontos simples
    const userRaw = localStorage.getItem('pylingo_user');
    if(userRaw){
      const user = JSON.parse(userRaw);
      user.points = (user.points || 0) + (lesson.points || 10);
      localStorage.setItem('pylingo_user', JSON.stringify(user));
    }
  });
}

// Auto-executa em páginas apropriadas
document.addEventListener('DOMContentLoaded', async () => {
  const listEl = document.getElementById('lesson-list');
  if(listEl){
    const lessons = await fetchLessons();
    renderLessonList(lessons);
  }

  // Se estivermos na lesson.html, renderiza conteúdo
  if(document.getElementById('lesson-title')){
    await renderLessonPage();
  }
});
