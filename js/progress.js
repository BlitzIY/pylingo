// progress.js - funções simples para acompanhar progresso
const Progress = (function(){
  const KEY = 'pylingo_progress';

  function get(){
    return JSON.parse(localStorage.getItem(KEY) || '{}');
  }

  function save(p){
    localStorage.setItem(KEY, JSON.stringify(p));
  }

  function markCompleted(lessonId){
    const p = get();
    p.completed = p.completed || [];
    if(!p.completed.includes(lessonId)) p.completed.push(lessonId);
    save(p);
  }

  function getSummary(){
    const p = get();
    return {
      completed: (p.completed || []).length,
      nextLessonId: (p.nextLessonId || null)
    };
  }

  // Mostra resumo em dashboard (se existir)
  document.addEventListener('DOMContentLoaded', () => {
    const el = document.getElementById('progress-summary');
    if(!el) return;
    const s = getSummary();
    el.innerHTML = `<p>Lições concluídas: <strong>${s.completed}</strong></p>`;
  });

  return { get, save, markCompleted, getSummary };
})();
