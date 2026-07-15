const systems = [
  {
    name: 'MedLogix',
    url: 'http://10.254.200.80',
    category: 'Medição Fiscal',
    desc: 'Consulta e acompanhamento de dados de medição fiscal.',
    icon: '🧾',
    favorite: true,
    tags: ['Fiscal', 'Medição']
  },
  {
    name: 'Safety COBRA',
    url: 'https://safetycobrais.com/login',
    category: 'Segurança',
    desc: 'Acesso ao sistema Safety COBRA para gestão de segurança e atividades relacionadas.',
    icon: '🦺',
    favorite: true,
    tags: ['Segurança', 'SSO', 'COBRA']
  },
  {
    name: 'Zeev — Minhas tarefas',
    url: 'https://carmoenergy.zeev.it/my/tasks',
    category: 'Fluxos e tarefas',
    desc: 'Consulta e acompanhamento das tarefas e fluxos atribuídos no Zeev.',
    icon: '✅',
    favorite: true,
    tags: ['Zeev', 'Tarefas', 'Workflow']
  }
];

const favoritesGrid = document.getElementById('favoritesGrid');
const categoryGroups = document.getElementById('categoryGroups');
const searchInput = document.getElementById('searchInput');
const clearSearch = document.getElementById('clearSearch');
const emptyState = document.getElementById('emptyState');
const systemsCount = document.getElementById('systemsCount');
const favoritesSection = document.getElementById('favoritesSection');

systemsCount.textContent = `${systems.length} ${systems.length === 1 ? 'sistema' : 'sistemas'}`;

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

function cardTemplate(system) {
  const tags = system.tags
    .map(tag => `<span class="tag">${tag}</span>`)
    .join('');

  return `
    <a
      class="system-card"
      href="${system.url}"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Abrir ${system.name}"
    >
      <div class="card-top">
        <span class="system-icon" aria-hidden="true">${system.icon}</span>
        ${system.favorite ? '<span class="favorite-mark" title="Favorito">★</span>' : ''}
      </div>

      <h3>${system.name}</h3>
      <p>${system.desc}</p>

      <div class="tags">${tags}</div>
    </a>
  `;
}

function render(query = '') {
  const normalizedQuery = normalize(query);

  const filtered = systems.filter(system => {
    const searchable = normalize([
      system.name,
      system.category,
      system.desc,
      ...system.tags
    ].join(' '));

    return searchable.includes(normalizedQuery);
  });

  const favorites = filtered.filter(system => system.favorite);
  favoritesSection.hidden = favorites.length === 0;
  favoritesGrid.innerHTML = favorites.map(cardTemplate).join('');

  const categories = [...new Set(filtered.map(system => system.category))]
    .sort((a, b) => a.localeCompare(b, 'pt-BR'));

  categoryGroups.innerHTML = categories.map(category => {
    const categorySystems = filtered.filter(system => system.category === category);

    return `
      <section class="category-group">
        <h3 class="category-name">${category}</h3>
        <div class="cards-grid">
          ${categorySystems.map(cardTemplate).join('')}
        </div>
      </section>
    `;
  }).join('');

  emptyState.hidden = filtered.length > 0;
}

searchInput.addEventListener('input', event => {
  render(event.target.value);
});

clearSearch.addEventListener('click', () => {
  searchInput.value = '';
  searchInput.focus();
  render('');
});

render();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .catch(error => console.error('Falha ao registrar o Service Worker:', error));
  });
}
