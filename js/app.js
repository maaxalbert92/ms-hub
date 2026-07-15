const systems = [
  {name:'Sistema Carmo Energy', url:'https://sce.carmoenergy.com/', category:'Operação', desc:'Sistema corporativo operacional da Carmo Energy.', icon:'⚙️', favorite:true, tags:['SCE','PT','GM']},

  {name:'PI Vision', url:'https://pi.carmoenergy.com/PIVision/#/Displays/15749/Monitoramento-Geral---TEND%C3%8ANCIA', category:'Supervisório', desc:'Monitoramento geral e tendências operacionais.', icon:'📈', favorite:true, tags:['PI','Tendência']},

  {name:'MAP - Monitoramento de Ativos de Petróleo', url:'https://carmoenergy.map.rntecnologia.com.br/map/dashboard/operacao', category:'Supervisório', desc:'Poços, SATs, tanques de campo e acompanhamento de ativos.', icon:'🛢️', favorite:true, tags:['Poços','SAT','TQ']},

  {name:'MedLogix', url:'http://10.254.200.80', category:'Medição Fiscal', desc:'Consulta e acompanhamento de dados de medição fiscal.', icon:'🧾', favorite:true, tags:['Fiscal','Medição']},

  {name:'8.07 - Centro Integrado de Controle', url:'https://carmoenergy.sharepoint.com/:f:/s/dados/IgD_aXyDXtxCSbYEvHcaKgkZAZtoHSuDC_79k66S5iqn6ao', category:'Documentos', desc:'Pasta de documentos do Centro Integrado de Controle.', icon:'🏢', favorite:true, tags:['CIC','SharePoint']},

  {name:'Carmópolis Dados', url:'https://carmoenergy.sharepoint.com/sites/dados/default.aspx', category:'Documentos', desc:'Portal de documentos e dados operacionais.', icon:'📁', favorite:false, tags:['SharePoint']},

  {name:'8Quali', url:'https://carmoenergy.8quali.com.br/home', category:'Documentos', desc:'Sistema de documentos e gestão da qualidade.', icon:'✅', favorite:false, tags:['Qualidade']},

  {name:'Portal Qualidade Assegurada', url:'https://carmoenergy.sharepoint.com/sites/QualidadeAssegurada', category:'Documentos', desc:'SharePoint da Qualidade Assegurada.', icon:'🗂️', favorite:false, tags:['Qualidade','SharePoint']},

  {name:'Resultado de Amostras', url:'https://labsoft-identitycenter-sts-prd.azurewebsites.net/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DmyLIMSweb_JQuery%26redirect_uri%3Dhttps%253A%252F%252Fcarmoenergy.mylimsweb.cloud%252Fcallback%252Findex%26response_type%3Dcode%26scope%3Dopenid%2520myLIMSweb_API_Create%2520myLIMSweb_API_Read%2520myLIMSweb_API_Update%2520myLIMSweb_API_Delete%2520DataViewer_API_Create%2520DataViewer_API_Read%2520DataViewer_API_Update%2520DataViewer_API_Delete%2520DataFactory_API_Create%2520DataFactory_API_Read%2520DataFactory_API_Update%2520DataFactory_API_Delete%26state%3D4941dd480c3d4f5bb2d4aa874beca18f%26code_challenge%3DZ38NlAo30qKmtF8r_--L2H07VKiWxRMJV79WQFxKA4c%26code_challenge_method%3DS256%26response_mode%3Dquery%26requesterClient%3Dcarmoenergy', category:'Laboratório', desc:'Consulta de resultados laboratoriais de amostras.', icon:'🧪', favorite:false, tags:['LIMS','Amostras']},

  {name:'GLPI - Chamados HelpDesk', url:'https://servicedesk.carmoenergy.com/Helpdesk', category:'TI', desc:'Abertura e acompanhamento de chamados de TI.', icon:'🛠️', favorite:false, tags:['HelpDesk','TI']},

  {name:'Safety COBRA', url:'https://safetycobrais.com/login', category:'Grupo Cobra', desc:'Sistema de inspeções e gestão de segurança do Grupo Cobra.', icon:'🦺', favorite:true, tags:['Inspeção','Cobra','Safety']},

  {name:'Zeev - Minhas Tarefas', url:'https://carmoenergy.zeev.it/my/tasks', category:'Corporativo', desc:'Fluxos de trabalho e tarefas pendentes.', icon:'📋', favorite:true, tags:['Workflow','Zeev','Tarefas']},

  {name:'My Ahgora - TOTVS', url:'https://app.ahgora.com.br/externo/', category:'Corporativo', desc:'Registro e consulta de ponto.', icon:'⏱️', favorite:false, tags:['Ponto','TOTVS']},

  {name:'Meu RH - TOTVS', url:'https://meurh.carmoenergy.com/web/app/RH/PortalMeuRH/#/login', category:'Corporativo', desc:'FOPAG, férias e serviços de RH.', icon:'👤', favorite:false, tags:['RH','Férias']},

  {name:'Gestão de Frotas', url:'https://carmoenergy.innovareti.com.br/login', category:'Corporativo', desc:'Sistema para gestão de frotas.', icon:'🚗', favorite:false, tags:['Frotas']},

  {name:'Engenharia Elétrica', url:'https://fs-educ.sempreser.com.br/adfs/ls/', category:'Faculdade', desc:'Portal acadêmico da Engenharia Elétrica.', icon:'🎓', favorite:false, tags:['Faculdade']}
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
