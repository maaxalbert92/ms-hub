const systems = [
  {name:'Sistema Carmo Energy', url:'https://sce.carmoenergy.com/', category:'Operação', desc:'Sistema corporativo operacional da Carmo Energy.', icon:'⚙️', favorite:true, tags:['SCE','PT','GM']},
  {name:'PI Vision', url:'https://pi.carmoenergy.com/PIVision/#/Displays/15749/Monitoramento-Geral---TEND%C3%8ANCIA', category:'Supervisório', desc:'Monitoramento geral e tendências operacionais.', icon:'📈', favorite:true, tags:['PI','Tendência']},
  {name:'MAP - Monitoramento de Ativos de Petróleo', url:'https://carmoenergy.map.rntecnologia.com.br/map/dashboard/operacao', category:'Supervisório', desc:'Poços, SATs, tanques de campo e acompanhamento de ativos.', icon:'🛢️', favorite:true, tags:['Poços','SAT','TQ']},
  {name:'MedLogix', url:10.254.200.80, category:'Medição Fiscal', desc:'Consulta e acompanhamento de dados de medição fiscal.', icon:'🧾', favorite:true, tags:['Fiscal','Medição']},
  {name:'Safety COBRA',url:'https://safetycobrais.com/login',category:'SSO / Segurança',desc:'Sistema de gestão de segurança operacional e inspeções.',icon:'🦺',favorite:true,tags:['SSO','Segurança','COBRA','Inspeções']},
  {name:'8.07 - Centro Integrado de Controle', url:'https://carmoenergy.sharepoint.com/:f:/s/dados/IgD_aXyDXtxCSbYEvHcaKgkZAZtoHSuDC_79k66S5iqn6ao', category:'Documentos', desc:'Pasta de documentos do Centro Integrado de Controle.', icon:'🏢', favorite:true, tags:['CIC','SharePoint']},
  {name:'Carmópolis Dados', url:'https://carmoenergy.sharepoint.com/sites/dados/default.aspx', category:'Documentos', desc:'Portal de documentos e dados operacionais.', icon:'📁', favorite:false, tags:['SharePoint']},
  {name:'8Quali', url:'https://carmoenergy.8quali.com.br/home', category:'Documentos', desc:'Sistema de documentos e gestão da qualidade.', icon:'✅', favorite:false, tags:['Qualidade']},
  {name:'Portal Qualidade Assegurada', url:'https://carmoenergy.sharepoint.com/sites/QualidadeAssegurada', category:'Documentos', desc:'SharePoint da Qualidade Assegurada.', icon:'🗂️', favorite:false, tags:['Qualidade','SharePoint']},
  {name:'Resultado de Amostras', url:'https://labsoft-identitycenter-sts-prd.azurewebsites.net/Account/Login?ReturnUrl=%2Fconnect%2Fauthorize%2Fcallback%3Fclient_id%3DmyLIMSweb_JQuery%26redirect_uri%3Dhttps%253A%252F%252Fcarmoenergy.mylimsweb.cloud%252Fcallback%252Findex%26response_type%3Dcode%26scope%3Dopenid%2520myLIMSweb_API_Create%2520myLIMSweb_API_Read%2520myLIMSweb_API_Update%2520myLIMSweb_API_Delete%2520DataViewer_API_Create%2520DataViewer_API_Read%2520DataViewer_API_Update%2520DataViewer_API_Delete%2520DataFactory_API_Create%2520DataFactory_API_Read%2520DataFactory_API_Update%2520DataFactory_API_Delete%26state%3D4941dd480c3d4f5bb2d4aa874beca18f%26code_challenge%3DZ38NlAo30qKmtF8r_--L2H07VKiWxRMJV79WQFxKA4c%26code_challenge_method%3DS256%26response_mode%3Dquery%26requesterClient%3Dcarmoenergy', category:'Laboratório', desc:'Consulta de resultados laboratoriais de amostras.', icon:'🧪', favorite:false, tags:['LIMS','Amostras']},
  {name:'GLPI - Chamados HelpDesk', url:'https://servicedesk.carmoenergy.com/Helpdesk', category:'TI', desc:'Abertura e acompanhamento de chamados de TI.', icon:'🛠️', favorite:false, tags:['HelpDesk','TI']},
  {name:'Inspeciones - SafeIS - COBRA', url:'https://safetycobrais.com/login', category:'Grupo Cobra', desc:'Sistema de inspeções do Grupo Cobra.', icon:'🦺', favorite:false, tags:['Inspeção','Cobra']},
  {name:'My Ahgora - TOTVS', url:'https://app.ahgora.com.br/externo/', category:'Corporativo', desc:'Registro e consulta de ponto.', icon:'⏱️', favorite:false, tags:['Ponto','TOTVS']},
  {name:'Meu RH - TOTVS', url:'https://meurh.carmoenergy.com/web/app/RH/PortalMeuRH/#/login', category:'Corporativo', desc:'FOPAG, férias e serviços de RH.', icon:'👤', favorite:false, tags:['RH','Férias']},
  {name:'Gestão de Frotas', url:'https://carmoenergy.innovareti.com.br/login', category:'Corporativo', desc:'Sistema para gestão de frotas.', icon:'🚗', favorite:false, tags:['Frotas']},
  {name:'Engenharia Elétrica', url:'https://fs-educ.sempreser.com.br/adfs/ls/', category:'Faculdade', desc:'Portal acadêmico da Engenharia Elétrica.', icon:'🎓', favorite:false, tags:['Faculdade']}
];
const favoritesGrid=document.querySelector('#favoritesGrid'); const categoryGroups=document.querySelector('#categoryGroups'); const searchInput=document.querySelector('#searchInput'); const clearSearch=document.querySelector('#clearSearch'); const emptyState=document.querySelector('#emptyState'); document.querySelector('#systemsCount').textContent=`${systems.length} sistemas`;
function normalize(s){return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')}
function card(system){return `<a class="card" href="${system.url}" target="_blank" rel="noopener noreferrer" aria-label="Abrir ${system.name}"><div class="card-top"><div class="icon">${system.icon}</div><span class="open">↗</span></div><h3>${system.name}</h3><p>${system.desc}</p><div class="tag-row"><span class="tag">${system.category}</span>${system.tags.map(t=>`<span class="tag">${t}</span>`).join('')}</div></a>`}
function render(filter=''){
 const q=normalize(filter.trim());
 const filtered=systems.filter(s=>!q||normalize([s.name,s.category,s.desc,...s.tags].join(' ')).includes(q));
 favoritesGrid.innerHTML=systems.filter(s=>s.favorite).map(card).join('');
 const groups=filtered.reduce((acc,s)=>{(acc[s.category]??=[]).push(s); return acc},{});
 categoryGroups.innerHTML=Object.entries(groups).map(([cat,items])=>`<div class="category"><div class="category-header"><span>${cat}</span><span class="pill">${items.length}</span></div><div class="cards-grid">${items.map(card).join('')}</div></div>`).join('');
 emptyState.hidden=filtered.length>0;
}
searchInput.addEventListener('input',e=>render(e.target.value)); clearSearch.addEventListener('click',()=>{searchInput.value=''; render(); searchInput.focus();}); render();
if('serviceWorker' in navigator){window.addEventListener('load',()=>navigator.serviceWorker.register('service-worker.js').catch(()=>{}));}
